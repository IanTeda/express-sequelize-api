import { Authorization } from '../../database';

/**
 * Check if request is granted
 *
 * @param {*} role
 * @param {*} resource
 * @param {*} permission
 * @return {*}
 */
const isGranted = async (role, resource, permission) => {
  try {
    // console.log(`Role: ${role} | Resource: ${resource} | Permission ${permission}`);
    const grant = await Authorization.findAll({
      where: {
        role: role,
        resource: resource,
        permission: permission,
      },
    });



    console.log(grant);

    return grant;
  } catch (error) {
    return error;
  }
};

export { isGranted };
