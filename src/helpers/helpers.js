// Replacing áéíóú to aeiou
export const cleanSearchText = (product) => {
  return product
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
};
