<template>
  <div class="not-found">
    <i class="fa-regular fa-face-frown"></i>
    <p>
      <span>SORRY,</span> we did not find any content of
      <span v-text="searchWord"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: "SearchNotFound",
  props: {
    searchWord: {
      type: String,
      default() {
        return ".....";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/css/main.scss";
.not-found {
  text-align: center;
  padding: 30px 0;
  i {
    font-size: 90px;
    margin-bottom: 20px;
  }
  p {
    font: {
      size: 20px;
    }
    span {
      color: var(--main);
      font-weight: bold;
    }
  }
  @include max-mobile {
    i {
      font-size: 50px;
    }
    p {
      font-size: 14px;
    }
  }
}
</style>
