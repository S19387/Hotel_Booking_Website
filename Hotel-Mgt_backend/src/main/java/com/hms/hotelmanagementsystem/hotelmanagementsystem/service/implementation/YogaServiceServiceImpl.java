package com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.YogaService;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.YogaServiceRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.YogaServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class YogaServiceServiceImpl implements YogaServiceService {

    @Autowired
    private YogaServiceRepository yogaServiceRepository;

    @Override
    public ResponseEntity<?> createYogaService(YogaService yogaService) {
        try {
            return ResponseEntity.ok(yogaServiceRepository.save(yogaService));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getAllYogaServices() {
        try
        {
            return ResponseEntity.ok(yogaServiceRepository.findAll());
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public Optional<YogaService> getYogaServiceById(Long id) {
        return yogaServiceRepository.findById(id);
    }

    @Override
    public Optional<YogaService> updateYogaService(Long id, YogaService updatedYogaService) {
        return yogaServiceRepository.findById(id).map(yogaService -> {
            yogaService.setYName(updatedYogaService.getYName());
            yogaService.setType(updatedYogaService.getType());
            yogaService.setDescription(updatedYogaService.getDescription());
            return yogaServiceRepository.save(yogaService);
        });
    }

    @Override
    public boolean deleteYogaService(Long id) {
        if (yogaServiceRepository.existsById(id)) {
            yogaServiceRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
