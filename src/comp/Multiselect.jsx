import React, { useState } from "react";
import { atom, useRecoilState } from "recoil";
import "./multiselect.css";

export const GenerateCode = atom({
  key: "GenerateCode",
  default: "",
});

const MultiSelectUI = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [generateCodeValue, setGenerateCode] = useRecoilState(GenerateCode);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
      setGenerateCode(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
      setGenerateCode([...selectedOptions, option]);
    }
  };

  const handleRemoveAll = () => {
    setSelectedOptions([]);
    setGenerateCode([]);
  };

  const handleSelectAll = () => {
    setSelectedOptions(options);
    setGenerateCode(options);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateCode = () => {
    const generatedCode = selectedOptions.map((option) => {
      return `{
        Header: "${option}",
        accessor: "${option}",
      }`;
    });

    return generatedCode.join(",\n");
  };

  return (
    <>
      <div className="multi-select-container">
        <h2>Multi-Select UI</h2>
        <div className="options-container">
          <div className="filter-container">
            <input
              type="text"
              placeholder="Search options..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          {filteredOptions.map((option) => (
            <button
              key={option}
              className={`option-button ${
                selectedOptions.includes(option) ? "selected" : ""
              }`}
              onClick={() => handleOptionChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="button-container">
          <button onClick={handleRemoveAll}>Remove All</button>
          <button onClick={handleSelectAll}>Select All</button>
        </div>
      </div>
    </>
  );
};

export default MultiSelectUI;
