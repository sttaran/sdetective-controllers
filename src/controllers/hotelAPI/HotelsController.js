import BaseHotelAPIController from "./BaseHotelAPIController.js";


export default class HotelsController extends BaseHotelAPIController {
  _GET_HOTELS_PATH = "hotelapi/hotels";
  _GET_AVAILABLE_ROOMS_PATH = "hotelapi/rooms/availability";

  // Returns a list of hotels an employee has access to
  async getHotels() {
    return this.get(this._GET_HOTELS_PATH);
  }

  async getAvailableRooms(params) {
    return this.searchParams(params).get(this._GET_AVAILABLE_ROOMS_PATH)
  }
}