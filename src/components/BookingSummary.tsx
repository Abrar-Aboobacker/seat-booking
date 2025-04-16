import React from 'react';
import { Seat } from '../types';
import '../styles/BookingSummary.css';

interface BookingSummaryProps {
  selectedSeats: Seat[];
  totalCost: number;
  onBookNow: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ selectedSeats, totalCost, onBookNow }) => {
  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>
      
      {selectedSeats.length > 0 ? (
        <>
          <div className="selected-seats">
            <h3>Selected Seats:</h3>
            <ul>
              {selectedSeats.map((seat) => (
                <li key={seat.id}>
                  Seat {seat.id} - {seat.tier} (€{seat.price})
                </li>
              ))}
            </ul>
          </div>
          
          <div className="total-cost">
            <h3>Total Cost:</h3>
            <p className="price">€{totalCost}</p>
          </div>
          
          <button className="book-now-btn" onClick={onBookNow}>
            Book Now
          </button>
        </>
      ) : (
        <p className="no-seats">No seats selected yet.</p>
      )}
    </div>
  );
};

export default BookingSummary;