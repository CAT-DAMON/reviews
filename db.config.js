module.exports.psqlConfig = {
    user: 'username',
    host: 'localhost',
    database: 'sdc',
    password: 'password123',
    port: 5432
};

module.exports.cassConfig = {
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'sdc'
}
