// User register, login
import { ServerURL } from './ServerURL'

const url = ServerURL + '/api/v1/user'

export default {
  register: (user) => {
    return fetch(`${url}/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {"Content-type": "application/json"}
    }).then(res =>res.json())
      .then(data => data)
  },
  login: (user) => {
    return fetch(`${url}/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {"Content-type": "application/json"}
    }).then(res => res.json())
      .then(data => data)
  },
  logout: () => {
    return fetch(`${url}/logout`) 
      .then(res => res.json())
      .then(data => data)
  },
  getUser: () => {
    return fetch(`${url}/getUser`)
      .then(res => res.json())
      .then(data => data)
  },
  isAuthenticated: (token) => {
    return fetch(`${url}/check/authenticate`, {
      method: "GET",
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => data)    
  }
}