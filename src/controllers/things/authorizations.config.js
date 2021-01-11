import { AccessControl } from 'accesscontrol';
import { roles, resources } from '../../configs';

/**
 * 'api/things' authorization list.
 */
const authorizations = new AccessControl();

/**
 * URL Endpoint 'api/things'.
 */
const THINGS = resources.THINGS;

authorizations.grant(roles.USER)
  .createAny(THINGS)
  .readAny(THINGS)
  .updateAny(THINGS)
  .deleteAny(THINGS);

authorizations.grant(roles.ADMIN)
  .extend(roles.USER)

authorizations.grant(roles.SUDO)
  .extend(roles.ADMIN)

export default authorizations;
