// Removes any "http[s]://www." or "www." or "http[s]://"
export const cleanURL = url => new URL(url).hostname;
