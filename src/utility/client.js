import axios from "axios";

export const client = axios.create({
  baseURL: "http://10.16.16.108:7000/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const get = (url, body, headers = {}) =>
  client.get(url, { params: body, headers: headers });

const post = (url, body, headers = {}) => client.post(url, body, { headers });

const put = (url, body, headers = {}) => client.put(url, body, { headers });

const patch = (url, body, headers = {}) => client.patch(url, body, { headers });

const del = (url, body, headers = {}) => client.delete(url, body, { headers });

export { get, post, put, del, patch };
