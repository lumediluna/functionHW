export class BaseController {
  protected request: any;
  protected baseURL: string;

  constructor(request: any, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  async post<T = any>(url: string, options: Record<string, any> = {}): Promise<T> {
    return this.request.post(`${this.baseURL}${url}`, options);
  }

  async get<T = any>(url: string, options: Record<string, any> = {}): Promise<T> {
    return this.request.get(`${this.baseURL}${url}`, options);
  }

  async put<T = any>(url: string, options: Record<string, any> = {}): Promise<T> {
    return this.request.put(`${this.baseURL}${url}`, options);
  }

  async delete<T = any>(url: string, options: Record<string, any> = {}): Promise<T> {
    return this.request.delete(`${this.baseURL}${url}`, options);
  }
}