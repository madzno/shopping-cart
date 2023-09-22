import CartTable from "./CartTable"

const Header = ({ cartEmpty, cartItems, onCheckout }) => {
  if (cartEmpty) {
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

  return (
    <>
      <header>
        <h1>The Shop!</h1>
        <div className="cart">
          <h2>Your Cart</h2>
          <CartTable cartItems={cartItems} />
          <div className="checkout-button">
            <button className="checkout" onClick={onCheckout}>Checkout</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
