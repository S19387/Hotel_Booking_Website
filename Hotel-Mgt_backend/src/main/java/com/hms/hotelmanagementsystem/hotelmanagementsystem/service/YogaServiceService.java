package com.hms.hotelmanagementsystem.hotelmanagementsystem.service;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.YogaService;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface YogaServiceService {
    ResponseEntity<?> createYogaService(YogaService yogaService);

    ResponseEntity<?> getAllYogaServices();

    Optional<YogaService> getYogaServiceById(Long id);

    Optional<YogaService> updateYogaService(Long id, YogaService updatedYogaService);

    boolean deleteYogaService(Long id);
}
