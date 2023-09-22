const Header = ({ cartEmpty }) => {
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
          <table className="cart-items">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Amazon Kindle E-reader</td>
                <td>2</td>
                <td>$79.99</td>
              </tr>
              <tr>
                <td>Apple 10.5-Inch iPad Pro</td>
                <td>1</td>
                <td>$649.99</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="total">Total: $729.98</td>
              </tr>
            </tfoot>
          </table>
          <div className="checkout-button">
            <button className="checkout">Checkout</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
