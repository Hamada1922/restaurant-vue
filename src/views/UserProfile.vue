<template>
  <section class="profile">
    <div class="container">
      <div class="welcome">
        <i class="user-icon fa-solid fa-user"></i>
        <p>welcome, <span v-text="getCurrentUser.fullname"></span></p>
      </div>
      <div class="content">
        <div class="statistics-div" v-if="getIsAdmin">
          <h3>website statistics</h3>
          <p>
            website Statistics provide some insight how you're using restaurant
          </p>
          <div class="statistics">
            <router-link to="/profile" class="statistic">
              <i class="fa-solid fa-utensils"></i>
              <div class="text">
                <span class="name">recipes</span>
                <span class="num">20</span>
              </div>
            </router-link>
            <router-link to="/profile" class="statistic">
              <i class="fa-solid fa-users"></i>
              <div class="text">
                <span class="name">users</span>
                <span class="num">20</span>
              </div>
            </router-link>
            <router-link to="/profile" class="statistic">
              <i class="fa-solid fa-tags"></i>
              <div class="text">
                <span class="name">categories</span>
                <span class="num">20</span>
              </div>
            </router-link>
            <router-link to="/profile" class="statistic">
              <i class="fa-solid fa-spoon"></i>
              <div class="text">
                <span class="name">tools</span>
                <span class="num">20</span>
              </div>
            </router-link>
          </div>
        </div>
        <div class="user-data">
          <form class="change-form">
            <div class="form-group" @click="inputFocus(0)">
              <label for="usernameChange">username</label>
              <input id="usernameChange" type="text" v-model="username" />
            </div>
            <div class="form-group" @click="inputFocus(1)">
              <label for="fullnameChange">full name</label>
              <input id="fullnameChange" type="text" v-model="fullname" />
            </div>
            <div class="form-group" @click="inputFocus(2)">
              <label for="emailChange">email</label>
              <input id="emailChange" type="text" v-model="email" />
            </div>
            <div class="form-group" @click="inputFocus(3)">
              <label for="passwordChange">password</label>
              <input
                id="passwordChange"
                :type="passwordType"
                v-model="password"
              />
              <i
                @click="changePasswordType"
                class="eye-icon fa-solid fa-eye"
              ></i>
            </div>
            <button class="update-btn main-btn" @click.prevent="updateUserData">
              <i class="fa-solid fa-pen"></i>
              <span>Update</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UserProfile",
  created() {
    this.checkInput();
    this.setUserData();
  },
  data() {
    return {
      username: "",
      fullname: "",
      email: "",
      password: "",
      passwordType: "password",
    };
  },
  methods: {
    declear() {
      let formGroups = Array.from(document.querySelectorAll(".form-group"));
      let groupsInputs = Array.from(
        document.querySelectorAll(".form-group input")
      );
      let eyeIcon = document.querySelector(".eye-icon");
      return {
        formGroups,
        groupsInputs,
        eyeIcon,
      };
    },
    checkInput() {
      setTimeout(() => {
        this.declear().groupsInputs.forEach((input, index) => {
          if (input.value === "") {
            this.declear().formGroups[index].classList.remove("focused");
          } else {
            this.declear().formGroups[index].classList.add("focused");
          }
        });
      }, 10);
    },
    inputFocus(index) {
      this.declear().formGroups[index].classList.add("focused");
      this.declear().groupsInputs[index].focus();
      setTimeout(() => {
        this.declear().formGroups.forEach((group) => {
          group.onclick = () => {
            if (this.declear().groupsInputs[index].value === "") {
              this.declear().formGroups[index].classList.remove("focused");
            }
          };
        });
      }, 100);
    },
    changePasswordType() {
      if (this.passwordType == "password") {
        this.passwordType = "text";
        this.declear().eyeIcon.classList.add("fa-eye-slash");
        this.declear().eyeIcon.classList.remove("fa-eye");
      } else {
        this.passwordType = "password";
        this.declear().eyeIcon.classList.remove("fa-eye-slash");
        this.declear().eyeIcon.classList.add("fa-eye");
      }
    },
    setUserData() {
      if (this.getIsAdmin) {
        this.username = this.getAdmin.username;
        this.fullname = this.getAdmin.fullname;
        this.email = this.getAdmin.email;
        this.password = this.getAdmin.password;
      } else {
        this.username = this.getCurrentUser.username;
        this.fullname = this.getCurrentUser.fullname;
        this.email = this.getCurrentUser.email;
        this.password = this.getCurrentUser.password;
      }
    },
    updateUserData() {
      let user = null;
      let index = this.getCurrentUser.id;
      let title = null;
      if (this.getIsAdmin) {
        user = this.getAdmin;
        title = "admin";
      } else {
        user = this.getUsers[index];
        title = "users";
      }
      user.username = this.username;
      user.fullname = this.fullname;
      user.email = this.email;
      user.password = this.password;
      this.$store.commit("updateLocalStorage", title);
      this.$store.state.currentUser = user;
      this.$store.commit("updateLocalStorage", "currentUser");
    },
  },
  computed: {
    getCurrentUser() {
      return this.$store.state.currentUser;
    },
    getIsAdmin() {
      return this.$store.state.isAdmin;
    },
    getAdmin() {
      return this.$store.state.admin;
    },
    getUsers() {
      return this.$store.state.users;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/main.scss";
.profile {
  .container {
    .welcome {
      text-align: center;
      padding: 20px 0;
      i {
        margin: 0 auto 10px;
        font-size: 30px;
        background-color: var(--s-bg);
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid var(--co);
      }
      p {
        font-size: 17px;
        span {
          font-weight: bold;
          color: var(--main);
        }
      }
    }
    .content {
      display: flex;
      gap: 20px;
      margin-top: 30px;
      @include max-mobile {
        flex-direction: column;
        text-align: center;
      }
      & > div {
        background-color: var(--s-bg);
        padding: 20px;
        border-radius: 10px;
        border: 1px solid var(--b);
      }
      .statistics-div {
        width: 50%;
        @include max-mobile {
          width: 100%;
        }
        p {
          margin: 10px 0 20px;
        }
        .statistics {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          .statistic {
            box-shadow: 0px 1px 3px 0px rgba($color: #000000, $alpha: 0.6);
            padding: 10px 20px;
            width: 160px;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: var(--trans);
            &:hover {
              box-shadow: 0px 2px 4px 0px rgb(0 0 0 / 60%);
            }
            i {
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              background-color: var(--main);
              color: var(--s-white);
              width: 30px;
              height: 30px;
            }
            .text {
              span {
                display: block;
                text-align: start;
              }
            }
          }
        }
      }
      .user-data {
        flex: 1;
        @include max-mobile {
          text-align: start;
        }
        .change-form {
          margin-top: 20px;
          .form-group {
            position: relative;
            border-bottom: 1px solid var(--co);
            padding: 10px;
            margin-top: 40px;
            transition: var(--trans);
            label {
              position: absolute;
              pointer-events: none;
              transition: var(--trans);
            }
            input {
              color: var(--co);
              width: 90%;
            }
            &.focused {
              border-color: var(--main);
              label {
                transform: translateY(-17px);
                font-size: 13px;
                color: var(--main);
              }
              .eye-icon {
                color: var(--main);
              }
            }
          }
          .update-btn {
            display: block;
            margin: 20px 0 0 auto;
            border-radius: 6px;
            i {
              margin-right: 5px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
