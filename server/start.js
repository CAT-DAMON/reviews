const app = require('./app.js')
const port = 3001

app.listen(port, () => {
  console.log(`App listening at ${port}`);
});

const Timer = require('../point_in_time_v1/timer.js');
