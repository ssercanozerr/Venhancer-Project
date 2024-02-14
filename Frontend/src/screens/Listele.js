import React, { useEffect, useState } from "react";

const Listele = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("id:" + data.id);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
    fetch("http://localhost:5000/categories")
      .then((response) => response.json())
      .then((data) => setCategory(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div style={{ margin: "20px", borderRadius: "5px" }}>
      <h2>Kategori Listesi</h2>
      <ul>
        {category.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <h2>Ürün Listesi</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.id}-{product.name}--{product.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listele;
