import PlaywrightController from "../PlaywrightController.js";


export default class BaseGoogleMapsAPIController extends PlaywrightController {
  constructor(request) {
    super(request, {
      baseUrl: process.env.baseURL,
      headers: {
        "X-Authorization": process.env.GOOGLE_MAPS_API_KEY,
      }
    });
  }
}