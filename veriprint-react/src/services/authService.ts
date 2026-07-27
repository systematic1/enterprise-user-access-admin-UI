import { AppStorage } from '../config/AppStorage.ts';
import { AppUrls } from '../config/AppUrls.ts';
import type { appFunctionPermission } from './models/appFunctionPermission.ts';

export const authService = {
  validateIfUserIsAuthenticated: () : void => { },

  isUserAuthenticated: () : boolean => true,

  logoutUser: () : void => { },

  getCurrentUserGroups: () : Promise<any[]> => {
    return fetch(AppUrls.GetCurrentUserGroups)
      .then<any[]>(response => response.json());
  },

  getUserPermittedAppFunctions: (refresh = false) : Promise<appFunctionPermission[]> => {
    const cached = authService.getCachedUserAppFunctions();
    if (cached.length)
      return new Promise<appFunctionPermission[]>((res, _) => res(cached));
    else {
      return authService.getUserPermittedAppFunctionsFor('.')
        .then<appFunctionPermission[]>(json => {
          authService.updateFunctionCacheData(json);
          return json;
        }
      );
    }
  },

  getUserPermittedAppFunctionsFor: (userId: string) : Promise<appFunctionPermission[]> => {
    return fetch(AppUrls.GetUserPermittedAppFunctionsFor.replace('{userId}', userId))
      .then<appFunctionPermission[]>(response => response.json());
  },

  validateUserPermission: (pageName: string, functionName: string) : void => {
    if (authService.hasPermission(pageName, functionName))
      authService.unauthorized();
  },

  hasPermission: (pageName: string, functionName: string) : boolean => {
    return (
      authService.getCachedUserAppFunctions()
        .find(f => f.functionName === functionName && f.pageName === pageName) !== undefined
    );
  },

  unauthorized: () : void => {
    //this._router.navigateByUrl(AuthService.DefaultUri);
  },

  getCachedUserAppFunctions: () : appFunctionPermission[] => {
    const cacheData = sessionStorage.getItem(AppStorage.UserPageFunctionsKey);
    return cacheData ? JSON.parse(cacheData) as appFunctionPermission[] : [];
  },

  updateFunctionCacheData: (funcs: appFunctionPermission[]) : void => {
    sessionStorage.setItem(AppStorage.UserPageFunctionsKey, JSON.stringify(funcs));
  }
}