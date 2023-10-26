const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('history_change_point', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    id_discount_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'discount_user',
        key: 'id'
      }
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'order',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'history_change_point',
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
        name: "FK_historychangepoint_discountuser",
        using: "BTREE",
        fields: [
          { name: "id_discount_user" },
        ]
      },
      {
        name: "FK_historychangepoint_user",
        using: "BTREE",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "FK_historychangepoint_order",
        using: "BTREE",
        fields: [
          { name: "id_order" },
        ]
      },
    ]
  });
};
