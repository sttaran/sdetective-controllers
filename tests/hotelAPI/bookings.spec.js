import {test, expect} from '@playwright/test';
import BookingAPIClient from "../../src/clients/BookingAPIClient.js";
import GoogleMapsAPIClient from "../../src/clients/GoogleMapsAPIClient.js";
import HotelAPIClient from "../../src/clients/HotelAPIClient.js";


test.describe('Hotel/Employee API', () => {
  test.describe('Bookings', () => {
    let bookingAPIClient;
    let hotelAPIClient;
    let googleMapsAPIClient;
    let hotelId;

    let bookingAPIBookingId;
    let googleMapsAPIBookingId;

    test.beforeEach(async ({request}) => {

      bookingAPIClient = new BookingAPIClient(request);
      googleMapsAPIClient = GoogleMapsAPIClient(request);

      const bookingAPIRequestData = {
        roomId: null,
        checkInDate: '2024-06-20',
        checkInTime: '10:00',
        checkOutDate: '2024-06-21',
        checkOutTime: '18:00',
        guests: 2,
        customer: {
          name: 'John Doe',
          email: 'john@test.com',
          phone: '1234567890'
        }
      }

      await test.step('Get hotels list', async () => {
        const response = await bookingAPIClient.hotels.getHotels();
        expect(response.status()).toBe(200);
        const hotels = await response.json();
        hotelId = hotels[0].id;
      })

      await test.step('Get available rooms list for the specified date range', async () => {
        const response =  await bookingAPIClient.hotels.getAvailableRooms({
          checkInDate: bookingAPIRequestData.checkInDate,
          checkOutDate: bookingAPIRequestData.checkOutDate,
          guests: bookingAPIRequestData.guests,
          hotelId
        })

        expect(response.status()).toBe(200);
        const availableRooms = await response.json();
        // assigning the first available room to the request data for booking
        const firstAvailableRoom = availableRooms.find(room => room.available);
        bookingAPIRequestData.roomId = firstAvailableRoom.id;
      })

      await test.step('Book a room via booking API', async () => {
        const response = await bookingAPIClient.bookings.createBooking(bookingAPIRequestData);
        expect(response.status()).toBe(200);
        bookingAPIBookingId = (await response.json()).bookingId;
      })

      await test.step('Make a booking via google maps API', async () => {
        const availabilities = await googleMapsAPIClient.hotel.getAvailableRooms({
          startTime: Date.now(),
          endTime: Date.now() + 1000 * 60 * 60 * 24 * 7,
          places: 2
        })

        const firstAvailableRoom = availabilities.find(room => room.available);

        const bookingData = {
          roomId: firstAvailableRoom.id,
          startTime: Date.now(),
          endTime: Date.now() + 1000 * 60 * 60 * 24 * 7,
          customer: {
            name: 'John Doe',
            email: 'faker-john@gmail.com'
          },
          place: 2
        }

        const response = await googleMapsAPIClient.bookings.createBooking(bookingData);
        expect(response.status()).toBe(200);
        googleMapsAPIBookingId = (await response.json()).id;
      })

      await test.step('Login as an employee', async () => {
        hotelAPIClient = await HotelAPIClient.authorize(request,
          {
            email: 'employee@hotel.com',
            password: 'password'
          });
      })
    })

    test('should cancel the booking via booking API', async () => {

      await test.step('Cancel the booking made via booking API', async () => {
        const response = await hotelAPIClient.bookings.cancelBooking(bookingAPIBookingId);
        expect(response.status()).toBe(200);
        expect(await response.json()).toEqual({
          state: 'CANCELLED'
        })
      })

      await test.step('Check cancelled booking status', async () => {
        const response = await hotelAPIClient.bookings.getBooking(bookingAPIBookingId);
        expect(response.status()).toBe(200);
        expect(await response.json()).toMatchObject({
          state: 'CANCELLED'
        })
      })

      await test.step('Cancel the booking made via google maps API', async () => {
        const response = await hotelAPIClient.bookings.cancelBooking(googleMapsAPIBookingId);
        expect(response.status()).toBe(200);
        expect(await response.json()).toEqual({
          state: 'CANCELLED'
        })
      })

      await test.step('Check cancelled booking status', async () => {
        const response = await hotelAPIClient.bookings.getBooking(googleMapsAPIBookingId);
        expect(response.status()).toBe(200);
        expect(await response.json()).toMatchObject({
          state: 'CANCELLED'
        })
      })
    })
  })
})