import React, { useState } from "react";
import axios from "axios";

const Modal = ({ showModal, setShowModal }) => {
  const [codeMain, setCodeMain] = useState("");
  const [titleMain, setTitleMain] = useState("");

  const handleCodeMainChange = (e) => {
    setCodeMain(e.target.value);
  }

  const handleTitleMainChange = (e) => {
    setTitleMain(e.target.value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the API
      const response = await axios.post("http://127.0.0.1:8000/api/maindata/store", {
        code_main: codeMain,
        title_main: titleMain
      });

      // Handle success
      console.log("Data has been successfully posted:", response.data);

      // Reset input fields
      setCodeMain("");
      setTitleMain("");

      // Close the modal
      setShowModal(false);
    } catch (error) {
      // Handle error
      console.error("Error posting data:", error);
    }
  }

  return (
    <div className={showModal ? "modal display-block" : "modal display-none"}>
      <form onSubmit={handleFormSubmit}>
        <h2>Add Main Data</h2>
        <label>
          Code Main:
          <input type="text" value={codeMain} onChange={handleCodeMainChange} />
        </label>
        <label>
          Title Main:
          <input type="text" value={titleMain} onChange={handleTitleMainChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Modal;
