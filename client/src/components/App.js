import { useState, useEffect } from "react";
import Header from "./Header";
import AddForm from "./AddForm"
import ProductList from "./ProductList";
import {
  checkoutCart,
  getCartItems,
  getProducts,
  addNewProduct,
  deleteProduct,
  editProduct,
  addNewCartItem
} from "../services/theShop"

const App = () => {
  const [productData, setProductData] = useState([])
  const [isFormVisible, setFormVisible] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [isCartEmpty, setCartEmpty] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProductData(products)
    }

    fetchProducts();
  }, [])

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();
      setCartItems(items)

      if (items.length === 0) {
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

  const removeFromProducts = (id) => {
    return productData.filter(product => {
      if (product._id != id) {
        return product
      }
    })
  }

  const handleNewProduct = async (newProduct) => {
    try {
      const returnedProduct = await addNewProduct(newProduct)

      setProductData(productData.concat(returnedProduct));
    } catch (e) {
      console.log(e);
    }
  }

  const handleDeleteProduct = async (deleteProductId) => {
    try {
      await deleteProduct(deleteProductId);
      let newArr = removeFromProducts(deleteProductId)
      setProductData(newArr)
    } catch (e) {
      console.log(e);
    }
  }

  const handleEditProduct = async (editProductId, editedProduct) => {
    try {
      const product = await editProduct(editProductId, editedProduct);
      const newArr = updateProduct(product)
      setProductData(newArr)
    } catch (e) {
      console.log(e);
    }
  }

  const handleAddCartItem = async (cartItemId) => {
    try {
      const responseData = await addNewCartItem({ productId: cartItemId })
      const newProductArr = updateProduct(responseData.product);
      setProductData(newProductArr);
      updateCartItem(responseData.item);
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
