import React from "react";

const Table = ({ items, deleteItem, editItem }) => {
  return (
    <div className="mt-9">
      <table className="shadow-lg bg-white  rounded w-[100%] h-9">
        <tr>
          <th className="bg-zinc-100 text-start py-2 px-3 ">ID</th>
          <th className="bg-zinc-100 text-start px-4 ">Client Name</th>
          <th className="bg-zinc-100 text-start px-4 ">Number</th>
          <th className="bg-zinc-100 text-start px-4 ">Status</th>
          <th className="bg-zinc-100 text-start px-5 ">Action</th>
        </tr>

        {items.length > 0 ? (items.map((item, index) => (
          <tr key={index}> 
          <td className="p-4">{index+1}</td>
          <td className="p-4">{item.prod}</td>
          <td className="p-4">{item.price}</td>
          <td className="p-4">{item.status}</td>
          <td className="p-4">
            <button
              type="submit"
              className="bg-green-600 font-semibold rounded-sm px-2.5 py-1 text-white active:scale-95 mr-5"
            >
              Edit
            </button>
            <button
              type="submit"
              className="bg-red-600 font-semibold rounded-sm px-2.5 py-1 text-white active:scale-95 mr-5" onClick={() => (deleteItem(item.id))}
            >
              Delete
            </button>
          </td>
          </tr> ))) : (<tr ><p className="font-bold p-5">No Record Found</p></tr>)
        }
      </table>
    </div>
  );
};

export default Table;
