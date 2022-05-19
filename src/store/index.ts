import { defineStore } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore("miscellaneous", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      currentHour: new Date().getHours(),
    };
  },
  getters: {
    headerGreeting: (state) => {
      if (state.currentHour >= 4 && state.currentHour < 12)
        return "Good morning";
      if (state.currentHour >= 12 && state.currentHour < 20)
        return "Good afternoon";
      if (
        state.currentHour >= 20 ||
        (state.currentHour >= 0 && state.currentHour < 4)
      )
        return "Good evening";
    },
  },
  actions: {},
});
