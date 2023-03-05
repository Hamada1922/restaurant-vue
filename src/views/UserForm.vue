<template>
  <section class="user-form">
    <form class="log-form" @submit="submit">
      <div class="head">
        <h2 class="title">restaurant</h2>
        <div class="icon-div">
          <i class="fa-solid fa-utensils"></i>
        </div>
        <h3 class="head-action">sign in</h3>
      </div>
      <div class="erorr-div" v-for="(erorr, index) in erorrs" :key="index">
        <p class="erorr" v-text="erorr"></p>
      </div>
      <div class="body">
        <div class="form-group" @click="focusInput(0)">
          <i class="fa-solid fa-envelope"></i>
          <div class="input-group">
            <label class="mix-label" for="mix">email or username</label>
            <input id="mix" type="text" v-model="mix" />
          </div>
        </div>
        <div class="form-group" @click="focusInput(1)">
          <i class="fa-solid fa-user"></i>
          <div class="input-group">
            <label for="username">username</label>
            <input id="username" type="text" v-model="username" />
          </div>
        </div>
        <div class="form-group" @click="focusInput(2)">
          <i class="fa-solid fa-envelope"></i>
          <div class="input-group">
            <label for="email">email</label>
            <input id="email" type="email" v-model="email" />
          </div>
        </div>
        <div class="form-group" @click="focusInput(3)">
          <i class="fa-solid fa-lock"></i>
          <div class="input-group">
            <label class="password-label" for="password">password</label>
            <input id="password" :type="passwordType" v-model="password" />
          </div>
          <i @click="showPassword" class="eye-icon fa-solid fa-eye"></i>
        </div>
        <input
          class="action-btn main-btn"
          @click="sendData(getRoute)"
          type="submit"
          value="login"
        />
        <button @click="checkForPassword" class="main-btn check-btn">
          check data
        </button>
        <div class="action-links">
          <router-link class="action-link" to="/register">
            register
          </router-link>
          <router-link class="action-link" to="/">login</router-link>
          <router-link class="action-link" to="/password reset">
            forget password
          </router-link>
        </div>
      </div>
    </form>
    <button @click="modeToggle" class="mode-btn">
      <i class="fa-solid fa-sun"></i>
      <span>light mood</span>
    </button>
    <router-link class="home-link" to="/home"> home </router-link>
  </section>
</template>

<script>
export default {
  name: "LogActions",
  created() {
    this.setAdmin();
    setTimeout(() => {
      this.formStyleing(this.getRoute);
    }, 10);
  },
  data() {
    return {
      mix: "",
      username: "",
      email: "",
      password: "",
      passwordType: "password",
      erorrs: [],
    };
  },
  methods: {
    declear() {
      let formGroups = Array.from(document.querySelectorAll(".form-group"));
      let groupsInputs = Array.from(
        document.querySelectorAll(".form-group input")
      );
      let formLinks = Array.from(document.querySelectorAll(".action-link"));
      let headAction = document.querySelector(".head-action");
      let actionBtn = document.querySelector(".action-btn");
      let checkBtn = document.querySelector(".check-btn");
      let eyeIcon = document.querySelector(".eye-icon");
      let passwordLalbel = document.querySelector(".password-label");
      let mixLalbel = document.querySelector(".mix-label");
      let modeBtn = document.querySelector(".mode-btn");
      let modeIcon = document.querySelector(".mode-btn i");
      let modeText = document.querySelector(".mode-btn span");
      let homeLink = document.querySelector(".home-link");

      return {
        formGroups,
        groupsInputs,
        formLinks,
        headAction,
        actionBtn,
        checkBtn,
        eyeIcon,
        passwordLalbel,
        mixLalbel,
        modeBtn,
        modeIcon,
        modeText,
        homeLink,
      };
    },
    submit(event) {
      event.preventDefault();
    },
    focusInput(index) {
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
    showPassword() {
      this.declear().eyeIcon.classList.toggle("fa-eye");
      this.declear().eyeIcon.classList.toggle("fa-eye-slash");
      if (this.passwordType == "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
    showFields() {
      this.declear().formGroups.forEach((group) => {
        group.classList.add("dis");
      });
      this.declear().actionBtn.value = this.getRoute;
      this.declear().actionBtn.classList.remove("dis");
      this.declear().checkBtn.classList.add("dis");
      this.declear().mixLalbel.textContent = "username or email";
      this.declear().headAction.textContent = this.getRoute;
      for (let i = 0; i < arguments.length; i++) {
        this.declear().formGroups[arguments[i]].classList.remove("dis");
      }
    },
    formStyleing(path) {
      if (path == "register") {
        this.showFields(0, 1, 2, 3);
        this.declear().mixLalbel.textContent = "full name";
      } else if (path == "password reset") {
        this.showFields(0);
        this.declear().actionBtn.classList.add("dis");
        this.declear().checkBtn.classList.remove("dis");
      } else {
        this.showFields(0, 3);
      }
    },
    detectRepeating(path) {
      let check = [];
      let name = null;
      let mail = null;
      let userD = {};
      let pass = null;
      let index = 0;
      if (path === "register") {
        name = this.username;
        mail = this.email;
      } else {
        name = this.mix;
        mail = this.mix;
      }
      this.getUsers.forEach((user, i) => {
        if (user.username === name) {
          check.push(1);
          userD = user;
          pass = user.password;
          index = i;
        } else if (user.email == mail) {
          check.push(0);
          userD = user;
          pass = user.password;
          index = i;
        }
      });
      return {
        check,
        userD,
        pass,
        index,
      };
    },
    setAdmin() {
      this.$store.state.admin = {
        username: "admin",
        fullname: "admin name",
        email: "admin@gmail",
        password: "admin##011",
        id: 100,
      };
      this.$store.dispatch("checkStorageFist", "admin");
    },
    sendData(path) {
      this.erorrs = [];
      if (path == "register") {
        // input errors
        this.username.length < 5
          ? this.erorrs.push("user name must be more than 5 characters")
          : false;
        this.email.length < 5
          ? this.erorrs.push("email must be more than 5 characters")
          : false;
        !this.email.includes("@")
          ? this.erorrs.push("email must include @ mark")
          : false;
        this.password.length < 8
          ? this.erorrs.push("password must be more than 8 characters")
          : false;
        // repeating erorrs
        this.detectRepeating(path).check.includes(1)
          ? this.erorrs.push("user name already exist")
          : false;
        this.detectRepeating(path).check.includes(0)
          ? this.erorrs.push("email already exist")
          : false;
        // Add New User
        if (this.erorrs.length === 0) {
          this.getUsers.push({
            username: this.username,
            email: this.email,
            password: this.password,
            id: this.getUsers.length,
            fullname: this.mix,
          });
          this.$store.commit("updateLocalStorage", "users");
          this.username = "";
          this.email = "";
          this.password = "";
          this.mix = "";
          this.declear().formLinks[1].click();
        }
      } else if (path == "password reset") {
        this.getUsers[this.detectRepeating(path).index].password =
          this.password;
        this.$store.commit("updateLocalStorage", "users");
        this.mix = "";
        this.password = "";
        this.declear().formLinks[1].click();
      } else {
        if (this.detectRepeating(path).check.length > 0) {
          if (this.detectRepeating(path).pass === this.password) {
            this.$store.state.currentUser = this.detectRepeating(path).userD;
            this.$store.commit("updateLocalStorage", "currentUser");
            this.mix = "";
            this.password = "";
            this.declear().homeLink.click();
          } else {
            this.erorrs.push("password not correct");
          }
        } else if (
          (this.mix == this.getAdmin.username ||
            this.mix == this.getAdmin.email) &&
          this.password == this.getAdmin.password
        ) {
          this.$store.state.currentUser = this.getAdmin;
          this.$store.commit("updateLocalStorage", "currentUser");
          this.$store.state.isAdmin = true;
          this.$store.commit("updateLocalStorage", "isAdmin");
          this.mix = "";
          this.password = "";
          this.declear().homeLink.click();
        } else {
          this.erorrs.push("user data not found");
        }
      }
    },
    checkForPassword() {
      this.erorrs = [];
      if (this.detectRepeating(this.getRoute).check.length > 0) {
        this.declear().actionBtn.classList.remove("dis");
        this.declear().checkBtn.classList.add("dis");
        this.showFields(3);
        this.declear().passwordLalbel.textContent = "new password";
      } else {
        this.erorrs.push("user data not found");
      }
    },
    modeToggle() {
      document.body.classList.toggle("dark");
      document.body.classList.toggle("light");
      this.declear().modeIcon.classList.toggle("fa-sun");
      this.declear().modeIcon.classList.toggle("fa-moon");
      this.declear().modeText.textContent === "light mood"
        ? (this.declear().modeText.textContent = "dark mood")
        : (this.declear().modeText.textContent = "light mood");
    },
  },
  computed: {
    getRoute() {
      return this.$route.name;
    },
    getUsers() {
      return this.$store.state.users;
    },
    getAdmin() {
      return this.$store.state.admin;
    },
  },
  watch: {
    getRoute(v) {
      this.formStyleing(v);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/css/main.scss";
.user-form {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  min-height: calc(100vh - 70px);
  background-color: var(--bg);
  color: var(--co);
  .log-form {
    background-color: var(--s-bg);
    width: 50%;
    @include max-mobile {
      width: 90%;
    }
    .head {
      .title {
        background-color: var(--main);
        color: var(--s-white);
        padding: 20px 0;
        text-align: center;
        box-shadow: 0px 2px 1px 1px rgb(0 0 0 / 20%);
      }
      .icon-div {
        position: relative;
        padding: 20px 0;
        &::after {
          position: absolute;
          content: "";
          width: 100%;
          height: 2px;
          background-color: var(--inp);
          top: 50%;
          left: 0;
        }
        i {
          background-color: var(--main);
          color: var(--s-white);
          width: 95px;
          height: 95px;
          font-size: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
      }
      .head-action {
        font-size: 26px;
        text-align: center;
        margin-bottom: 20px;
      }
    }
    .erorr-div {
      text-align: center;
      padding: 0 10px;
      .erorr {
        color: red;
        background-color: rgba($color: #f00, $alpha: 0.1);
        padding: 5px;
        margin-top: 5px;
      }
    }
    .body {
      .form-group {
        display: flex;
        align-items: center;
        gap: 5px;
        background-color: var(--inp);
        padding: 20px;
        border-radius: 10px;
        width: 96%;
        margin: 30px auto;
        transition: var(--trans);
        &:hover {
          background-color: var(--inp-h);
        }
        .input-group {
          position: relative;
          width: 100%;
          label,
          input {
            position: absolute;
            transition: var(--trans);
            pointer-events: none;
          }
          label {
            transform: translateY(-9px);
          }
          input {
            width: 100%;
            margin-top: 5px;
            transform: translateY(-5px);
            color: var(--co);
          }
        }
        &.focused {
          color: var(--main);
          .input-group {
            label {
              font-size: 12px;
              transform: translateY(-15px);
            }
            input {
              pointer-events: all;
            }
          }
        }
      }
      .action-btn,
      .check-btn {
        width: 50%;
        display: block;
        margin: 0 auto;
        border-radius: 25px;
      }
      .action-links {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        margin: 20px;
        @include max-mobile {
          font-size: 12px;
        }
        .action-link:hover {
          color: var(--main);
        }
      }
    }
  }
  .mode-btn {
    background-color: var(--s-bg);
    padding: 10px;
    color: var(--co);
    font-size: 14px;
    border-radius: 6px;
    border: none;
    box-shadow: -1px 1px 1px 1px rgb(0 0 0 / 20%);
    display: flex;
    align-items: center;
    i {
      margin-right: 5px;
    }
    &:hover {
      background-color: var(--inp);
    }
  }
  .home-link {
    opacity: 0;
    cursor: default;
  }
}
</style>
