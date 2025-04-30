/**
 * @param {object} context The API context
 * @param {import('../lib/db').default} context.db The database instance
 * @returns {Promise<{status: string, roles: Array<object>}>}
 */
async function getAll(context) {
  const rolesTable = context.db("roles");
  const roles = await rolesTable.query("SELECT * FROM roles");
  return { status: "ok", roles };
}

/**
 * @param {object} context The API context
 * @param {import('../lib/db').default} context.db The database instance
 * @param {number} context.id The role ID
 * @returns {Promise<{status: string, role: object}>}
 */
async function getOne(context) {
  const rolesTable = context.db("roles");
  const role = await rolesTable.query("SELECT * FROM roles WHERE id = $1", [
    context.id,
  ]);
  return { status: "ok", role };
}

export default {
  getAll,
  getOne,
};
