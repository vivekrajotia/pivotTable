export const mean = (arr) => {
  const values = arr.reduce((total, num) => total + num);
  const totals = (values / arr.length).toFixed(3);
  return parseFloat(totals);
};

export const median = (arr) => {
  console.log("Received arr:", arr);

  if (!Array.isArray(arr) || arr.length === 0) {
    throw new TypeError(
      "Invalid array. Please provide a non-empty array to calculate the median."
    );
  }

  const mid = Math.floor(arr.length / 2);
  const nums = [...arr].sort((a, b) => a - b);
  console.log("Sorted nums:", nums);

  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
export const mode = (arr) => {
  let max = 0;

  const freq = Object.fromEntries(
    arr.reduce((mapper, entry) => {
      mapper.set(entry, (mapper.get(entry) || 0) + 1);
      if (mapper.get(entry) > max) max = mapper.get(entry);

      return mapper;
    }, new Map())
  );

  return Object.keys(freq)
    .filter((key) => freq[key] === max)
    .join("|");
};

export const caps = (el) => {
  return el.charAt(0).toUpperCase() + el.slice(1);
};

export const coerceType = (entry) => {
  if (typeof entry === "number") return entry;
  const parsedEntry = parseFloat(entry);
  return !isNaN(parsedEntry) ? parsedEntry : entry;
};
