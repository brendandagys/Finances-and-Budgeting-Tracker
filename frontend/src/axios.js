import axios from 'axios'

let axiosNewBaseURL

if (process.env.NODE_ENV === 'production') {
  axiosNewBaseURL = axios.create({
    baseURL: 'https://brendandagys.com/api/finances',
  })
} else {
  axiosNewBaseURL = axios
}

export default axiosNewBaseURL