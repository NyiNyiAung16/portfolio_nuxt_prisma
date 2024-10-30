
export  async function pageReplace(newPage) {
    const router = useRouter();
    const route = useRoute();
    
    await router.replace(`${route.path}?page=${newPage}`);
}