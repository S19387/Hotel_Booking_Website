package com.hms.hotelmanagementsystem.hotelmanagementsystem.controller;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Instructor;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.InstructorServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/instructor")
public class InstructorController {

    private final InstructorServiceImpl instructorService;

    @Autowired
    public InstructorController(InstructorServiceImpl instructorService) {
        this.instructorService = instructorService;
    }

    @GetMapping("/getbio")
    public ResponseEntity<Instructor> getInstructorByEmail(@RequestParam String email) {
        Optional<Instructor> instructor = instructorService.getInstructorByEmail(email);

        if (instructor.isPresent()) {
            return ResponseEntity.ok(instructor.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
