import environment from "./environment";

export const AppUrls = {
  GetCurrentUser: `${environment.appUrlPrefix}/User/Current`,
  GetNavigationItems: `${environment.appUrlPrefix}/Navigation`,
  GetAppFunctions: `${environment.appUrlPrefix}Permissions/Functions/{pageId}`,
  GetAppPages: `${environment.appUrlPrefix}Permissions/Pages`,
  GetAllMenuItems: `${environment.appUrlPrefix}Permissions/MenuItems`,
  CreateAppFunction: `${environment.appUrlPrefix}Permissions/Functions`,
  UpdateAppFunction: `${environment.appUrlPrefix}Permissions/Function`,
  DeleteAppFunction: `${environment.appUrlPrefix}Permissions/Function/{functionId}`,
  CreateAppPage: `${environment.appUrlPrefix}Permissions/Pages`,
  UpdateAppPage: `${environment.appUrlPrefix}Permissions/Page`,
  DeleteAppPage: `${environment.appUrlPrefix}Permissions/Page/{pageId}`,
  GetGroupFunctionPermissions: `${environment.appUrlPrefix}Permissions/GroupFunctions/Group/{groupId}`,
  GetFunctionGroupPermissions: `${environment.appUrlPrefix}Permissions/GroupFunctions/Function/{functionId}`,
  AddGroupFunctionPermission: `${environment.appUrlPrefix}Permissions/GroupFunctions`,
  DeleteGroupFunctionPermission: `${environment.appUrlPrefix}Permissions/GroupFunctions/{functionId}/{groupId}`,
  UpdateGroupFunctionPermission: `${environment.appUrlPrefix}Permissions/GroupFunction`,
  AddMenuItem: `${environment.appUrlPrefix}Permissions/MenuItem`,
  UpdateMenuItem: `${environment.appUrlPrefix}Permissions/MenuItem`,
  UpdateMenuItemSort: `${environment.appUrlPrefix}Permissions/MenuItem/{menuItemId}/Sort/{sequence}`,
  DeleteMenuItem: `${environment.appUrlPrefix}Permissions/MenuItem/{menuItemId}`,
  GetCurrentUserGroups: `${environment.appUrlPrefix}Security/User/Groups`,
  GetUserPermittedAppFunctions: `${environment.appUrlPrefix}Security/User/Functions`,
  GetUserPermittedAppFunctionsFor: `${environment.appUrlPrefix}Security/User/Functions?userId={id}`
};
