import React, { useEffect, useState } from "react";

const Form = ({ addItem, currItem }) => {
  const [prod, setProd] = useState("");
  const [price, setPrice] = useState(null);
  const [status, setStatus] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    // alert("Form submitted")
    if (!prod.trim() || !price.trim() || !status.trim()) return;
    addItem({ id: Date.now(), prod, price, status });
    setPrice(" ");
    setProd("");
    setStatus("");
  };
  useEffect(() => {
    if (currItem) {
      setProd(currItem.prod);
      setPrice(currItem.price);
      setStatus(currItem.status);
    }
  }, [currItem]);
  return (
    <div>
      <form onSubmit={handleClick}>
        <div className="flex justify-between mt-10 gap-1">
          <input
            type="text"
            value={prod}
            onChange={(e) => setProd(e.target.value)}
            placeholder="client name"
            className="py-1.5 px-3 shadow rounded"
          />
          <input
            type="Number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Number of client"
            className="py-1.5 px-3 shadow rounded"
          />
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="status"
            className="py-1.5 px-3 shadow rounded"
          />
          <button className="py-1.5 px-3 shadow rounded  text-lg font-bold text-white bg-green-600">
            {currItem ? "Update" : "save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
