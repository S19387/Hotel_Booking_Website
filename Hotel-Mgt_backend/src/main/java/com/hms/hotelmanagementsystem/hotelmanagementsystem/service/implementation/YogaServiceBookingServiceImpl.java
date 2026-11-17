package com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.dto.YogaServiceBookingResponseDTO;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Schedule;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.YogaServiceBooking;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.ScheduleRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.YogaServiceBookingRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.YogaServiceBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class YogaServiceBookingServiceImpl implements YogaServiceBookingService {

    @Autowired
    private YogaServiceBookingRepository yogaServiceBookingRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Override
    public List<YogaServiceBooking> getBookingsByEmail(String email) {
        List<Schedule> schedules = scheduleRepository.findByEmail(email);
        List<Long> sIds = schedules.stream().map(Schedule::getSId).collect(Collectors.toList());
        return yogaServiceBookingRepository.findBysIdIn(sIds);
    }

    @Override
    public List<YogaServiceBookingResponseDTO> getAllYogaServiceBookings() {
        List<YogaServiceBooking> bookings = yogaServiceBookingRepository.findAll();
        List<YogaServiceBookingResponseDTO> response = new ArrayList<>();

        for (YogaServiceBooking booking : bookings) {
            Schedule schedule = scheduleRepository.findById(booking.getSId()).orElse(null);

            if (schedule != null) {
                YogaServiceBookingResponseDTO dto = new YogaServiceBookingResponseDTO(
                        booking.getServBId(),
                        booking.getEmail(),
                        booking.getTodayDate(),
                        schedule.getSId(),
                        schedule.getYId(),
                        schedule.getEmail(),
                        schedule.getStartTime(),
                        schedule.getEndTime(),
                        schedule.getSDate(),
                        schedule.getPrice()
                );
                response.add(dto);
            }
        }
        return response;
    }

    @Override
    public YogaServiceBooking createBooking(YogaServiceBooking yogaServiceBooking) {
        return yogaServiceBookingRepository.save(yogaServiceBooking);
    }

    @Override
    public List<YogaServiceBooking> getAllBookings() {
        return yogaServiceBookingRepository.findAll();
    }

    @Override
    public Optional<YogaServiceBooking> getBookingById(Long servBId) {
        return yogaServiceBookingRepository.findById(servBId);
    }

    @Override
    public YogaServiceBooking updateBooking(Long servBId, YogaServiceBooking yogaServiceBookingDetails) {
        if (yogaServiceBookingRepository.existsById(servBId)) {
            yogaServiceBookingDetails.setServBId(servBId);
            return yogaServiceBookingRepository.save(yogaServiceBookingDetails);
        }
        return null;
    }

    @Override
    public boolean deleteBooking(Long servBId) {
        if (yogaServiceBookingRepository.existsById(servBId)) {
            yogaServiceBookingRepository.deleteById(servBId);
            return true;
        }
        return false;
    }

    @Override
    public List<Object[]> getBookingsWithScheduleByEmail(String email) {
        return yogaServiceBookingRepository.findBookingsWithScheduleByEmail(email);
    }


}
