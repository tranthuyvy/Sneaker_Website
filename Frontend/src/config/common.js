const localStorageKey = "cart";
function getImage(product) {
  if (!isEmpty(product) && product.images?.length > 0)
    return product.images[0].link;
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
function findQuantity(id, cart) {
  let quantity = 0;
  for (let i of cart) {
    if (i.id.localeCompare(id) == 0) quantity = i.quantity;
  }
  return quantity;
}
function checkValidPhone(phone) {
  const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  return phone.match(regexPhoneNumber) ? true : false;
}
function getPrice(product) {
  let listDiscount = product.discount_products || [];
  let max = 0;
  // 1 tiền 2 phần trăm
  if (listDiscount.length == 0) return 0;
  for (let i of listDiscount) {
    if (i.type === 2)
      max = Math.max(
        (i.id_discount_discount.value / 100) * product.product_price,
        max
      );
    else max = Math.max(max, i.id_discount_discount.value);
  }
  return max;
}
export { getImage, setCart, getCart, findQuantity, getPrice };
