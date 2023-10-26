const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_item: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_discounted_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status_payment: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
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
      allowNull: true
    },
    delivery_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    id_address: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'address',
        key: 'id'
      }
    },
    payment_method: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'payment_method',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'order',
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
        name: "FK_order_user",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "FK_order_staff",
        using: "BTREE",
        fields: [
          { name: "update_by" },
        ]
      },
      {
        name: "FK_order_address",
        using: "BTREE",
        fields: [
          { name: "id_address" },
        ]
      },
      {
        name: "FK_order_payment_idx",
        using: "BTREE",
        fields: [
          { name: "payment_method" },
        ]
      },
    ]
  });
};
