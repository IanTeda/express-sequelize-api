import {sequelize, User, Thing, ResetToken} from '.'
import { users as usersSeedData, things as thingsSeedData, resetTokens as resetTokensSeed } from './seeds/development' 

/**
 * SYNC DEVELOPMENT DATABASE
 * -------------------------
 * Drop and recreate database tables
 */
const syncDevDB = async () => {

  try {

  console.log('Dropping development database tables and recreating');

  await sequelize.sync({
    force: true,
    match: /_development$/,
  });
    
  } catch (error) {
    throw error
  }

}

/**
 * SEED DEVELOPMENT DATABASE
 * -------------------------
 * 
 * Seed user, reset token and thing database data
 */
const seedDevDB = async () => {

  try {

    console.log('Seeding users data.')
    const users = await User.bulkCreate(usersSeedData, {individualHooks: true});

    console.log('Seeding things data.')
    await Thing.bulkCreate(thingsSeedData, {individualHooks: true})

    console.log('Seeding reset token data.')
    const resetTokensSeedData = resetTokensSeed(users)
    await ResetToken.bulkCreate(resetTokensSeedData, {individualHooks: true});
    
  } catch (error) {
    throw error
  }

}

/**
 * RESET DEVELOPMENT DATABASE
 * --------------------------
 * Sync and seed development database
 */
const resetDevDB = async () => {

  try {

    await syncDevDB();
    console.log('Development database synced.')

    await seedDevDB();
    console.log('Development database seeded.')

    sequelize.close();
    
  } catch (error) {
    console.log('RESET ERROR: ' + error.message)
  }
}

resetDevDB();
