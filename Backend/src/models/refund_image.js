const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('refund_image', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_feed_back: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'refund',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: false
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
          { name: "id_feed_back" },
        ]
      },
    ]
  });
};
