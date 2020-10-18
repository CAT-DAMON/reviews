module.exports.psqlConfig = {
    user: 'username',
    host: 'localhost',
    database: 'sdc',
    password: 'password123',
    port: 5432
};
module.exports.psqlTestHeader = 'POSTGRESQL W/ 40M IN DATABASE \n::.........................::\n';


module.exports.cass = {
  config: {
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'sdc'
  },
  testHeader: 'CASSANDRA W/ 40M IN DATABASE \n::........................::\n'
};

