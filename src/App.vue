<template>
  <app-header />
  <div class="slide-cont">
    <router-view />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import foods from "@/json/food.json";
// elements
export default {
  components: {
    AppHeader,
  },
  created() {
    this.$store.commit("updateVueStore");
    this.setFood();
    this.test();
  },
  methods: {
    setFood() {
      this.$store.state.foods = foods;
    },
    test() {
      // this.$store.dispatch("jsonCheck");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/css/main.scss";
.slide-cont {
  transition: var(--l-trans);
  margin-top: 50px;
  &.active {
    padding-left: 300px;
    @include max-mobile {
      padding-left: 0;
      pointer-events: none;
    }
  }
}
</style>
