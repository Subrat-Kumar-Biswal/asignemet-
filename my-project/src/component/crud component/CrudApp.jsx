import React, { useEffect, useState } from "react";
import Form from "./Form";
import Table from "./Table";

const CrudApp = () => {
  const [items, setItems] = useState([]);
  const [currItem, setCurrItem] = useState(null);

  //load data form local storage

  useEffect(() => {
    const storeItems = JSON.parse(localStorage.getItem("items"));
    if (storeItems) {
      setItems(storeItems);
    }
  }, []);

  // save data in local storage
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // Add the item

  const addItem = (item) => {
    if (currItem) {
      const updatedItem = items.map((i) => (i.id === currItem.id ? item : i));
      setItems(updatedItem);
      setCurrItem(null);
    } else {
      setItems([...items, { id: Date.now(), ...item }]);
    }

    // console.log(item);
  };

  //delete item

  const deleteItem = (id) => {
    const updatedItem = items.filter((item) => item.id !== id);
    // console.log(updatedItem)
    setItems(updatedItem);
  };

  //update the record

  const editItem = (item) => {
    setCurrItem(item);
  };
  return (
    <div className="sm:w-[80%} md:w-[80%] lg:w-[70%] bg-[#1d293d] shadow rounded py-6 px-4">
      <h2 className="text-center text-4xl/9 font-semibold tracking-tighter text-white">
        Client Management System
      </h2>
      <Form addItem={addItem} currItem={currItem} />
      <Table items={items} deleteItem={deleteItem} editItem={editItem} />
    </div>
  );
};

export default CrudApp;
