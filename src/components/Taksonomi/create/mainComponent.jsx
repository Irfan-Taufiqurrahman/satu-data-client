import React, { useState } from "react";
import Modal from "./Modal";

const MainComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  return (
    <div>
      <h1>Main Component</h1>
      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default MainComponent;
