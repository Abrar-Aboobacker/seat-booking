import React, { useState, useEffect } from 'react';
import { Seat, BookingSummary as BookingSummaryType } from '../types';
import SeatLayout from './SeatLayout';
import BookingSummary from './BookingSummary';
import '../styles/SeatBookingSystem.css';

const SeatBookingSystem: React.FC = () => {
  // State for all seats
  const [seats, setSeats] = useState<Seat[]>([]);
  
  // State for selected seats
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  
  // State for booking summary
  const [bookingSummary, setBookingSummary] = useState<BookingSummaryType>({
    selectedSeats: [],
    totalCost: 0
  });

  // Maximum number of seats that can be selected
  const MAX_SEATS = 8;

  // Initialize seats
  useEffect(() => {
    const initialSeats: Seat[] = [];
    const rows = 6;
    const columns = 10;
    
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= columns; col++) {
        // Determine seat tier based on row
        let tier: 'Silver' | 'Gold' | 'Platinum';
        let price: number;
        
        if (row <= 2) {
          tier = 'Silver';
          price = 100;
        } else if (row <= 4) {
          tier = 'Gold';
          price = 150;
        } else {
          tier = 'Platinum';
          price = 200;
        }
        
        // Create seat ID (e.g., A1, A2, B1, etc.)
        const rowLetter = String.fromCharCode(64 + row); // A=65, B=66, etc.
        const id = `${rowLetter}${col}`;
        
        initialSeats.push({
          id,
          row,
          column: col,
          price,
          tier,
          isSelected: false
        });
      }
    }
    
    setSeats(initialSeats);
  }, []);

  // Handle seat selection
  const handleSeatSelect = (selectedSeat: Seat) => {
    // Create a new array of seats with the selected seat toggled
    const updatedSeats = seats.map(seat => {
      if (seat.id === selectedSeat.id) {
        return { ...seat, isSelected: !seat.isSelected };
      }
      return seat;
    });
    
    setSeats(updatedSeats);
    
    // Update selected seats
    const newSelectedSeats = updatedSeats.filter(seat => seat.isSelected);
    setSelectedSeats(newSelectedSeats);
    
    // Update booking summary
    const totalCost = newSelectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    setBookingSummary({
      selectedSeats: newSelectedSeats,
      totalCost
    });
  };

  // Handle booking
  const handleBookNow = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }
    
    // Display confirmation message
    alert(`Booking confirmed! You have booked ${selectedSeats.length} seat(s) for a total of €${bookingSummary.totalCost}.`);
    
    // Reset selections
    const resetSeats = seats.map(seat => ({
      ...seat,
      isSelected: false
    }));
    
    setSeats(resetSeats);
    setSelectedSeats([]);
    setBookingSummary({
      selectedSeats: [],
      totalCost: 0
    });
  };

  return (
    <div className="seat-booking-system">
      <h1>Interactive Seat Booking System</h1>
      
      <div className="booking-container">
        <SeatLayout 
          seats={seats} 
          onSeatSelect={handleSeatSelect} 
          maxSeats={MAX_SEATS}
          selectedSeats={selectedSeats}
        />
        
        <BookingSummary 
          selectedSeats={selectedSeats}
          totalCost={bookingSummary.totalCost}
          onBookNow={handleBookNow}
        />
      </div>
    </div>
  );
};

export default SeatBookingSystem;