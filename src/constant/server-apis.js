import { requestMethodType } from ".";

export const serverApis = {
  getActiveNode: {
    serverUrl: `/authenticate`,
    apiMethodType: requestMethodType.POST,
  },
  getHomePage: {
    actionName: "getHomePage",
    serverUrl: `/home/get_all_home_sections`,
    apiMethodType: requestMethodType.GET,
    componentPath: "/home",
  },
};


