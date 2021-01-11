import { AccessControl } from 'accesscontrol';
import { roles, resources } from '../../configs';

/**
 * 'api/users' authorization list.
 */
const authorizations = new AccessControl();

/**
 * URL Endpoint 'api/users'
 */
const USERS = resources.USERS;

authorizations.grant(roles.USER)
  .readOwn(USERS)
  .updateOwn(USERS);

authorizations.grant(roles.ADMIN)
  .createAny(USERS)
  .readAny(USERS)
  .updateAny(USERS)
  .deleteAny(USERS);

authorizations.grant(roles.SUDO)
  .createAny(USERS)
  .readAny(USERS)
  .updateAny(USERS)
  .deleteAny(USERS);

export default authorizations;
