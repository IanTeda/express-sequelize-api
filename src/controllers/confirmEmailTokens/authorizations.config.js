import { AccessControl } from 'accesscontrol';
import { roles, resources, actions } from '../../configs';

let grantList = [
  { role: roles.USER, resource: resources.CONFIRM_EMAIL_TOKENS, action: actions.READ_OWN, attributes: '*' },

  { role: roles.ADMIN, resource: resources.CONFIRM_EMAIL_TOKENS, action: actions.READ_ANY, attributes: '*' },
  { role: roles.ADMIN, resource: resources.CONFIRM_EMAIL_TOKENS, action: actions.DELETE_ANY, attributes: '*' },
  
  { role: roles.SUDO, resource: resources.CONFIRM_EMAIL_TOKENS, action: actions.CREATE_ANY, attributes: '*' },
  { role: roles.SUDO, resource: resources.CONFIRM_EMAIL_TOKENS, action: actions.READ_ANY, attributes: '*' },
  { role: roles.SUDO, resource: resources.CONFIRM_EMAIL_TOKENS, action: actions.UPDATE_ANY, attributes: '*' },
  { role: roles.SUDO, resource: resources.CONFIRM_EMAIL_TOKENS, action: actions.DELETE_ANY, attributes: '*' },
];

const authorizations = new AccessControl(grantList);

// All role needs to be referenced at least once else AccessControl will throw an error
authorizations.deny(roles.GUEST);

export default authorizations;
