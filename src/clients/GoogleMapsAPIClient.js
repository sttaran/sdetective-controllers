import HotelController from "../controllers/googleMapsAPI/HotelController.js";
import BookingsController from "../controllers/googleMapsAPI/BookingsController.js";


export default class GoogleMapsAPIClient {
  constructor(request) {
    this.hotel = new HotelController(request);
    this.bookings = new BookingsController(request);
  }
}