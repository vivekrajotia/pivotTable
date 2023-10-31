import React from "react";
import { RecoilRoot } from 'recoil';
import { BrowserRouter, HashRouter, Route, Router, Routes } from 'react-router-dom';
import SetupPage from './Pages/SetupPage';
import TablePage from "./Pages/TablePage";

export default function App() {
  return (
    <RecoilRoot>
      <HashRouter >
        <Routes>
hi 

          <Route path="/" element={<SetupPage/>} />
          <Route path="/Table" element={<TablePage />} />

        </Routes>
      </HashRouter>
    </RecoilRoot>
  );
}







































// import React, { useState } from 'react';
// import tips from './tips';
// import { sortAs } from './Tab/Utilities';
// import TableRenderers from './Tab/TableRenderers';
// import createPlotlyComponent from 'react-plotly.js/factory';
// import createPlotlyRenderers from './Tab/PlotlyRenderers';
// import PivotTableUI from './Tab/PivotTableUI';
// import './Tab//pivottable.css';
// import './Tab//grouping.css';
// import Dropzone from 'react-dropzone';
// import Papa from 'papaparse';
// import { useRecoilValue} from 'recoil';
// import MultiSelectUI,{GenerateCode} from './comp/Multiselect';
// const Plot = createPlotlyComponent(window.Plotly);
// const testjson = [{
//   "tenantId": "d7408d31-d720-4173-b76e-0595ce2679b4",
//   "tradeId": "Sugar/001063",
//   "tradeType": "Physical",
//   "isProvisionalPricing": true,
//   "tradeDate": "2022-12-25T04:42:39.910359",
//   "quantity": 800,
//   "quantityUom": "MT",
//   "tradePrice": 0,
//   "tradePriceCurrency": "INR",
//   "provisionalPrice": 1800,
//   "tradeTransactionType": 1,
//   "priceType": "PTBF",
//   "tradeStatus": "Confirmed",
//   "plannedObligationId": "00112522Sugar",
//   "deliveryEndDate": "2022-12-30T00:00:00",
//   "commodity": "Sugar",
//   "company": "TATA",
//   "counterparty": "ADS2323",
//   "profitcenter": "TATAprofit",
//   "plannedQuantity": 800,
//   "priceStatus": "Fully Priced",
//   "averagePrice": 1500,
//   "pricedQuantity": 800,
//   "invoiceStatus": "Settled",
//   "incoterm": "CFR",
//   "freight": null,
//   "planId": "1026@counterparty22",
//   "allocationDate": "2022-12-25T05:04:25.179194",
//   "actualizedQuantity": 799,
//   "blNumber": null,
//   "blDate": null,
//   "broker": "",
//   "balanceQuantity": 0
// }]

// function Checkbox(props) {
//   return <label className=" checkbox-inline" style={{ textTransform: "capitalize" }}>
//     <input type="checkbox"
//       // onChange={e => props.update(e, props.name)}
//       name={props.name}
//       onChange={props.onChange}
//       defaultChecked={!props.unchecked}></input> {props.name.replace(/([A-Z])/g, " $1")}
//   </label>
// }

// function Grouping(props) {
//   const [disabled, setDisabled] = useState(true);

//   const visible = !!props.rendererName && props.rendererName.startsWith('Table');

//   if (!visible)
//     return <div></div>;

//   const onChange = e => {
//     setDisabled(!e.target.checked);
//     props.onChange(e);
//   };

//   return <div className="row text-center">
//     <div className="col-md-2 col-md-offset-3">
//       <Checkbox onChange={onChange} name="grouping" unchecked={true} />
//     </div>
//     <fieldset className="col-md-6" disabled={disabled}>
//       <Checkbox onChange={props.onChange} name="compactRows" />
//       <Checkbox onChange={props.onChange} name="rowGroupBefore" />
//       <Checkbox onChange={props.onChange} name="colGroupBefore" unchecked={true} />
//     </fieldset>
//     <br />
//     <br />
//   </div>
// }

// class PivotTableUISmartWrapper extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = { pivotState: props };
//   }

//   componentWillReceiveProps(nextProps) {
//     this.setState({ pivotState: nextProps });
//   }

//   render() {
//     return (
//       <PivotTableUI
//         renderers={Object.assign(
//           {},
//           TableRenderers,
//           createPlotlyRenderers(Plot)
//         )}
//         {...this.state.pivotState}
//         // onChange={s => this.setState({pivotState: s}))}
//         unusedOrientationCutoff={Infinity}
//       />
//     );
//   }
// }


// export default class App extends React.Component {

// // function App() {
  

//   componentWillMount() {
//     this.setState({
//       mode: 'demo',
//       filename: 'Sample Dataset: Tips',
//       pivotState: {
//         data: tips,
//         rows: ['Payer Gender', "Meal"],
//         cols: ["Payer Smoker", 'Party Size',],
//         // aggregatorName: 'Sum over Sum',
//         vals: ['Tip', 'Total Bill'],
//         // rendererName: 'Grouped Column Chart',
//         rendererName: 'Table',
//         sorters: {
//           Meal: sortAs(['Lunch', 'Dinner']),
//           'Day of Week': sortAs([
//             'Thursday',
//             'Friday',
//             'Saturday',
//             'Sunday',
//           ]),
//         },
//         plotlyOptions: { width: 900, height: 500 },
//         plotlyConfig: {},
//         tableOptions: {
//           clickCallback: function (e, value, filters, pivotData) {
//             var names = [];
//             pivotData.forEachMatchingRecord(filters, function (
//               record
//             ) {
//               names.push(record.Meal);
//             });
//             alert(names.join('\n'));
//           },
//         },
//       },
//     });
//   }

//   onDrop(files) {
//     this.setState(
//       {
//         mode: 'thinking',
//         filename: '(Parsing CSV...)',
//         textarea: '',
//         pivotState: { data: [] },
//       },
//       () =>
//         Papa.parse(files[0], {
//           skipEmptyLines: true,
//           error: e => alert(e),
//           complete: parsed =>
//             this.setState({
//               mode: 'file',
//               filename: files[0].name,
//               pivotState: { data: parsed.data },
//             }),
//         })
//     );
//   }

//   onType(event) {
//     Papa.parse(event.target.value, {
//       skipEmptyLines: true,
//       error: e => alert(e),
//       complete: parsed =>
//         this.setState({
//           mode: 'text',
//           filename: 'Data from <textarea>',
//           textarea: event.target.value,
//           pivotState: { data: parsed.data },
//         }),
//     });
//   }

//   onGrouping({ target: { name, checked } }) {
//     var pivotState = Object.assign({}, this.state.pivotState);
//     pivotState[name] = checked;
//     this.setState({ pivotState });
//   }
  


 
//   render() {

  
//     return (
//     // <RecoilRoot >
//       <div>
//         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
        
//         <div>
//           MultiSelectUI
//           <MultiSelectUI
//             options={Object.keys(testjson[0])}
//           />
//         </div>
        

//         <div className="row text-center">
//           <div className="col-md-3 col-md-offset-3">
//             <p>Try it right now on a file...</p>
//             <Dropzone
//               onDrop={this.onDrop.bind(this)}
//               accept="text/csv"
//               className="dropzone"
//               activeClassName="dropzoneActive"
//               rejectClassName="dropzoneReject"
//             >
//               <p>
//                 Drop a CSV file here, or click to choose a file
//                 from your computer.
//               </p>
//             </Dropzone>
//           </div>
//           <div className="col-md-3 text-center">
//             <p>...or paste some data:</p>
//             <textarea
//               value={this.state.textarea}
//               onChange={this.onType.bind(this)}
//               placeholder="Paste from a spreadsheet or CSV-like file"
//             />
//           </div>
//         </div>
//         <div className="row text-center">
//           <p>
//             <em>Note: the data never leaves your browser!</em>
//           </p>
//           <br />
//         </div>
//         <div className="row">
//           <h2 className="text-center">{this.state.filename}</h2>
//           <br />

//         </div>
//         <Grouping
//           onChange={this.onGrouping.bind(this)}
//           rendererName={this.state.pivotState.rendererName}
//         />
//         <div className="row">
//           <PivotTableUISmartWrapper {...this.state.pivotState} onChange={s => this.setState({ pivotState: s })} />
//         </div>
//       </div>
   
//     );
//   }
// }
// // export default App;


