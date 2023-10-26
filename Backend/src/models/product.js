const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_branch: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'branch',
        key: 'id'
      }
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    create_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'id'
      }
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    update_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'staff',
        key: 'id'
      }
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product',
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
        name: "FK_product_branch",
        using: "BTREE",
        fields: [
          { name: "id_branch" },
        ]
      },
      {
        name: "FK_product_category",
        using: "BTREE",
        fields: [
          { name: "id_category" },
        ]
      },
      {
        name: "FK_product_staff_create",
        using: "BTREE",
        fields: [
          { name: "create_by" },
        ]
      },
      {
        name: "FK_product_staff_update",
        using: "BTREE",
        fields: [
          { name: "update_by" },
        ]
      },
    ]
  });
};
