import { sequelize, User, Thing, ResetToken, ConfirmEmailToken } from '.';
import { users as usersSeedData, things as thingsSeedData, resetTokens as resetTokensSeed, confirmEmailTokens as confirmEmailTokensSeed } from './seeds/development';

/**
 * Drop and recreate database tables
 * @ignore
 */
const syncDevDB = async () => {
  try {
    console.log('Dropping development database tables and recreating');

    await sequelize.sync({
      force: true,
      match: /_development$/,
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Seed user, reset token and thing database data
 * NOTE: {individualHooks: true} is need to trigger model before hooks
 * @ignore
 */
const seedDevDB = async () => {
  try {
    console.log('Seeding users data.');
    const users = await User.bulkCreate(usersSeedData, { individualHooks: true });

    console.log('Seeding things data.');
    await Thing.bulkCreate(thingsSeedData, { individualHooks: true });

    console.log('Seeding reset token data.');
    const resetTokensSeedData = resetTokensSeed(users);
    await ResetToken.bulkCreate(resetTokensSeedData, { individualHooks: true });

    console.log('Seeding confirm email token data.');
    const confirmEmailTokensSeedData = confirmEmailTokensSeed(users);
    await ConfirmEmailToken.bulkCreate(confirmEmailTokensSeedData, { individualHooks: true });
  } catch (error) {
    throw error;
  }
};

/**
 * Sync and seed development database
 * @ignore
 */
const resetDevDB = async () => {
  try {
    await syncDevDB();
    console.log('Development database synced.');

    await seedDevDB();
    console.log('Development database seeded.');

    sequelize.close();
  } catch (error) {
    console.log('RESET ERROR: ' + error.message);
  }
};

resetDevDB();
