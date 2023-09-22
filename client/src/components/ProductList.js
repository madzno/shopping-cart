import ProductWrapper from "./ProductWrapper"

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

export default ProductList;
