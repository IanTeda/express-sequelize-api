import { sequelize } from '../src/database';

before(async () => {
  // Drop and create all database models
  // This will run .sync() only if database name ends with '_test'
  await sequelize.sync({
    force: true,
    match: /_test$/,
  });
  console.log('Database synced.');
  console.log('');
});
