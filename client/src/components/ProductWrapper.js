import { useState } from "react";
import EditForm from "./EditForm"

const ProductWrapper = ({ id, title, price, quantity, onDeleteProduct, onEditProduct }) => {
  const [isEditFormShown, setEditFormShown] = useState(false);

  const onDelete = () => {
    onDeleteProduct(id)
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
          onEditSubmit={onEditProduct} />
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

export default ProductWrapper;
