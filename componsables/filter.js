const onSearch = (data, search,name) => data.filter((item) => item[name].includes(search));

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