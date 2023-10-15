const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_image', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_product_detail: {
      type: DataTypes.STRING(15),
      allowNull: false,
      references: {
        model: 'product_detail',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product_image',
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
        name: "FK_productimage_product_detail",
        using: "BTREE",
        fields: [
          { name: "id_product_detail" },
        ]
      },
    ]
  });
};
