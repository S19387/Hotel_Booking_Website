package com.hms.hotelmanagementsystem.hotelmanagementsystem.controller;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.dto.UserInstructorDto;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Instructor;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.User;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/auth")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/signup")
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PostMapping("/saveInstructor")
    public ResponseEntity<?> registerUser(@RequestBody UserInstructorDto userInstructorDto) {
        User user = userInstructorDto.getUser();
        Instructor instructor = userInstructorDto.getInstructor();
        return ResponseEntity.ok(userService.saveUser(user, instructor));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> login(@RequestBody User user) {
        ResponseEntity<?> loggedInUser = userService.login(user.getEmail(), user.getPassword());
        if (loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser);
        } else {
            return ResponseEntity.ok("Invalid email or password");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllRooms() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        return userService.deleteUser(email);
    }



}
