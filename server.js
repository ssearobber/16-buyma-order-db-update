const { sequelize } = require('./models');
const { googleOrderSheet } = require('./targetURLs/googleOrderSheet');
require('dotenv').config();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

try {
  googleOrderSheet();
} catch (error) {
  console.log(error);
}
