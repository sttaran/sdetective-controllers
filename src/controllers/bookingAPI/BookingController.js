import BaseBookingAPIController from "./BaseBookingAPIController.js";


export default class BookingController extends BaseBookingAPIController {
  _CREATE_BOOKING_PATH = "bookingAPI/book";
  _CANCEL_BOOKING_PATH = "bookingAPI/cancel/";

  async createBooking(data) {
    return this.body(data).post(this._CREATE_BOOKING_PATH);
  }

  async cancelBooking(bookingId) {
    return this.post(`${this._CANCEL_BOOKING_PATH}${bookingId}`);
  }
}