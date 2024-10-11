const onSearch = (data, search, name) => {
  const searchTerm = search.toLocaleLowerCase();
  return data.filter((item) => item[name].toLocaleLowerCase().includes(searchTerm));
};

const onSort = (data, { name, type }) =>
  data.sort((a, b) => {
    const aValue = a[name];
    const bValue = b[name];

    if (type === "asc") {
      return aValue < bValue ? -1 : 1;
    }

    return aValue > bValue ? -1 : 1;
  });

export { onSearch, onSort };
