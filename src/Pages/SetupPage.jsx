import React, { useEffect, useState } from "react";
import MultiSelectUI, { GenerateCode } from "../comp/Multiselect";
import { useRecoilValue } from "recoil";
import Table from "../Pivot";
import Select from "react-select";
import Filters from "../comp/Filters";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import { sortAs } from "../Tab/Utilities";
import TableRenderers from "../Tab/TableRenderers";
import createPlotlyComponent from "react-plotly.js/factory";
import createPlotlyRenderers from "../Tab/PlotlyRenderers";
import PivotTableUI from "../Tab/PivotTableUI";
import "../Tab/pivottable.css";
import "../Tab/grouping.css";


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
export default function SetupPage() 
{

      const gencode = useRecoilValue(GenerateCode);
        const [selectedColumns, setSelectedColumns] = useState([]);
          const [showTable, setShowTable] = useState(false);
            const [reloadTable, setReloadTable] = useState(false);
            const [showAdvancedOptions, setShowAdvancedOptions] =
              useState(false);

              const [ShowFilters, setShowFilters] = useState(false);
              const [SelectedFilters, setSelectedFilters] = useState([]);
              const [filterset, setFilterSet] = useState([]);

              const [pivotState, setPivotState] = useState({});
            //     data: testjson,
            //   });

  const handleGenerateTable = () => {
   setReloadTable(true);
  }

  const advanceOptions = () => {
    console.log("advance options");
    alert("advance options");
    }

    const handleAdvancedOptions = () => {
       setShowAdvancedOptions(!showAdvancedOptions);
     };

        const handleShowFilters = () => {
            setShowFilters(!ShowFilters);
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
//   console.log(col1);


   useEffect(() => {
     setShowTable(false);
     setReloadTable(false);
   }, [selectedColumns]);

   useEffect(() => {
     if (reloadTable) {
       setShowTable(true);
       setReloadTable(false);
     }
   }, [reloadTable]);


   

   const handleFilterChange = (e) => {
    console.log(e);
    const ft= e.map((x) => {
        return  x.value
        });
            
        setSelectedFilters(e);
        setFilterSet(ft);
        
    };


    const getSelectedColumnsData = () => {
    const selectedData = testjson.map((item) => {
      const selectedItem = {};
      col1.forEach((column) => {
        selectedItem[column.Header] = item[column.Header];
      });
      return selectedItem;
    });
    console.log(selectedData);
    return selectedData;
    };
    
   
    const PivotCreation=(e)=>{
     const dataset=getSelectedColumnsData();
    //  console.log(e);

     const colsMap=e.map((x) => x.value);
      console.log(colsMap);
        const pivot = {
            data: dataset,
            cols: colsMap,  
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
}
setPivotState(pivot)
    }




// console.log(filterset)


//    console.log(SelectedFilters)

   const options =col1.map((x) => x.Header);
    // console.log(options);
// const MyButton = () => (
//   <Link to="/Table">
//     <button>Generate Table</button>
//   </Link>
// );
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossorigin="anonymous"
      />
      <h1>Setup Page</h1>
      <MultiSelectUI
        options={Object.keys(testjson[0])}
        onSelect={(selectedOptions) =>
          setSelectedColumns(selectedOptions.value)
        }
      />
      <button className="btn btn-secondary" onClick={handleShowFilters}>
        select Filters
      </button>
      {ShowFilters && (
        <div>
          <h4>Selected Columns</h4>
          <Select
            options={options.map((value) => ({ value, label: value }))}
            isMulti
            //   value={selectedColumns}
            onChange={(selectedOptions) => handleFilterChange(selectedOptions)}
          />
        </div>
      )}
      <Filters
        filter={filterset}
        data={testjson}
        // periodFilter="true"
      />
      selected Columns : {JSON.stringify(col1.map((x) => x.Header))}
      <div>
        <button className="btn btn-primary" onClick={handleGenerateTable}>
          Generate Table
        </button>

        {showTable && <Table data={testjson} columns={col1} />}

        <button className="btn btn-secondary" onClick={handleAdvancedOptions}>
          Advanced Options
        </button>

        {showAdvancedOptions && (
          <div>
            <h4>Pivot by Selected Columns</h4>
            <Select
              options={options.map((value) => ({ value, label: value }))}
              isMulti
              //   value={selectedColumns}
              onChange={(selectedOptions) => PivotCreation(selectedOptions)}
            />
          </div>
        )}
        <br />

        <br />
        <PivotTableUISmartWrapper {...pivotState} onChange={setPivotState} />
      </div>
    </div>
  );
}