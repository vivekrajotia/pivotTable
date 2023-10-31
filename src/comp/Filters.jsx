import { atom, useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import Select from "react-select";
// import DatePicker, {
//   CalendarContainer,
//   registerLocale,
// } from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "../App.css";

// registerLocale("en", en);
export const FilterValue = atom({
  key: "FilterValue",
  default: {},
});
export const dateFilter = atom({
  key: "dateFilter",
  default: new Date(),
});

export const dateRangeFilter = atom({
  key: "dateRangeFilter",
  default: [null, null],
});
export const monthSelect = atom({
  key: "monthSelect",
  default: null,
});
export const monthRangeFilter = atom({
  key: "monthRangeFilter",
  default: [null, null],
});

export const PeriodFilter = atom({
  key: "PeriodFilter",
  default: null,
});

export default function Filters({
  filter,
  data,
  datefilter,
  includeDate,
  placeholder,
  latestDate,
  DateRangefilter,
  monthfilter,
  monthplaceholder,
  multimonth,
  periodFilter,
}) {
  const [Filter, setFilter] = useRecoilState(FilterValue);
  const [dateRange, setDateRange] = useRecoilState(dateRangeFilter);
  const [start, endDate] = dateRange;
  const [monthRange, setMonthRange] = useRecoilState(monthRangeFilter);
  const [month, setMonth] = useRecoilState(monthSelect);
  const [Data, setData] = React.useState([]);
  const [startmonth, endmonth] = monthRange;
  const [period, setPeriod] = useRecoilState(PeriodFilter);

  const handleChange = (e, field) => {
    const filter = { ...Filter };
    filter[field] = Object.values(e.map((item) => item.value));
    // console.log(filter);
    setFilter(filter);
  };
  const [startDate, setStartDate] = useRecoilState(dateFilter);
  const [date, setDate] = (React.useState || useState)(
    new Date(latestDate) || new Date()
  );
  const datesetter = (e) => {
    const dt = new Date(e);
    setStartDate(dt);
  };
  const onDateChanged = (selectedDate) => {
    setDate(selectedDate);
    // onDateChanged();
    setStartDate(selectedDate);
  };
  const onPeriodChanged = (e) => {
    // console.log(e);
    setPeriod(e.value);
    console.log(period);
  };

  const onMonthChanged = (selectedDate) => {
    setMonth(selectedDate);
  };
  useEffect(() => {
    setStartDate(date);
  }, [date]);
  let options = [];
  let mapper = new Map();
//   const MyContainer = ({ className, children }) => {
//     return (
//       <div style={{ marginTop: "0.5rem", color: "#fff" }}>
//         <CalendarContainer className={className}>
//           <div style={{ position: "relative" }}>{children}</div>
//         </CalendarContainer>
//       </div>
//     );
//   };
  const lookupTable = {};
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (!lookupTable[key]) {
        lookupTable[key] = {};
      }
      if (!lookupTable[key][item[key]]) {
        lookupTable[key][item[key]] = new Set();
      }
      lookupTable[key][item[key]].add(item);
    });
  });

  return (
    <div
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        zIndex: "10",
        position: "relative",
      }}
    >
      <div className="p-2"></div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridGap: "1rem",
          padding: "0.8rem",
        }}
      >
        {/* {datefilter ? (
          <div
            style={{
              display: "inline-block",
              width: "auto",
              textAlign: "top",
            }}
          >
            <div style={{ textTransform: "capitalize" }}>{placeholder}</div>

            <DatePicker
              portalId="root"
              placeholderText="dd-MM-yyyy"
              dateFormat="dd-MM-yyyy"
              selected={date}
              onChange={(e) => onDateChanged(e)}
              includeDates={includeDate}
              className="form-control"
              calendarContainer={MyContainer}
            />
          </div>
        ) : null}
        {DateRangefilter ? (
          <div
            style={{
              display: "inline-block",
              width: "auto",
              textAlign: "top",
            }}
          >
            <div style={{ textTransform: "capitalize" }}>{placeholder}</div>

            <DatePicker
              selectsRange={true}
              startDate={start}
              endDate={endDate}
              className="form-control"
              onChange={(update) => {
                setDateRange(update);
              }}
              isClearable={true}
              placeholderText={"Select a Date Range"}
            ></DatePicker>
          </div>
        ) : null} */}
        {filter.map((item) => {
          const options = Object.keys(lookupTable[item] || {});
          return (
            <>
              <div>
                <div style={{ textTransform: "capitalize" }}>
                  Filter By {item}
                </div>
                <div style={{ textTransform: "capitalize", textAlign: "left" }}>
                  <Select
                    placeholder={item}
                    onChange={(e) => handleChange(e, item)}
                    options={options.map((value) => ({ value, label: value }))}
                    isMulti
                  />
                </div>
              </div>
            </>
          );
        })}
        {/* {monthfilter ? (
          <div
            style={{
              display: "inline-block",
              width: "auto",
              textAlign: "top",
            }}
          >
            <div style={{ textTransform: "capitalize" }}>
              {monthplaceholder}
            </div>

            <DatePicker
              selected={month}
              className="form-control"
              onChange={(date) => setMonth(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              isClearable
            />
          </div>
        ) : null} */}
        {/* {multimonth ? (
          <div
            style={{
              display: "inline-block",
              width: "auto",
              textAlign: "top",
            }}
          >
            <div style={{ textTransform: "capitalize" }}>
              {monthplaceholder}
            </div>
            <DatePicker
              className="form-control"
              selectsRange={true}
              startDate={startmonth}
              endDate={endmonth}
              onChange={(update) => {
                setMonthRange(update);
              }}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              isClearable={true}
            />
          </div>
        ) : null} */}
        {/* {periodFilter ? (
          <div
            style={{ display: "inline-block", width: "auto", textAlign: "top" }}
          >
            <div style={{ textTransform: "capitalize" }}>
              Select Trade Period
            </div>
            <Select
              placeholder="Select Period"
              onChange={(e) => setPeriod(e.value)}
              options={[
                { value: "All", label: "All" },
                { value: "MTD", label: "MTD" },
                { value: "YTD", label: "YTD" },
                { value: "Last3Months", label: "Last 3 Months" },
                { value: "Last6Months", label: "Last 6 Months" },
              ]}
            />
          </div>
        ) : null} */}
      </div>
    </div>
  );
}
