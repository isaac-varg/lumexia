
import React, { useState } from "react";

const columnsData = [
  ["Folder 1", "Folder 2", "Folder 3"],
  ["Subfolder 1.1", "Subfolder 1.2", "Subfolder 2.1"],
  ["File 1.1.1", "File 1.1.2", "File 2.1.1"],
];

const MillerColumns = () => {
  const [selectedIndices, setSelectedIndices] = useState([null, null]);

  const handleSelection = (colIndex, itemIndex) => {
    const updatedIndices = [...selectedIndices];
    updatedIndices[colIndex] = itemIndex;

    // Reset indices of subsequent columns
    for (let i = colIndex + 1; i < updatedIndices.length; i++) {
      updatedIndices[i] = null;
    }

    setSelectedIndices(updatedIndices);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {columnsData.map((items, colIndex) => (
        <div
          key={colIndex}
          className={`relative bg-gray-100 border-r border-gray-300 shadow-lg overflow-y-auto min-w-[16rem] max-w-[20rem] h-full transition-transform ${
            colIndex > 0 ? `-ml-10 z-${colIndex * 10}` : ""
          }`}
        >
          <ul className="p-4 space-y-2">
            {items.map((item, itemIndex) => (
              <li
                key={item}
                onClick={() => handleSelection(colIndex, itemIndex)}
                className={`cursor-pointer px-4 py-2 rounded-md ${
                  selectedIndices[colIndex] === itemIndex
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MillerColumns;
