import { UserAccount } from "@/types/apiTypes";
import { defineStore } from "pinia";

export const useAccount = defineStore("account", {
  state: () => {
    return {
      userAccount: {} as UserAccount,
    };
  },
  getters: {},
  actions: {},
});
