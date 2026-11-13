
const API_URL = "https://dummyjson.com/products?limit=0";

export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products. Please try again.");
  }

  const data = await response.json();

  // Keep women's fashion products and general tops.
  return data.products.filter(
    (product) =>
      product.category.startsWith("womens-") ||
      product.category === "tops"
  );
}
