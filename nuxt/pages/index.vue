<template>
  <div class="min-h-screen flex flex-col items-center p-6 bg-gray-100">
    <div class="w-full p-6 bg-white border rounded shadow">
      <h1 class="mb-4 text-2xl font-semibold">NAP Stack CRUD</h1>
      <div class="flex flex-col items-center mb-6">
        <input v-model="name" class="w-full py-2 px-4 mb-2 border rounded" type="text" placeholder="User's name">
        <button v-if="!editMode" class="w-full py-2 px-4 bg-blue-600 text-white rounded" @click="createUser(name)">
          Add user
        </button>
        <div v-else class="w-full flex justify-between">
          <button class="w-full mr-1 py-2 px-4 bg-blue-600 text-white rounded" @click="updateUser(id, name)">
            Update user's name
          </button>
          <button class="w-full ml-1 py-2 px-4 bg-gray-300 rounded" @click="cancelEdit">
            Cancel
          </button>
        </div>
      </div>
      <div v-if="$apollo.queries.users.loading">
        <p class="text-gray-400">
          Loading users...
        </p>
      </div>
      <div v-else>
        <div v-for="(user, index) in users" :key="index" class="py-2 flex justify-between">
          <p>{{ user.name }}</p>
          <div>
            <button class="px-2 bg-gray-300 rounded" @click="editUser(user.id, user.name)">
              Edit name
            </button>
            <button class="px-2 bg-red-600 text-white rounded" @click="deleteUser(user.id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import USERS from '../../apollo/client/queries/users'
import CREATE_USER from '../../apollo/client/mutations/createUser'
import DELETE_USER from '../../apollo/client/mutations/deleteUser'
import UPDATE_USER from '../../apollo/client/mutations/updateUser'

export default {
  data () {
    return {
      id: '',
      name: '',
      editMode: false
    }
  },
  apollo: {
    users: {
      query: USERS
    }
  },
  methods: {
    async createUser (name) {
      try {
        await this.$apollo.mutate({
          mutation: CREATE_USER,
          variables: {
            name
          },
          update: (store, { data: { createUser } }) => {
            const data = store.readQuery({
              query: USERS
            })

            data.users.push({
              ...createUser
            })

            store.writeQuery({
              query: USERS,
              data
            })
          }
        })
      } catch (error) {
        console.log(error)
      }

      this.name = ''
    },
    editUser (id, name) {
      this.editMode = true
      this.id = id
      this.name = name
    },
    cancelEdit () {
      this.editMode = false
      this.id = ''
      this.name = ''
    },
    async updateUser (id, name) {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_USER,
          variables: {
            id,
            name
          },
          update: (store, { data: { updateUser } }) => {
            const data = store.readQuery({
              query: USERS
            })

            Object.assign(data.users, {
              updateUser
            })

            store.writeQuery({
              query: USERS,
              data
            })
          }
        })
      } catch (error) {
        console.log(error)
      }

      this.id = ''
      this.name = ''
      this.editMode = false
    },
    async deleteUser (id) {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_USER,
          variables: {
            id
          },
          update: (store, { data: { deleteUser } }) => {
            const data = store.readQuery({
              query: USERS
            })

            data.users = data.users.filter((user) => {
              return user.id !== deleteUser.id
            })

            store.writeQuery({
              query: USERS,
              data
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
