import React from 'react';
import { Seat } from '../types';
import '../styles/SeatLayout.css';

interface SeatLayoutProps {
  seats: Seat[];
  onSeatSelect: (seat: Seat) => void;
  maxSeats: number;
  selectedSeats: Seat[];
}

const SeatLayout: React.FC<SeatLayoutProps> = ({ seats, onSeatSelect, maxSeats, selectedSeats }) => {
  // Find the maximum row and column to determine the grid size
  const maxRow = Math.max(...seats.map(seat => seat.row));
  const maxColumn = Math.max(...seats.map(seat => seat.column));
  
  // Handle seat click
  const handleSeatClick = (seat: Seat) => {
    // If seat is already selected, deselect it
    if (seat.isSelected) {
      onSeatSelect(seat);
      return;
    }
    
    // Check if maximum seats are already selected
    if (selectedSeats.length >= maxSeats) {
      alert(`You can only select up to ${maxSeats} seats.`);
      return;
    }
    
    onSeatSelect(seat);
  };

  // Create a 2D array to represent the seating grid
  const renderSeatingGrid = () => {
    const grid = [];
    
    for (let row = 1; row <= maxRow; row++) {
      const rowSeats = [];
      
      for (let col = 1; col <= maxColumn; col++) {
        const seat = seats.find(s => s.row === row && s.column === col);
        
        if (seat) {
          rowSeats.push(
            <div 
              key={seat.id} 
              className={`seat ${seat.tier.toLowerCase()} ${seat.isSelected ? 'selected' : ''}`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat.id}
            </div>
          );
        } else {
          // Empty space where there's no seat
          rowSeats.push(<div key={`empty-${row}-${col}`} className="seat-space"></div>);
        }
      }
      
      grid.push(
        <div key={`row-${row}`} className="seat-row">
          <div className="row-label">{`Row ${row}`}</div>
          <div className="seats-container">{rowSeats}</div>
        </div>
      );
    }
    
    return grid;
  };

  return (
    <div className="seat-layout">
      <h2>Select Your Seats</h2>
      <div className="screen">SCREEN</div>
      <div className="seating-grid">{renderSeatingGrid()}</div>
      
      <div className="seat-legend">
        <div className="legend-item">
          <div className="seat-sample silver"></div>
          <span>Silver - €100</span>
        </div>
        <div className="legend-item">
          <div className="seat-sample gold"></div>
          <span>Gold - €150</span>
        </div>
        <div className="legend-item">
          <div className="seat-sample platinum"></div>
          <span>Platinum - €200</span>
        </div>
        <div className="legend-item">
          <div className="seat-sample selected"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;