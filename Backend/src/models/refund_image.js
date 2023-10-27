const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('refund_image', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_refund: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'refund',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'refund_image',
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
        name: "FK_feedbackimage_feedback",
        using: "BTREE",
        fields: [
          { name: "id_refund" },
        ]
      },
    ]
  });
};
