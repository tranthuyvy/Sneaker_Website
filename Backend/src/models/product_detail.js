const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_detail', {
    id: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_product: {
      type: DataTypes.STRING(15),
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product_detail',
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
        name: "FK_product_detail_product",
        using: "BTREE",
        fields: [
          { name: "id_product" },
        ]
      },
    ]
  });
};
