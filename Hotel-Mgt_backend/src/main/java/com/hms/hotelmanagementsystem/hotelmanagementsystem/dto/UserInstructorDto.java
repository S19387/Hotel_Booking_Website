package com.hms.hotelmanagementsystem.hotelmanagementsystem.dto;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Instructor;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.User;

public class UserInstructorDto {

    private User user;
    private Instructor instructor;


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Instructor getInstructor() {
        return instructor;
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }
}
