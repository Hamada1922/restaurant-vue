<template>
  <section class="meal-planner">
    <div class="container">
      <div class="cards-box">
        <div class="day-div" v-for="plan in getPlans" :key="plan">
          <div class="head">
            <span class="day-name">{{ plan.name }}</span
            >,
            <span class="date">{{ plan.date }}</span>
          </div>
          <div class="body">
            <app-card
              class="card"
              view="v"
              :showIcons="false"
              :showTime="true"
              v-for="food in plan.foods"
              :key="food"
              :title="food.title"
              :description="food.description"
              :icon="food.icon"
              :time="food.time"
              :link="food.title"
            ></app-card>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AppCard from "@/components/AppCard.vue";
export default {
  name: "MealPlanner",
  components: {
    AppCard,
  },
  created() {},
  computed: {
    getFoodsArrays() {
      let breakfast = [];
      let lunch = [];
      let dinner = [];
      this.$store.state.foods.forEach((food) => {
        if (food.time === "lunch") {
          lunch.push(food);
        } else if (food.time === "dinner") {
          dinner.push(food);
        } else {
          breakfast.push(food);
        }
      });
      return {
        breakfast,
        lunch,
        dinner,
      };
    },
    getPlans() {
      let plan = [];
      let today = new Date();
      let months = this.$store.state.months;
      let days = this.$store.state.days;
      for (let i = 0; i < 7; i++) {
        let dayPlan = { name: "", date: "", foods: [] };
        // set day of the plan
        let thisDay = new Date(today.getTime() + i * (24 * 60 * 60 * 1000));
        // set day name
        dayPlan.name = days[thisDay.getDay()];
        // set day date
        dayPlan.date = `${months[thisDay.getMonth()]} ${thisDay.getDate()}`;
        // create random numbers for foods time array & set foods
        let setTimeFoods = function () {
          for (let i = 0; i < arguments.length; i++) {
            let ran = Math.floor(Math.random() * arguments[i].length);
            dayPlan.foods.push(arguments[i][ran]);
          }
        };
        setTimeFoods(
          this.getFoodsArrays.breakfast,
          this.getFoodsArrays.lunch,
          this.getFoodsArrays.dinner
        );
        plan.push(dayPlan);
      }
      return plan;
    },
  },
};
</script>

<style lang="scss" scoped>
.meal-planner {
  padding: 20px 0;
  .cards-box {
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  }
  .day-div {
    .head {
      padding: 20px 0;
      text-align: center;
      border-top: 2px solid var(--main);
      font-weight: bold;
      font-size: 17px;
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
}
</style>
