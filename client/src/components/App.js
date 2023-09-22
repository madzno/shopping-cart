import { useState, useEffect } from "react";
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

const ProductWrapper = ({ id, title, price, quantity, onDeleteProduct, onEditProduct }) => {
  const [isEditFormShown, setEditFormShown] = useState(false);

  const onDelete = () => {
    onDeleteProduct(id)
    let undesiredProduct = document.getElementById(id)
    undesiredProduct.remove()
    console.log(undesiredProduct)
  }

  const onEdit = () => {
    setEditFormShown(true)
  }

  if (isEditFormShown) {
    return (
      <li id={id} className="product">
        <div className="product-details">
          <h3>{title}</h3>
          <p className="price">{price}</p>
          <p className="quantity">{quantity}</p>
          <div className="actions product-actions">
            <button className="add-to-cart">Add to Cart</button>
            <button className="edit" onClick={onEdit}>Edit</button>
          </div>
          <button className="delete-button" onClick={onDelete}><span>X</span></button>
        </div>
        <EditForm 
        id={id}
        currentName={title} 
        currentPrice={price} 
        currentQuantity={quantity} 
        changeShown={setEditFormShown}
        onEditSubmit={onEditProduct}  />
      </li>
    )
  }

  return (
    <li id={id} className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity}</p>
        <div className="actions product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="edit" onClick={onEdit}>Edit</button>
        </div>
        <button className="delete-button" onClick={onDelete}><span>X</span></button>
      </div>
    </li>
  )
}

const ProductList = ({ allProducts, onDeleteProduct, onEditProduct }) => {
  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">
        {allProducts.map(product => {
          return <ProductWrapper
            key={product._id}
            id={product._id}
            title={product.title}
            price={product.price}
            quantity={product.quantity}
            onDeleteProduct={onDeleteProduct}
            onEditProduct={onEditProduct}
          />
        })}
      </ul>
    </div>
  )
}

const EditForm = ({ id, currentName, currentPrice, currentQuantity, changeShown, onEditSubmit }) => {
  const [editedName, setEditedName] = useState(currentName);
  const [editedPrice, setEditedPrice] = useState(currentPrice);
  const [editedQuantity, setEditedQuantity] = useState(currentQuantity);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEditSubmit( id, { "title": editedName, "price": editedPrice, "quantity": editedQuantity });
  };

  return (
    <div className="edit-form">
      <h3>Edit Product</h3>
      <form action="" onSubmit={handleEditSubmit}>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            value={editedName}
            aria-label="Product Name"
            onChange={(e) => setEditedName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            type="number"
            id="product-price"
            value={editedPrice}
            aria-label="Product Price"
            onChange={(e) => setEditedPrice(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            id="product-quantity"
            value={editedQuantity}
            aria-label="Product Quantity"
            onChange={(e) => setEditedQuantity(e.target.value)}
          />
        </div>

        <div className="actions form-actions">
          <button type="submit">Update</button>
          <button type="button" onClick={() => changeShown(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

const AddForm = ({ toggleForm, onSubmit }) => {
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
          <label htmlFor="product-name">Product Name:</label>
          <input type="text" id="product-name" value={title} name="product-name" required onChange={(e) => {
            setTitle(e.target.value);
          }} />
        </div>
        <div className="input-group">
          <label htmlFor="product-price">Price:</label>
          <input type="number" id="product-price" value={price} name="product-price" min="0"
            step="0.01" required onChange={(e) => {
              setPrice(e.target.value);
            }} />
        </div>
        <div className="input-group">
          <label htmlFor="product-quantity">Quantity:</label>
          <input type="number" id="product-quantity" value={quantity} name="product-quantity"
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

// ## 1.3. PUT /api/products/:id

// Updates the product with the given `id`.

// ### 1.3.1. Expected Payload

// ```json
// {
//   "title": "Keyboard",
//   "price": 50,
//   "quantity": 5
// }
// ```

// ### 1.3.2. Successful Response

// The updated product is returned.

// #### 1.3.2.1. Example Response

// ```json
// {
//   "_id": "61d754d72092473d55a809e1",
//   "title": "Keyboard",
//   "price": 50,
//   "quantity": 5,
//   "createdAt": "2020-10-04T05:57:02.777Z",
//   "updatedAt": "2020-10-04T05:57:02.777Z",
//   "_v": 0
// }
// ```


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
    } catch (e) {
      console.log(e);
    }
  }

  const handleEditProduct = async (editProductId, editedProduct) => {
    try {
      const response = await axios.put(`/api/products/${editProductId}`, editedProduct)
      console.log(response.data)
      let editProduct = document.getElementById(editProductId)
      console.log(editProduct)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div id="app">
      <Header />
      <ProductList allProducts={productData} onDeleteProduct={handleDeleteProduct} onEditProduct={handleEditProduct} />
      <AddForm toggleForm={toggleFormVisible} onSubmit={handleNewProduct} />
    </div>
  )
}

export default App
