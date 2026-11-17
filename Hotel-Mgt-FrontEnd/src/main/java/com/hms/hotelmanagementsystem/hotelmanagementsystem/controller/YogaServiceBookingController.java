package com.hms.hotelmanagementsystem.hotelmanagementsystem.controller;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.dto.YogaServiceBookingResponseDTO;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.YogaServiceBooking;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.YogaServiceBookingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/yogaservicebookings")
public class YogaServiceBookingController {

    @Autowired
    private YogaServiceBookingServiceImpl yogaServiceBookingService;


    @GetMapping("/all")
    public List<YogaServiceBookingResponseDTO> getAllYogaServiceBookings() {
        return yogaServiceBookingService.getAllYogaServiceBookings();
    }

    @GetMapping("/bokkingsgetbyemail/")
    public ResponseEntity<List<Object[]>> getBookingsWithSchedule(@RequestParam String email) {
        List<Object[]> result = yogaServiceBookingService.getBookingsWithScheduleByEmail(email);
        if (result.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/add")
    public ResponseEntity<YogaServiceBooking> createBooking(@RequestBody YogaServiceBooking yogaServiceBooking) {
        YogaServiceBooking createdBooking = yogaServiceBookingService.createBooking(yogaServiceBooking);
        return ResponseEntity.ok(createdBooking);
    }

    @GetMapping("/getall")
    public ResponseEntity<List<YogaServiceBooking>> getAllBookings() {
        List<YogaServiceBooking> bookings = yogaServiceBookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/getbyid")
    public ResponseEntity<YogaServiceBooking> getBookingById(@RequestParam Long servBId) {
        Optional<YogaServiceBooking> booking = yogaServiceBookingService.getBookingById(servBId);
        return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/update")
    public ResponseEntity<YogaServiceBooking> updateBooking(
            @RequestParam Long servBId, @RequestBody YogaServiceBooking yogaServiceBookingDetails) {
        YogaServiceBooking updatedBooking = yogaServiceBookingService.updateBooking(servBId, yogaServiceBookingDetails);
        return updatedBooking != null ? ResponseEntity.ok(updatedBooking) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("delete")
    public ResponseEntity<Void> deleteBooking(@RequestParam Long servBId) {
        boolean deleted = yogaServiceBookingService.deleteBooking(servBId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/by-email")
    public List<YogaServiceBooking> getBookingsByEmail(@RequestParam String email) {
        return yogaServiceBookingService.getBookingsByEmail(email);
    }
}
