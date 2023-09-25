import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import AddForm from "./AddForm"
import ProductList from "./ProductList";
import { checkoutCart, getCartItems, getProducts } from "../services/theShop"

const App = () => {
  const [productData, setProductData] = useState([])
  const [isFormVisible, setFormVisible] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [isCartEmpty, setCartEmpty] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const products = getProducts();
      setProductData(products)
    }

    fetchProducts();
  }, [])

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = getCartItems();
      setCartItems(items)

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

  const updateCartItem = (itemObj) => {
    let item;
    let bool = false;
    item = cartItems.map(item => {
      if (item._id === itemObj._id) {
        bool = true;
        return itemObj;
      } else {
        return item;
      }
    })

    if (bool) {
      setCartItems(item)
    } else {
      setCartItems(cartItems.concat(itemObj))
    }
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
      const response = await axios.post(`/api/add-to-cart`, { productId: cartItemId })
      const newProductArr = updateProduct(response.data.product)
      setProductData(newProductArr)

      updateCartItem(response.data.item)
    } catch (e) {
      console.log(e);
    }
  }

  const handleCheckout = async () => {
    try {
      await checkoutCart();
      setCartItems([]);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div id="app">
      <Header
        cartEmpty={isCartEmpty}
        cartItems={cartItems}
        onCheckout={handleCheckout}
      />
      <ProductList
        allProducts={productData}
        onDeleteProduct={handleDeleteProduct}
        onEditProduct={handleEditProduct}
        onAddToCart={handleAddCartItem}
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
