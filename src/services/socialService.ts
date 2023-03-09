import httpClient from "@/config/httpClient";

const baseUrl = "/social/";

class SocialService {
  static async create(data: Object) {
    const url = `${baseUrl}`;
    return httpClient.post(url, data);
  }

  static async getById(id: string) {
    const url = `${baseUrl}/${id}`;
    return httpClient.get(url);
  }
}

export default SocialService;
