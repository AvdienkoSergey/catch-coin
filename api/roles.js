({
    async getAll({}) {
      const rolesTable = db('roles');
      const roles = await rolesTable.query('SELECT * FROM roles');
      return { status: 'ok', roles };
    },
    async getOne({ id }) {
      const rolesTable = db('roles');
      const role = await rolesTable.query('SELECT * FROM roles WHERE id = $1', [id]);
      return { status: 'ok', role };
    }
});