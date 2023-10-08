import React, { useEffect, useState } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import './css/home.css'

const Home = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editableUserId, setEditableUserId] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (userId) => {
    const selectedRowIds = [...selectedRows];
    if (selectedRowIds.includes(userId)) {
      selectedRowIds.splice(selectedRowIds.indexOf(userId), 1);
    } else {
      selectedRowIds.push(userId);
    }
    setSelectedRows(selectedRowIds);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allRowIds = data.map((user) => user.id);
      setSelectedRows(allRowIds);
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    const updatedData = [...data];
    selectedRows.forEach((userId) => {
      const userIndex = updatedData.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        updatedData.splice(userIndex, 1);
      }
    });
    setData(updatedData);

    setSelectedRows([]);
  };

  const filteredData = data.filter((user) => {
    const { name, email, role } = user;
    const queryLowerCase = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(queryLowerCase) ||
      email.toLowerCase().includes(queryLowerCase) ||
      role.toLowerCase().includes(queryLowerCase)
    );
  });
  
  
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const getData = await response.json();

      if (Array.isArray(getData)) {
        setData(getData);
      } else {
        console.error("Data from the API is not an array:", getData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
const currentPageData = filteredData.slice(startIndex, endIndex);


  const handleSave = (userId, editedData) => {
    const updatedData = [...data];
    const userIndex = updatedData.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      updatedData[userIndex] = { ...updatedData[userIndex], ...editedData };

      setData(updatedData);
    }
  };

  const handleDeleteUser = (userId) => {
    const updatedData = [...data];

    const userIndex = updatedData.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      updatedData.splice(userIndex, 1);

      setData(updatedData);

      const updatedSelectedRows = selectedRows.filter(
        (selectedUserId) => selectedUserId !== userId
      );
      setSelectedRows(updatedSelectedRows);
    }
  };
  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1)
    }
  }, [filteredData])
  
  return (
    <div className="container">
      <h2>Admin UI</h2>
      <div className="input-group ">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email or role...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Table
        data={currentPageData}
        selectedRows={selectedRows}
        onSave={handleSave}
        onEdit={(userId) => setEditableUserId(userId)}
        handleRowClick={handleRowClick}
        handleDeleteSelected={handleDeleteSelected}
        handleSelectAll={handleSelectAll}
        selectAll={selectAll}
        handleDeleteUser={handleDeleteUser}
      />
      <div className="pagehandle">
        <button
          className="btn-danger"
          style={{}}
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0}
        >
          Delete Selected
        </button>
        <div className="pagination">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          ></Pagination>
        </div>
      </div>
    </div>
  );
};

export default Home;