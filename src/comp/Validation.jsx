import { coerceType } from "./utils";

export const checkData = (data) => {
  if (!data.length) {
    throw new Error(
      "The array is empty please make sure it includes the objects to pivot with"
    );
  }
};

export const checkIndex = (index, data) => {
  if (!index.length) {
    throw new ReferenceError(
      `Missing second argument "index", please provide a string to identify the index column.`
    );
  }

  const isIndex = Object.keys(data).includes(index);

  if (!isIndex) {
    throw new ReferenceError(`The index column "${index}" does not exists.`);
  }
};

export const checkOptions = (aggregate) => {
  if (!Object.keys(aggregate).length) {
    throw new ReferenceError(
      `No options provided for the 3 argument, please provide at least one aggregate function.`
    );
  }
};

export const checkAggKeys = (aggregate, main) => {
  const missing = Object.keys(aggregate).find((entry) => !main.includes(entry));

  if (missing) {
    throw new ReferenceError(`"${missing}" does not exists.`);
  }
};

export const checkAggType = (aggregate, data) => {
  const property = {};

  for (const [key, value] of Object.entries(aggregate)) {
    const mode = Object.values([value]).flat();

    const inclusion = mode.find(
      (entry) => !["count", "counta", "mode"].includes(entry)
    );

    if (typeof coerceType(data[key]) === "string" && inclusion) {
      property.key = key;
      property.inclusion = inclusion;
    }
  }

  if (Object.keys(property).length) {
    throw new TypeError(
      `The aggregate function "${property.inclusion}" cannot be used on the column "${property.key}" because it's a string.`
    );
  }
};

export const checkAggValues = (aggregate, aggValues) => {
  const values = Object.values(aggregate).flat();
  const missing = values.find((val) => !aggValues.includes(val)) || "";

  if (missing) {
    throw new ReferenceError(
      `Incorrect aggregate function "${missing}". Allowed functions are ${aggValues.join(
        ", "
      )}.`
    );
  }
};

export const checkRenames = (aggregate, rename) => {
  if (rename.length) {
    const columnNumber = Object.values(aggregate).flat().length + 1;
    const missing = columnNumber !== rename.length;
    if (missing) {
      throw new TypeError(
        `There should be "${columnNumber}" entries on the rename array, only "${rename.length}" defined, make sure the index is also included.`
      );
    }
  }
};
