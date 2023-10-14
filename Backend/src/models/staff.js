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
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_card: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    id_account: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account',
        key: 'id'
      }
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    sex: {
      type: DataTypes.ENUM('Nam','Nữ','Khác'),
      allowNull: true
    },
    bank_account_number: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    start_work: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    end_work: {
      type: DataTypes.DATE,
      allowNull: false
    },
    create_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'account',
        key: 'id'
      }
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
        name: "FK_staff_account",
        using: "BTREE",
        fields: [
          { name: "id_account" },
        ]
      },
      {
        name: "FK_staff_account_create_by",
        using: "BTREE",
        fields: [
          { name: "create_by" },
        ]
      },
    ]
  });
};
