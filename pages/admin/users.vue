<script setup>
import { formatDistanceToNow } from 'date-fns';
import { onSearch, onSort } from '~/componsables/filter';

definePageMeta({ layout: 'admin-layout' , middleware: 'admin'});

const usersStore = useUsersStore();
const { users, pagination, loading } = storeToRefs(usersStore);

const localUsers = ref([]);

onMounted(async () => {
  await usersStore.get();
  localUsers.value = [...users.value];
});


const deleteUser = async (id) => {
  let response = await usersStore.destroy(id);
}

const searchValue = (value) => {
    localUsers.value = onSearch(users.value,value,'username');
}

const sortBy = ({ name, type }) => {
    localUsers.value = onSort(localUsers.value,{name,type});
};

watch(users, () => {
    localUsers.value = [...users.value];
},{ deep: true });

</script>

<template>
  <div>
    <div v-if="loading.type === 'get' && loading.value">
      <Loading class="mx-auto" />
    </div>
    <div v-else>
      <FilteredBy filter="username" @onSearch="searchValue" @sortBy="sortBy"/>
      <div v-if="localUsers && localUsers.length > 0 && !loading.value">
        <BaseTable >
          <template #header>
            <thead class="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" class="px-6 py-3">Id</th>
                <th scope="col" class="px-6 py-3">Username</th>
                <th scope="col" class="px-6 py-3">Email</th>
                <th scope="col" class="px-6 py-3">Role</th>
                <th scope="col" class="px-6 py-3">Created At</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
          </template>
          <template #body>
            <tbody>
              <tr
                v-for="(user,index) in localUsers"
                :key="user.id"
                class="bg-white border-b hover:bg-gray-50"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {{ index + 1 }}
                </th>
                <td class="px-6 py-4">
                  {{ user?.username }}
                </td>
                <td class="px-6 py-4">
                  {{ user?.email }}
                </td>
                <td class="px-6 py-4 space-x-2">
                  {{ user?.role }}
                </td>
                <td class="px-6 py-4 space-x-2">
                  {{ formatDistanceToNow(new Date(user?.createdAt)) }}
                </td>
                <td class="px-6 py-4 space-x-2 flex">
                <EditUserDialog :user="user"/>
                <CheckSure @onDelete="deleteUser(user?.id)">
                  <p class="font-medium text-red-600 hover:underline">Delete</p>
                </CheckSure>
                </td>
              </tr>
            </tbody>
          </template>
        </BaseTable>
        <div class="flex items-center justify-end px-10" v-if="users && users.length > 0 && !loading.value">
          <Pagination :items="pagination" @update-page="usersStore.get($event)"/>
        </div>
      </div>
      <div v-if="localUsers && localUsers.length === 0 && !loading.value">
          <p class="text-sm font-medium text-zinc-500">There is not any user!</p>
      </div>
    </div>
  </div>
</template>
