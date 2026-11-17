package com.hms.hotelmanagementsystem.hotelmanagementsystem.service;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Instructor;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> saveUser(User user);

    ResponseEntity<?> saveUser(User user, Instructor instructor);

    ResponseEntity<?> login(String email, String password);

    ResponseEntity<?> getAllUsers();

    ResponseEntity<?> deleteUser(String email);

}
