import { AccessControl } from 'accesscontrol';
import { roles, resources } from '../../configs';

/**
 * 'api/authorization-tokens' authorization list.
 */
const authorizations = new AccessControl();

/**
 * URL Endpoint 'api/authorization-tokens'.
 */
const RESET_TOKENS = resources.RESET_TOKENS;

authorizations.grant(roles.USER)
  .readOwn(RESET_TOKENS);

authorizations.grant(roles.ADMIN)
  .readAny(RESET_TOKENS)
  .deleteAny(RESET_TOKENS);

authorizations.grant(roles.SUDO)
  .createAny(RESET_TOKENS)
  .readAny(RESET_TOKENS)
  .updateAny(RESET_TOKENS)
  .deleteAny(RESET_TOKENS);

export default authorizations;
