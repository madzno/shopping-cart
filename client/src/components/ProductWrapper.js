import { useState, useEffect } from "react";
import EditForm from "./EditForm"

const ProductWrapper = ({ id, title, price, quantity, onDeleteProduct, onEditProduct, onAddProduct }) => {
  const [isEditFormShown, setEditFormShown] = useState(false);
  const [isZero, setIsZero] = useState(null);

  const onDelete = () => {
    onDeleteProduct(id)
  }

  const onEdit = () => {
    setEditFormShown(true)
  }

  const onAdd = () => {
    onAddProduct(id)
  }

  /*
     - if the edit form is shown AND the quanitty is 0 -> then we have to render the edit form component AND disable the
     add - to -cart button and make the quantity red
     - if the edit form is shown AND the quanity is > 0 -> then we have to render the edit form component and keep everything else as is
     - if the edit form is not shown and the quanitty is 0 -> then we have to render the edit form
  */

  useEffect(() => {
    console.log(quantity)
    if (quantity === 0) {
      setIsZero(true)
    } else {
      setIsZero(false)
    }
  }, [])

  if (isEditFormShown) {
    return (
      <li id={id} className="product">
        <div className="product-details">
          <h3>{title}</h3>
          <p className="price">{price}</p>
          <p className="quantity">{quantity}</p>
          <div className="actions product-actions">
            <button className="add-to-cart" disabled={isZero ? true : false} onClick={onAdd}>Add to Cart</button>
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
          <button className="add-to-cart" onClick={onAdd}>Add to Cart</button>
          <button className="edit" onClick={onEdit}>Edit</button>
        </div>
        <button className="delete-button" onClick={onDelete}><span>X</span></button>
      </div>
    </li>
  )
}

export default ProductWrapper;
