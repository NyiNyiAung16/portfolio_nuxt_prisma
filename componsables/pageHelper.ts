export  async function pageReplace(newPage: number) : Promise<void> {
    const route = useRoute();
    
    await navigateTo({
        path: route.path,
        query: {
            page: newPage
        }
    });

    window.scrollTo(0, 0);
}