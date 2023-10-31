import React from "react";
import ShipmentColumn from "./ShipmentColumns";

export default function  ShipmentScheduleReport() {

    const data=[
        {
            "vesselname":"rpo",
            "pic":"vivek",
            "salescontractno":"3432",
            "partybuyer":"tata",
            "quantity":"450",
            "salesprice":"45",
            "salescontractdate":"12/12/2022",
            "supplier":"hynudai",
            "quantity":"440",
            "buyprice":"85",
            "buycontractdate":"buycontractdate",
            "portofload":"portofload",
            "broker":"broker",
            "purchasecontractno":"purchasecontractno",
            "partyseller":"partyseller",


        },
        {
            "vesselname":"rpo",
            "pic":"vivek",
            "salescontractno":"3432",
            "partybuyer":"tata",
            "quantity":"450",
            "salesprice":"45",
            "salescontractdate":"12/12/2022",
            "supplier":"hynudai",
            "quantity":"440",
            "buyprice":"85",
            "buycontractdate":"buycontractdate",
            "portofload":"portofload",
            "broker":"broker",
            "purchasecontractno":"purchasecontractno",
            "partyseller":"partyseller",


        }

    ]
    return (
        <div>
        <h2>shipment </h2>
        <div>
            <ShipmentColumn data={data}/>
        </div>
        </div>
    )
}