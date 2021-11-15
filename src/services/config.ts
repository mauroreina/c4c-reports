import axios from 'axios';
//console.log('Process ', process.env.PUBLIC_API)
const instance = axios.create({
  // baseURL: process.env.PUBLIC_API,
  baseURL: 'https://x9qecnyw03.execute-api.us-east-1.amazonaws.com',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default instance;
