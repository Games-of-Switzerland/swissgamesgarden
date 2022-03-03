export default {
  PAGE_SIZE: 12,
  MAX_COMPLETENESS: 11765,
};

export const FILTERS = {
  PLATFORMS: 'platforms',
};

export const getJsonApi = () =>
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_SERVER_JSONAPI
    : process.env.NEXT_PUBLIC_JSONAPI;
