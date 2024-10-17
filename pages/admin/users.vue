<script setup>
import { formatDistanceToNow } from 'date-fns';
import { onSearch, onSort } from '~/componsables/filter';
import {
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table'

definePageMeta({ layout: 'admin-layout' , middleware: 'admin'});

const usersStore = useUsersStore();
const { users, pagination, loading } = storeToRefs(usersStore);

const localUsers = ref([]);
const open = ref(false);

onMounted(async () => {
  await usersStore.get();
  localUsers.value = [...users.value];
});


const deleteUser = async (id) => {
  try {
    await usersStore.destroy(id);
  } catch (error) {
    setToast({ title: error.message });
  } finally {
    open.value = false;
  }
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
  <div class="dark:bg-gray-800 dark:text-white">
    <div v-if="loading.type === 'get' && loading.value">
      <Loading/>
    </div>
    <div v-else>
      <FilteredBy filter="username" @onSearch="searchValue" @sortBy="sortBy"/>
      <div v-if="localUsers && localUsers.length > 0">
        <BaseTable caption="A list of your users">
          <template #header>
            <TableHead class="dark:text-gray-300">Id</TableHead>
            <TableHead class="dark:text-gray-300">Username</TableHead>
            <TableHead class="dark:text-gray-300">Email</TableHead>
            <TableHead class="dark:text-gray-300">Role</TableHead>
            <TableHead class="dark:text-gray-300">Created At</TableHead>
            <TableHead class="dark:text-gray-300">Action</TableHead>
          </template>
          <template #body>
            <TableRow
              v-for="(user,index) in localUsers"
              :key="user.id"
              class="dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              <TableCell class="font-medium">
                {{ index + 1}}
              </TableCell>
              <TableCell>{{ user.username }}</TableCell>
              <TableCell>{{ user.email }}</TableCell>
              <TableCell>{{ user.role }}</TableCell>
              <TableCell>{{ formatDistanceToNow(new Date(user?.createdAt)) }}</TableCell>
              <TableCell class="flex gap-1 items-center">
                <EditUserDialog :user="user"/>
                <CheckSure :open="open" :loading="loading"@onDelete="deleteUser(user?.id)" description="you want to delete this user?">
                  <p class="font-medium text-red-600 hover:underline">Delete</p>
                </CheckSure>
              </TableCell>
            </TableRow>
          </template>
        </BaseTable>
        <div class="flex items-center justify-end px-10" v-if="users && users.length > 0 && !loading.value">
          <Pagination :items="pagination" @update-page="usersStore.get($event)"/>
        </div>
      </div>
      <div v-if="localUsers && localUsers.length === 0 && !loading.value">
          <p class="text-sm font-medium text-zinc-500 dark:text-gray-400">There is not any user!</p>
      </div>
    </div>
  </div>
</template>
