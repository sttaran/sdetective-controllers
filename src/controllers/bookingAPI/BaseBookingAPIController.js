import PlaywrightController from "../PlaywrightController.js";


export default class BaseBookingAPIController extends PlaywrightController {
  constructor(request) {
    super(request, {
      baseUrl: process.env.BASE_URL,
      headers: {
        "X-Api-Key": process.env.BOOKING_API_KEY,
      }
    });
  }
}