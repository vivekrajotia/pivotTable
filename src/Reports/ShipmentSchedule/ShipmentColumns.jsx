import PivotTable from "../../components/PivotTable";
import Tables from "../../components/Table";
import React from "react";

export default function ShipmentColumn() {
  const Tab = [
    {
      vesselname: "rpo",
      pic: "vivek",
      salescontractno: "3432",
      partybuyer: "tata",
      quantity: "450",
      salesprice: "45",
      salescontractdate: "12/12/2022",
      supplier: "hynudai",
      quantity: "440",
      buyprice: "85",
      buycontractdate: "buycontractdate",
      portofload: "portofload",
      broker: "broker",
      purchasecontractno: "purchasecontractno",
      partyseller: "partyseller",
    },
    {
      vesselname: "rpo",
      pic: "vivek",
      salescontractno: "3432",
      partybuyer: "tata",
      quantity: "450",
      salesprice: "45",
      salescontractdate: "12/12/2022",
      supplier: "hynudai",
      quantity: "440",
      buyprice: "85",
      buycontractdate: "buycontractdate",
      portofload: "portofload",
      broker: "broker",
      purchasecontractno: "purchasecontractno",
      partyseller: "partyseller",
    },
  ];

  console.log(Tab);

  const columns = React.useMemo(() => [
    {
      Header: "VesselName",
      accessor: "vesselname",
      aggregate: "uniqueCount",
    },
    {
      Header: "PIC",
      accessor: "pic",
     
    },
    {
      Header: "SalesContract #",
      accessor: "salescontractno",
    },
    {
      Header: "Party(Buyer)",
      accessor: "partybuyer",
    },
    {
      Header: "Quantity",
      accessor: "quantity1",
    },
    {
      Header: "Sales Price",
      accessor: "salesprice",
    },
    {
      Header: "Sales Contract Date",
      accessor: "salescontractdate",
    },
    {
      Header: "Supplier",
      accessor: "supplier",
    },
    {
      Header: "Quantity",
      accessor: "quantity2",
    },
    {
      Header: "Buy Price",
      accessor: "buyprice",
    },
    {
      Header: "Buy Contract Date",
      accessor: "buycontractdate",
    },
    {
      Header: "Port of Load",
      accessor: "portofload",
    },
    {
      Header: "Broker",
      accessor: "broker",
    },
    {
      Header: "purchase Contract #",
      accessor: "purchasecontractno",
    },
    {
      Header: "Quantity Loaded",
      accessor: "quantityloaded",
    },
    {
      Header: "Stowage",
      accessor: "stowage",
    },
    {
      Header: "B/L #",
      accessor: "blno",
    },
  ]);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <PivotTable Data={Tab} columns={columns} groupedcols={["vesselname"]} />
    </div>
  );
}
