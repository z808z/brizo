<template>
  <div class="columns">
    <div class="column">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td><router-link :to="{ name: 'post', params: { id: post.id }}">{{ post.id }}</router-link></td>
            <td><router-link :to="{ name: 'post', params: { id: post.id }}">{{ post.attributes.title }}</router-link></td>
            <td><a href="#" @click.prevent="populatePostToEdit(post)" v-if="post.attributes.user_id==3">Редактировать</a></td>
            <td><a href="#" @click.prevent="deletePost(post.id)" v-if="post.attributes.user_id==3">Удалить</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="column">
      <article class="message is-danger" v-if="errors">
        <div class="message-header">
          <p><strong>{{errors.message}}</strong></p>
          <button class="delete" aria-label="delete" @click="closeNotify"></button>
        </div>
          <div class="message-body">
            <ul>
              <li v-for="error of errors.errors">
                {{error[0]}}
              </li>
            </ul>
          </div>
        </article>
      <div>
        <h4 class="title is-4">{{(model.id ? 'Редактировать пост №' + model.id : 'Добавить новый пост')}}</h4>
        <form @submit.prevent="savePost">
          <div class="field">
            <label class="label">Заголовок</label>
            <div class="control">
              <input class="input" type="text" placeholder="Заголовок поста" v-model="model.attributes.title">
            </div>
          </div>
          <div class="field">
            <label class="label">Содержание</label>
            <div class="control">
              <textarea class="textarea" type="textarea" placeholder="Содержимое поста" v-model="model.attributes.body"></textarea>
            </div>
          </div>
          <button type="submit" class="button is-primary">Сохранить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../src/api/http-connect';
export default {
  data () {
    return {
      posts: [],
      model: {
        id: '',
        attributes: {
          title: '',
          body: ''
        }
      },
      errors: ''
    }
  },
  async created () {
    this.refreshPosts()
  },
  methods: {
    async refreshPosts () {
      this.posts = await api.getPosts()
      this.posts = this.posts.data
      this.posts.reverse()
    },
    async populatePostToEdit (post) {
      this.model = post
    },
    async savePost () {
      if (this.model.id) {
        let req = await api.updatePost(this.model.id, this.model.attributes)
        this.checkErrors(req)
      } else {
        let req = await api.createPost(this.model.attributes)
        this.checkErrors(req)
      }
      this.model = {
        id: "",
        attributes: {
          title: "",
          body: ""
        }
      }
      let req = await this.refreshPosts()
      this.checkErrors(req)
    },
    async deletePost (id) {
      if (confirm('Вы действительно хотите удалить статью?')) {
        if (this.model.id === id) {
          this.model = {}
        }
        let req = await api.deletePost(id)
      	this.checkErrors(req)
        await this.refreshPosts()
      }
    },
    checkErrors (req) {
      if (req != 200) {
        this.errors = req.data
      }
    },
    closeNotify () {
      this.errors = ''
    }
  }
}
</script>