import axios from 'axios'

let axiosNewBaseURL

if (process.env.NODE_ENV === 'production') {
  axiosNewBaseURL = axios.create({
    baseURL: 'https://finances.brendandagys.com/api',
  })
} else {
  axiosNewBaseURL = axios
}

export default axiosNewBaseURL
