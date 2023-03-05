<template>
  <section class="meal-view">
    <div class="container">
      <div class="image-text">
        <div class="text">
          <div class="title">
            <h3>{{ getMeal.title }}</h3>
            <div class="icons">
              <i
                @click="addFavorite"
                class="favorite-icon fa-regular fa-heart"
              ></i>
              <div class="rating-box">
                <i class="fa-regular fa-star" @click="addRate"></i>
                <i class="fa-regular fa-star" @click="addRate"></i>
                <i class="fa-regular fa-star" @click="addRate"></i>
                <i class="fa-regular fa-star" @click="addRate"></i>
                <i class="fa-regular fa-star" @click="addRate"></i>
              </div>
            </div>
          </div>
          <p class="description">
            {{ getMeal.description }}
          </p>
          <ul class="classifications">
            <li>
              <div class="badge">
                <i class="fa-solid fa-tags"></i>
                <span>category : </span>
              </div>
              <span class="cla">{{ getMeal.category }}</span>
            </li>
            <li>
              <div class="badge">
                <i class="fa-solid fa-kitchen-set"></i>
                <span>tool : </span>
              </div>
              <span class="cla">{{ getMeal.tool }}</span>
            </li>
            <li>
              <div class="badge">
                <i class="fa-solid fa-clock"></i>
                <span>best time : </span>
              </div>
              <span class="cla">{{ getMeal.time }}</span>
            </li>
          </ul>
        </div>
        <div class="image-div">
          <i :class="`fa-solid fa-${getMeal.icon}`"></i>
        </div>
      </div>
      <div class="ingredients-instructions">
        <div class="ingredients">
          <h3 class="title">ingredients</h3>
          <div
            class="ingredient"
            v-for="(ingredient, index) in getMeal.ingredients"
            :key="index"
          >
            <input type="checkbox" :id="`ingredient-${index}`" />
            <label :for="`ingredient-${index}`">
              {{ ingredient }}
            </label>
          </div>
        </div>
        <div class="instructions">
          <h3 class="title">instructions</h3>
          <div
            class="instruction"
            v-for="(instruction, index) in getMeal.instructions"
            :key="index"
          >
            <span>step: {{ index + 1 }}</span>
            <p>{{ instruction }} {{ getMeal.title }}</p>
          </div>
        </div>
      </div>
      <div class="comments">
        <div class="badge">
          <i class="fa-regular fa-comments"></i>
          <span>comments</span>
        </div>
        <div class="create-comment">
          <div class="group">
            <i class="user-icon fa-solid fa-user"></i>
            <input
              type="text"
              placeholder="Join the Conservation"
              v-model="comment"
            />
          </div>
          <button
            :class="`green-btn add-comment ${
              this.comment === '' ? 'disabled' : false
            }`"
            @click="addComment"
          >
            <i class="fa-solid fa-plus"></i>
            Add
          </button>
        </div>
        <div class="display-comments">
          <div
            class="comment"
            v-for="(comment, index) in getComments"
            :key="index"
          >
            <span>{{ comment.whoWhen }}</span>
            <div class="group">
              <p>{{ comment.content }}</p>
              <button
                class="red-btn delete-comment"
                @click="deleteComment(comment.content)"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "MealView",
  created() {
    this.test();
  },
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    test() {
      // console.log(this.getParam);
      // console.log(this.getMeal);
      // this.getFoods.forEach((food) => {
      //   food.title === this.getParam;
      // });
    },
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
    addComment() {
      let today = new Date();
      this.$store.state.comments.push({
        name: this.getMeal.title,
        content: this.comment,
        whoWhen: `${this.$store.state.currentUser.username}. ${
          this.$store.state.days[today.getDay()]
        }, ${
          this.$store.state.days[today.getMonth()]
        } ${today.getDate()}, ${today.getFullYear()}`,
      });
      this.$store.commit("updateLocalStorage", "comments");
    },
    deleteComment(content) {
      let index;
      this.getAllComments.forEach((comment, i) => {
        if (comment.content === content) {
          index = i;
        }
      });
      this.getAllComments.splice(index, 1);
      this.$store.commit("updateLocalStorage", "comments");
    },
  },
  computed: {
    getParam() {
      return this.$route.params.food;
    },
    getMeal() {
      let meal;
      this.$store.state.foods.forEach((food) => {
        if (food.title === this.$route.params.food) {
          meal = food;
        }
      });
      return meal;
    },
    getAllComments() {
      return this.$store.state.comments;
    },
    getComments() {
      let mealComments = [];
      this.getAllComments.forEach((comment) => {
        if (comment.name == this.getParam) {
          mealComments.push(comment);
        }
      });
      return mealComments;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/css/main.scss";
.meal-view {
  .group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .image-text {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-bottom: 1px solid var(--b);
    .image-div {
      flex: 1;
      min-height: 35vh;
      i {
        font-size: 150px;
      }
    }
    .text {
      width: 60%;
      .title {
        h3 {
          font-size: 25px;
          text-align: center;
        }
        .icons {
          margin: 20px 0;
          font-size: 20px;
          justify-content: center;
        }
      }
      .description {
        border-bottom: 1px solid var(--b);
        border-top: 1px solid var(--b);
        color: var(--b);
        padding: 10px 0;
      }
      .classifications {
        li {
          display: flex;
          align-items: center;
          padding: 10px;
          gap: 10px;
          .badge {
            font-size: 16px;
            font-weight: bold;
            color: var(--main);
          }
        }
      }
    }
    @include max-mobile {
      flex-direction: column;
      .image-div {
        width: 100%;
        order: -1;
      }
      .text {
        width: 100%;
        .description {
          font-size: 14px;
        }
      }
    }
  }
  .ingredients-instructions {
    display: flex;
    padding: 20px 0;
    gap: 20px;
    color: var(--b);
    .title {
      color: var(--co);
      margin-bottom: 10px;
    }
    .ingredients {
      .ingredient {
        margin-top: 20px;
        input {
          margin-right: 10px;
          cursor: pointer;
          &:checked + label {
            color: var(--main);
          }
        }
        label {
          line-height: 1.6;
        }
      }
      @include max-mobile {
        font-size: 14px;
      }
    }
    .instructions {
      flex: 1;
      .instruction {
        padding: 20px 10px;
        border-radius: 4px;
        box-shadow: -1px 1px 4px -2px;
        margin-top: 10px;
        transition: var(--trans);
        &:hover {
          box-shadow: -1px 1px 6px -1px;
        }
        span {
          display: block;
          font-size: 18px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        p {
          font-size: 14px;
        }
      }
    }
    @include max-mobile {
      flex-direction: column;
      & > div {
        flex: 1;
      }
      .instructions {
        .instruction {
          p {
            font-size: 12px;
          }
        }
      }
    }
  }
  .comments {
    .badge {
      padding: 15px 0;
      border-bottom: 1px solid var(--b);
      margin-bottom: 10px;
    }
    .create-comment {
      .group {
        input {
          border: 1px solid var(--b);
          padding: 10px;
          flex: 1;
          border-radius: 10px;
          &:focus {
            border-color: var(--main);
          }
        }
      }
      .add-comment {
        padding: 7px 15px;
        display: block;
        margin: 5px 0 10px auto;
      }
    }
    .display-comments {
      .comment {
        background-color: var(--s-bg);
        padding: 15px 20px;
        font-size: 14px;
        color: var(--b);
        border-radius: 10px;
        border: 1px solid var(--b);
        margin-top: 10px;
        p {
          margin-top: 10px;
        }
        .delete-comment {
          padding: 7px 15px;
          display: block;
          margin: 15px 0 0 auto;
          @include max-mobile {
            padding: 5px 10px;
            font-size: 10px;
          }
        }
      }
    }
  }
}
</style>
