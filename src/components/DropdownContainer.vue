<template>
  <div class="option" @click="isExpanded = !isExpanded">
    <h2>{{ props.sectionTitle }}</h2>
    <img :src="require('../assets/images/' + props.sectionIcon + '.png')" class="option__icon"
      :class="{ 'option__icon--flipped': isExpanded }" alt="Arrow forward icon" />
    <transition name="expand" @after-enter="handleDropdownShift" @before-leave="handleDropdownShift">
      <div class="option__content" v-show="isExpanded" ref="dropdownContent">
        <slot :style="{ height: contentHeight + 'px' }"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  sectionIcon: String,
  sectionTitle: String,
});

const isExpanded = ref(false);
const contentHeight = ref(0);
const dropdownContent = ref<HTMLDivElement>();

function handleDropdownShift() {
  if (isExpanded.value) {
    contentHeight.value = dropdownContent.value?.scrollHeight || 0;
  } else {
    contentHeight.value = 0;
  }
}
</script>

<style lang="scss" scoped>
.option {
  @include tile;
  flex-wrap: wrap !important;

  &__icon {
    width: $icon-size-small;
    transition: transform 0.2s ease;
    transform: rotate(90deg);

    &--flipped {
      transform: rotate(-90deg);
    }
  }

  &__content {
    margin-top: $spacing-medium;
    @include flex-column($spacing-big);
    justify-content: center;
    transition: all 0.2s ease;
    flex-basis: 100%;
  }
}

.expand-enter,
.expand-leave-to {
  opacity: 0;
}
</style>
