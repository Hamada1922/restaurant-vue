<template>
  <div :class="`card ${view}`">
    <router-link :to="`/foods/${link}`" class="image-div">
      <i :class="icon"></i>
    </router-link>
    <div class="text">
      <h4 class="title" v-text="title"></h4>
      <p
        class="description"
        v-text="view === 'v' ? description : getShortDes"
      ></p>
      <div v-show="showIcons" class="icons">
        <i @click="addFavorite" class="favorite-icon fa-regular fa-heart"></i>
        <div class="rating-box">
          <i class="fa-regular fa-star" @click="addRate"></i>
          <i class="fa-regular fa-star" @click="addRate"></i>
          <i class="fa-regular fa-star" @click="addRate"></i>
          <i class="fa-regular fa-star" @click="addRate"></i>
          <i class="fa-regular fa-star" @click="addRate"></i>
        </div>
      </div>
      <div v-show="showTime" class="time">
        <i class="fa-regular fa-clock"></i>
        <span v-text="time"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppCard",
  props: {
    link: {
      type: String,
      default() {
        return "lemon";
      },
    },
    view: {
      type: String,
      default() {
        return "h";
      },
    },
    showIcons: {
      type: Boolean,
      default() {
        return true;
      },
    },
    showTime: {
      type: Boolean,
      default() {
        return false;
      },
    },
    title: {
      type: String,
      default() {
        return "food title";
      },
    },
    description: {
      type: String,
      default() {
        return "no description available";
      },
    },
    icon: {
      type: String,
      default() {
        return "fa-solid fa-pizza-slice";
      },
    },
    time: {
      type: String,
      default() {
        return "breakfast";
      },
    },
  },
  methods: {
    addFavorite($e) {
      $e.target.classList.toggle("fa-regular");
      $e.target.classList.toggle("fa-solid");
    },
    addRate($e) {
      $e.target.classList.add("stop");
      let stars = Array.from($e.target.parentElement.children);
      let index = 0;
      stars.forEach((star, i) => {
        star.classList.contains("stop") ? (index = i) : false;
        star.classList.add("fa-regular");
        star.classList.remove("fa-solid");
      });
      for (let i = 0; i <= index; i++) {
        stars[i].classList.remove("fa-regular");
        stars[i].classList.add("fa-solid");
      }
      $e.target.classList.remove("stop");
    },
  },
  computed: {
    getShortDes() {
      return this.description.substring(0, 10) + "...";
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  background-color: var(--s-bg);
  border-radius: 6px;
  box-shadow: 3px 3px 4px -1px rgba(0, 0, 0, 1);
  transition: var(--l-trans);
  &:hover {
    box-shadow: 3px 3px 6px 1px rgb(0 0 0);
  }
  .text {
    padding: 10px;
    color: var(--co);
  }
}
.h {
  align-items: center;
  .image-div {
    height: 100%;
    min-width: 100px;
    i {
      font-size: 45px;
    }
  }
  .text {
    .description {
      font-size: 14px;
      margin: 5px 0 10px;
    }
  }
}
.v {
  flex-direction: column;
  .image-div {
    min-width: 100%;
    height: 150px;
    i {
      font-size: 90px;
    }
  }
  .text {
    position: relative;
    .description {
      opacity: 0;
      position: absolute;
      bottom: 100%;
      left: 0;
      background-color: rgba($color: #9f5f64, $alpha: 0.9);
      color: var(--s-white);
      width: 100%;
      height: 0;
    }
    .icons {
      margin: 15px 0;
    }
    .time {
      margin: 5px 0 5px auto;
      background-color: var(--g);
      color: var(--s-white);
      padding: 7px;
      width: fit-content;
      border-radius: 6px;
      font-size: 14px;
      i {
        margin-right: 5px;
      }
    }
    &:hover {
      .description {
        transition: var(--l-trans);
        opacity: 1;
        height: 175%;
      }
    }
  }
}
</style>
