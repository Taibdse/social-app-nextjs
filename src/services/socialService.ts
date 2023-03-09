import httpClient from "@/config/httpClient";

const baseUrl = "/social/";

class SocialService {
  static async create(data: Object) {
    const url = `${baseUrl}`;
    // return axios.post('https://api.supermomos-dev.com/interview/social', data);
    return httpClient.post(url, data);
  }
}

export default SocialService;
