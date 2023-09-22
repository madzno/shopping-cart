import { useState } from "react";

const EditForm = ({ id, currentName, currentPrice, currentQuantity, changeShown, onEditSubmit }) => {
  const [editedName, setEditedName] = useState(currentName);
  const [editedPrice, setEditedPrice] = useState(currentPrice);
  const [editedQuantity, setEditedQuantity] = useState(currentQuantity);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEditSubmit(id, { "title": editedName, "price": editedPrice, "quantity": editedQuantity });
    changeShown(false);
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

export default EditForm;
