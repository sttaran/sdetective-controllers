import BaseGoogleMapsAPIController from "./BaseGoogleMapsAPIController.js";


export default class BookingsController extends BaseGoogleMapsAPIController {
  _BOOKINGS_PATH = "googlemapsapi/bookings";

  async createBooking(data) {
    return this.body(data).post(this._BOOKINGS_PATH);
  }
}