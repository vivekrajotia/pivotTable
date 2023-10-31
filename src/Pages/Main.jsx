import React, { useState, useEffect } from "react";
import tips from "./tips";
import { sortAs } from "./Tab/Utilities";
import TableRenderers from "./Tab/TableRenderers";
import createPlotlyComponent from "react-plotly.js/factory";
import createPlotlyRenderers from "./Tab/PlotlyRenderers";
import PivotTableUI from "./Tab/PivotTableUI";
import "./Tab/pivottable.css";
import "./Tab/grouping.css";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import { useRecoilValue } from "recoil";
import MultiSelectUI, { GenerateCode } from "./comp/Multiselect";
import Table from "./Pivot";
import { saveAs } from "file-saver";
import { useDrag } from "react-dnd";

// const reports=require('./saveReport.json');

const DataTab = ({ dataSource, onDataSourceSelect }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "dataSource", dataSource },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: "move" }}
      onClick={() => onDataSourceSelect(dataSource)}
    >
      {dataSource.name}
    </div>
  );
};

const Plot = createPlotlyComponent(window.Plotly);
const testjson = [
  {
    tenantId: "d7408d31-d720-4173-b76e-0595ce2679b4",
    tradeId: "Sugar/001063",
    tradeType: "Physical",
    isProvisionalPricing: true,
    tradeDate: "2022-12-25T04:42:39.910359",
    quantity: 800,
    quantityUom: "MT",
    tradePrice: 0,
    tradePriceCurrency: "INR",
    provisionalPrice: 1800,
    tradeTransactionType: 1,
    priceType: "PTBF",
    tradeStatus: "Confirmed",
    plannedObligationId: "00112522Sugar",
    deliveryEndDate: "2022-12-30T00:00:00",
    commodity: "Sugar",
    company: "TATA",
    counterparty: "ADS2323",
    profitcenter: "TATAprofit",
    plannedQuantity: 800,
    priceStatus: "Fully Priced",
    averagePrice: 1500,
    pricedQuantity: 800,
    invoiceStatus: "Settled",
    incoterm: "CFR",
    freight: null,
    planId: "1026@counterparty22",
    allocationDate: "2022-12-25T05:04:25.179194",
    actualizedQuantity: 799,
    blNumber: null,
    blDate: null,
    broker: "",
    balanceQuantity: 0,
  },
];

function Checkbox(props) {
  return (
    <label className="checkbox-inline" style={{ textTransform: "capitalize" }}>
      <input
        type="checkbox"
        name={props.name}
        onChange={props.onChange}
        defaultChecked={!props.unchecked}
      />{" "}
      {props.name.replace(/([A-Z])/g, " $1")}
    </label>
  );
}

function Grouping(props) {
  const [disabled, setDisabled] = useState(true);

  const visible =
    !!props.rendererName && props.rendererName.startsWith("Table");

  useEffect(() => {
    setDisabled(!props.onChange);
  }, [props.onChange]);

  const onChange = (e) => {
    setDisabled(!e.target.checked);
    props.onChange(e);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="row text-center">
      <div className="col-md-2 col-md-offset-3">
        <Checkbox onChange={onChange} name="grouping" unchecked={true} />
      </div>
      <fieldset className="col-md-6" disabled={disabled}>
        <Checkbox onChange={props.onChange} name="compactRows" />
        <Checkbox onChange={props.onChange} name="rowGroupBefore" />
        <Checkbox
          onChange={props.onChange}
          name="colGroupBefore"
          unchecked={true}
        />
      </fieldset>
      <br />
      <br />
    </div>
  );
}

function PivotTableUISmartWrapper(props) {
  return (
    <PivotTableUI
      renderers={{
        ...TableRenderers,
        ...createPlotlyRenderers(Plot),
      }}
      {...props}
      unusedOrientationCutoff={Infinity}
    />
  );
}

export default function App() {
  const gencode = useRecoilValue(GenerateCode);
  const [fieldsSaved, setFieldsSaved] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [fieldSets, setFieldSets] = useState([]);
  const [col, setCol] = useState([]);

  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [mode, setMode] = useState("demo");
  const [filename, setFilename] = useState("Sample Dataset: Tips");

  const [pivotState, setPivotState] = useState({
    data: testjson,
    rows: ["tradePriceCurrency"],
    cols: ["quantityUom"],
    vals: ["quantity"],
    rendererName: "Table",
    sorters: {
      Meal: sortAs(["Lunch", "Dinner"]),
      "Day of Week": sortAs(["Thursday", "Friday", "Saturday", "Sunday"]),
    },
    plotlyOptions: { width: 900, height: 500 },
    plotlyConfig: {},
    tableOptions: {
      clickCallback: function (e, value, filters, pivotData) {
        var names = [];
        pivotData.forEachMatchingRecord(filters, function (record) {
          names.push(record.Meal);
        });
        alert(names.join("\n"));
      },
    },
  });

  // const dataSources = [testjson]
  const dataSources = [
    {
      name: "Data Source 1",
      columns: ["Column 1", "Column 2", "Column 3"],
    },
    {
      name: "Data Source 2",
      columns: ["Column A", "Column B", "Column C"],
    },
    // Add more data sources as needed
  ];

  // console.log(gencode);

  const handleDataSourceSelect = (dataSource) => {
    setSelectedDataSource(dataSource);
    setSelectedColumns([]); // Reset selected columns when a new data source is selected
  };

  const handleColumnSelect = (column) => {
    setSelectedColumns((prevColumns) => [...prevColumns, column]);
  };

  // Render the column selection box
  const renderColumnSelectionBox = () => {
    return (
      <div>
        <h3>Select Data Source:</h3>
        {dataSources.map((dataSource) => (
          <button
            key={dataSource.name}
            onClick={() => handleDataSourceSelect(dataSource)}
          >
            {dataSource.name}
          </button>
        ))}

        {selectedDataSource && (
          <div>
            <h3>Select Columns:</h3>
            {selectedDataSource.columns.map((column) => (
              <button key={column} onClick={() => handleColumnSelect(column)}>
                {column}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const col1 = React.useMemo(() => {
    if (gencode.length > 0) {
      return gencode.map((option) => ({
        Header: option,
        accessor: option, // Use the same value for both Header and accessor
      }));
    } else {
      return [
        {
          Header: 'Table',
          accessor: 'table',
        },
      ];
    }
  }, [gencode]);

//   const col1 = React.useMemo(() => {
//     if (selectedColumns.length > 0) {
//       return selectedColumns.map((column) => ({
//         Header: column,
//         accessor: column,
//       }));
//     } else {
//       return [
//         {
//           Header: "Table",
//           accessor: "table",
//         },
//       ];
//     }
//   }, [selectedColumns]);

//   useEffect(() => {
//     if (gencode.length > 0) {
//       setCol(col1);
//     }
//   }, [gencode]);

  useEffect(() => {
    const savedFieldSets = localStorage.getItem("savedFieldSets");
    if (savedFieldSets) {
      const parsedFieldSets = JSON.parse(savedFieldSets);
      setFieldSets(parsedFieldSets);
      console.log("Selected fields loaded from local storage");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedFieldSets", JSON.stringify(fieldSets));
  }, [fieldSets]);
  // console.log(col);
  const onDrop = (files) => {
    setMode("thinking");
    setFilename("(Parsing CSV...)");
    setPivotState({ data: [] });

    Papa.parse(files[0], {
      skipEmptyLines: true,
      error: (e) => alert(e),
      complete: (parsed) => {
        setMode("file");
        setFilename(files[0].name);
        setPivotState({ data: parsed.data });
      },
    });
  };

  const onType = (event) => {
    Papa.parse(event.target.value, {
      skipEmptyLines: true,
      error: (e) => alert(e),
      complete: (parsed) => {
        setMode("text");
        setFilename("Data from <textarea>");
        setPivotState({ data: parsed.data });
      },
    });
  };

  const onGrouping = ({ target: { name, checked } }) => {
    setPivotState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const saveFieldsToLocalStorage = () => {
    const selectedFields = {
      name: fieldName,
      columns: col.map((column) => column.Header),
    };

    const savedFields = localStorage.getItem("savedFields");
    if (savedFields) {
      const parsedFields = JSON.parse(savedFields);
      if (parsedFields.name === fieldName) {
        alert(
          `Field set name "${fieldName}" already exists. Please choose a different name.`
        );
        return;
      }
    }

    const json = JSON.stringify(selectedFields);

    localStorage.setItem("savedFields", json);
    const updatedFieldSets = [...fieldSets, selectedFields]; // Append the new field set to the existing array
    setFieldSets(updatedFieldSets);
    setFieldsSaved(true);
    alert(`Selected fields saved successfully for field set "${fieldName}"`);
    console.log("Selected fields saved to local storage");
  };
  const loadFieldsFromLocalStorage = (selectedFields) => {
    const savedFieldSets = localStorage.getItem("savedFieldSets");
    if (savedFieldSets) {
      const parsedFieldSets = JSON.parse(savedFieldSets);
      setFieldSets(parsedFieldSets);
      console.log("Selected fields loaded from local storage");

      // Find the selected field set by name
      const fieldSet = parsedFieldSets.find(
        (fieldSet) => fieldSet.name === selectedFields
      );
      if (fieldSet) {
        // Update the col state based on the selected field set
        const savedColumns = fieldSet.columns.map((field) => ({
          Header: field,
          accessor: field,
        }));
        setCol(savedColumns);
      }
    }
  };
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossorigin="anonymous"
      />

      <div>
        MultiSelectUI
        <div>{renderColumnSelectionBox()}</div>
        <MultiSelectUI options={Object.keys(testjson[0])} />
      </div>
      <div>
        <Table columns={col} data={testjson} />
      </div>

      <div
        className="row "
        style={{
          padding: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          placeholder="Enter field set name"
        />
        <button onClick={saveFieldsToLocalStorage}>Save Fields</button>
        <button onClick={loadFieldsFromLocalStorage}>Load Fields</button>
        {fieldsSaved}

        <select
          value={fieldName}
          onChange={(e) => {
            setFieldName(e.target.value);
            loadFieldsFromLocalStorage(e.target.value);
          }}
        >
          <option value="">Select Field Set</option>
          {fieldSets.map((fieldSet) => (
            <option key={fieldSet.name} value={fieldSet.name}>
              {fieldSet.name}
            </option>
          ))}
        </select>
      </div>

      <div className="row text-center">
        <div className="col-md-3 col-md-offset-3">
          <p>Try it right now on a file...</p>
          <Dropzone
            onDrop={onDrop}
            accept="text/csv"
            className="dropzone"
            activeClassName="dropzoneActive"
            rejectClassName="dropzoneReject"
          >
            <p>
              Drop a CSV file here, or click to choose a file from your
              computer.
            </p>
          </Dropzone>
        </div>
        <div className="col-md-3 text-center">
          <p>...or paste some data:</p>
          <textarea
            value={pivotState.textarea}
            onChange={onType}
            placeholder="Paste from a spreadsheet or CSV-like file"
          />
        </div>
      </div>
      <div className="row text-center">
        <p>
          <em>Note: the data never leaves your browser!</em>
        </p>
        <br />
      </div>
      <div className="row">
        <h2 className="text-center">{filename}</h2>
        <br />
      </div>
      <Grouping onChange={onGrouping} rendererName={pivotState.rendererName} />
      <div className="row">
        <PivotTableUISmartWrapper {...pivotState} onChange={setPivotState} />
      </div>
    </div>
  );
}
