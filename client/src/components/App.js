import { useState, useEffect } from "react";
// import data from "../mockData/data"
import axios from "axios"

const Header = () => {
  return (
    <>
      <header>
        <h1>The Shop!</h1>
        <div className="cart">
          <h2>Your Cart</h2>
          <p>Your cart is empty</p>
          <p>Total: $0</p>
          <button className="checkout" disabled>Checkout</button>
        </div>
      </header>
    </>
  )
}

const Product = ({ id, title, price, quantity }) => {
  return (
    <li key={id} className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity}</p>
        <div className="actions product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="edit">Edit</button>
        </div>
        <button className="delete-button"><span>X</span></button>
      </div>
    </li>
  )
}

const ProductList = ({ allProducts }) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {allProducts.map(product => {
          return <Product
            id={product.id}
            title={product.title}
            price={product.price}
            quantity={product.quantity}
          />
        })}
      </ul>
    </div>
  )
}

const Form = ({ toggleForm, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, price, quantity });
    reset();
    console.log(title, price, quantity);
    let formDiv = document.getElementsByClassName("add-form")[0]
    formDiv.classList.toggle('visible')
  };

  const reset = () => {
    setTitle("");
    setPrice("");
    setQuantity("");
  };

  return (
    <div className="add-form">
      <p><button className="add-product-button" onClick={toggleForm}>Add A Product</button></p>
      <h3>Add Product</h3>
      <form action="" onSubmit={handleSubmit}>
        <div className="input-group">
          <label for="product-name">Product Name:</label>
          <input type="text" id="product-name" name="product-name" required onChange={(e) => {
            setTitle(e.target.value);
          }} />
        </div>
        <div className="input-group">
          <label for="product-price">Price:</label>
          <input type="number" id="product-price" name="product-price" min="0"
            step="0.01" required onChange={(e) => {
              setPrice(e.target.value);
            }} />
        </div>
        <div className="input-group">
          <label for="product-quantity">Quantity:</label>
          <input type="number" id="product-quantity" name="product-quantity"
            min="0" required onChange={(e) => {
              setQuantity(e.target.value);
            }} />
        </div>
        <div className="actions form-actions">
          <button type="submit" onSubmit={handleSubmit}>Add</button>
          <button type="button" onClick={toggleForm}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [productData, setProductData] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("/api/products")
      setProductData(response.data)
    }

    fetchProducts()
  }, [])

  const toggleFormVisible = (e) => {
    e.preventDefault()
    let formDiv = document.getElementsByClassName("add-form")[0]
    formDiv.classList.toggle('visible')
  }

  const handleNewProduct = async (newProduct, callback) => {
    try {
      const response = await axios.post("/api/products", { ...newProduct });

      setProductData(productData.concat(response.data));
      // if (callback) {
      //   callback();
      // }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div id="app">
      <Header />
      <ProductList allProducts={productData} />
      < Form toggleForm={toggleFormVisible} onSubmit={handleNewProduct} />
    </div>
  )
}

export default App
