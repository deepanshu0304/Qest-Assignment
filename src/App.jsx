import "./App.css";
import Navbar from "./components/Navbar";
import Orders from "./components/Orders";
import { useEffect, useState } from "react";
import allOrders from "./data/orderList";
import Status from "./helper/statusEnum";
import Distribution from "./helper/distributionEnum";

export default function () {
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState(Status.all);
  const [distributionFilter, setDistributionFilter] = useState(
    Distribution.all
  );

  useEffect(() => {
    allOrders.forEach((e) => (e.checked = false));
  }, [searchFilter, statusFilter, distributionFilter]);
  
  return (
    <div className="container">
      <Navbar
        setSearchFilter={setSearchFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        distributionFilter={distributionFilter}
        setDistributionFilter={setDistributionFilter}
      />
      <Orders
        searchFilter={searchFilter}
        statusFilter={statusFilter}
        distributionFilter={distributionFilter}
      />
    </div>
  );
}
