package com.hms.hotelmanagementsystem.hotelmanagementsystem.service.implementation;

import com.hms.hotelmanagementsystem.hotelmanagementsystem.model.Room;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.BookingPendingRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.BookingRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.repository.RoomRepository;
import com.hms.hotelmanagementsystem.hotelmanagementsystem.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {


    private final RoomRepository roomRepository;

    private final BookingPendingRepository bookingPendingRepository;

    private final BookingRepository bookingRepository;

    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository, BookingPendingRepository bookingPendingRepository, BookingRepository bookingRepository) {
        this.roomRepository = roomRepository;
        this.bookingPendingRepository = bookingPendingRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public ResponseEntity<?> saveRoom(Room room) {

        try {
            return ResponseEntity.ok(roomRepository.save(room));
        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getAllRooms() {

        try {
            return ResponseEntity.ok(roomRepository.findAll());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> getRoomById(Long rId) {

        try {
            return ResponseEntity.ok(roomRepository.findById(rId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> updateRoom(Long rId, Room roomDetails) {
        try {
            Room updatedRoom = roomRepository.findById(rId).map(room -> {
                room.setRName(roomDetails.getRName());
                room.setRType(roomDetails.getRType());
                room.setRFee(roomDetails.getRFee());
                room.setRMaxCount(roomDetails.getRMaxCount());
                room.setRDescription(roomDetails.getRDescription());
                room.setRImg1(roomDetails.getRImg1());
                room.setRImg2(roomDetails.getRImg2());
                room.setRImg3(roomDetails.getRImg3());
                return roomRepository.save(room);
            }).orElseThrow(() -> new RuntimeException("Room not found with id " + rId));

            return ResponseEntity.ok(updatedRoom);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> deleteRoom(Long rId) {
        try {
            if (!roomRepository.existsById(rId)) {
                return ResponseEntity.ok("Room not found with id " + rId);
            }
            roomRepository.deleteById(rId);
            return ResponseEntity.ok("Successfully deleted room with id " + rId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public List<Room> checkRoomAvailability(int guestCount, LocalDate checkInDate, LocalDate checkOutDate) {

        List<Long> bookingRoomIds = bookingRepository.findRIdsByDateRange(checkInDate, checkOutDate);

        List<Room> allRooms = roomRepository.findAll();

        return allRooms.stream()
                .filter(room -> !bookingRoomIds.contains(room.getRId()))
                .filter(room -> room.getRMaxCount() >= guestCount)
                .toList();
    }

}
