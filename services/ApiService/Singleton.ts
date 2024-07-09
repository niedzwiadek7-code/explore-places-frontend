import ApiService from "@/services/ApiService/ApiService";

export class ApiBackendSingleton {
  private static instance: ApiService;

  public static getInstance(): ApiService {
    if (!ApiBackendSingleton.instance) {
      ApiBackendSingleton.instance = new ApiService(process.env.EXPO_PUBLIC_BACKEND_BASE_URL || '');
    }

    return ApiBackendSingleton.instance;
  }
}
