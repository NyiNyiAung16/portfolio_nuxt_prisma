<script setup>
definePageMeta({ layout: 'admin-layout' });

const usersStore = useUsersStore();
const { users, loading } = storeToRefs(usersStore);

onMounted(async () => {
  await usersStore.get();
})

</script>

<template>
  <div>
    <div v-if="loading">
      <Loading class="mx-auto" />
    </div>
    <BaseTable>
      <template #header>
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" class="px-6 py-3">Username</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Role</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
      </template>
      <template #body>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="bg-white border-b hover:bg-gray-50"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {{ user.username }}
            </th>
            <td class="px-6 py-4">
              {{ user.email }}
            </td>
            <td class="px-6 py-4 space-x-2">
              {{ user.role }}
            </td>
            <td class="px-6 py-4 space-x-2">
              <a href="#" class="font-medium text-blue-600 hover:underline"
                >Edit</a
              >
              <a href="#" class="font-medium text-red-600 hover:underline"
                >Delete</a
              >
            </td>
          </tr>
        </tbody>
      </template>
    </BaseTable>
  </div>
</template>
