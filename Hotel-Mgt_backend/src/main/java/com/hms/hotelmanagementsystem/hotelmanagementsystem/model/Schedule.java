package com.hms.hotelmanagementsystem.hotelmanagementsystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
public class Schedule {

    @Id
    @GeneratedValue
    private Long sId;
    @Column(nullable = false)
    private Long yId;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private LocalTime startTime;
    @Column(nullable = false)
    private LocalTime endTime;
    @Column(nullable = false)
    private LocalDate sDate;
    @Column(nullable = false)
    private Double price;
    @Column(nullable = false)
    private String image1;
    private String image2;
    private String image3;
    private String image4;

    
}