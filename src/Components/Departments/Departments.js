import React, { useRef, useState } from "react";
import Records from "./Records";
import ReactPaginate from "react-paginate";
// import "./Route.css";
import { CSVLink } from "react-csv";
import AddDepartment from "./AddDepartment";
import { useHistory } from "react-router-dom";
// import { Route } from "react-router-dom";
// import AddRoute from "./AddRoute/RouteInfo";

const Department_DATA = [
    {
        id: 1,
        department_name: "Sales and Marketing",
        admin_name: "Jay Shah",
        admin_email: "jayshah9791@gmail.com"
    },
    {
        id: 2,
        department_name: "Little School Testing",
        admin_name: "Unnati Shah",
        admin_email: "unnati@gmail.com"
    }
];

const TRIP_TITLE = [
    "Department Name",
    "Admin Name",
    "Admin Email",
    "Actions"
];

let myClick = false;
let prev_id = "1";

function Routes() {
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(7);
    const [filteredData, setFilteredData] = useState(Department_DATA);
    const searchInputRef = useRef();
    const [isAddRouteClicked, setIsAddRouteClicked] = useState();
    const history = useHistory();

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

    const addDepartmentClickHandler = () => {
        // setIsAddRouteClicked(true);
        history.push("/departments/add-new");
    }

    const routeSearchHandler = (e) => {
        if (e.target.value)
            setFilteredData(Department_DATA.filter(data => data.department_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                data.admin_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                data.admin_email.toLowerCase().includes(e.target.value.toLowerCase())
            ));
        else setFilteredData(Department_DATA);
    };

    return (
        <div className="trips-details" id="trip-table">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "inline-block" }} className="title">Departments</div>
                <button onClick={addDepartmentClickHandler} style={{ marginRight: "40px", padding: "7px 14px", backgroundColor: "rgba(34, 137, 203, 255)", color: "white", border: "rgba(34, 137, 203, 255)", borderRadius: "5px", cursor: "pointer" }}>Add New Department</button>
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
                        <CSVLink data={Department_DATA} className="export_csv">
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
        </div>
    );
}

export default Routes;
