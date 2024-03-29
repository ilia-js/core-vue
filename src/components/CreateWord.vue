<template>
  <div class="create-word">
    <div class="create-word__title">{{ $lang.title.createWord }}</div>
    <div class="create-word__content">
      <InputText
        type="text"
        v-model.trim="word.title"
        :placeholder="$lang.placeholder.wordOrPhrase"
        :class="{ 'p-invalid': !word.title && isValidated }"
        @update:model-value="refreshValidation"
      />
    </div>
    <div class="create-word__top-buttons">
      <Button
        @click="onClickCreate"
        :label="$lang.button.create"
        class="save-button"
      />
      <Button
        @click="onClickBack"
        :label="$lang.button.back"
        class="back-button"
      />
    </div>

    <div class="create-word__bottom-buttons"></div>
  </div>
</template>

<script lang="ts" setup>
import Button from "primevue/button";

import { useRouter } from "vue-router";
import { routes } from "@/settings/routes";
import { onBeforeMount, reactive, ref } from "vue";
import { useAppStore } from "@/store/appStore";
import InputText from "primevue/inputtext";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import type { Word } from "@/types/word";

import { lang } from "@/lang";

const router = useRouter();
const appStore = useAppStore();

const { startLoading, stopLoading } = appStore;

const word = reactive<Word>({ title: "" });
const isValidated = ref(false);

onBeforeMount(() => {
  // TODO: It's a stub;
  startLoading();
  stopLoading();
});

const onClickBack = (): void => {
  router.push({ name: routes.home.name });
};

const onClickCreate = async (): Promise<void> => {
  isValidated.value = true;

  if (!checkCategory()) {
    return;
  }

  await Api.request({
    path: apiPaths.word,
    method: RequestMethods.Post,
    payload: word,
    successToast: lang.success.wordCreated,
    successCallback: async () => {
      await router.push({ name: routes.home.name });
    },
  });
};

const refreshValidation = (): void => {
  isValidated.value = false;
};

const checkCategory = (): boolean => {
  return !!word.title;
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";
@import "@/assets/colors.scss";

.create-word {
  padding: $px-10;

  &__title {
    padding: 0 0 $space-after-title;
    @include font-extra-large;
  }

  &__top-buttons {
    display: flex;
    gap: $px-10;
  }

  &__content {
    margin-bottom: $px-15;
  }

  &__bottom-buttons {
    margin-top: $px-20;
    .p-button.p-button-outlined {
      color: $color-dark-blue;
    }
  }
}

:deep(.p-inputtext) {
  width: 250px;
}
</style>
