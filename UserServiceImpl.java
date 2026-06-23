package com.examly.springapp.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.DTO.LoginRequest;
import com.examly.springapp.DTO.SignupRequest;
import com.examly.springapp.model.Role;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User registerUser(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail().trim()))
            throw new IllegalArgumentException("Email already exists");

        User user = new User();
        user.setName(request.getName() != null ? request.getName().trim() : null);
        user.setEmail(request.getEmail().trim());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword().trim()));

        if (request.getRole() != null && !request.getRole().isBlank()) {
            try {
                user.setRole(Role.valueOf(request.getRole().trim().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid role: " + request.getRole());
            }
        } else {
            user.setRole(Role.EMPLOYEE);
        }

        return userRepository.save(user);
    }

    @Override
public User loginUser(LoginRequest request) {
    User user = userRepository.findByEmail(request.getEmail().trim())
        .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

    if (!passwordEncoder.matches(request.getPassword().trim(), user.getPasswordHash())) {
        throw new IllegalArgumentException("Invalid email or password");
    }

    return user;
}

}
