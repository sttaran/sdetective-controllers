import BaseBookingAPIController from "./BaseBookingAPIController.js";


export default class HotelsController extends BaseBookingAPIController {
  _GET_HOTELS_PATH = "bookingAPI/hotels";
  _GET_AVAILABLE_ROOMS_PATH = "bookingAPI/available-rooms";

  async getHotels() {
    return this.get(this._GET_HOTELS_PATH);
  }

  async getAvailableRooms(params) {
    return this.searchParams(params).get(this._GET_AVAILABLE_ROOMS_PATH)
  }
}