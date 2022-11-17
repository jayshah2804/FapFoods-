import React, { useRef, useState } from "react";
import Records from "./Records";
import ReactPaginate from "react-paginate";
// import "./Route.css";
import { CSVLink } from "react-csv";
import { Route } from "react-router-dom";
// import AddRoute from "./AddRoute/RouteInfo";

const STAFF_DATA = [
    {
        id: 1,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 2,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 3,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 4,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 5,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 6,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 7,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 8,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 9,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 10,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 11,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 12,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 13,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 14,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
    {
        id: 15,
        name: "Jay Shah",
        mobile_no: "9232343434",
        superviser_name: "Nihal Chaudhary",
        department: "Sales and Marketing",
        status: "Active"
    },
];

const STAFF_TITLE = [
    "Name",
    "Mobile No.",
    "Supervised By",
    "Department",
    "Status"
];

let myClick = false;
let prev_id = "1";

function Routes() {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(7);
    const [filteredData, setFilteredData] = useState(STAFF_DATA);
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
        setFilteredData(STAFF_DATA.filter(data =>
            data.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            data.mobile_no.toLowerCase().includes(e.target.value.toLowerCase()) ||
            data.superviser_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            data.department.toLowerCase().includes(e.target.value.toLowerCase()) ||
            data.status.toLowerCase().includes(e.target.value.toLowerCase())
        ));
        // else setFilteredData(TRIP_DATA);
    };

    return (
        <div className="trips-details" id="trip-table">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "inline-block" }} className="title">Staff Members</div>
                <button onClick={addRouteClickHandler} style={{ marginRight: "40px", padding: "7px 14px", backgroundColor: "rgba(34, 137, 203, 255)", color: "white", border: "rgba(34, 137, 203, 255)", borderRadius: "5px", cursor: "pointer" }}>Add Staff Member</button>
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
                        <CSVLink data={STAFF_DATA} className="export_csv">
                            Export
                        </CSVLink>
                    </div>
                </div>
                <Records data={currentRecords} headers={STAFF_TITLE} />
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
            {/* {isAddRouteClicked && <AddRoute setIsAddRouteClicked={setIsAddRouteClicked} />} */}
        </div>
    );
}

export default Routes;
