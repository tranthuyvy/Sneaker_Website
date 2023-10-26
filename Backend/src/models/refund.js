const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('refund', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'refund',
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
        name: "FK_feedback_order",
        using: "BTREE",
        fields: [
          { name: "id_order" },
        ]
      },
    ]
  });
};
