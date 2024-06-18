import {test, expect} from '@playwright/test';
import BookingAPIClient from "../../src/clients/BookingAPIClient.js";

test.describe('Booking applications API', () => {
  test.describe('Create booking', () => {

    let bookingApiClient;

    test.beforeAll(async ({request}) => {
      bookingApiClient = new BookingAPIClient(request);
    })

    test('should book a room for 1 guest for 1 day (minimum allowed days)', async () => {
      let hotelId;
      const requestData = {
        roomId: null,
        checkInDate: '2024-06-20',
        checkInTime: '10:00',
        checkOutDate: '2024-06-21', 
        checkOutTime: '18:00',
        guests: 1,
        customer: {
          name: 'John Doe',
          email: 'john@doe@test.com',
          phone: '1234567890'
        }
      };

      await test.step('Get hotels list', async () => {
        const response = await bookingApiClient.hotels.getHotels();
        expect(response.status()).toBe(200);
        const hotels = await response.json();
        hotelId = hotels[0].id;
      });

      await test.step('Get available rooms list for the specified date range', async () => {
        const response =  await bookingApiClient.hotels.getAvailableRooms({
          checkInDate: requestData.checkInDate,
          checkOutDate: requestData.checkOutDate,
          guests: requestData.guests,
          hotelId
        });

        expect(response.status()).toBe(200);
        const availableRooms = await response.json();
        // assigning the first available room to the request data for booking
        const firstAvailableRoom = availableRooms.find(room => room.available);
        requestData.roomId = firstAvailableRoom.id;
      })

      await test.step('Book a room', async () => {
        const response = await bookingApiClient.bookings.createBooking(requestData);
        expect(response.status()).toBe(200);
        expect(await response.json()).toEqual({
          bookingId: expect.any(String),
          state: 'BOOKED'
        })
      })
    }); 

    test('should book a room for 2 guests 7 days (maximum allowed days)', async () => {
      let hotelId;
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
        const response = await bookingApiClient.hotels.getHotels();
        expect(response.status()).toBe(200);
        const hotels = await response.json();
        hotelId = hotels[0].id;
      });


      await test.step('Get available rooms list for the specified date range', async () => {
        const response =  await bookingApiClient.hotels.getAvailableRooms({
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
        const response = await bookingApiClient.bookings.createBooking(requestData);
        expect(response.status()).toBe(200);
        expect(await response.json()).toEqual({
          bookingId: expect.any(String),
          state: 'BOOKED'
        })
      })
    })
  });
});