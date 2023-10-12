var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _branch = require("./branch");
var _category = require("./category");
var _discount = require("./discount");
var _discount_user = require("./discount_user");
var _history_change_point = require("./history_change_point");
var _order = require("./order");
var _order_detail = require("./order_detail");
var _product = require("./product");
var _product_batch = require("./product_batch");
var _product_batch_item = require("./product_batch_item");
var _product_detail = require("./product_detail");
var _product_image = require("./product_image");
var _refund = require("./refund");
var _refund_image = require("./refund_image");
var _review = require("./review");
var _role = require("./role");
var _staff = require("./staff");
var _supplier = require("./supplier");
var _user = require("./user");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var branch = _branch(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var discount = _discount(sequelize, DataTypes);
  var discount_user = _discount_user(sequelize, DataTypes);
  var history_change_point = _history_change_point(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var order_detail = _order_detail(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_batch = _product_batch(sequelize, DataTypes);
  var product_batch_item = _product_batch_item(sequelize, DataTypes);
  var product_detail = _product_detail(sequelize, DataTypes);
  var product_image = _product_image(sequelize, DataTypes);
  var refund = _refund(sequelize, DataTypes);
  var refund_image = _refund_image(sequelize, DataTypes);
  var review = _review(sequelize, DataTypes);
  var role = _role(sequelize, DataTypes);
  var staff = _staff(sequelize, DataTypes);
  var supplier = _supplier(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  staff.belongsTo(account, { as: "create_by_account", foreignKey: "create_by"});
  account.hasMany(staff, { as: "staffs", foreignKey: "create_by"});
  staff.belongsTo(account, { as: "id_account_account", foreignKey: "id_account"});
  account.hasMany(staff, { as: "id_account_staffs", foreignKey: "id_account"});
  product.belongsTo(branch, { as: "id_branch_branch", foreignKey: "id_branch"});
  branch.hasMany(product, { as: "products", foreignKey: "id_branch"});
  category.belongsTo(category, { as: "id_parent_category", foreignKey: "id_parent"});
  category.hasMany(category, { as: "categories", foreignKey: "id_parent"});
  product.belongsTo(category, { as: "id_category_category", foreignKey: "id_category"});
  category.hasMany(product, { as: "products", foreignKey: "id_category"});
  product.belongsTo(discount, { as: "id_discount_discount", foreignKey: "id_discount"});
  discount.hasMany(product, { as: "products", foreignKey: "id_discount"});
  history_change_point.belongsTo(discount_user, { as: "id_discount_user_discount_user", foreignKey: "id_discount_user"});
  discount_user.hasMany(history_change_point, { as: "history_change_points", foreignKey: "id_discount_user"});
  history_change_point.belongsTo(order, { as: "id_order_order", foreignKey: "id_order"});
  order.hasMany(history_change_point, { as: "history_change_points", foreignKey: "id_order"});
  order_detail.belongsTo(order, { as: "id_order_order", foreignKey: "id_order"});
  order.hasMany(order_detail, { as: "order_details", foreignKey: "id_order"});
  refund.belongsTo(order, { as: "id_order_order", foreignKey: "id_order"});
  order.hasMany(refund, { as: "refunds", foreignKey: "id_order"});
  product_detail.belongsTo(product, { as: "id_product_product", foreignKey: "id_product"});
  product.hasMany(product_detail, { as: "product_details", foreignKey: "id_product"});
  review.belongsTo(product, { as: "id_product_product", foreignKey: "id_product"});
  product.hasMany(review, { as: "reviews", foreignKey: "id_product"});
  product_batch_item.belongsTo(product_batch, { as: "id_product_batch_product_batch", foreignKey: "id_product_batch"});
  product_batch.hasMany(product_batch_item, { as: "product_batch_items", foreignKey: "id_product_batch"});
  order_detail.belongsTo(product_detail, { as: "id_product_detail_product_detail", foreignKey: "id_product_detail"});
  product_detail.hasMany(order_detail, { as: "order_details", foreignKey: "id_product_detail"});
  product_batch_item.belongsTo(product_detail, { as: "id_product_detail_product_detail", foreignKey: "id_product_detail"});
  product_detail.hasMany(product_batch_item, { as: "product_batch_items", foreignKey: "id_product_detail"});
  product_image.belongsTo(product_detail, { as: "id_product_detail_product_detail", foreignKey: "id_product_detail"});
  product_detail.hasMany(product_image, { as: "product_images", foreignKey: "id_product_detail"});
  refund_image.belongsTo(refund, { as: "id_feed_back_refund", foreignKey: "id_feed_back"});
  refund.hasMany(refund_image, { as: "refund_images", foreignKey: "id_feed_back"});
  account.belongsTo(role, { as: "id_role_role", foreignKey: "id_role"});
  role.hasMany(account, { as: "accounts", foreignKey: "id_role"});
  category.belongsTo(staff, { as: "create_by_staff", foreignKey: "create_by"});
  staff.hasMany(category, { as: "categories", foreignKey: "create_by"});
  discount.belongsTo(staff, { as: "create_by_staff", foreignKey: "create_by"});
  staff.hasMany(discount, { as: "discounts", foreignKey: "create_by"});
  discount.belongsTo(staff, { as: "update_by_staff", foreignKey: "update_by"});
  staff.hasMany(discount, { as: "update_by_discounts", foreignKey: "update_by"});
  discount_user.belongsTo(staff, { as: "create_by_staff", foreignKey: "create_by"});
  staff.hasMany(discount_user, { as: "discount_users", foreignKey: "create_by"});
  order.belongsTo(staff, { as: "update_by_staff", foreignKey: "update_by"});
  staff.hasMany(order, { as: "orders", foreignKey: "update_by"});
  product.belongsTo(staff, { as: "create_by_staff", foreignKey: "create_by"});
  staff.hasMany(product, { as: "products", foreignKey: "create_by"});
  product.belongsTo(staff, { as: "update_by_staff", foreignKey: "update_by"});
  staff.hasMany(product, { as: "update_by_products", foreignKey: "update_by"});
  product_batch.belongsTo(staff, { as: "create_by_staff", foreignKey: "create_by"});
  staff.hasMany(product_batch, { as: "product_batches", foreignKey: "create_by"});
  product_batch.belongsTo(supplier, { as: "id_supplier_supplier", foreignKey: "id_supplier"});
  supplier.hasMany(product_batch, { as: "product_batches", foreignKey: "id_supplier"});
  history_change_point.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(history_change_point, { as: "history_change_points", foreignKey: "id_user"});
  order.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(order, { as: "orders", foreignKey: "id_user"});
  review.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(review, { as: "reviews", foreignKey: "id_user"});

  return {
    account,
    branch,
    category,
    discount,
    discount_user,
    history_change_point,
    order,
    order_detail,
    product,
    product_batch,
    product_batch_item,
    product_detail,
    product_image,
    refund,
    refund_image,
    review,
    role,
    staff,
    supplier,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;