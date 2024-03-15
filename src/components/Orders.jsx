import { useEffect, useState } from "react";
import "./Orders.css";
import allOrders from "../data/orderList";
import Status from "../helper/statusEnum";
import Distribution from "../helper/distributionEnum";

export default function ({ searchFilter, statusFilter, distributionFilter }) {
  const [numOrderSelected, setNumOrderSelected] = useState(0);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    setNumOrderSelected(0);
    setAllChecked(false);
  }, [searchFilter, statusFilter, distributionFilter]);

  return (
    <>
      <div className="all-orders">
        <input
          checked={allChecked}
          onChange={(e) => {
            console.log(e.target.checked);
            if (!e.target.checked) {
              for (let i = 0; i < allOrders.length; i++) {
                const row = document.getElementById(`${allOrders[i].ref}`);
                if (row) {
                  row.checked = false;
                  allOrders[i].checked = false;
                }
              }
              setNumOrderSelected(0);
              setAllChecked(false);
            } else {
              let count = 0;
              for (let i = 0; i < allOrders.length; i++) {
                const row = document.getElementById(`${allOrders[i].ref}`);
                if (row) {
                  row.checked = true;
                  allOrders[i].checked = true;
                  count++;
                }
              }
              setNumOrderSelected(count);
              setAllChecked(true);
            }
          }}
          type="checkbox"
          id="select-all"
          name="order-text"
        />

        <label className="order-text" htmlFor="order-text">
          All orders
          <span className="selected-orders">
            ({numOrderSelected} order selected)
          </span>
        </label>
      </div>
      <div className="content">
        <div className="labels dark order-head">
          <div className="ref">
            <input type="checkbox" />
            <label> Ref. ID</label>
          </div>
          <div className="customer">Customer</div>
          <div className="products">Products</div>
          <div className="date">Date</div>
          <div className="distribution">Distribution</div>
          <div className="status">Status</div>
          <div className="price">Price (in Rs)</div>
        </div>
        {renderOrders(
          searchFilter,
          statusFilter,
          distributionFilter,
          setNumOrderSelected
        )}
      </div>
    </>
  );
}

function renderOrders(
  searchFilter,
  statusFilter,
  distributionFilter,
  setNumOrderSelected
) {
  return allOrders.map((e, i) => {
    const filter = searchFilter.toLowerCase();
    const customerName = e.customer.toLowerCase();
    const productName = e.products.toLowerCase();
    const customerCheck = customerName.includes(filter);
    const productcheck = productName.includes(filter);
    const statusCheck =
      statusFilter == Status.all ||
      statusFilter.toLowerCase() == e.status.toLowerCase();
    const distributionCheck =
      distributionFilter == Distribution.all ||
      distributionFilter.toLowerCase() == e.distribution.toLowerCase();
    if ((customerCheck || productcheck) && distributionCheck && statusCheck) {
      return (
        <OrderLabel
          key={e.ref}
          i={i}
          refe={e.ref}
          customer={e.customer}
          products={e.products}
          date={e.date}
          distribution={e.distribution}
          status={e.status}
          price={e.price}
          setNumOrderSelected={setNumOrderSelected}
          checked={e.checked}
        />
      );
    } else {
      <></>;
    }
  });
}

function OrderLabel({
  i,
  refe,
  customer,
  products,
  date,
  distribution,
  status,
  price,
  setNumOrderSelected,
  checked,
}) {
  return (
    <div className={`labels ${i & 1 ? "dark" : ""}`}>
      <div className="ref">
        <input
          checked={checked}
          onChange={(e) => {
            const currOrder = allOrders.find((e) => e.ref == refe);
            if (e.target.checked) {
              setNumOrderSelected((cnt) => cnt + 1);
              currOrder.checked = true;
            } else {
              setNumOrderSelected((cnt) => cnt - 1);
              currOrder.checked = false;
            }
          }}
          type="checkbox"
          id={refe}
          name={refe}
        />

        <label htmlFor={refe}> {refe}</label>
      </div>
      <div className="customer">
        {customer.length > 15 ? customer.substring(0, 14) + ".." : customer}
      </div>
      <div className="products">
        {products.length > 25 ? products.substring(0, 30) + ".." : products}
      </div>
      <div className="date">{date}</div>
      <div className="distribution">{distribution}</div>
      <div className="status">{status}</div>
      <div className="price">{price}</div>
    </div>
  );
}
