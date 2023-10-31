import React from "react";
import * as validation from "./Validation";
import * as util from "./utils";

export const Pivot = ({ data, index = "", aggregate = {}, rename = [] }) => {
  const store = {};
  const totalHash = {};
  const aggValues = [
    "counta",
    "count",
    "sum",
    "mean",
    "median",
    "mode",
    "min",
    "max",
  ];
  let renameCounter = 0;

  const order = data.sort((a, b) => {
    const valueA = a[index];
    const valueB = b[index];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return valueA - valueB;
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB);
    }

    // Handle cases where either valueA or valueB is undefined or of different types
    return 0;
  });

  validation.checkData(data);
  validation.checkIndex(index, data[0]);
  validation.checkOptions(aggregate);
  validation.checkAggType(aggregate, data[0]);
  validation.checkAggValues(aggregate, aggValues);
  validation.checkAggKeys(aggregate, Object.keys(data[0]));
  validation.checkRenames(aggregate, rename);

  const pivots = order.reduce((acc, row) => {
    for (const [name, types] of Object.entries(aggregate)) {
      for (const type of Object.values([types]).flat()) {
        switch (type) {
          case "count":
            if (!acc.has(row[index])) {
              if (!(name in store)) store[name] = {};
              store[name][type] = 0;
            }

            const val =
              typeof row[name] === "string" && row[name] === "" ? 0 : 1;
            store[name][type] = store[name][type] + val;
            break;
          case "counta":
            if (!acc.has(row[index])) {
              if (!(name in store)) store[name] = {};
              store[name][type] = 0;
            }

            store[name][type] = store[name][type] + 1;
            break;
          case "min":
          case "max":
          case "mean":
          case "median":
          case "mode":
            if (!acc.has(row[index])) {
              if (!(name in store)) store[name] = {};
              store[name][type] = [];
            }
            store[name][type].push(util.coerceType(row[name]));
            break;
          default:
            if (!acc.has(row[index])) {
              if (!(name in store)) store[name] = {};
              store[name][type] = 0;
            }

            const num = util.coerceType(row[name]);
            store[name][type] = store[name][type] + num;
            break;
        }
      }
    }

    const aggregateObj = {};

    for (const [name, types] of Object.entries(aggregate)) {
      let title = "";

      for (const type of Object.values([types]).flat()) {
        renameCounter++;
        const id = rename[renameCounter] ?? false;

        switch (type) {
          case "count":
            title = id ? id : `Count of ${name}`;
            aggregateObj[title] = store[name][type];
            break;
          case "counta":
            title = id ? id : `Count of ${name}`;
            aggregateObj[title] = store[name][type];
            break;
          case "mean":
          case "median":
          case "mode":
            title = id ? id : `${util.caps(type)} of ${name}`;
            const values = store[name][type];
            aggregateObj[title] = util[type](values);
            break;
          case "min":
          case "max":
            title = id ? id : `${util.caps(type)} of ${name}`;
            aggregateObj[title] = Math[type](...store[name][type]);
            break;
          default:
            title = id ? id : `Sum of ${name}`;
            aggregateObj[title] =
              (aggregateObj[title] || 0) + store[name][type];
            break;
        }

        totalHash[title] = { type, name };
      }
    }

    renameCounter = 0;
    const indexID = rename.length ? rename[0] : util.caps(index);

    acc.set(row[index], {
      [indexID]: row[index],
      ...aggregateObj,
    });

    return acc;
  }, new Map());

  const pivotTable = [...pivots.values()];

  const totals = {};

  const headers = Object.keys(pivotTable[0]);
  const first = headers.splice(0, 1)[0];
  totals[first] = "Grand Total";

  for (const header of headers) {
    const item = totalHash[header];
    const value = item.name;

    if (item.type === "mean") {
      const amount = data.reduce((acc, curr) => {
        let num = curr[value];
        if (typeof num === "string") num = util.coerceType(num);
        return acc + num;
      }, 0);

      const decimals = (amount / data.length).toFixed(2);
      totals[header] = Number(decimals);
      continue;
    }

    if (["min", "max"].includes(item.type)) {
      totals[header] = data.reduce((acc, curr) => {
        const evaluation =
          item.type === "min" ? acc < curr[value] : acc > curr[value];
        return acc !== 0 && evaluation ? acc : curr[value];
      }, 0);
      continue;
    }

    if (["median", "mode"].includes(item.type)) {
      const numbers = data.map((obj) => obj[item.name]);
      totals[header] = util[item.type](numbers);
      continue;
    }

    totals[header] = pivotTable.reduce((acc, curr) => acc + curr[header], 0);
  }

  pivotTable.push(totals);

  return pivotTable
//   (
//     <div>
//       {pivotTable.map((row, index) => (
//         <div key={index}>
//           {Object.entries(row).map(([key, value]) => (
//             <span key={key}>
//               <strong>{key}:</strong> {value} |{" "}
//             </span>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
};

export default Pivot;
