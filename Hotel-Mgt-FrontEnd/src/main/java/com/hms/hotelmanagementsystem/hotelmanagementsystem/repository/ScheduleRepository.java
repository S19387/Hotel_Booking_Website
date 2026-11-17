package com.hms.hotelmanagementsystem.hotelmanagementsystem.repository;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Schedule;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.YogaService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findByEmail(String email);
    List<Long> findSIdByEmail(String email);

}
