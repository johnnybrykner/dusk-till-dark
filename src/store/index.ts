import { defineStore } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore("miscellaneous", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      loading: false,
      thrownError: "",
      notificationText: "",
      currentHour: new Date().getHours(),
      showOverlay: false,
      listToggled: false,
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
  actions: {
    handleError(errorMessage: string) {
      this.thrownError = errorMessage;
      setTimeout(() => (this.thrownError = ""), 5000);
    },
    showNotification(notificationText: string) {
      this.notificationText = notificationText;
      setTimeout(() => (this.notificationText = ""), 5000);
    },
  },
});
