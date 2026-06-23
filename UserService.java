package com.examly.springapp.service;

import com.examly.springapp.DTO.LoginRequest;
import com.examly.springapp.DTO.SignupRequest;
import com.examly.springapp.model.User;

public interface UserService {
    User registerUser(SignupRequest request);
    User loginUser(LoginRequest request);
}
