import { Sequelize, DataTypes } from 'sequelize';

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false
    }
  }
});

// Define a new model for your items
const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

// Use sequelize.sync() to create the table if it does not exist
sequelize.sync().then(() => {
  console.log('Item table created');
});

export { sequelize, Item };