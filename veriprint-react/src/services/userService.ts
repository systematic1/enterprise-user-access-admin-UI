import { AppUrls } from "../config/AppUrls"
import type { user } from "./models/user";

export const userService = {
  getCurrentUser: (): Promise<user> => {
    return fetch(AppUrls.GetCurrentUser)
      .then(response => response.json());
  }
};
