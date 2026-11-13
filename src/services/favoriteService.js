
const STORAGE_KEY = "dressify-favorites";

export function getFavorites() {
  try {
    const favorites = localStorage.getItem(STORAGE_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(product) {
  const favorites = getFavorites();

  const alreadySaved = favorites.some(
    (item) => item.id === product.id
  );

  const updatedFavorites = alreadySaved
    ? favorites.filter((item) => item.id !== product.id)
    : [...favorites, product];

  saveFavorites(updatedFavorites);

  return updatedFavorites;
}
