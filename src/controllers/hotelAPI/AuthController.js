import BaseHotelAPIController from "./BaseHotelAPIController.js";


export default class AuthController extends BaseHotelAPIController {
  _LOGIN_PATH = "hotelapi/login";
  _LOGOUT_PATH = "hotelapi/logout";

  async login(data) {
    return this.body(data).post(this._LOGIN_PATH);
  }

  async logout() {
    return this.post(this._LOGOUT_PATH);
  }
}