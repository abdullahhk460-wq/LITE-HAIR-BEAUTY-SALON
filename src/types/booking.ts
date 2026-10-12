export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface BookingRecord {
  id: string;
  createdAt: string;
  serviceId: string;
  serviceNameEn: string;
  serviceNameAr: string;
  servicePriceSAR: number;
  serviceDurationMins: number;
  dateStr: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
  status: BookingStatus;
}

export const BOOKINGS_STORAGE_KEY = 'lite_salon_bookings';

export function getStoredBookings(): BookingRecord[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }
  return [];
}

export function saveBooking(booking: BookingRecord): void {
  try {
    const current = getStoredBookings();
    const updated = [booking, ...current];
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function updateBookingStatus(id: string, status: BookingStatus): void {
  try {
    const current = getStoredBookings();
    const updated = current.map((b) => (b.id === id ? { ...b, status } : b));
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}
