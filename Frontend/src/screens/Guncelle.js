// components/UpdateForm.js
import React, { useState, useEffect } from "react";
import { updateProduct } from "../backend/RestApi";

const GuncelleForm = () => {
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [id, setId] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Güncelleme işlemi için API çağrısı
    await updateProduct(id, { id,category, name: productName });
    window.location.reload();
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Ürün Bilgisi Güncelle</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Id:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
        <br />
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
        <button type="submit">Güncelle</button>
        
      </form>
    </div>
  );
};

export default GuncelleForm;
