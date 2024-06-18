import {test, expect} from '@playwright/test';
import HotelsController from "../../src/controllers/bookingAPI/HotelsController.js";
import BookingController from "../../src/controllers/bookingAPI/BookingController.js";

test.describe('Booking applications API', () => {
  test.describe('Create booking', () => {
    let bookingId;
    let hotelsController;
    let bookingsController;

    test.beforeEach(async ({request}) => {
      let hotelId;

      hotelsController = new HotelsController(request);
      bookingsController = new BookingController(request);
      const requestData = {
        roomId: null,
        checkInDate: '2024-06-20',
        checkInTime: '10:00',
        checkOutDate: '2024-06-21',
        checkOutTime: '18:00',
        guests: 2,
        customer: {
          name: 'John Doe',
          email: 'john@doe@test.com',
          phone: '1234567890'
        }
      };

      await test.step('Get hotels list', async () => {
        const response = await hotelsController.getHotels();
        expect(response.status()).toBe(200);
        const hotels = await response.json();
        hotelId = hotels[0].id;
      })

      await test.step('Get available rooms list for the specified date range', async () => {
        const response =  await hotelsController.getAvailableRooms({
          checkInDate: requestData.checkInDate,
          checkOutDate: requestData.checkOutDate,
          guests: requestData.guests,
          hotelId
        })

        expect(response.status()).toBe(200);
        const availableRooms = await response.json();
        // assigning the first available room to the request data for booking
        const firstAvailableRoom = availableRooms.find(room => room.available);
        requestData.roomId = firstAvailableRoom.id;
      })

      await test.step('Book a room', async () => {
        const response = await bookingsController.createBooking(requestData);
        expect(response.status()).toBe(200);
        bookingId = (await response.json()).bookingId;
      })
    })

    test('should cancel the booking', async () => {
      const response = await bookingsController.cancelBooking(bookingId);
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({
        state: 'CANCELLED',
        message: 'Booking cancelled successfully'
      });
    })
  });
});