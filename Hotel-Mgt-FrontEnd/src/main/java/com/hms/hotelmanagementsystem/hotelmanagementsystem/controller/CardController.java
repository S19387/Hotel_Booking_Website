package com.hms.hotelmanagementsystem.hotelmanagementsystem.controller;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.YogaServiceBooking;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.YogaServiceBookingService;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/v1/card")
public class CardController {

    @Autowired
    private CardService cardService;

    @Autowired
    private YogaServiceBookingService yogaServiceBookingService;

    @PostMapping("/pay")
    public String processPayment(@RequestParam String cardNumber,
                                 @RequestParam String cvc,
                                 @RequestParam Double amount,
                                 @RequestParam String cardType,
                                 @RequestParam String name,
                                 @RequestParam Long expMonth,
                                 @RequestParam Long expYear) {
        return cardService.processPayment(cardNumber, cvc, amount, cardType, name, expMonth, expYear);
    }

    @PostMapping("/payservyoga")
    public ResponseEntity<YogaServiceBooking> processAndStorePayment(
            @RequestParam String cardNumber,
            @RequestParam String cvc,
            @RequestParam Double amount,
            @RequestParam String cardType,
            @RequestParam String name,
            @RequestParam Long expMonth,
            @RequestParam Long expYear,
            @RequestParam String email,
            @RequestParam Long sId) {

        String paymentResponse = cardService.processPayment(cardNumber, cvc, amount, cardType, name, expMonth, expYear, email);

        System.out.println(paymentResponse);
        if (paymentResponse.equals("Payment processed successfully")) {
            YogaServiceBooking booking = new YogaServiceBooking();
            booking.setSId(sId);
            booking.setEmail(email);
            booking.setTodayDate(LocalDate.now());

            YogaServiceBooking createdBooking = yogaServiceBookingService.createBooking(booking);
            return ResponseEntity.ok(createdBooking);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}
