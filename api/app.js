'use strict';

//load modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const { sequelize } = require('./models');

//variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

//create the Express app
const app = express();

// enable all CORS requests
app.use(cors());

//setup morgan which gives us http request logging
app.use(morgan('dev'));

//parse json
app.use(express.json());

//setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Hello There!',
  });
});

//add routes
app.use('/api', routes);

//send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

//setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

//set our port
app.set('port', process.env.PORT || 5001);

//test the database connection.
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

//sequelize model synchronization, then start listening on our port.
sequelize.sync()
  .then(() => {
    const server = app.listen(app.get('port'), () => {
      console.log(`Express server is listening on port ${server.address().port}`);
    });
  });
