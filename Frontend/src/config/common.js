const localStorageKey = 'cart'
function getImage(product) {
  if (!isEmpty(product) && product.images?.length > 0)
    return product.images[0].link
  return "https://w7.pngwing.com/pngs/296/367/png-transparent-shoe-sneakers-graphy-canvas-cartoon-shoes-miscellaneous-white-photography-thumbnail.png";
}
function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}
function setCart(list) {
  localStorage.setItem(localStorageKey, JSON.stringify([...list]));
}
function getCart() {
  const cartData = localStorage.getItem(localStorageKey);
  return cartData ? JSON.parse(cartData) : [];
}
function findQuantity(id,cart) {
  let quantity = 0;
  for (let i of cart) {
    if (i.id.localeCompare(id) == 0) quantity = i.quantity;
  }
  return quantity;
}
export { getImage, setCart, getCart,findQuantity};
