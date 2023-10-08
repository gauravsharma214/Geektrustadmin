import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import './css/table.css'

const Table = (props) => {
  const {
    data,
    selectedRows,
    handleRowClick,
    handleDeleteSelected,
    handleSelectAll,
    selectAll,
  } = props;
  const [editableUserId, setEditableUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: "",
  });
  const handleEdit = (userId) => {
    setEditableUserId(userId);
  };
  
  const handleSave = () => {
    if (editedUserData.name !== "") {
      props.onSave(editableUserId, editedUserData);
    }
    setEditableUserId(null);
  };
  
  


  return (
    <table className="table">
      <thead>
        <tr>
          <th className="p-3">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </th>
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Role</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr
            key={user.id}
            className={`${
              selectedRows.includes(user.id) ? "table-primary" : ""
            }`}
            onClick={() => handleRowClick(user.id)}
          >
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(user.id)}
                onChange={() => handleRowClick(user.id)}
              />
            </td>
            <td>
              {editableUserId === user.id ? (
                <input
                  type="text"
                  value={editedUserData.name}
                  onChange={(e) => {
                    setEditedUserData({
                      ...editedUserData,
                      name: e.target.value,
                    });
                  }}
                />
              ) : (
                user.name
              )}
            </td>            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
            {editableUserId === user.id ? (
                <button
                  className="save-button"
                  onClick={() => {props.onEdit(user.id); 
                  handleSave();}}
                >
                  Save
                </button>
              ) : (
                <FontAwesomeIcon
                  className="edit-button"
                  onClick={() => handleEdit(user.id)}
                  icon={faEdit}
                />
              )}
              <FontAwesomeIcon
                className="trash-button"
                onClick={() => props.handleDeleteUser(user.id)}
                icon={faTrash}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
