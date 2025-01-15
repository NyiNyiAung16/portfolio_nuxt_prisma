<script setup>
import { setToast } from '~/componsables/toastHelper';
import { userSchema } from '~/validations/userValidation';
import { z } from 'zod';
import { zodErrorsToObject } from '~/componsables/zodErrorsHelper';

const { user } = defineProps({
  user: {
    type: Object,
  },
});

const emits = defineEmits(["close"]);

const usersStore = useUsersStore();
const { error, loading } = storeToRefs(usersStore);

const localUser = ref({ ...user });
const username = ref(localUser.value.username || "");
const email = ref(localUser.value.email || "");
const role = ref(localUser.value.role || "");

const onSubmit = async () => {
  try {
    const result = userSchema.parse({ username: username.value, email: email.value, role: role.value });
    let response = await usersStore.update(localUser.value.id, result);

    if( response && response.status === 200 ){ 
      resetForm();
      emits("close");
    }
  } catch (e) {
    if(e instanceof z.ZodError){
      error.value = zodErrorsToObject(e.errors);
      setTimeout(() => error.value = null, 2000);
    } else if(e instanceof Error) {
      setToast({ title: e.message });
    }
  }
};


const resetForm = () => {
  username.value = "";
  email.value = "";
  role.value = "";
}

</script>

<template>
  <div>
    <form class="space-y-3" @submit.prevent="onSubmit">
      <BaseInput type="text" placeholder="Username" v-model="username" />
      <BaseError v-if="error?.username">{{ error?.username }}</BaseError>
      <BaseInput type="email" placeholder="Email Address" v-model="email" />
      <BaseError v-if="error?.email">{{ error?.email }}</BaseError>
      <BaseSelect label="Role" v-model="role" :options="['USER', 'ADMIN']" />
      <BaseError v-if="error?.password">{{ error?.password }}</BaseError>
      <Button type="submit" :disabled="loading.value">
        <span v-if="loading.type !== 'update' && !loading.value">Save Changes</span>
        <Loading v-if="loading.type === 'update'  && loading.value" />
      </Button>
    </form>
  </div>
</template>
