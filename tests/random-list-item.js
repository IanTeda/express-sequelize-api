
const randomListItem = (list) => {
  // Get a random number between 0 an 1 and multiple by the length of the array
  let percentage = Math.random();

  // Count the number of list values
  const count = Object.values(list).length;

  // Using floor to round downward the nearest integer
  let randomListNumber = Math.floor(percentage * count);

  // Random array value
  const randomListValue = Object.values(list)[randomListNumber];

  // Return random value
  return randomListValue;
};

export default randomListItem
