package com.hms.hotelmanagementsystem.hotelmanagementsystem.service;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.dto.YogaServiceBookingResponseDTO;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.YogaServiceBooking;

import java.util.List;
import java.util.Optional;

public interface YogaServiceBookingService {
    List<YogaServiceBooking> getBookingsByEmail(String email);

    List<YogaServiceBookingResponseDTO> getAllYogaServiceBookings();

    YogaServiceBooking createBooking(YogaServiceBooking yogaServiceBooking);

    List<YogaServiceBooking> getAllBookings();

    Optional<YogaServiceBooking> getBookingById(Long servBId);

    YogaServiceBooking updateBooking(Long servBId, YogaServiceBooking yogaServiceBookingDetails);

    boolean deleteBooking(Long servBId);

    List<Object[]> getBookingsWithScheduleByEmail(String email);
}
