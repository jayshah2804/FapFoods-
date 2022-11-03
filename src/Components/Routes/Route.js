import React, { useRef, useState } from "react";
import Records from "./Records";
import ReactPaginate from "react-paginate";
import "./Route.css";
import { CSVLink } from "react-csv";
import { Route } from "react-router-dom";
import AddRoute from "./AddRoute/RouteInfo";

const TRIP_DATA = [
    {
        id: 1,
        route_id: "SDFGT65657",
        route: "my route",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Sales and Marketing",
    },
    {
        id: 2,
        route_id: "SDFGT65657",
        route: "Route 1",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Admin",
    },
    {
        id: 3,
        route_id: "SDFGT65657",
        route: "Route 1",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "picking",
        department: "Sales and Marketing",
    },
    {
        id: 4,
        route_id: "SDFGT65657",
        route: "Testing route",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Sales and Marketing",
    },
    {
        id: 5,
        route_id: "SDFGT65657",
        route: "Route 1",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Sales and Marketing",
    },
    {
        id: 6,
        route_id: "SDFGT65657",
        route: "Route 1",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Sales and Marketing",
    },
    {
        id: 7,
        route_id: "SDFGT65657",
        route: "Route 1",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Sales and Marketing",
    },
    {
        id: 8,
        route_id: "SDFGT65657",
        route: "Route 1",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Sales and Marketing",
    },
    {
        id: 9,
        route_id: "SDFGT65657",
        route: "Route 1",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Sales and Marketing",
    },
    {
        id: 10,
        route_id: "SDFGT65657",
        route: "Route 1",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Sales and Marketing",
    },
    {
        id: 11,
        route_id: "SDFGT65657",
        route: "Route 1",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Sales and Marketing",
    },
    {
        id: 12,
        route_id: "SDFGT65657",
        route: "Route 1",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Sales and Marketing",
    },
    {
        id: 13,
        route_id: "SDFGT65657",
        route: "Route 1",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Sales and Marketing",
    },
    {
        id: 14,
        route_id: "SDFGT65657",
        route: "Route 1",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Sales and Marketing",
    },
    {
        id: 15,
        route_id: "SDFGT65657",
        route: "Route 1",
        city: "Ahmedabad",
        country: "India",
        zone_price: "100",
        route_type: "dropping",
        department: "Sales and Marketing",
    },
];

const TRIP_TITLE = [
    "Route_ID",
    "Route",
    "City",
    "Country",
    "Zone Price",
    "Route Type",
    "Department",
];

let myClick = false;
let prev_id = "1";

function Routes() {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(7);
    const [filteredData, setFilteredData] = useState(TRIP_DATA);
    const searchInputRef = useRef();
    const [isAddRouteClicked, setIsAddRouteClicked] = useState();

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    let currentRecords;
    // if (myClick) {
    currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
    // } else {
    // currentRecords = filteredData;
    // }
    const nPages = Math.ceil(filteredData.length / recordsPerPage);

    let fromRecords = 0;
    if (currentPage === 1) fromRecords = 1;
    else fromRecords = (currentPage - 1) * recordsPerPage;
    let toRecords = 0;
    if (
        (myClick
            ? currentPage * recordsPerPage - (filteredData.length % recordsPerPage)
            : currentPage * recordsPerPage +
            recordsPerPage -
            (filteredData.length % recordsPerPage)) > filteredData.length
    )
        toRecords = filteredData.length;
    else toRecords = currentPage * recordsPerPage;
    if (toRecords === 0) fromRecords = 0;
    if (currentPage === nPages) toRecords = filteredData.length;

    const addRouteClickHandler = () => {
        setIsAddRouteClicked(true);
    }

    const routeSearchHandler = (e) => {
        // if (e.target.value)
            setFilteredData(TRIP_DATA.filter(data => data.route.toLowerCase().includes(e.target.value.toLowerCase()) ||
                data.route_id.toLowerCase().includes(e.target.value.toLowerCase()) ||
                data.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
                data.country.toLowerCase().includes(e.target.value.toLowerCase()) ||
                data.zone_price.toLowerCase().includes(e.target.value.toLowerCase()) ||
                data.route_type.toLowerCase().includes(e.target.value.toLowerCase()) ||
                data.department.toLowerCase().includes(e.target.value.toLowerCase())
            ));
        // else setFilteredData(TRIP_DATA);
    };

    return (
        <div className="trips-details" id="trip-table">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "inline-block" }} className="title">corporate shuttle routes</div>
                <button onClick={addRouteClickHandler} style={{ marginRight: "40px", padding: "7px 14px", backgroundColor: "rgba(34, 137, 203, 255)", color: "white", border: "rgba(34, 137, 203, 255)", borderRadius: "5px", cursor: "pointer" }}>Add Route</button>
            </div>
            <div className="table-container-routes">
                <div className="header">
                    <div>
                        <div onChange={routeSearchHandler} className="route-search">
                            <input
                                placeholder="Search"
                                type="text"
                                ref={searchInputRef}
                            />
                        </div>
                        <CSVLink data={TRIP_DATA} className="export_csv">
                            Export
                        </CSVLink>
                    </div>
                </div>
                <Records data={currentRecords} headers={TRIP_TITLE} />
                <div className="footer">
                    <p>
                        Showing {fromRecords} to {toRecords} of {filteredData.length}{" "}
                        entries{" "}
                    </p>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={(e) => setCurrentPage(e.selected + 1)}
                        pageRangeDisplayed={3}
                        pageCount={nPages}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination"
                        pageLinkClassName="page-num"
                        previousLinkClassName="page-num"
                        nextLinkClassName="page-num"
                        activeLinkClassName="active"
                    />
                </div>
            </div>
            {isAddRouteClicked && <AddRoute setIsAddRouteClicked={setIsAddRouteClicked} />}
        </div>
    );
}

export default Routes;
