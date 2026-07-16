import { AppUrls } from "../config/AppUrls";
import type { appFunction } from "./models/appFunction";
import type { appPage } from "./models/appPage";
import type { groupPermission } from "./models/groupPermission";

export const permissionService = {
  getAppFunctions: (appPageId: any) : Promise<appFunction[]> => {
    return fetch(AppUrls.GetAppFunctions.replace('{pageId}', appPageId.toString()))
      .then<appFunction[]>(response => response.json());
  },

  createAppFunction: (appFunction: appFunction) : void => {
    const bodyText = JSON.stringify(appFunction);
    fetch(AppUrls.CreateAppFunction, { method: 'POST', body: bodyText })
      .then();
  },

  updateAppFunction: (appFunction: appFunction) : void => {
    const bodyText = JSON.stringify(appFunction);
    fetch(AppUrls.UpdateAppFunction, { method: 'PUT', body: bodyText })
      .then();
  },

  deleteAppFunction: (functionId: number) : void => {
    const url = AppUrls.DeleteAppFunction.replace('{functionId}', functionId.toString());
    fetch(url, { method: 'DELETE' })
      .then();
  },

  getAppPages: () : Promise<appPage[]> => {
    return fetch(AppUrls.GetAppPages) 
      .then<appPage[]>(response => response.json());
  },

  createAppPage: (appPage: appPage) : void => {
    const bodyText = JSON.stringify(appPage);
    fetch(AppUrls.CreateAppPage, { method: 'POST', body: bodyText })
      .then();
  },

  updateAppPage: (appPage: appPage) : void => {
    const bodyText = JSON.stringify(appPage);
    fetch(AppUrls.UpdateAppPage, { method: 'PUT', body: bodyText })
      .then();
  },

  deleteAppPage: (pageId: number) : void => {
    const url = AppUrls.DeleteAppPage.replace('{pageId}', pageId.toString());
    fetch(url, { method: 'DELETE' })
      .then();
  },

  getGroupFunctionPermissions: (groupId: number) : Promise<groupPermission[]> => {
    const url = AppUrls.GetGroupFunctionPermissions.replace('{groupId}', groupId.toString());
    return fetch(url)
      .then<groupPermission[]>(response => response.json());
  },

  getFunctionGroupPermissions: (functionId: number): Promise<groupPermission[]> => {
    const url = AppUrls.GetFunctionGroupPermissions.replace('{functionId}', functionId.toString());
    return fetch(url)
      .then<groupPermission[]>(response => response.json());
  },

  addGroupFunctionPermission: (functionId: number, userGroupId: number) : void => {
    const bodyText = JSON.stringify({
      functionId: functionId,
      groupId: userGroupId
    });
    fetch(AppUrls.AddGroupFunctionPermission, { method: 'POST', body: bodyText })
      .then();
  },

  deleteGroupFunctionPermission: (functionId: number, userGroupId: number) : void => {
    const url = AppUrls.DeleteGroupFunctionPermission
      .replace('{functionId}', functionId.toString())
      .replace('{groupId}', userGroupId.toString());
    fetch(url, { method: 'DELETE' })
      .then();
  },

  updateGroupFunctionPermission: (functionId: number, addGroupIds: number[], removeGroupIds: number[]) : void => {
    if (removeGroupIds && removeGroupIds.length > 0) {
      removeGroupIds.forEach(
        async (id) => permissionService.deleteGroupFunctionPermission(functionId, id)
      );
    }
    if (addGroupIds && addGroupIds.length > 0) {
      addGroupIds.forEach(
        async (id) => permissionService.addGroupFunctionPermission(functionId, id)
      );
    }
  }
};