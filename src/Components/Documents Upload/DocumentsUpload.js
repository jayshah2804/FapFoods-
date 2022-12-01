import React, { useRef } from "react";
import "./DocumentsUpload.css";
import { FiUploadCloud } from "react-icons/fi";
import { useState } from "react";
import useHttp from "../../Hooks/use-http";
import { useEffect } from "react";
import loadingGif from "../../Assets/loading-gif.gif";

let gstCertificate = "";
let incorporationCertificate = "";
let panCard = "";
const filesName = {
  gst: "",
  incorp: "",
  panCard: "",
};
let gstCertificateBase64 = "";
let incorpCertificateBase64 = "";
let panCardBase64 = "";
let gstCertificateURL = "";
let incorpCertificateURL = "";
let panCardURL = "";
let flag = true;
let status = false;
let type = "";
const DocumentUpload = () => {
  const [isFileChange, setIsFileChange] = useState(filesName);
  const [isUpload, setIsUpload] = useState(false);
  const gstCertificateNumberInpuetRef = useRef();
  const gstCertificateStartDateInputRef = useRef();
  const incorpCertificateNumberInputRef = useRef();
  const incorpCertificateStartDateInputRef = useRef();
  const panCardNumberInpuetRef = useRef();
  const panCardStartDateInpuetRef = useRef();

  const authenticateUser = (data) => {
    console.log(data.DocumentList[0]);
    if (type === "submit") {
      setIsUpload(false);
    } else {
      gstCertificateNumberInpuetRef.current.value = data.DocumentList[0].DocumentNumber;
      gstCertificateStartDateInputRef.current.value = data.DocumentList[0].CertificateStartDate;
      gstCertificateBase64 = data.DocumentList[0].Sdocument;

      incorpCertificateNumberInputRef.current.value = data.DocumentList[1].DocumentNumber;
      incorpCertificateStartDateInputRef.current.value = data.DocumentList[1].CertificateStartDate;
      incorpCertificateBase64 = data.DocumentList[1].Sdocument;

      panCardNumberInpuetRef.current.value = data.DocumentList[2].DocumentNumber;
      panCardStartDateInpuetRef.current.value = data.DocumentList[2].CertificateStartDate;
      panCardBase64 = data.DocumentList[2].Sdocument;

      let IDs = ["gstStatus", "incorpStatus", "panCardStatus"];
      setTimeout(() => {

        document.getElementById("gstStatus").innerText = data.DocumentList[0].Action;
        document.getElementById("incorpStatus").innerText = data.DocumentList[1].Action;
        document.getElementById("panCardStatus").innerText = data.DocumentList[2].Action;
        for (let i = 0; i < 3; i++) {
          document.getElementById(IDs[i]).innerText = data.DocumentList[i].Action;
          if (data.DocumentList[i].Action.toLowerCase() === "pending")
            document.getElementById(IDs[i]).classList.add("pending");
          else if (data.DocumentList[i].Action.toLowerCase() === "rejected")
            document.getElementById(IDs[i]).classList.add("rejected");
          else if (data.DocumentList[i].Action.toLowerCase() === "approved")
            document.getElementById(IDs[i]).classList.add("approved");
        }

      }, 1000)
      if (data.DocumentList) status = true;
      setIsFileChange((prev) => ({ ...prev, gst: "Click here to View", incorp: "Click here to View", panCard: "Click here to View" }))
    }
  };

  const { isLoading, sendRequest } = useHttp();

  useEffect(() => {
    if (flag) {
      sendRequest(
        {
          url: "/api/v1/Document/GetCorporateDocument",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            corporateID: sessionStorage.getItem("corpId"),
            emailID: sessionStorage.getItem("user"),
          },
        },
        authenticateUser
      );
      flag = false;
    }

    if (isUpload) {
      let documentList = JSON.stringify([
        {
          DocumentID: "CGC",
          DocumentNumber: gstCertificateNumberInpuetRef.current.value,
          StartDate: gstCertificateStartDateInputRef.current.value,
          SDocument: gstCertificateBase64,
          Documentlink: gstCertificateURL
        },
        {
          DocumentID: "CIINDIA",
          DocumentNumber: incorpCertificateNumberInputRef.current.value,
          StartDate: incorpCertificateStartDateInputRef.current.value,
          SDocument: incorpCertificateBase64,
          Documentlink: incorpCertificateURL
        },
        {
          DocumentID: "CPC",
          DocumentNumber: panCardNumberInpuetRef.current.value,
          StartDate: panCardStartDateInpuetRef.current.value,
          SDocument: panCardBase64,
          Documentlink: panCardURL
        }
      ]);

      sendRequest(
        {
          url: "/api/v1/Document/AddCorporateDocument",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            corporateID: sessionStorage.getItem("corpId"),
            emailID: sessionStorage.getItem("user"),
            documentsList: documentList,
          },
        },
        authenticateUser
      );
    }
  }, [sendRequest, isUpload]);

  const uploadDocumentsClickHandler = () => {
    type = "submit";
    setIsUpload(true);
  };

  const GSTCentificateChangeHandler = (e) => {
    gstCertificate = e.target.files[0];
    gstCertificateURL = URL.createObjectURL(gstCertificate);
    getBase64(e.target.files[0]).then((data) => (gstCertificateBase64 = data));
    setIsFileChange((prev) => ({ ...prev, gst: e.target.files[0].name }));
  };
  const incorporationCertificateChangeHandler = (e) => {
    incorporationCertificate = e.target.files[0];
    incorpCertificateURL = URL.createObjectURL(incorporationCertificate);
    getBase64(e.target.files[0]).then(
      (data) => (incorpCertificateBase64 = data)
    );
    setIsFileChange((prev) => ({ ...prev, incorp: e.target.files[0].name }));
  };
  const panCardChangeHandler = (e) => {
    panCard = e.target.files[0];
    panCardURL = URL.createObjectURL(panCard);
    getBase64(e.target.files[0]).then((data) => (panCardBase64 = data));
    setIsFileChange((prev) => ({ ...prev, panCard: e.target.files[0].name }));
  };
  const gstFileViewHandler = () => {
    viewDocument(gstCertificateBase64);
  };
  const incorpFileViewHandler = () => {
    viewDocument(incorpCertificateBase64);
  };
  const panCardFileViewHandler = () => {
    viewDocument(panCardBase64);
  };
  const viewDocument = (file) => {
    let pdfWindow = window.open("");
    pdfWindow.document.write("<html<head><title>" + "document" + "</title><style>body{margin: 0px;}iframe{border-width: 0px;}</style></head>");
    file.split(",")[0].includes("pdf") ?
      pdfWindow.document.write("<body><embed width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(file.split(",")[1]) + "#toolbar=0&navpanes=0&scrollbar=0'></embed></body></html>")
      :
      pdfWindow?.document.write(
        `<head><title>Document preview</title></head><body><img src="${file}" width="100%" height="100%" ></body></html >`);
  };
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  return (
    <div className="documents-upload-container" id="documents-upload">
      <h3>CORPORATE DOCUMENTS DETAILS</h3>
      <div className="documents-upload">
        <header className={!status ? "fill" : "success"}>
          {!status
            ? "Dear Jay, Kindly upload the below documents."
            : "Dear Jay, Kindly check your uploaded documents."}
        </header>
        <main style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <header>Document Upload</header>
            <div className="border"></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="text">
                <p>Upload Guidelines.</p>
                <p>Enter the document number (if aplicable).</p>
                <p>Enter the start and end date.</p>
                <p>
                  Attach your document (Kindly ensure that your document size
                  should not be more than 5MB).
                </p>
              </div>
              <button
                onClick={uploadDocumentsClickHandler}
                className="upload-button"
              >
                Upload All Documents
              </button>
            </div>
          </div>
          <div>
            <header style={{ display: "flex", gap: "4%" }} >
              <span>Corporate GST Certificate</span>
              {status &&
                <span style={{ fontWeight: "normal" }} >Approval status <span id="gstStatus" ></span></span>
              }
            </header>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Corporate GST Certificate Number "
                ref={gstCertificateNumberInpuetRef}
              />
              <input
                type="text"
                placeholder="Corporate GST Certificate Start Date "
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                ref={gstCertificateStartDateInputRef}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  className="upload-document"
                  onClick={() =>
                    document.getElementsByTagName("input")[2].click()
                  }
                >
                  <input
                    type="file"
                    style={{
                      fontSize: "20px",
                      width: "100%",
                      height: "100%",
                      display: "none",
                    }}
                    onChange={GSTCentificateChangeHandler}
                  />
                  <FiUploadCloud style={{ fontSize: "20px" }} />
                  <span>Tap/Click to attach Documents here.</span>
                </p>
                {isFileChange.gst && (
                  <p className="filename" onClick={gstFileViewHandler}>
                    {isFileChange.gst}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <header style={{ display: "flex", gap: "4%" }}>
              <span>Incorporation Certificate</span>
              {console.log(status)}
              {status &&
                <span style={{ fontWeight: "normal" }} >Approval status <span id="incorpStatus"></span></span>
              }
            </header>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Incorporation Certificate Number "
                ref={incorpCertificateNumberInputRef}
              />
              <input
                type="text"
                placeholder="Incorporation Certificate Start Date "
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                ref={incorpCertificateStartDateInputRef}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  className="upload-document"
                  onClick={() =>
                    document.getElementsByTagName("input")[5].click()
                  }
                >
                  <input
                    type="file"
                    style={{
                      fontSize: "20px",
                      width: "100%",
                      height: "100%",
                      display: "none",
                    }}
                    onChange={incorporationCertificateChangeHandler}
                  />
                  <FiUploadCloud style={{ fontSize: "20px" }} />
                  <span>Tap/Click to attach Documents here.</span>
                </p>
                {isFileChange.incorp && (
                  <p className="filename" onClick={incorpFileViewHandler}>
                    {isFileChange.incorp}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <header style={{ display: "flex", gap: "4%" }} >
              <span>Corporate Pan Card</span>
              {status &&
                <span style={{ fontWeight: "normal" }}>Approval status <span id="panCardStatus"></span></span>
              }
            </header>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="text" placeholder="Corporate Pan Card Number " ref={panCardNumberInpuetRef} />
              <input
                type="text"
                placeholder="Corporate Pan Card Start Date "
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                ref={panCardStartDateInpuetRef}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  className="upload-document"
                  onClick={() =>
                    document.getElementsByTagName("input")[8].click()
                  }
                >
                  <input
                    type="file"
                    style={{
                      fontSize: "20px",
                      width: "100%",
                      height: "100%",
                      display: "none",
                    }}
                    onChange={panCardChangeHandler}
                  />
                  <FiUploadCloud style={{ fontSize: "20px" }} />
                  <span>Tap/Click to attach Documents here.</span>
                </p>
                {isFileChange.panCard && (
                  <p className="filename" onClick={panCardFileViewHandler}>
                    {isFileChange.panCard}
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      {isLoading && <img src={loadingGif} style={{ position: "absolute", top: "45%", left: "45%" }} />}
    </div>
  );
};

export default DocumentUpload;