function generateProductDetailId(productId, size) {
    // Lấy 2 chữ cái đầu tiên của ID sản phẩm
    const brand = productId.slice(0, 2);

    // Chuyển đổi size thành số
    const sizeNumber = parseInt(size);

    // Tạo ID sản phẩm
    const productIdWithSizeAndColor = `${brand}${sizeNumber}`;

    return productIdWithSizeAndColor;
}
function removeVi(text) {
    let withoutAccents = text.replace(/[àáâãäảạăắằẳẵặâấầẩẫậ]/g, "a").replace(/[èéêẽëèẹẻẽẹêếềểễệ]/g, "e")
        .replace(/[ìíîĩïỉịĩỉ]/g, "i").replace(/[òỏóôõöọôổốồổỗộơớờởỡợ]/g, "o").replace(/[ùúûũüùụủũụưứừửữự]/g, "u")
        .replace(/[ýýỳỷỹỵýỷỳ]/g, "y")
        .replace(/[đ]/g, "d").replace(" ", "")
    return withoutAccents
}
// function generateProductDetailId(productId, size, color) {
//     // Lấy 2 chữ cái đầu tiên của ID sản phẩm
//     const brand = productId.slice(0, 3);

//     // Chuyển đổi size thành số
//     const sizeNumber = parseInt(size);

//     // Tạo mã màu
//     const colorCode = removeVi(color.toLowerCase()).toUpperCase();

//     // Tạo ID sản phẩm
//     const productIdWithSizeAndColor = `${brand}${colorCode}${sizeNumber}`;

//     return productIdWithSizeAndColor.slice(0,15);
// }
function generateProductId(name, brand) {
    return removeVi((name.replace(" ", "_") + "_" + brand.slice(0, 3)).slice(0, 15)).toUpperCase()
}
// console.log(generateProductId("air jordan","adidas"));
// console.log(generateProductDetailId(generateProductId("air jordan","adidas"),'30',"Đỏ"))
export {
    generateProductDetailId,
    generateProductId
}
