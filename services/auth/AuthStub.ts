import {Auth} from "@/services/auth/Auth";
import ApiService from "@/services/ApiService/ApiService";

export class AuthStub implements Auth {
  readonly apiService: ApiService = new ApiService('')

  async createProfile() {
    return true
  }

  async sendEmail() {
    return true
  }

  async verifyEmail() {
    return {
      access: 'accessToken'
    }
  }
}
