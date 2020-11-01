const addOrRemove = (array, item) => {
  const exists = array.includes(item);

  if (exists) {
    return array.filter(c => c !== item);
  } else {
    return [...array, item];
  }
};

export default addOrRemove;
