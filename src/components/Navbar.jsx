import "./Navbar.css";
import download from "../assets/download.svg";
import location from "../assets/location.svg";
import search from "../assets/search.svg";
import status from "../assets/status.svg";
import allOrders from "../data/orderList";
import { useCallback, useState } from "react";
import Distribution from "../helper/distributionEnum";
import Status from "../helper/statusEnum";

export default function ({
  setSearchFilter,
  statusFilter,
  setStatusFilter,
  distributionFilter,
  setDistributionFilter,
}) {
  const [statusDropDown, setStatusDropDown] = useState(false);
  const [distributionDropDown, setDistributionDropDown] = useState(false);
  return (
    <div className="navbar">
      <div className="navbar-filters">
        <div className="input-box search-bar">
          <img
            className="search-icon"
            src={search}
            width="20px"
            height="20px"
          />
          <input
            onChange={(e) => {
              setSearchFilter(e.target.value);
            }}
            className="input search"
            type="text"
            placeholder="Search..."
          />
        </div>

        <div className="filter-container">
          <div
            onClick={() => {
              setStatusDropDown((e) => !e);
              setDistributionDropDown(false);
            }}
            className="input-box status-bar"
          >
            <img
              className="status-icon"
              src={status}
              height="17px"
              width="17px"
            />
            <span className="sBtn-text status-btn-text">{statusFilter}</span>
          </div>
          <div
            className={`drop-down status-drop-down ${
              !statusDropDown ? "hide" : ""
            }`}
          >
            <ul className="options status-options">
              {Object.values(Status).map((el, i) => {
                return (
                  <li
                    key={i}
                    onClick={(e) => {
                      console.log();
                      setStatusFilter(e.target.firstChild.innerText);
                      setStatusDropDown(false);
                    }}
                    className="option status-option"
                  >
                    <span className="option-text">{el}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="filter-container">
          <div
            onClick={() => {
              setDistributionDropDown((e) => !e);
              setStatusDropDown(false);
            }}
            className="input-box distribution-bar"
          >
            <img
              className="distribution-icon"
              src={location}
              width="17px"
              height="17px"
            />

            <span className="sBtn-text distribution-btn-text">
              {distributionFilter}
            </span>
          </div>
          <div
            className={`drop-down distribution-drop-down ${
              !distributionDropDown ? "hide" : ""
            }`}
          >
            <ul className="options distribution-options">
              {Object.values(Distribution).map((e, i) => {
                return (
                  <li
                    key={i}
                    onClick={(e) => {
                      console.log();
                      setDistributionFilter(e.target.firstChild.innerText);
                      setDistributionDropDown(false);
                    }}
                    className="option distribution-option"
                  >
                    <span className="option-text">{e}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div
        onClick={() => {
          const refinedData = [];
          const titleKeys = Object.keys(allOrders[0]);
          refinedData.push(titleKeys);
          allOrders.forEach((e) => {
            if (e.checked) {
              refinedData.push(Object.values(e));
            }
          });
          let csvContent = "";
          refinedData.forEach((e) => {
            csvContent += e.join(",") + "\n";
          });

          const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8,",
          });

          const objUrl = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = objUrl;
          a.download = "deepu";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }}
        className="orders"
      >
        <img className="order-icon" src={download} width="20px" height="20px" />
        <button className="order-btn">Export Orders</button>
      </div>
    </div>
  );
}
