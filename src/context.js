import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [productColors, setProductColors] = useState({});

  const [productQuantity, setProductQuantity] = useState({});

  const [productTotalPrice, setProductTotalPrice] = useState({});

  const [totalPrice, setTotalPrice] = useState(0);

  const [basket, setBasket] = useState([]);

  return (
    <DataContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        productColors,
        setProductColors,
        productQuantity,
        setProductQuantity,
        totalPrice,
        setTotalPrice,
        productTotalPrice,
        setProductTotalPrice,
        basket,
        setBasket,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
