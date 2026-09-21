const API_URL = "http://localhost:3001";
const BASE_URL = `${API_URL}/api/products`;

export const createProduct = async (product) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("No se pudo crear el producto");
  }

  const result = await res.json();
  return result;
};

/*
export const getProducts = async (category) => {
  let url = BASE_URL;

  if (category) {
    url = `${BASE_URL}?category=${category}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  const results = await res.json();
  return results;
};
*/

export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  const url = params.toString() ? `${BASE_URL}?${params.toString()}` : BASE_URL;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  return await res.json();
};

export const getCollections = async (collection) => {
  let url = BASE_URL;
  if (collection) {
    url = `${BASE_URL}?collection=${collection}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  const results = await res.json();
  return results;
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("No se pudo obtener el producto");
  }
  return await res.json();
};