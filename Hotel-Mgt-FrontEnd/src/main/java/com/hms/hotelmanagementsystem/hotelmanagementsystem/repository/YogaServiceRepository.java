package com.hms.hotelmanagementsystem.hotelmanagementsystem.repository;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.BookingPending;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.YogaService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface YogaServiceRepository extends JpaRepository<YogaService, Long> {



}
