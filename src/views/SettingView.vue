<template>
  <section class="setting-view">
    <div class="container">
      <div class="users">
        <div class="head-page">
          <div class="badge">
            <i class="fa-solid fa-users"></i>
            <span>users</span>
          </div>
          <button
            :class="`red-btn delete-all ${
              getUsers.length === 0 ? 'disabled' : ''
            }`"
            @click="deleteAll"
          >
            Delete All
          </button>
        </div>
        <table class="users-tabel">
          <tr>
            <th>ID</th>
            <th>username</th>
            <th>full name</th>
            <th>email</th>
            <th>delete</th>
          </tr>
          <tr v-for="user in getUsers" :key="user.id">
            <td>{{ user.id + 1 }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.fullname }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button class="red-btn" @click="deleteUser(user.id)">
                delete
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SettingView",
  methods: {
    deleteUser(id) {
      this.getUsers.splice(id, 1);
      this.$store.commit("updateLocalStorage", "users");
    },
    deleteAll() {
      this.getUsers.splice(0, this.getUsers.length);
      this.$store.commit("updateLocalStorage", "users");
    },
  },
  computed: {
    getUsers() {
      return this.$store.state.users;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/main.scss";
.setting-view {
  padding: 20px 0;
}
.users {
  .users-tabel {
    background-color: var(--s-bg);
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    tr {
      th,
      td {
        padding: 5px 10px;
      }
      th {
        min-width: 40px;
        border: 1px solid var(--main);
      }
      td {
        border: 1px solid var(--b);
      }
      .red-btn {
        padding: 5px 15px;
      }
    }
    @include max-mobile {
      font-size: 12px;
      tr {
        th,
        td {
          padding: 5px;
        }
        th {
          min-width: 10px;
        }
        .red-btn {
          border-radius: 0;
        }
      }
    }
    @include s-size {
      font-size: 10px;
      tr {
        th,
        td {
          padding: 2px;
        }
        th {
          min-width: 5px;
        }
        .red-btn {
          padding: 2px;
          font-size: 10px;
        }
      }
    }
  }
}
</style>
