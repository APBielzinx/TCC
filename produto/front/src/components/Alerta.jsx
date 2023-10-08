import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert">
      <p>{message}</p>
      <button onClick={onClose}>Fechar</button>
    </div>
  );
};

export default Alert;
