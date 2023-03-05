<template>
  <section class="create-view">
    <div class="overlay dis"></div>
    <div class="container">
      <div class="search">
        <input type="text" placeholder="Serach . . ." v-model="searchWord" />
        <i class="fa-solid fa-search"></i>
      </div>
      <div class="head-page">
        <div class="badge">
          <i
            :class="`fa-solid fa-${
              getPath === 'tools' ? 'kitchen-set' : 'tags'
            }`"
          ></i>
          <span>{{ getPath }}</span>
        </div>
        <button class="green-btn call-create" @click="callWindow">
          <i class="fa-solid fa-plus"></i> Create
        </button>
      </div>
      <div class="create-window dis">
        <h3 class="title">create <span>category</span></h3>
        <div class="body">
          <input type="text" placeholder="category name" v-model="elName" />
          <input type="text" placeholder="category icon" v-model="elIcon" />
        </div>
        <div class="btns">
          <button class="red-btn cancel-btn" @click="cancelWindow">
            <i class="fa-solid fa-x"></i> calncel
          </button>
          <button
            @click="createElement"
            :class="`green-btn create-btn ${
              elName === '' || elIcon === '' ? 'disabled' : ''
            }`"
          >
            <i class="fa-solid fa-plus"></i> Create
          </button>
        </div>
      </div>
      <div class="elements">
        <div
          class="element"
          v-for="(element, index) in getSearchedElements"
          :key="index"
        >
          <router-link class="el-link" :to="`/${getPath}/${element.serName}`">
            <div class="badge">
              <i :class="`fa-solid fa-${element.icon}`"></i>
              <span>{{ element.name }}</span>
            </div>
          </router-link>
          <i
            class="delete-icon fa-solid fa-trash"
            @click="deleteElement(element.serName)"
          ></i>
        </div>
        <search-not-found
          v-show="getSearchedElements.length === 0"
          :searchWord="searchWord"
        ></search-not-found>
      </div>
    </div>
  </section>
</template>

<script>
import SearchNotFound from "@/components/SearchNotFound.vue";
export default {
  name: "CreateView",
  components: {
    SearchNotFound,
  },
  created() {},
  data() {
    return {
      searchWord: "",
      elName: "",
      elIcon: "",
    };
  },

  methods: {
    declear() {
      let overlay = document.querySelector(".create-view .overlay");
      let createWindow = document.querySelector(".create-view .create-window");
      let CancelBtn = document.querySelector(".create-view .cancel-btn");
      return {
        overlay,
        createWindow,
        CancelBtn,
      };
    },
    callWindow() {
      this.declear().createWindow.classList.remove("dis");
      this.declear().overlay.classList.remove("dis");
    },
    cancelWindow() {
      this.declear().createWindow.classList.add("dis");
      this.declear().overlay.classList.add("dis");
    },
    createElement() {
      let check = [];
      for (const el in this.getElements) {
        if (this.getElements[el].name === this.elName) {
          check.push(1);
        }
      }
      if (check.length === 0) {
        this.getElements.push({
          name: this.elName,
          serName: this.elName,
          content: [],
          icon: this.elIcon,
        });
        this.$store.commit("updateLocalStorage", this.getPath);
        this.declear().CancelBtn.click();
      } else {
        this.elName = "this name is already exist";
      }
    },
    deleteElement(serName) {
      let index = 0;
      this.getElements.forEach((el, i) => {
        if (el.serName === serName) {
          index = i;
        }
      });
      this.getElements.splice(index, 1);
      this.$store.commit("updateLocalStorage", this.getPath);
    },
  },
  computed: {
    getPath() {
      return this.$route.name;
    },
    getFoods() {
      return this.$store.state.foods;
    },
    getElements() {
      let arr;
      if (this.getPath === "categories") {
        arr = this.$store.state.categories;
      } else {
        arr = this.$store.state.tools;
      }
      return arr;
    },
    getSearchedElements() {
      return this.getElements.filter((el) =>
        el.name.toLowerCase().includes(this.searchWord.toLowerCase())
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/main.scss";
.create-view {
  padding: 10px 0;
  min-height: (100vh -50px);
  .search {
    position: relative;
    padding: 10px 20px;
    border: 1px solid var(--b);
    transition: var(--trans);
    &.focused {
      border-color: var(--main);
    }
    input {
      width: 100%;
      padding: 0 20px;
      color: var(--co);
    }
    i {
      position: absolute;
      left: 10px;
    }
  }
  .head-page {
    margin: 20px 0;

    @include s-size {
      .badge {
        font-size: 14px;
      }
    }
  }
  .create-window {
    position: absolute;
    background-color: var(--s-bg);
    width: 500px;
    max-width: 95%;
    left: 50%;
    border-radius: 6px;
    transition: var(--trans);
    @include prefix(transform, translateX(-50%));
    @include prefix(box-shadow, 3px 3px 4px -1px rgba(0, 0, 0, 1));
    z-index: 2;
    &:hover {
      @include prefix(box-shadow, 3px 3px 6px 1px rgb(0 0 0));
    }
    .title {
      background-color: var(--main);
      padding: 10px 20px;
    }
    .body {
      padding: 0 20px;
      input {
        display: block;
        padding: 10px 0;
        width: 100%;
        margin: 20px 0;
        border-bottom: 1px solid var(--co);
        &:focus {
          border-color: var(--main);
        }
      }
    }
    .btns {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
    }
  }
  .elements {
    .element {
      background-color: var(--s-bg);
      width: 300px;
      max-width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 20px;
      border-radius: 6px;
      position: relative;
      margin-top: 20px;
      @include prefix(box-shadow, 3px 3px 4px -1px rgba(0, 0, 0, 1));
      &:hover {
        @include prefix(box-shadow, 3px 3px 6px 1px rgb(0 0 0));
      }
      &::before {
        content: "";
        position: absolute;
        width: 5px;
        height: 100%;
        background-color: var(--main);
        top: 0;
        left: 0;
      }

      .el-link {
        flex: 1;
      }
      .badge {
        font-size: 18px;
      }
      .delete-icon {
        color: var(--b);
        &:hover {
          color: var(--main);
          @include prefix(transform, scale(1.2));
        }
      }
    }
  }
}
</style>
