import { createStore } from "vuex";

export default createStore({
  state: {
    users: [],
    currentUser: {},
    admin: {},
    isAdmin: false,
    foods: [],
    categories: [
      { name: "meats", serName: "meat", content: [], icon: "drumstick-bite" },
      {
        name: "vegetarian",
        serName: "vegetarian",
        content: [],
        icon: "carrot",
      },
      { name: "sweets", serName: "sweets", content: [], icon: "cake-candles" },
      { name: "sea food", serName: "seafood", content: [], icon: "fish-fins" },
      { name: "fast food", serName: "fastfood", content: [], icon: "burger" },
      { name: "grain", serName: "grain", content: [], icon: "bowl-rice" },
      {
        name: "milk products",
        serName: "milkproducts",
        content: [],
        icon: "cheese",
      },
      {
        name: "drinks",
        serName: "drinks",
        content: [],
        icon: "martini-glass-citrus",
      },
      {
        name: "alcoholic drinks",
        serName: "alcohol",
        content: [],
        icon: "wine-glass",
      },
    ],
    tools: [
      { name: "grill", serName: "grill", content: [], icon: "fire" },
      { name: "oven", serName: "oven", content: [], icon: "fire-burner" },
      { name: "cup", serName: "cup", content: [], icon: "whiskey-glass" },
      { name: "scissors", serName: "scissors", content: [], icon: "scissors" },
      { name: "spoon", serName: "spoon", content: [], icon: "spoon" },
    ],
    days: [
      "sunday",
      "monday",
      "tuesday",
      "wednesDay",
      "tursday",
      "friday",
      "saturday",
    ],
    months: [
      "jan",
      "feb",
      "march",
      "april",
      "may",
      "june",
      "july",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ],
    comments: [],
  },
  // accept asynchronous operations and functions
  actions: {
    checkStorageFist({ state, commit }, title) {
      if (localStorage[title]) {
        state[title] = JSON.parse(localStorage[title]);
      } else {
        commit("updateLocalStorage", title);
      }
      // console.log(state[title]);
    },
  },
  // there are some problems with asynchronous operations and functions
  mutations: {
    updateVueStore(state) {
      for (let store in localStorage) {
        if (typeof localStorage[store] == "string") {
          localStorage[store] !== undefined
            ? (state[store] = JSON.parse(localStorage[store]))
            : false;
        }
      }
    },
    updateLocalStorage(state, title) {
      localStorage.setItem(title, JSON.stringify(state[title]));
      // console.log(`UPDATE ${state[title]}`);
    },
  },
  // computed in store
  getters: {},
});
