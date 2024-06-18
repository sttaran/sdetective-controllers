import BaseHotelAPIController from "../hotelAPI/BaseHotelAPIController.js";


export default class HotelController extends BaseHotelAPIController {
  _HOTEL_AVAILABILITIES_PATH = "googlemapsapi/avalabilitiesLookup";

  async getHotelAvailabilities(data) {
    return this.body(data).post(this._HOTEL_AVAILABILITIES_PATH);
  }
}