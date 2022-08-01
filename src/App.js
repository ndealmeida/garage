import React, { useState } from "react";
import "@fontsource/roboto";
import FsLightbox from "fslightbox-react";
import "./App.css";
import { products } from "./data";

const ProductCard = ({ product }) => {
  const [toggler, setToggler] = useState(false);
  const onClick = (e) => {
    e.preventDefault();
    setToggler(!toggler);
  };

  const formatPrice = (product) =>
    product.toLocaleString("en-US", { style: "currency", currency: "EUR" });
  const discount = Math.round(
    100 - (product.price / product.originalPrice) * 100
  );
  const imageUrls = product.imageUrls.map((url) => {
    return url.startsWith("img") ? process.env.PUBLIC_URL + "/" + url : url;
  });

  return (
    <>
      <FsLightbox toggler={toggler} sources={imageUrls} type="image" />
      <div className="product">
        {product.sold && <div className="sold">VENDIDO</div>}
        <a href="/#" onClick={onClick}>
          <img src={imageUrls[0]} alt={product.imageUrls[0]} />
        </a>
        <div className="product-details">
          <h3>{product.name}</h3>
          {discount > 0 && <span className="discount">-{discount}%</span>}
          { product.url !== '' &&
            <a className="original" href={product.url} target="_blank" rel="noreferrer">Original price</a>
          }
          <ul>
            {product.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
        <div className="price">{formatPrice(product.price)}</div>
      </div>
    </>
  );
};

function App() {
  const sortedProducts = products.sort((a, b) => a.price - b.price);
  return (
    <div className="App">
      <div>
        <header>Junior & Millena&#39;s Garage Sale</header>
        <div className="contact">
          <h5>We are moving soon, if you are interested, please reach out :)</h5>
          <ul>
            <li>Telephone: 06 3903 7644</li>
            <li>Facebook: Millena Franco</li>
            <li>Email: millenasfranco@gmail.com</li>
          </ul>
        </div>
        <div className="container">
          {sortedProducts.map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
