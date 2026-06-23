// package com.examly.springapp.Controller;

// import java.util.List;
// import java.util.Map;
// import java.util.stream.Collectors;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.examly.springapp.DTO.LoginRequest;
// import com.examly.springapp.DTO.SignupRequest;
// import com.examly.springapp.model.User;
// import com.examly.springapp.repository.UserRepository;
// import com.examly.springapp.service.UserService;

// import jakarta.validation.Valid;

// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {

//     private final UserService userService;

//     public AuthController(UserService userService) {
//         this.userService = userService;
//     }

    
//     @PostMapping("/signup")
//     public ResponseEntity<Map<String, Object>> signup(@Valid @RequestBody SignupRequest request) {
//         User user = userService.registerUser(request);
//         return ResponseEntity.ok(Map.of(
//             "message", "Signup successful",
//             "email", user.getEmail(),
//             "role", user.getRole().name(),
//             "name", user.getName()
//         ));
//     }

    
//     @PostMapping("/login")
//     public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
//         User user = userService.loginUser(request);
//         return ResponseEntity.ok(Map.of(
//             "message", "Login successful",
//             "email", user.getEmail(),
//             "role", user.getRole().name(),
//             "name", user.getName()
//         ));
//     }

//     @GetMapping("/agents")
//     public ResponseEntity<List<User>> getAllAgents() {
//         List<User> agents = UserRepository.findAll().stream()
//                 .filter(u -> u.getRole() == UserRole.AGENT)
//                 .collect(Collectors.toList());
//         return ResponseEntity.ok(agents);
//     }
// }
package com.examly.springapp.Controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.DTO.LoginRequest;
import com.examly.springapp.DTO.SignupRequest;
import com.examly.springapp.model.Role;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") 
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository; 

    public AuthController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@Valid @RequestBody SignupRequest request) {
        User user = userService.registerUser(request);
        return ResponseEntity.ok(Map.of(
            "message", "Signup successful",
            "email", user.getEmail(),
            "role", user.getRole().name(),
            "name", user.getName()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
        User user = userService.loginUser(request);
        return ResponseEntity.ok(Map.of(
            "message", "Login successful",
            "email", user.getEmail(),
            "role", user.getRole().name(),
            "name", user.getName()
        ));
    }

   
    @GetMapping("/agents")
    public ResponseEntity<List<User>> getAllAgents() {
        List<User> agents = userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.AGENT)
                .collect(Collectors.toList());
        return ResponseEntity.ok(agents);
    }
}
