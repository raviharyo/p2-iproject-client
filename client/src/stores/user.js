import { defineStore } from "pinia";
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state() {
    return {
      baseUrl: `http://localhost:4000`,
      province: [],
      city: []
    }
  },
  getters: {

  },
  actions: {

    getProvince() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(`${this.baseUrl}/province`)
          this.province = response.data
          // console.log(response.data);
          resolve()
        }
        catch (err) {
          reject(err)
        }
      })
    },
    getCity(id) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(`${this.baseUrl}/city/${id}`)
          this.city = response.data

          resolve()
        }
        catch (err) {
          reject(err)
        }
      })
    },
    registerUser(data) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(`${this.baseUrl}/register`, {
            email: data.email,
            username: data.username,
            password: data.password,
            phoneNumber: data.phoneNumber,
            address: data.address,
            province: data.provinceId,
            city: data.cityId
          })
          resolve()
        }
        catch (err) {
          reject(err)
        }
      })
    },
    loginUser(data) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(`${this.baseUrl}/login`, {
            email: data.email,
            password: data.password
          })
          console.log(response.data.access_token);
          localStorage.setItem("access_token", response.data.access_token)
          resolve()
        }
        catch (err) {
          reject(err)
        }
      })
    }
  },
});
