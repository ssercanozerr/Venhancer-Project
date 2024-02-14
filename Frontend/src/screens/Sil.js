// components/DeleteForm.js
import React, { useState } from "react";
import { deleteProductById } from "../backend/RestApi";

const SilForm = ({}) => {
  const [confirmation, setConfirmation] = useState("");
  const [id, setId] = useState(0);
  const handleDelete = async () => {
    if (confirmation === "DELETE") {
      // Silme işlemi için API çağrısı
      await deleteProductById(id);

      window.location.reload();
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Ürün Sil</h2>
      <label>
        Id:
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </label>
      <p>Ürünü silmek için 'DELETE' yazın ve onaylayın.</p>
      <input
        type="text"
        placeholder="DELETE"
        value={confirmation}
        onChange={(e) => setConfirmation(e.target.value)}
      />
      <br />
      <button type="button" onClick={handleDelete}>
        Sil
      </button>
      
    </div>
  );
};

export default SilForm;
