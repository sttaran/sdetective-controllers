import AuthController from "../controllers/hotelAPI/AuthController.js";
import HotelsController from "../controllers/hotelAPI/HotelsController.js";
import BookingsController from "../controllers/hotelAPI/BookingsController.js";


export default class HotelAPIClient {
  constructor(request, options) {
    this.auth = new AuthController(request, options);
    this.hotels = new HotelsController(request, options);
    this.bookings = new BookingsController(request, options);
  }

  static async authorize(request, loginData) {
    const authController = new AuthController(request);
    const response = await authController.login(loginData);
    const token = (await response.json()).token;

    return new HotelAPIClient(request, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}