const BASE_URL = "https://68cda302da4697a7f30695ae.mockapi.io/productos";

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

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error("No se pudo obtener el producto");
  }
  return await res.json();
}