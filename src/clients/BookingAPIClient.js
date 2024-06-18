import HotelsController from "../controllers/bookingAPI/HotelsController.js";
import BookingController from "../controllers/bookingAPI/BookingController.js";


export default class BookingAPIClient {
  constructor(request) {
    this.hotels = new HotelsController(request);
    this.bookings = new BookingController(request);
  }
}