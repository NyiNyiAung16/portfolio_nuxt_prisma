<script setup>
import { setToast } from '~/componsables/toastHelper';

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
    await usersStore.update(localUser.value.id, {
      username: username.value,
      email: email.value,
      role: role.value,
    });

    resetForm();
    emits("close");
  } catch (error) {
    setToast({ title: error.message });
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
