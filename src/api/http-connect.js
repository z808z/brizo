import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'https://sample-api.brizo.ru/api/',
  json: true
})

export default {
  async execute (method, resource, data) {
    return client({
      method,
      url: resource,
      data,
      headers: {
        'Authorization': 'Bearer H2eE6aw78FRK3cpXrUXSHpVMJ8X4QyMmIG4uuLvfwqDbcxfI5ve8esrwMBp4'
      }
    }).then(req => {
      return req.data
    }).catch(e => {
      return e.response
    })
  },
  getPosts () {
    return this.execute('get', '/posts?offset=9480&limit=100')
  },
  getPost (id) {
    console.log(id)
    return this.execute('get', '/posts/' + id)
  },
  createPost (data) {
    return this.execute('post', '/posts', data)
  },
  updatePost (id, data) {
    return this.execute('put', '/posts/' + id, data)
  },
  deletePost (id) {
    return this.execute('delete', '/posts/' + id)
  }
}