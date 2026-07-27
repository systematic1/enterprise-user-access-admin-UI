import type { navigationSection } from "../layouts/models/navigationSection";
import type { navigationItem } from "../layouts/models/navigationItem";
import { AppUrls } from "../config/AppUrls";

export const navigationService = {
  getNavigationItems: (): Promise<navigationSection[]> => {
    return fetch(AppUrls.GetNavigationItems)
      .then(response => response.json());
  },

  getAllMenuItems: () : Promise<navigationItem[]> => {
    return fetch(AppUrls.GetAllMenuItems)
      .then(response => response.json());
  },

  createMenuItem: (menuItem: navigationItem) : void => {
    const bodyText = JSON.stringify(menuItem);
    fetch(AppUrls.CreateAppPage, { method: 'POST', body: bodyText })
      .then();
  },

  updateMenuItem: (menuItem: navigationItem) : void => {
    const bodyText = JSON.stringify(menuItem);
    fetch(AppUrls.UpdateMenuItem, { method: 'PUT', body: bodyText })
      .then();
  },

  deleteMenuItem: (menuItemId: number) : void => {
    const url = AppUrls.DeleteMenuItem.replace('{menuItemId}', menuItemId.toString());
    fetch(url, { method: 'DELETE' });
  }
}