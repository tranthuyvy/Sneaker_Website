const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_product_detail: {
      type: DataTypes.STRING(15),
      allowNull: true,
      references: {
        model: 'product_detail',
        key: 'id'
      }
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order_detail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "FK_orderdetail_order",
        using: "BTREE",
        fields: [
          { name: "id_order" },
        ]
      },
      {
        name: "FK_orderdetail_productdetail",
        using: "BTREE",
        fields: [
          { name: "id_product_detail" },
        ]
      },
    ]
  });
};
