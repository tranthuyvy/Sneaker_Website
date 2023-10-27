const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_batch_item', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_product_detail: {
      type: DataTypes.STRING(15),
      allowNull: true,
      references: {
        model: 'product_detail',
        key: 'id'
      }
    },
    import_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_product_batch: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product_batch',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_batch_item',
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
        name: "FK_productBatchItem_productBatch",
        using: "BTREE",
        fields: [
          { name: "id_product_batch" },
        ]
      },
      {
        name: "FK_productBatchItem_productDetail",
        using: "BTREE",
        fields: [
          { name: "id_product_detail" },
        ]
      },
    ]
  });
};
