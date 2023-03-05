<template>
  <header>
    <div class="container">
      <div class="left">
        <i @click="toggleMenu" class="toggler fa-solid fa-bars"></i>
        <div class="logo">
          <router-link to="/home">
            <i class="fa-solid fa-utensils"></i>
          </router-link>
          <span>restaurant</span>
        </div>
      </div>
      <div class="right">
        <div class="search-div">
          <i @click="toggleSearchInput" class="search-icon fa-solid fa-search">
          </i>
          <input
            class="search-input"
            type="text"
            placeholder="search in website"
            v-model="searchWord"
            @focus="showSearchCont"
          />
        </div>
        <router-link class="logout" to="/" @click="logout">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span>logout</span>
        </router-link>
      </div>
    </div>
  </header>
  <div class="search-cont dis">
    <div class="head-page">
      <div class="badge">
        <span>result</span>
      </div>
      <button class="red-btn close-btn" @click="closeSearch">
        <i class="fa-solid fa-x"></i> close
      </button>
    </div>
    <div class="cards-box">
      <app-card
        v-for="food in getSerachedFoods"
        :key="food"
        :title="food.title"
        :description="food.description"
        :icon="food.icon"
      ></app-card>
    </div>
  </div>
  <div class="slider-menu">
    <router-link class="profile-link" to="/profile">
      <i class="user-icon fa-solid fa-user"></i>
      <div class="text">
        <h3>{{ getCurrentUser.fullname }}</h3>
      </div>
    </router-link>
    <ul class="menu">
      <router-link to="/meal_planner" class="menu-link">
        <i class="fa-solid fa-calendar-days"></i>
        <span>meal planner</span>
      </router-link>
      <router-link to="/all_recipes" class="menu-link">
        <i class="fa-solid fa-boxes-stacked"></i>
        <span>all recipes</span>
      </router-link>
      <router-link to="/categories" class="menu-link">
        <i class="fa-solid fa-tags"></i>
        <span>categories</span>
      </router-link>
      <router-link to="/tools" class="menu-link">
        <i class="fa-solid fa-kitchen-set"></i>
        <span>tools</span>
      </router-link>
      <router-link
        v-show="this.$store.state.isAdmin"
        to="/setting"
        class="menu-link"
      >
        <i class="fa-solid fa-gear"></i>
        <span>setting</span>
      </router-link>
      <button @click="modeToggle" class="menu-link mode-btn">
        <i class="fa-solid fa-sun"></i>
        <span>light mood</span>
      </button>
    </ul>
  </div>
</template>

<script>
import AppCard from "@/components/AppCard.vue";
export default {
  name: "AppHeader",
  components: {
    AppCard,
  },
  created() {
    this.showByPath();
  },
  data() {
    return {
      searchWord: "",
    };
  },
  methods: {
    declear() {
      const container = document.querySelector("header .container");
      const sliderMenu = document.querySelector(".slider-menu");
      const modeIcon = document.querySelector(".mode-btn i");
      const modeText = document.querySelector(".mode-btn span");
      const logoutBtn = document.querySelector(".logout");
      const slideCont = document.querySelector(".slide-cont");
      const searchCont = document.querySelector(".search-cont");
      const closeBtn = document.querySelector(".close-btn");
      return {
        container,
        sliderMenu,
        modeIcon,
        modeText,
        logoutBtn,
        slideCont,
        searchCont,
        closeBtn,
      };
    },
    toggleSearchInput() {
      this.declear().container.classList.toggle("toggleSearch");
    },
    logout() {
      this.$store.state.currentUser = {
        username: "unknown",
        email: "unKnown",
        password: "unknown",
        id: null,
        fullname: "unknown",
      };
      this.$store.commit("updateLocalStorage", "currentUser");
      this.$store.state.isAdmin = false;
      this.$store.commit("updateLocalStorage", "isAdmin");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 100);
    },
    toggleMenu() {
      this.declear().sliderMenu.classList.toggle("active");
      this.declear().slideCont.classList.toggle("active");
      this.declear().logoutBtn.classList.toggle("disabled");
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
    showByPath() {
      setTimeout(() => {
        if (
          this.getPagePath === "/" ||
          this.getPagePath === "/register" ||
          this.getPagePath.includes("/password")
        ) {
          document.querySelector("header").classList.add("dis");
        } else {
          document.querySelector("header").classList.remove("dis");
        }
      }, 0);
    },
    showSearchCont() {
      this.declear().searchCont.classList.remove("dis");
      this.toggleMenu();
    },
    closeSearch() {
      this.declear().searchCont.classList.add("dis");
      this.toggleSearchInput();
    },
  },
  computed: {
    getCurrentUser() {
      return this.$store.state.currentUser;
    },
    getPagePath() {
      return this.$route.path;
    },
    getSerachedFoods() {
      let arr = [...this.$store.state.foods];
      return arr.filter((food) =>
        food.title.toLowerCase().includes(this.searchWord.toLowerCase())
      );
    },
  },
  watch: {
    getPagePath() {
      this.showByPath();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/main.scss";
header {
  background-color: var(--main);
  color: var(--s-white);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    @include max-mobile {
      &.toggleSearch {
        .left {
          display: none;
        }
        .right {
          .search-div {
            input {
              opacity: 1;
              position: relative;
              pointer-events: all;
              width: 80%;
            }
          }
        }
      }
    }
    .left,
    .right {
      display: flex;
      align-items: center;
      height: 50px;
      gap: 15px;
    }
    .left {
      .toggler {
        font-size: 22px;
      }
      .logo {
        i {
          font-size: 22px;
          margin-right: 10px;
        }
        span {
          font-weight: bold;
          font-size: 20px;
        }
      }
      @include max-mobile {
        .logo {
          i {
            font-size: 16px;
            margin-right: 5px;
          }
          span {
            font-size: 16px;
          }
        }
      }
    }
    .right {
      .search-div {
        background-color: rgba($color: #fff, $alpha: 0.2);
        padding: 10px 20px;
        border-radius: 20px;
        input {
          color: var(--co);
          margin-left: 10px;
        }
      }
      .logout {
        i {
          margin: 5px;
        }
      }
      @include max-mobile {
        .search-div {
          padding: 10px;
          input {
            opacity: 0;
            position: absolute;
            pointer-events: none;
            width: 0px;
          }
          input.active {
            opacity: 1;
            position: relative;
            pointer-events: all;
            width: auto;
          }
        }
        .logout {
          span {
            display: none;
          }
        }
      }
    }
  }
}
.search-cont {
  position: fixed;
  z-index: 2;
  width: 90%;
  left: 50%;
  @include prefix(transform, translateX(-50%));
  padding: 20px;
  background-color: var(--s-bg);
  border-bottom: 2px solid var(--main);
  max-height: 50vh;
  overflow-x: hidden;
  .head-page {
    padding: 0;
    margin-bottom: 20px;
  }
  @include s-size {
    width: 99%;
    padding: 10px 15px;
  }
}
.slider-menu {
  position: fixed;
  background-color: var(--bg);
  color: var(--co);
  transition: var(--l-trans);
  width: 300px;
  min-height: calc(100vh - 50px);
  left: -100%;
  top: 50px;
  border-right: 1px solid var(--co);
  z-index: 2;
  &.active {
    left: 0;
  }
  @include max-mobile {
    max-width: 75%;
  }
  .profile-link {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--co);
    transition: var(--trans);
    &:hover {
      background-color: var(--s-bg);
    }
    @include max-mobile {
      padding: 15px;
      h3 {
        font-size: 16px;
      }
      .user-icon {
        width: 30px;
        height: 30px;
        font-size: 12px;
      }
    }
  }
  .menu {
    padding: 20px;
    .menu-link {
      display: block;
      padding: 15px 5px;
      transition: var(--trans);
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background-color: var(--s-bg);
      }
      i {
        margin-right: 10px;
      }
    }
    .mode-btn {
      background-color: transparent;
      color: var(--co);
      width: 100%;
      text-align: start;
    }
    @include max-mobile {
      padding: 15px;
      .menu-link {
        padding: 10px 5px;
      }
    }
  }
}
</style>
