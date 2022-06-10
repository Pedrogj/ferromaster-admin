import React, { useRef } from "react";

export const InputSearch = ({ searchTerm, setSearchTerm }) => {
  const inputEl = useRef("");

  const getSearchTerm = () => {
    setSearchTerm(inputEl.current.value);
  };
  return (
    <div className="mb-3">
      <input
        ref={inputEl}
        type="text"
        className="form-control"
        value={searchTerm}
        onChange={getSearchTerm}
        placeholder="Buscar..."
      />
    </div>
  );
};
