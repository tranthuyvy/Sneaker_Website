const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_card: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    id_account: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'account',
        key: 'id'
      }
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sex: {
      type: DataTypes.ENUM('Nam','Nữ','Khác'),
      allowNull: true
    },
    bank_account_number: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    start_work: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    end_work: {
      type: DataTypes.DATE,
      allowNull: true
    },
    create_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    create_at: {
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
    tableName: 'staff',
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
        name: "FK_STAFF_ACCOUNT_idx",
        using: "BTREE",
        fields: [
          { name: "id_account" },
        ]
      },
    ]
  });
};
