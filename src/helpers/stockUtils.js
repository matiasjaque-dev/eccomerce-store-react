export const getAvailableStock = (productId, stockOriginal, cart) => {
  const itemInCart = cart.find((item) => item.id === productId);
  return stockOriginal - (itemInCart?.quantity || 0);
};
