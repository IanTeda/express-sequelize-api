import { sequelize, User, Thing, ResetToken } from './index';
import * as seeds from './seeds';

async function reset() {
  try {
    // Get node process environment
    const environment = process.env.NODE_ENV;

    // Let them know what environment we are in
    console.log(`DATABASE RESET: Running in ${environment} environment.`);

    // Drop and create database tables. I do NOT drop database
    console.log('DATABASE RESET: Dropping and creating database tables.');
    await sequelize.sync({
      force: true,
    });

    // Different seed files depending on environment
    let usersSeedData, thingsSeedData;
    switch (environment) {
      case 'production':
        usersSeedData = seeds.production.users;
        thingsSeedData = seeds.production.things;
        break;
      case 'development':
        usersSeedData = seeds.development.users;
        thingsSeedData = seeds.development.things;
        break;
      default:
        break;
    }

    // Seed user data else skip over
    if (usersSeedData) {
      console.log('DATABASE RESET: Seed User data.');
      await User.bulkCreate(usersSeedData, {individualHooks: true});
    } else {
      console.log('DATABASE RESET: Skipping over user seeding.');
    }

    // Seed thing data else skip over
    if (thingsSeedData) {
      console.log('DATABASE RESET: Seed Thing data.');
      await Thing.bulkCreate(thingsSeedData, {individualHooks: true});
    } else {
      console.log('DATABASE RESET: Skipping over thing seeding.');
    }

    const users = await User.findAll();

    if (!users) console.log('DATABASE RESET ERROR: No user data.');

    // Different seed files depending on environment
    let resetTokenSeedData;
    switch (environment) {
      case 'production':
        resetTokenSeedData = seeds.production.resetTokens(users);
        break;
      case 'development':
        resetTokenSeedData = seeds.development.resetTokens(users);
        break;
      default:
        break;
    }

    // Seed reset token data else skip over
    if (resetTokenSeedData) {
      console.log('DATABASE RESET: Seed Reset Token data.');
      await ResetToken.bulkCreate(resetTokenSeedData, {individualHooks: true});
    } else {
      console.log('DATABASE RESET: Skipping over Reset Token seeding.');
    }

    // All done
    console.log('DATABASE RESET: Done setting up database.');
  } catch (error) {
    // Log caught error to console
    console.log(error);
    return;
  }
}

reset();
