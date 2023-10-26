const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_batch', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    create_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'staff',
        key: 'id'
      }
    },
    id_supplier: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'supplier',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_batch',
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
        name: "FK_productBatch_Supplier",
        using: "BTREE",
        fields: [
          { name: "id_supplier" },
        ]
      },
      {
        name: "FK_product_batch_staff",
        using: "BTREE",
        fields: [
          { name: "create_by" },
        ]
      },
    ]
  });
};
