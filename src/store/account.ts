import { defineStore } from "pinia";

export const useAccount = defineStore("account", {
  state: () => {
    return {
      userAccount: null,
    };
  },
  getters: {},
  actions: {},
});
