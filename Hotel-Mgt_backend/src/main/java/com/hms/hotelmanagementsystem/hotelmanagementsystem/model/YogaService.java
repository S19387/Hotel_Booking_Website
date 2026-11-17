package com.hms.hotelmanagementsystem.hotelmanagementsystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class YogaService {

    @Id
    @GeneratedValue
    private Long yId;
    @Column(nullable = false)
    private String yName;
    @Column(nullable = false)
    private String type;
    @Column(nullable = false)
    private String description;
    
}