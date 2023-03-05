<template>
  <section class="home">
    <div class="container">
      <div class="head-page">
        <div class="badge">
          <i class="fa-solid fa-utensils"></i>
          <span>recent</span>
        </div>
        <div
          class="change-view"
          @click="view == 'h' ? (view = 'v') : (view = 'h')"
        >
          <i class="fa-solid fa-eye"></i>
          <span>change view</span>
        </div>
      </div>
      <div class="cards-box">
        <app-card
          v-for="(food, index) in getRecentFoods"
          :key="index"
          :view="view"
          :title="food.title"
          :description="food.description"
          :icon="food.icon"
          :link="food.title"
        ></app-card>
      </div>
    </div>
  </section>
</template>

<script>
import AppCard from "@/components/AppCard.vue";
export default {
  name: "HomeView",
  components: {
    AppCard,
  },
  data() {
    return {
      view: "h",
    };
  },
  computed: {
    getUsers() {
      return this.$store.state.users;
    },
    getFoods() {
      return this.$store.state.foods;
    },
    getRecentFoods() {
      let arr = [...this.getFoods].reverse();
      arr.length = 10;
      return arr;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/css/main.scss";
.home {
  background-color: var(--bg);
  color: var(--co);
  .container {
    min-height: calc(100vh - 50px);
  }
}
</style>
