export class BaseController {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async post(url, options = {}) {
    return this.request.post(`${this.baseURL}${url}`, options);
  }

  async get(url, options = {}) {
    return this.request.get(`${this.baseURL}${url}`, options);
  }

  async put(url, options = {}) {
    return this.request.put(`${this.baseURL}${url}`, options);
  }

  async delete(url, options = {}) {
    return this.request.delete(`${this.baseURL}${url}`, options);
  }
}