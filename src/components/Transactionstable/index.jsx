import { Input, Radio, Select, Table } from "antd";
// import { unparse } from "papaparse";
import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import { parse } from "papaparse";
// import { Table } from "antd";

function TransactionTable({ transactions, addTransaction, fetchTransactions }) {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState(""); // Use empty string for "All" filter
  const [sortKey, setSortKey] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === "" || item.type === typeFilter) // Updated filter logic
  );

  let sortTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });
  const exportCSV = () => {
    if (!transactions || transactions.length === 0) {
      console.error("No data to export.");
      toast.error("No transactions available for export.");
      return;
    }

    const csvContent = transactions
      .map((t) => `${t.name},${t.amount},${t.tag},${t.date},${t.type}`)
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div
        style={{
          width: "95vw",
          padding: "0rem 2rem",
          margin: "50px"

          // justifyContent: "evenly"
        }}
      >
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",

            gap: "item",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          {" "}
          <div className="input-flex">
            {/* <img src={search} width="16px" /> */}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name"
            />
          </div>
          <div>
            <Select
              className="select-input"
              onChange={(value) => setTypeFilter(value)}
              value={typeFilter}
              placeholder="Filter"
              allowClear
            >
              <Option value="" key="all">
                All
              </Option>
              <Option value="Income" key="income">
                Income
              </Option>
              <Option value="Expense" key="expense">
                Expense
              </Option>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <Radio.Group
          className="input-radio"
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "35%",
          }}
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort By Date</Radio.Button>
          <Radio.Button value="amount">Sort By Amount</Radio.Button>
        </Radio.Group>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            width: "400px",
          }}
        >
          <button
  
             style={{
               justifyContent: "center",
               alignItems: "center",
               position:"relative",
             marginLeft: "50rem",
             padding: "2rem 2rem",
             width: "20rem"
            // padding:"30rem"
             }}
            className="btn"
            onClick={exportCSV}
          >
            Export to Csv
          </button>
        
        </div>
        <Table
          dataSource={sortTransactions}
          style={{border:"2px solid rgb(41, 112, 255)" ,
            margin:"5px"
          }}
          columns={columns}
          rowKey={(record) => record.id || `${record.date}-${record.name}`} // Better key strategy
        />
      </div>
    </>
  );
}

export default TransactionTable;
