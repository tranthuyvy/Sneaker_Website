const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('discount_product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_product: {
      type: DataTypes.STRING(15),
      allowNull: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    id_discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'discount',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'discount_product',
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
        name: "FK_discount_product_discount",
        using: "BTREE",
        fields: [
          { name: "id_discount" },
        ]
      },
      {
        name: "FK_discount_product_product",
        using: "BTREE",
        fields: [
          { name: "id_product" },
        ]
      },
    ]
  });
};
