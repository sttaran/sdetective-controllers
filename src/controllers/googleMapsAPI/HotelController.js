import BaseGoogleMapsAPIController from "./BaseGoogleMapsAPIController.js";


export default class HotelController extends BaseGoogleMapsAPIController {
  _HOTEL_AVAILABILITIES_PATH = "googlemapsapi/avalabilitiesLookup";

  async getHotelAvailabilities(data) {
    return this.body(data).post(this._HOTEL_AVAILABILITIES_PATH);
  }
}