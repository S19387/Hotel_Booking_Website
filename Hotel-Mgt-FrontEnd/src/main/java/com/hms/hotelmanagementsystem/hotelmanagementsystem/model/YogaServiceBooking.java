package com.hms.hotelmanagementsystem.hotelmanagementsystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class YogaServiceBooking {

    @Id
    @GeneratedValue
    private Long servBId;
    @Column(nullable = false)
    private Long sId;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private LocalDate todayDate;
    
}