import { AccessControl } from 'accesscontrol';
import { roles, resources } from '../../configs';

/**
 * 'api/confirm-email-tokens' authorization list.
 */
const authorizations = new AccessControl();

/**
 * URL Endpoint 'api/confirm-email-tokens'
 */
const CONFIRM_EMAIL_TOKENS = resources.CONFIRM_EMAIL_TOKENS;

authorizations.grant(roles.USER)
  .readOwn(CONFIRM_EMAIL_TOKENS);

authorizations.grant(roles.ADMIN)
  .readAny(CONFIRM_EMAIL_TOKENS)
  .deleteAny(CONFIRM_EMAIL_TOKENS);

authorizations.grant(roles.SUDO)
  .createAny(CONFIRM_EMAIL_TOKENS)
  .readAny(CONFIRM_EMAIL_TOKENS)
  .updateAny(CONFIRM_EMAIL_TOKENS)
  .deleteAny(CONFIRM_EMAIL_TOKENS);

export default authorizations;
