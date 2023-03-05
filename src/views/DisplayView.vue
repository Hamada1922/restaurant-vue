<template>
  <section class="display-view">
    <div class="container">
      <div class="head-page">
        <div class="badge">
          <i :class="`fa-solid fa-${getIcont}`"></i>
          <span v-text="getTitle"></span>
        </div>
        <div class="right">
          <div class="sort">
            <div class="sort-title" @click="showSortMenu">
              <i class="fa-solid fa-arrow-up-wide-short"></i>
              <span> sort</span>
            </div>
            <ul class="sort-menu dis">
              <li @click="sort = 'a'">
                <i class="fa-solid fa-arrow-down-a-z"></i> alphabetical
              </li>
              <li @click="sort = 'c'">
                <i class="fa-regular fa-clock"></i> created
              </li>
            </ul>
          </div>
          <div
            class="change-view"
            @click="view == 'h' ? (view = 'v') : (view = 'h')"
          >
            <i class="fa-solid fa-eye"></i>
            <span>view</span>
          </div>
        </div>
      </div>
      <div class="cards-box">
        <app-card
          v-for="food in getSorted"
          :key="food"
          :view="view"
          :title="food.title"
          :description="food.description"
          :icon="food.icon"
          :link="food.title"
        ></app-card>
        <search-not-found v-show="getSorted.length === 0"></search-not-found>
      </div>
    </div>
  </section>
</template>
<script>
import AppCard from "@/components/AppCard.vue";
import SearchNotFound from "@/components/SearchNotFound.vue";
export default {
  name: "DisplayView",
  components: {
    AppCard,
    SearchNotFound,
  },
  data() {
    return {
      view: "h",
      sort: "n",
    };
  },
  methods: {
    showSortMenu() {
      let sortMenu = document.querySelector(".sort-menu");
      sortMenu.classList.toggle("dis");
    },
  },
  computed: {
    getPath() {
      return this.$route.path;
    },
    getPathName() {
      return this.$route.name;
    },
    getParam() {
      return this.$route.params[this.getPathName];
    },
    getMIT() {
      let mother;
      let title;
      if (this.getPath.includes("tools")) {
        mother = "tools";
        title = "tool";
      } else {
        mother = "categories";
        title = "category";
      }
      let index;
      this.$store.state[mother].forEach((el, i) => {
        if (el.serName == this.getParam) {
          index = i;
        }
      });
      return {
        index,
        mother,
        title,
      };
    },
    getTitle() {
      if (this.getPathName === "all_Recipes") {
        return this.getPathName;
      } else {
        return this.getParam;
      }
    },
    getIcont() {
      if (this.getPathName === "all_Recipes") {
        return "utensils";
      } else {
        return this.$store.state[this.getMIT.mother][this.getMIT.index].icon;
      }
    },
    getFoods() {
      return this.$store.state.foods;
    },
    getPathFoods() {
      if (this.getPathName === "all_Recipes") {
        return this.getFoods;
      } else {
        for (const el in this.$store.state[this.getMIT.mother]) {
          this.getFoods.forEach((food) => {
            if (
              food[this.getMIT.title] ===
              this.$store.state[this.getMIT.mother][el].serName
            ) {
              this.$store.state[this.getMIT.mother][el].content.push(food);
            }
          });
        }
        this.$store.dispatch("checkStorageFist", this.getMIT.mother);
        return this.$store.state[this.getMIT.mother][this.getMIT.index].content;
      }
    },
    getSorted() {
      let arr = [...this.getPathFoods];
      if (this.sort === "a") {
        return arr.sort(function (x, y) {
          return x.title > y.title ? 1 : -1;
        });
      } else if (this.sort === "c") {
        return arr.sort(function (a, b) {
          return a.id > b.id ? 1 : -1;
        });
      } else {
        return arr;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/main.scss";
.right {
  display: flex;
  align-items: center;
  gap: 10px;
  .sort {
    background: none;
    border: none;
    color: var(--co);
    transition: var(--trans);
    padding: 5px;
    cursor: pointer;
    border-radius: 4px;
    position: relative;
    z-index: 0;
    &:hover {
      background-color: var(--s-bg);
    }
    .sort-menu {
      position: absolute;
      padding: 10px 0;
      right: 0;
      background-color: var(--bg);
      li {
        display: block;
        display: flex;
        gap: 7px;
        font-size: 14px;
        padding: 10px;
        &:hover {
          background-color: var(--s-bg);
        }
      }
    }
  }
  @include s-size {
    .sort-title,
    .change-view {
      span {
        display: none;
      }
    }
  }
}
</style>
