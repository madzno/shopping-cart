import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import AddForm from "./AddForm"
import ProductList from "./ProductList";

const App = () => {
  const [productData, setProductData] = useState([])
  const [isFormVisible, setFormVisible] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [isCartEmpty, setCartEmpty] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products")
      setProductData(response.data)
    }

    fetchProducts();
  }, [])

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await axios.get("/api/cart")
      setCartItems(response.data)

      if (response.data.length === 0) {
        setCartEmpty(true);
      } else {
        setCartEmpty(false);
      }
    }

    fetchCartItems();
  }, [])

  const updateProduct = (productObj) => {
    return productData.map(product => {
      if (product._id === productObj._id) {
        return productObj;
      } else {
        return product;
      }
    })
  }

  const deleteProduct = (id) => {
    return productData.filter(product => {
      if (product._id != id) {
        return product
      }
    })
  }

  const handleNewProduct = async (newProduct) => {
    try {
      const response = await axios.post("/api/products", { ...newProduct });

      setProductData(productData.concat(response.data));
    } catch (e) {
      console.log(e);
    }
  }

  const handleDeleteProduct = async (deleteProductId) => {
    try {
      await axios.delete(`/api/products/${deleteProductId}`);
      let newArr = deleteProduct(deleteProductId)
      setProductData(newArr)
    } catch (e) {
      console.log(e);
    }
  }

  const handleEditProduct = async (editProductId, editedProduct) => {
    try {
      const response = await axios.put(`/api/products/${editProductId}`, editedProduct)
      const newArr = updateProduct(response.data)
      setProductData(newArr)
    } catch (e) {
      console.log(e);
    }
  }

  const handleAddCartItem = async (cartItemId) => {
    try {
      const response = await axios.post(`api/add-to-cart`, { productId: cartItemId })
      console.log(response.data);
      // returns new cart item AND new product wrapped in an object i.e response.data.product points to new
      // product with new quantity and response.data.item ponits to new cart item with new quantity
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div id="app">
      <Header
        cartEmpty={isCartEmpty}
        cartItems={cartItems}
      />
      <ProductList
        allProducts={productData}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
      />
      <AddForm
        formVisible={isFormVisible}
        setVisible={setFormVisible}
        onSubmit={handleNewProduct}
      />
    </div>
  )
}

export default App
