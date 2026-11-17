package com.hms.hotelmanagementsystem.hotelmanagementsystem.service;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Schedule;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.ScheduleServiceImpl;

import java.util.List;
import java.util.Optional;

public interface ScheduleService {
    Optional<ScheduleServiceImpl.ScheduleResponse> getScheduleDetails(Long sId);

    List<ScheduleServiceImpl.ScheduleResponse> getAllScheduleDetails();

    Schedule createSchedule(Schedule schedule);

    List<Schedule> getAllSchedules();

    Optional<Schedule> getScheduleById(Long sId);

    Optional<Schedule> updateSchedule(Long sId, Schedule updatedSchedule);

    boolean deleteSchedule(Long sId);

    List<Schedule> getSchedulesByEmail(String email);
}
