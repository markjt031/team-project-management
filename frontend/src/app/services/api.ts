//root url for fetches from proxy server. Use npm start instead of ng serve to run it
const rootUrl = 'http://localhost:8080/';

const checkStatus = (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error: any = new Error(response.statusText);
  error.response = response;
  throw error;
};

//pass in just endpoint for now without the leading slash. More can be added to this if
//auth headers or other options become necessary
export const fetchData = (endpoint: string, options?: any) => {
  let url = rootUrl + endpoint;
  console.log(options)
  return fetch(url, options)
    .then(checkStatus)
    .then((response) => response.json());
};
