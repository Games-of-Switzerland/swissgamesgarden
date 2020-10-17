// Removes any "https://www." or "http://www." or "www."
export const cleanURL = url => url.replace(/((^\w+:|^)\/\/)?www\.?/, '');
