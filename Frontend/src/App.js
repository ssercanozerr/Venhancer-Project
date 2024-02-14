// App.js
import React from "react";

import MyForm from "./screens/Form";
import Listele from "./screens/Listele";
import GuncelleForm from "./screens/Guncelle";
import SilForm from "./screens/Sil";

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <Listele />
      <MyForm />
      <GuncelleForm/>
      <SilForm/>
    </div>
  );
};

export default App;
