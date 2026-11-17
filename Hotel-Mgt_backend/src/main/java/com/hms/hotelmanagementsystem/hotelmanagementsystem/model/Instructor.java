package com.hms.hotelmanagementsystem.hotelmanagementsystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Instructor {

    @Id
    private String email;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String bioDescription;
    @Column(nullable = false)
    private String certifications;
    @Column(nullable = false)
    private String specializations;

}