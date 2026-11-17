package com.hms.hotelmanagementsystem.hotelmanagementsystem.service;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Instructor;

import java.util.Optional;

public interface InstructorService {
    Optional<Instructor> getInstructorByEmail(String email);

    Instructor saveInstructor(Instructor instructor);
}
