import { sequelize, User, Thing, ResetToken, ConfirmEmailToken, Authorization } from './index';
import { users as usersSeedData, things as thingsSeedData, resetTokens as resetTokensSeed, confirmEmailTokens as confirmEmailTokensSeed, authorizations as authorizationsSeedData } from './seeds/development';

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
    console.log('Seeding User table.');
    const users = await User.bulkCreate(usersSeedData, { individualHooks: true });

    console.log('Seeding Thing table.');
    await Thing.bulkCreate(thingsSeedData, { individualHooks: true });

    console.log('Seeding ResetToken table.');
    const resetTokensSeedData = resetTokensSeed(users);
    await ResetToken.bulkCreate(resetTokensSeedData, { individualHooks: true });

    console.log('Seeding ConfirmEmailToken table.');
    const confirmEmailTokensSeedData = confirmEmailTokensSeed(users);
    await ConfirmEmailToken.bulkCreate(confirmEmailTokensSeedData, { individualHooks: true });

    console.log('Seeding Authorization table');
    await Authorization.bulkCreate(authorizationsSeedData, { individualHooks: true });

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
