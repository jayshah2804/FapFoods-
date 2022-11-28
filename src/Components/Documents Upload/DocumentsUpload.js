import React from "react";
import "./DocumentsUpload.css";
import { FiUploadCloud } from "react-icons/fi";
import { useState } from "react";
import useHttp from "../../Hooks/use-http";
import { useEffect } from "react";

let gstCertificate = "";
let incorporationCertificate = "";
let panCard = "";
const files = {
  gst: "",
  incorp: "",
  panCard: "",
};
let gstCertificateBase64 = "";
let incorpCertificateBase64 = "";
let panCardBase64 = "";
const DocumentUpload = () => {
  const [isFileChange, setIsFileChange] = useState(files);

  const authenticateUser = (data) => {
    console.log(data);
  };

  const { isLoading, sendRequest } = useHttp();

  useEffect(() => {
    // sendRequest(
    //   {
    //     url: "/api/v1/Corporate/CorporateRegistration",
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: {},
    //   },
    //   authenticateUser
    // );
  }, [sendRequest]);

  const uploadDocumentsClickHandler = () => {};

  const GSTCentificateChangeHandler = (e) => {
    gstCertificate = e.target.files[0];
    getBase64(e.target.files[0]).then((data) => (gstCertificateBase64 = data));
    setIsFileChange((prev) => ({ ...prev, gst: e.target.files[0].name }));
  };
  const incorporationCertificateChangeHandler = (e) => {
    incorporationCertificate = e.target.files[0];
    getBase64(e.target.files[0]).then(
      (data) => (incorpCertificateBase64 = data)
    );
    setIsFileChange((prev) => ({ ...prev, incorp: e.target.files[0].name }));
  };
  const panCardChangeHandler = (e) => {
    panCard = e.target.files[0];
    getBase64(e.target.files[0]).then((data) => (panCardBase64 = data));
    setIsFileChange((prev) => ({ ...prev, panCard: e.target.files[0].name }));
  };
  const gstFileViewHandler = () => {
    viewDocument(gstCertificate);
  };
  const incorpFileViewHandler = () => {
    viewDocument(incorporationCertificate);
  };
  const panCardFileViewHandler = () => {
    viewDocument(panCard);
  };
  const viewDocument = (file) => {
    window.open(URL.createObjectURL(file), "_blank").focus();
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
        <header className={1 ? "fill" : "success"}>
          {1
            ? "Dear Jay, Kindly upload the below documents."
            : "Dear Jay, Kindly check your uploaded documents."}
        </header>
        <main style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <header>Document Upload</header>
            <div className="border"></div>
            <div className="text">
              <p>Upload Guidelines.</p>
              <p>Enter the document number (if aplicable).</p>
              <p>Enter the start and end date.</p>
              <p>
                Attach your document (Kindly ensure that your document size
                should not be more than 5MB).
              </p>
            </div>
          </div>
          <div>
            <header>Corporate GST Certificate</header>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Corporate GST Certificate Number "
              />
              <input
                type="text"
                placeholder="Corporate GST Certificate Start Date "
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              {/* <input
                type="text"
                placeholder="Corporate GST Certificate End Date "
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              /> */}
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
            <header>Incorporation Certificate</header>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Incorporation Certificate Number "
              />
              <input
                type="text"
                placeholder="Incorporation Certificate Start Date "
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              {/* <input
                type="text"
                placeholder="Incorporation Certificate End Date "
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              /> */}
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
            <header>Corporate Pan Card</header>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="text" placeholder="Corporate Pan Card Number " />
              <input
                type="text"
                placeholder="Corporate Pan Card Start Date "
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              {/* <input
                type="text"
                placeholder="Corporate Pan Card End Date "
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              /> */}
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
          <button
            onClick={uploadDocumentsClickHandler}
            className="upload-button"
          >
            Upload All Documents
          </button>
        </main>
      </div>
    </div>
  );
};

export default DocumentUpload;