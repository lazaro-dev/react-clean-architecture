export const makeApiURL  = (path: string): string => {
  return `http://localhost:5050/api/login${path}`;  
}
