package com.hms.hotelmanagementsystem.hotelmanagementsystem.controller;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.YogaService;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.YogaServiceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/yogaservices")
public class YogaServiceController {

    @Autowired
    private YogaServiceServiceImpl yogaServiceService;

    @PostMapping("/add")
    public ResponseEntity<?> createYogaService(@RequestBody YogaService yogaService) {
        return ResponseEntity.ok(yogaServiceService.createYogaService(yogaService));
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAllYogaServices() {
        return ResponseEntity.ok( yogaServiceService.getAllYogaServices());
    }

    @GetMapping("/getbyid")
    public ResponseEntity<?> getYogaServiceById(@RequestParam Long id) {
        return yogaServiceService.getYogaServiceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/update")
    public ResponseEntity<YogaService> updateYogaService(@RequestParam Long id, @RequestBody YogaService yogaService) {
        return yogaServiceService.updateYogaService(id, yogaService)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteYogaService(@RequestParam Long id) {
        if (yogaServiceService.deleteYogaService(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
