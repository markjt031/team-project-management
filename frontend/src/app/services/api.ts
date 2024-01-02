
//root url for fetches
const rootUrl="http://localhost:8080/"

const checkStatus = (response: any) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error: any = new Error(response.statusText);
    error.response = response;
    throw error;
  };

  //pass in just endpoint for now without the leading slash. More can be added to this if
  //auth headers become necessary
export const fetchData = (endpoint: string)=>{
    let url= rootUrl + endpoint
    return fetch(url).then(checkStatus).then((response)=>response.json())
  }
