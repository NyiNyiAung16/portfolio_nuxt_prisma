<script setup>
const { user } = defineProps({
  user: {
    type: Object,
  },
});

const emits = defineEmits(["close"]);

const usersStore = useUsersStore();
const { users, error, loading } = storeToRefs(usersStore);

const localUser = ref({ ...user });
const username = ref(localUser.value.username || "");
const email = ref(localUser.value.email || "");
const role = ref(localUser.value.role || "");

const onSubmit = async (e) => {
  let response = await usersStore.update(localUser.value.id, {
    username: username.value,
    email: email.value,
    role: role.value,
  });

  if (response?.status === 200 && response?.statusText == "OK") {
    username.value = "";
    email.value = "";
    role.value = "";
    users.value = users.value.map((user) =>
      user.id === response.data.id
        ? {
            ...user,
            ...response.data
          }
        : user
    );
    emits("close");
  }
};
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
      <BaseButton class-name="text-sm" :disabled="loading">
        <span v-if="!loading">Save Changes</span>
        <Loading v-if="loading" />
      </BaseButton>
    </form>
  </div>
</template>
