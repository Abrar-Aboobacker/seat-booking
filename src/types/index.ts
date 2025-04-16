// Define types for our seat booking system

export interface Seat {
  id: string;
  row: number;
  column: number;
  price: number;
  tier: 'Silver' | 'Gold' | 'Platinum';
  isSelected: boolean;
}

export interface BookingSummary {
  selectedSeats: Seat[];
  totalCost: number;
}