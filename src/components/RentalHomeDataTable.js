import React from "react";
import { makeStyles } from "@material-ui/core";
import EnhancedTable from "../modules/DataTable";
import ProductCheckout from "../modules/ProductCheckout";
import Data from "../data/Data.json";
import Snackbar from "@material-ui/core/Snackbar";

//to insert IDs on given Data
function insertIDs(data) {
  let temp = [];
  data.map((item, index) => {
    temp = [...temp, { ...item, id: index }];
  });
  //console.log(data);
  return temp;
}

// SetItem is mainly used for saving the data in localStorage

// initDataFromLocalStorage funtion is mainly used for fetch data from localstorage if available,else set from json data 
function initDataFromLocalStorage(data) {
  if (!localStorage.getItem("dataList")) {
    localStorage.setItem("dataList", JSON.stringify(insertIDs(data)));
  }
// Using JSON.stringify in the setItem is optional when saving string data to the storage.However, JSON.stringify is required if the value is a different data type, like an object or array.
  const fetchedData = JSON.parse(localStorage.getItem("dataList"));

// Here the getItem() storage method to retrieve data from the local storage.  
  return fetchedData;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  localStorageParagraph: {
    textAlign: "left",
    fontFamily: "monospace",
    fontSize: 12,
    textDecoration: "underline",
    cursor: "pointer",
    marginLeft: 10,
  },
}));
export default function RentalHomeDataTable() {
  const classes = useStyles();
  const [rows, setRows] = React.useState(initDataFromLocalStorage(Data));
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [showNotification, setNotificationOpen] = React.useState(false);
  
  const resetLocalstorage = () => {
    console.log("ok");
    if (localStorage.getItem("dataList")) localStorage.removeItem("dataList");
    setRows(initDataFromLocalStorage(Data));
  };
  const callBackForTable = (data) => {
    setSelectedProduct(data);
  };

  //callback to update product table after successfully booking or returning
  const updateTable = () => {
    const fetchedFromLocalStorage = JSON.parse(
      localStorage.getItem("dataList")
    );

    setRows(fetchedFromLocalStorage);
    setSelectedProduct(null);
    setNotificationOpen(true);
  };

  return (
    <div className={classes.root}>
      <EnhancedTable
        dataList={rows}
        selectedProduct={selectedProduct}
        callBackForTable={callBackForTable}
      />

      <ProductCheckout
        dataList={rows}
        selectedRow={selectedProduct}
        updateTable={updateTable}
      />

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showNotification}
        onClose={() => setNotificationOpen(false)}
        message="Rental Info Updated"
        autoHideDuration={3000}
      />
    </div>
  );
}
