package com.hms.hotelmanagementsystem.hotelmanagementsystem.repository;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.YogaService;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.YogaServiceBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface YogaServiceBookingRepository extends JpaRepository<YogaServiceBooking, Long> {

    @Query("SELECT ysb, s FROM YogaServiceBooking ysb JOIN Schedule s ON ysb.sId = s.sId WHERE ysb.email = :email")
    List<Object[]> findBookingsWithScheduleByEmail(String email);

    List<YogaServiceBooking> findBysIdIn(List<Long> sIds);

}
