import React from "react";
import "./DocumentsUpload.css";
import { FiUploadCloud } from "react-icons/fi";

const DocumentUpload = () => {
  return (
    <div className="documents-upload-container" id="documents-upload">
      <h3>CORPORATE DOCUMENTS DETAILS</h3>
      <div className="documents-upload">
        <header className={0 ? "fill" : "success"}>
          {0
            ? "Dear Jay, Kindly upload the below documents."
            : "Dear Jay, Kindly check your uploaded documents."}
        </header>
        <main>
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
              <input
                type="text"
                placeholder="Corporate GST Certificate End Date "
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              <p
                className="upload-document"
                onClick={() =>
                  document.getElementsByTagName("input")[3].click()
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
                />
                <FiUploadCloud style={{ fontSize: "20px" }} />
                <span>Tap/Click to attach Documents here.</span>
              </p>
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
              <input
                type="text"
                placeholder="Incorporation Certificate End Date "
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              <p
                className="upload-document"
                onClick={() =>
                  document.getElementsByTagName("input")[7].click()
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
                />
                <FiUploadCloud style={{ fontSize: "20px" }} />
                <span>Tap/Click to attach Documents here.</span>
              </p>
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
              <input
                type="text"
                placeholder="Corporate Pan Card End Date "
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              <p
                className="upload-document"
                onClick={() =>
                  document.getElementsByTagName("input")[11].click()
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
                />
                <FiUploadCloud style={{ fontSize: "20px" }} />
                <span>Tap/Click to attach Documents here.</span>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentUpload;
