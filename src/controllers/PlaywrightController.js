


export default class PlaywrightController {
  constructor(request,  options = {baseUrl:process.env.BASE_URL}) {
    this.options = options;
    this.request = request;
  }

  async get(path){
    return await this.req("GET", path);
  }

  async post(path) {
    return this.req("POST", path);
  }

  async put(path) {
    return this.req("PUT", path);
  }

  async patch(path) {
    return this.req("PATCH", path);
  }

  async delete(path) {
    return this.req("DELETE", path);
  }

  searchParams(queryParams) {
    this.options = {
      ...this.options,
      queryParams
    };
    return this;
  }

  body(data) {
    this.options = {
      ...this.options,
      body: data
    };
    return this;
  }

  headers(data) {
    this.options = {
      ...this.options,
      headers: {
        ...this.options.headers,
        ...data
      }
    };
    return this;
  }

  async req(method, path = '') {
    const cfg = {
      method,
      baseURL: this.options.baseUrl,
      params: this.options.queryParams,
      headers: {...this.options.headers},
      data: {}
    };

    const response = await this.request.fetch(path, {
      method: cfg.method,
      headers: cfg.headers,
      data: method === "GET"  ?  undefined  :  this.options.body,
      params: this.options.queryParams
    });

    this.options.body = undefined;
    this.options.queryParams = undefined;

    return response;
  }
}
