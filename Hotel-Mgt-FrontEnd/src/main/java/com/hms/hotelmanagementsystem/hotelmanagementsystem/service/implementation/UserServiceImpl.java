package com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Instructor;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.User;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.UserRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private InstructorServiceImpl instructorService;

    @Autowired
    private EmailServiceImpl emailService;

    @Override
    public ResponseEntity<?> saveUser(User user) {

        try{
            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

            if (existingUser.isPresent()) {
                return ResponseEntity.ok("This email is already registered");
            } else {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                user.setRole("admin");
                userRepository.save(user);
                user.setPassword(null);
                HttpHeaders headers = new HttpHeaders();
                headers.add("status", "Success");
                return ResponseEntity
                        .ok()
                        .headers(headers)
                        .body(user);
            }
        }catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> saveUser(User user, Instructor instructor) {
        try {
            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

            if (existingUser.isPresent()) {
                return ResponseEntity.ok("This email is already registered");
            } else {


                String subject = "Welcome To HMS Hotel Management";
                String text = "Dear User,\n\nYour registration was successful.\n\n Here are your account credentials:\n\n Username: " + user.getEmail() + " \n\nPassword :" + user.getPassword() + " \n\nBest regards,\nHMS Hotel Management";
                emailService.sendEmail(user.getEmail(), subject, text);

                user.setPassword(passwordEncoder.encode(user.getPassword()));
                user.setRole("yogainstructor");
                userRepository.save(user);

                user.setPassword(null);

                instructorService.saveInstructor(instructor);

                HttpHeaders headers = new HttpHeaders();
                headers.add("status", "Success");
                return ResponseEntity.ok().headers(headers).body(user);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }}

    @Override
    public ResponseEntity<?> login(String email, String password) {

        try{
            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();
                if (passwordEncoder.matches(password, user.getPassword())) {

                    user.setPassword(null);
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("status", "Success");
                    return ResponseEntity
                            .ok()
                            .headers(headers)
                            .body(user);
                }
            }
            return null;
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getAllUsers() {

        try {
            return  ResponseEntity.ok(userRepository.findAll());

        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> deleteUser(String email) {
        try {
            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isPresent()) {
                userRepository.delete(optionalUser.get());
                return ResponseEntity.ok("User deleted successfully");
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error while deleting user: " + e.getMessage());
        }
    }


}
