import React, { useRef, useState } from "react";
import Records from "./Records";
import ReactPaginate from "react-paginate";
// import "./Route.css";
import { CSVLink } from "react-csv";
import { Route } from "react-router-dom";
import AddAdmin from "./AddAdmin";
// import AddRoute from "./AddRoute/RouteInfo";

const DEPARTMENTS_LIST = [
  {
    name: "Sales and Marketing",
    checked: true
  },
  {
    name: "Little School Testing",
    checked: true
  },
  {
    name: "Accounts",
    checked: false
  },
  {
    name: "Development",
    checked: false
  },
  {
    name: "Management",
    checked: true
  },
]


const STAFF_DATA = [
  {
    id: 1,
    name: "Jay Shah",
    mobile_no: "9232343434",
    email: "jayshah@gmail.com",
    role: "Little school testing admin, Sales and marketing admin",
  },
  {
    id: 2,
    name: "Jay Shah",
    mobile_no: "9232343434",
    email: "jayshah@gmail.com",
    role: "Little school testing admin, Sales and marketing admin",
  },
  {
    id: 3,
    name: "Jay Shah",
    mobile_no: "9232343434",
    email: "jayshah@gmail.com",
    role: "Little school testing admin, Sales and marketing admin",
  },
  {
    id: 4,
    name: "Jay Shah",
    mobile_no: "9232343434",
    email: "jayshah@gmail.com",
    role: "Little school testing admin, Sales and marketing admin",
  },
  {
    id: 5,
    name: "Jay Shah",
    mobile_no: "9232343434",
    email: "jayshah@gmail.com",
    role: "Little school testing admin, Sales and marketing admin",
  },
  {
    id: 6,
    name: "Jay Shah",
    mobile_no: "9232343434",
    email: "jayshah@gmail.com",
    role: "Little school testing admin, Sales and marketing admin",
  },
  {
    id: 7,
    name: "Jay Shah",
    mobile_no: "9232343434",
    email: "jayshah@gmail.com",
    role: "Little school testing admin, Sales and marketing admin",
  }
];

const ADMIN_TITLE = [
  "Name",
  "Email",
  "Mobile No.",
  "Role"
];

let myClick = false;
let prev_id = "1";

function Admin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(7);
  const [filteredData, setFilteredData] = useState(STAFF_DATA);
  const searchInputRef = useRef();
  const [isAddAdminClicked, setIsAddAdminClicked] = useState();

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

  const addAdminClickHandler = () => {
    setIsAddAdminClicked(true);
  }

  const routeSearchHandler = (e) => {
    // if (e.target.value)
    setFilteredData(STAFF_DATA.filter(data =>
      data.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      data.mobile_no.toLowerCase().includes(e.target.value.toLowerCase()) ||
      data.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
      data.role.toLowerCase().includes(e.target.value.toLowerCase())
    ));
    // else setFilteredData(TRIP_DATA);
  };

  return (
    <div className="trips-details" id="trip-table">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "inline-block" }} className="title">Eximious Global Admins</div>
        <button onClick={addAdminClickHandler} style={{ marginRight: "40px", padding: "7px 14px", backgroundColor: "rgba(34, 137, 203, 255)", color: "white", border: "rgba(34, 137, 203, 255)", borderRadius: "5px", cursor: "pointer" }}>Add New Admin</button>
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
        <Records data={currentRecords} headers={ADMIN_TITLE} departments={DEPARTMENTS_LIST} />
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
      {isAddAdminClicked && <AddAdmin setIsAddAdminClicked={setIsAddAdminClicked} departments={DEPARTMENTS_LIST} />}
      {/* {isAddRouteClicked && <AddRoute setIsAddRouteClicked={setIsAddRouteClicked} />} */}
    </div>
  );
}

export default Admin;
