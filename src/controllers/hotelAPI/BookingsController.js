import BaseHotelAPIController from "./BaseHotelAPIController.js";


export default class BookingsController extends BaseHotelAPIController {
  _CREATE_BOOKING_PATH = "hotelapi/bookings";
  _GET_BOOKINGS_PATH = "hotelapi/bookings";
  _UPDATE_BOOKING_PATH = "hotelapi/bookings";
  _CANCEL_BOOKING_PATH = "hotelapi/bookings/";

  getBookings(params) {
    return this.searchParams(params).get(this._GET_BOOKINGS_PATH);
  }

  async getBooking(bookingId) {
    return this.get(`${this._GET_BOOKINGS_PATH}/${bookingId}`);
  }

  async createBooking(data) {
    return this.body(data).post(this._CREATE_BOOKING_PATH);
  }

  async updateBooking(bookingId, data) {
    return this.body(data).put(`${this._UPDATE_BOOKING_PATH}${bookingId}`);
  }

  async cancelBooking(bookingId) {
    return this.delete(`${this._CANCEL_BOOKING_PATH}${bookingId}`);
  }
}