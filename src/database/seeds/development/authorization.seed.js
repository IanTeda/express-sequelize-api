import { permissions, resources, roles } from '../../../configs';

const authorizations = [
  { role: roles.USER, userId: 0, resource: resources.AUTHORIZATIONS, resourceId: 0, permission: permissions.READ },
  { role: roles.USER, userId: 2, resource: resources.AUTHORIZATIONS, resourceId: 0, permission: permissions.CREATE },
  { role: roles.USER, userId: 2, resource: resources.AUTHORIZATIONS, resourceId: 2, permission: permissions.UPDATE },
  { role: roles.USER, userId: 2, resource: resources.AUTHORIZATIONS, resourceId: -1, permission: permissions.DESTROY },
];

export default authorizations;
