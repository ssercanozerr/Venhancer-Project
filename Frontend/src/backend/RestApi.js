// services/api.js
const BASE_URL = "http://localhost:5000";

export const fetchProducts = () => {
  return fetch(`${BASE_URL}/products`).then((response) => response.json());
};

export const fetchCategories = () => {
  return fetch(`${BASE_URL}/categories`).then((response) => response.json());
};

export const addCategory = (category) => {
  console.log("addCategory:"+category.id+"-"+category.name);
  return fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  }).then((response) => response.json());
};

export const addProduct = (product) => {
  return fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((response) => response.json());
};


export const updateCategory = (categoryId, category) => {
    return fetch(`${BASE_URL}/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    }).then((response) => response.json());
  };
  
  export const updateProduct = (productId, product) => {
    return fetch(`${BASE_URL}/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((response) => response.json());
  };

  export const deleteProductById = (productId) => {
    return fetch(`${BASE_URL}/products/${productId}`, {
      method: "DELETE",
    }).then((response) => response.json());
  };