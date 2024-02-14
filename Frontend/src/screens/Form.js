// components/Form.js
import React, { useState, useEffect } from "react";
import { fetchProducts, fetchCategories, addCategory, addProduct } from "../backend/RestApi";;

const Form = () => {
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [maxProductId, setMaxProductId] = useState(0);
  const [maxCategoryId, setMaxCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      const maxId = Math.max(...data.map((product) => product.id), 0);
      setMaxProductId(maxId + 1);
    });

    fetchCategories().then((data) => {
      const maxId = Math.max(...data.map((category) => category.id), 0);
      setMaxCategoryId(maxId + 1);
      setCategories(data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categories.find((cat) => cat.name === category)) {
      // Kategori API'de yoksa, kategoriyi ekleyin
      await addCategory({ id: maxCategoryId, name: category });

      // Mevcut kategorileri güncelle
      setCategories([...categories, { id: maxCategoryId, name: category }]);
      setMaxCategoryId(maxCategoryId + 1);
    }

    // Yeni ürün ekleyin
    addProduct({ id: maxProductId, category, name: productName })
      .then((data) => {
        console.log("Response from API:", data);
        // Yeni ürün ekledikten sonra, en yüksek id değerini güncelle
        setMaxProductId(maxProductId + 1);

        // Sayfayı yenile
        window.location.reload();
      })
      .catch((error) => console.error("Error submitting form:", error));
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Ürün Bilgisi Ekle</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Kategori:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <br />
        <label>
          Ürün Adı:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
};

export default Form;
