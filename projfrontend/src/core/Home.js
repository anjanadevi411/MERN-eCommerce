import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    return loadAllProducts();
  }, []);

  return (
    <Base title="Online Store" description="Amazing place to shop online">
      <div className="row text-center">
        <h1 className="text-white">All about T-shirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div className="col-4" key={index}>
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default Home;
