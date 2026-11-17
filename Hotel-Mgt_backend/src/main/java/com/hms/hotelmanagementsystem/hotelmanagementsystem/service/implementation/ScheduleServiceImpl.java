package com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Instructor;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Schedule;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.YogaService;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.InstructorRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.ScheduleRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.YogaServiceRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private YogaServiceRepository yogaServiceRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Override
    public Optional<ScheduleResponse> getScheduleDetails(Long sId) {
        Optional<Schedule> scheduleOpt = scheduleRepository.findById(sId);

        if (scheduleOpt.isPresent()) {
            Schedule schedule = scheduleOpt.get();

            Optional<YogaService> yogaServiceOpt = yogaServiceRepository.findById(schedule.getYId());

            Optional<Instructor> instructorOpt = instructorRepository.findById(schedule.getEmail());

            return Optional.of(new ScheduleResponse(schedule, yogaServiceOpt.orElse(null), instructorOpt.orElse(null)));
        }

        return Optional.empty();
    }

    @Override
    public List<ScheduleResponse> getAllScheduleDetails() {
        List<Schedule> schedules = scheduleRepository.findAll();

        return schedules.stream().map(schedule -> {
            Optional<YogaService> yogaServiceOpt = yogaServiceRepository.findById(schedule.getYId());
            Optional<Instructor> instructorOpt = instructorRepository.findById(schedule.getEmail());

            return new ScheduleResponse(schedule, yogaServiceOpt.orElse(null), instructorOpt.orElse(null));
        }).collect(Collectors.toList());
    }

    public static class ScheduleResponse {
        private final Schedule schedule;
        private final YogaService yogaService;
        private final Instructor instructor;

        public ScheduleResponse(Schedule schedule, YogaService yogaService, Instructor instructor) {
            this.schedule = schedule;
            this.yogaService = yogaService;
            this.instructor = instructor;
        }

        public Schedule getSchedule() {
            return schedule;
        }

        public YogaService getYogaService() {
            return yogaService;
        }

        public Instructor getInstructor() {
            return instructor;
        }
    }

    @Override
    public Schedule createSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    @Override
    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    @Override
    public Optional<Schedule> getScheduleById(Long sId) {
        return scheduleRepository.findById(sId);
    }

    @Override
    public Optional<Schedule> updateSchedule(Long sId, Schedule updatedSchedule) {
        if (scheduleRepository.existsById(sId)) {
            updatedSchedule.setSId(sId);
            return Optional.of(scheduleRepository.save(updatedSchedule));
        }
        return Optional.empty();
    }

    @Override
    public boolean deleteSchedule(Long sId) {
        if (scheduleRepository.existsById(sId)) {
            scheduleRepository.deleteById(sId);
            return true;
        }
        return false;
    }

    @Override
    public List<Schedule> getSchedulesByEmail(String email) {
        return scheduleRepository.findByEmail(email);
    }
}
