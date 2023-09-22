import TableRow from "./TableRow"

const CartTable = ({ cartItems }) => {
  const totalCartItems = () => {
    let total = 0;

    cartItems.forEach(item => {
      total += item.price;
    })

    return total;
  }

  return (
    <>
      <table className="cart-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => {
            return <TableRow
              key={item._id}
              title={item.title}
              quantity={item.quantity}
              price={item.price}
            />
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="total">Total: ${totalCartItems()}</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}

export default CartTable;
