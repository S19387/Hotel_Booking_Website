package com.hms.hotelmanagementsystem.hotelmanagementsystem.controller;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Schedule;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.ScheduleServiceImpl;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.ScheduleServiceImpl.ScheduleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleServiceImpl scheduleService;

    @GetMapping("/getById")
    public ResponseEntity<ScheduleResponse> getScheduleDetails(@RequestParam Long sId) {
        return scheduleService.getScheduleDetails(sId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getbyemail")
    public ResponseEntity<?> getSchedulesByEmail(@RequestParam String email) {
        List<Schedule> schedules = scheduleService.getSchedulesByEmail(email);
        if (schedules.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ScheduleResponse>> getAllScheduleDetails() {
        List<ScheduleResponse> schedules = scheduleService.getAllScheduleDetails();
        return ResponseEntity.ok(schedules);
    }

    @PostMapping("/add")
    public ResponseEntity<Schedule> createSchedule(@RequestBody Schedule schedule) {
        Schedule createdSchedule = scheduleService.createSchedule(schedule);
        return ResponseEntity.status(201).body(createdSchedule); // Return status 201 for created resource
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Schedule>> getAllSchedules() {
        List<Schedule> schedules = scheduleService.getAllSchedules();
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/getbyid")
    public ResponseEntity<Schedule> getScheduleById(@RequestParam Long sId) {
        Optional<Schedule> schedule = scheduleService.getScheduleById(sId);
        return schedule.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update")
    public ResponseEntity<Schedule> updateSchedule(@RequestParam Long sId, @RequestBody Schedule updatedSchedule) {
        Optional<Schedule> updated = scheduleService.updateSchedule(sId, updatedSchedule);
        return updated.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteSchedule(@RequestParam Long sId) {
        boolean deleted = scheduleService.deleteSchedule(sId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
