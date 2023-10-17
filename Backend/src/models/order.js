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
      allowNull: false
    },
    total_item: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total_discounted_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status_payment: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'staff',
        key: 'id'
      }
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    delivery_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
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
    ]
  });
};
