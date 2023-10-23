<template>
  <div class="settings">
    <header class="g-page-header">
      <h1 class="g-page-header__title">Settings</h1>
    </header>
    <div class="settings__wrapper">
      <DropdownContainer section-icon="arrow-right_icon_black" section-title="Set streaming country">
        <div class="setting__option" v-for="country in availableCountries" :key="country.country_code">
          <input type="checkbox" class="content__piece" :id="country.country_code"
            :checked="account.selectedCountries.some(selectedCountry => selectedCountry.country_code === country.country_code)"
            @change="handleCountryInput(country)">
          <label :for="country.country_code">{{ country.country_name }}</label>
        </div>
      </DropdownContainer>
      <DropdownContainer section-icon="arrow-right_icon_black" section-title="Set providers">
        <div class="setting__option" v-for="provider in availableProviders" :key="provider.provider_id">
          <input type="checkbox" class="content__piece" :id="(provider.provider_id as number).toString()"
            :checked="account.selectedProviders.some(selectedProvider => selectedProvider.provider_id === provider.provider_id)"
            @change="handleProviderInput(provider)">
          <label :for="(provider.provider_id as number).toString()">{{ provider.provider_name }}</label>
        </div>
      </DropdownContainer>
      <div class="option" @click="handleUserLogout">
        <h2>Log out</h2>
        <img src="../assets/images/arrow-right_icon_black.png" class="option__icon" alt="Arrow forward icon" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DropdownContainer from "@/components/DropdownContainer.vue";
import { useAccount } from "@/store/account";
import { OurWatchProviders, StreamingCountry, StreamingProvider } from "@/types/apiTypes";
import { readonly } from "vue";
import { useRouter } from "vue-router";

const account = useAccount();
const router = useRouter();

const availableCountries = readonly([{ country_code: "CZ", country_name: "Czech Republic" }, { country_code: "NL", country_name: "Netherlands" }, { country_code: "SE", country_name: "Sweden" }]);
const availableProviders = readonly([{ provider_id: OurWatchProviders.NETFLIX, provider_name: "Netflix" }, { provider_id: OurWatchProviders.PRIME, provider_name: "Amazon Prime" }, { provider_id: OurWatchProviders.DISNEY, provider_name: "Disney+" }]);

async function handleCountryInput(country: StreamingCountry) {
  if (!account.userAccount) return;
  const countryIndex = account.userAccount.account_settings.streaming_countries.findIndex((selectedCountry) => selectedCountry.country_code === country.country_code);
  if (countryIndex === -1) {
    account.userAccount.account_settings.streaming_countries.push(country);
  } else {
    account.userAccount.account_settings.streaming_countries.splice(countryIndex, 1);
  }
  await account.updateSettings(account.userAccount.account_settings);
}

async function handleProviderInput(provider: StreamingProvider) {
  if (!account.userAccount) return;
  const providerIndex = account.userAccount.account_settings.streaming_providers.findIndex((selectedProvider) => selectedProvider.provider_id === provider.provider_id);
  if (providerIndex === -1) {
    account.userAccount.account_settings.streaming_providers.push(provider);
  } else {
    account.userAccount.account_settings.streaming_providers.splice(providerIndex, 1);
  }
  await account.updateSettings(account.userAccount.account_settings);
}

async function handleUserLogout() {
  await account.userLogout();
  router.replace({ name: "login" });
}
</script>

<style scoped lang="scss">
.settings {
  @include body;

  &__wrapper {
    @include flex-column($row-gap: $spacing-min);

    .option {
      @include tile;
      @include flex-row;
      justify-content: space-between;

      &__icon {
        width: $icon-size-small;
      }
    }
  }
}
</style>
