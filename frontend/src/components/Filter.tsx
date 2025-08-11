"use client";
import React, { useState } from "react";
import eventBus from "@/utils/EventBus"; // You can replace this with your preferred event handler

export default function Filter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  

  const handleSearch = () => {
    const filters = {
      search: searchTerm,
      dateFrom,
      dateTo,
    };
    eventBus.emit("filterSearch", filters); // Emits event
  };

  const handleClear = () => {
    setSearchTerm("");
    setDateFrom("");
    setDateTo("");
    eventBus.emit("filterSearch", {
      search: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  return (
    <div className="container my-3 p-3 border rounded">
      <div className="row g-3 align-items-end">
        {/* Date From */}
        <div className="col-md-3">
          <label className="form-label fw-bold">From</label>
          <input
            type="date"
            className="form-control"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>

        {/* Date To */}
        <div className="col-md-3">
          <label className="form-label fw-bold">To</label>
          <input
            type="date"
            className="form-control"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>

        {/* Search Input */}
        <div className="col-md-4">
          <label className="form-label fw-bold">Search</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="col-md-2 d-flex gap-2">
          <button className="btn btn-primary btn-sm w-25" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Filter" onClick={handleSearch}>
            <i className="fa fa-filter"></i>
          </button>
          <button className="btn btn-outline-info w-25" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Clear filter" onClick={handleClear}>
            <i className="fa fa-eraser"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
