function getImage(product) {
  if (!isEmpty(product) && product.product_details.length > 0)
    for (let i of product.product_details) {
      if (i.image.localeCompare("") != 0) return i.image;
    }
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
export { getImage };
