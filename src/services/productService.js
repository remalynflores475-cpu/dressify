const API_URL = "https://dummyjson.com/products/category/womens-dresses";

export async function getProducts() {
  const response = await fetch(`${API_URL}?limit=0`);

  if (!response.ok) {
    throw new Error("Failed to fetch products. Please try again.");
  }

  const data = await response.json();

  return data.products;
}