// App.js
import React from "react";

import MyForm from "./screens/Form";
import Listele from "./screens/Listele";
import GuncelleForm from "./screens/Guncelle";
import SilForm from "./screens/Sil";
import Chat from "./screens/Chat";

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <Listele />
      <MyForm />
      <GuncelleForm/>
      <SilForm/>
      <Chat/>
    </div>
  );
};

export default App;
