package com.hms.hotelmanagementsystem.hotelmanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class YogaServiceBookingResponseDTO {
    private Long servBId;
    private String emailUser;
    private LocalDate todayDate;

    private Long sId;
    private Long yId;
    private String instructorEmail;
    private LocalTime startTime;
    private LocalTime endTime;
    private LocalDate sDate;
    private Double price;
}
