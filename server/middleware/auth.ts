import type { User } from "~/types/User";

export default defineEventHandler(async (event) => {
  const user = (await getUserSession(event)).user;
  if (user && Object.keys(user).length > 0) {
    event.context.user = user;
  }
});
