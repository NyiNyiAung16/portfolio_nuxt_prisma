const onSearch = (data: any[], search: string, name: string) => {
  const searchTerm = search.toLocaleLowerCase();
  return data.filter((item) => item[name].toLocaleLowerCase().includes(searchTerm));
};

const onSort = (data: any[], { name, type }: { name: string; type: string }) =>
  data.sort((a, b) => {
    const aValue = a[name];
    const bValue = b[name];

    if (type === "asc") {
      return aValue < bValue ? -1 : 1;
    }

    return aValue > bValue ? -1 : 1;
  });

export { onSearch, onSort };
