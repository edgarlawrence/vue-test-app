// axiosHelper.js
import axios from 'axios';

const API_URL = "https://localhost:44380/api/v1";

const axiosApi = axios.create({
    baseURL: API_URL,
  })


axiosApi.interceptors.request.use(
    req => {
      req.headers["Authorization"] = "Bearer " + localStorage.getItem("token")
      req.headers["Cache-Control"] = "no-cache"
      req.headers["Pragma"] = "no-cache"
      return req
    },
    err => {
      Promise.reject(err)
    }
  )
  
  axiosApi.interceptors.response.use(
    response => response,
    error => {
      console.log("error", error)
      Promise.reject(error)
    }
  )


/**
 * Makes a GET request to the specified URL.
 * @param {string} url - The URL to make the GET request to.
 * @returns {Promise} A promise that resolves with the response data.
 */
export function getData(url, resss) {
  return axios.get(url)
    .then(response => resss = response.data)
    .catch(error => {
      console.error('GET request error:', error);
      throw error;
    });
}

/**
 * Makes a POST request to the specified URL with the given data.
 * @param {string} url - The URL to make the POST request to.
 * @param {Object} data - The data to send in the POST request body.
 * @returns {Promise} A promise that resolves with the response data.
 */
export async function postData(url, data, resData) {
  return await axios.post(url, data)
    .then(response => {
        // console.log('res api helper', response.data)
        // resss = response.data
        // console.log('resss', resss)

        Object.assign(resData, response.data);

        // Logging the updated resData state
        console.log('resData:', resData);

        return response.data;
    })
    .catch(error => {
      console.error('POST request error:', error);
      throw error;
    });
}
