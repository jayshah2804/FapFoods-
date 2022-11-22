import React from "react";

const DocumentUpload = () => {
  return (
    <div>
      <header>Corporate Document Details</header>
      <div>
        <div>Dear Jay, Kindly upload the below documents.</div>
        <main>
          <div>
            <header>Document Upload</header>
            <hr />
            <div>
              <p>Upload Guidelines</p>
              <p>Enter the document number (if aplicable)</p>
              <p>Enter the start and end date</p>
              <p>
                Attach your document (Kindly ensure that your document size
                should not be more than 5MB)
              </p>
            </div>
          </div>
          <div>
            <header>Corporate GST Certificate</header>
            <div>
              <input
                type="text"
                placeholder="Corporate GST Certificate Number "
              />
              <input
                type="text"
                placeholder="Corporate GST Certificate STart Date "
              />
              <input
                type="text"
                placeholder="Corporate GST Certificate End Date "
              />
            </div>
          </div>
          <div>
            <header>Incorporation Certificate</header>
            <div>
              <input
                type="text"
                placeholder="Incorporation Certificate Number "
              />
              <input
                type="text"
                placeholder="Incorporation Certificate Start Date "
              />
              <input
                type="text"
                placeholder="Incorporation Certificate End Date "
              />
            </div>
          </div>
          <div>
            <header>Corporate Pan Card</header>
            <div>
              <input type="text" placeholder="Corporate Pan Card Number " />
              <input type="text" placeholder="Corporate Pan Card Start Date " />
              <input type="text" placeholder="Corporate Pan Card End Date " />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentUpload;
