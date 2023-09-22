import { useState } from "react";

const AddForm = ({ formVisible, setVisible, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const classForm = formVisible ? "add-form visible" : "add-form";

  const toggleForm = (e) => {
    e.preventDefault()

    if (formVisible) {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, price, quantity });
    reset();
    console.log(title, price, quantity);
    setVisible(false)
  };

  const reset = () => {
    setTitle("");
    setPrice("");
    setQuantity("");
  };

  return (
    <div className={classForm}>
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

export default AddForm;
