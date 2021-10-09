export const isLiveMode = () => {
  if (process.env.BASE_URL_LIVE === window.location.origin) {
    return true;
  } else {
    return false;
  }
};

export const getBaseUrl = () => {
  return isLiveMode()
    ? process.env.BASE_URL_LIVE
    : process.env.BASE_URL_DEV;
};