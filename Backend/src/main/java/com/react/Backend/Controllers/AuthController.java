package com.react.Backend.Controllers;


import com.react.Backend.DTO.JwtResponseDTO;
import com.react.Backend.DTO.LoginDTO;
import com.react.Backend.DTO.RegisterDTO;
import com.react.Backend.Entities.Role;
import com.react.Backend.Entities.User;
import com.react.Backend.Repositories.UserRepository;
import com.react.Backend.Utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/register")
    public String register(@RequestBody @Valid RegisterDTO registerRequest) {
        System.out.println("Register endpoint hit!");
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            return "Error: Email is already in use!";
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setAge(registerRequest.getAge());
        user.setRole(Role.valueOf(registerRequest.getRole().toUpperCase()));

        userRepository.save(user);
        return "User registered successfully!";
    }


    @PostMapping("/login")
    public JwtResponseDTO login(@RequestBody LoginDTO loginRequest) {
        System.out.println("Login attempt: " + loginRequest.getEmail()); // Debug log
        System.out.println("Password attempt: " + loginRequest.getPassword()); // Debug log
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtils.generateJwtToken(userDetails.getUsername(), userDetails.getAuthorities().toString());
        return new JwtResponseDTO(token);
    }

}
