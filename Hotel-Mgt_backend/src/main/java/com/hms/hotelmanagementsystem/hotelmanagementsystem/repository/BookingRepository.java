package com.hms.hotelmanagementsystem.hotelmanagementsystem.repository;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Booking;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    @Query("SELECT b FROM Booking b WHERE b.bookedDate IN :bookedDates")
    List<Booking> findByBookedDates(@Param("bookedDates") List<LocalDate> bookedDates);

    @Query("SELECT b.rId FROM Booking b WHERE " +
            "(b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate)")
    List<Long> findRIdsByDateRange(@Param("checkInDate") LocalDate checkInDate,
                                   @Param("checkOutDate") LocalDate checkOutDate);
}
