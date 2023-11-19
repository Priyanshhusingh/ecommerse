import React, { useContext, useState } from "react";
import { UserContext } from "../../UserContext";

function UserAccountPage() {
  const { user } = useContext(UserContext);
  const [editableField, setEditableField] = useState(null);
  const [editedValue, setEditedValue] = useState(user?.name);

  const handleEdit = (field) => {
    setEditableField(field);
    setEditedValue(user[field]);
  };

  const handleSave = () => {
    setEditableField(null);
  };

  const handleCancel = () => {
    setEditableField(null);
  };

  const isFieldEditable = (field) => {
    return editableField === field;
  };

  const handleChange = (e) => {
    setEditedValue(e.target.value);
  };

  return (
    <div className="mx-auto max-w-lg p-4 border rounded-md shadow-md mt-28 flex flex-col justify-center">
      <div className="text-lg font-semibold mb-4 text-center">User Detail</div>
      <div className="flex shadow-md p-3 justify-between items-center rounded-2xl shadow-gray-300 mt-5">
        {isFieldEditable("name") ? (
          <input
            type="text"
            value={editedValue}
            onChange={handleChange}
            autoFocus
            className="outline-none"
          />
        ) : (
          <span>{user?.name}</span>
        )}

        {isFieldEditable("name") ? (
          <div className="flex gap-5">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => handleEdit("name")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        )}
      </div>
      <div className="flex shadow-md p-3 justify-between items-center rounded-2xl shadow-gray-300 gap-4">
        {isFieldEditable("email") ? (
          <input
            type="text"
            value={editedValue}
            onChange={handleChange}
            autoFocus
          />
        ) : (
          <span>{user?.email}</span>
        )}

        {isFieldEditable("email") ? (
          <div className="flex gap-5">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => handleEdit("email")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export default UserAccountPage;
