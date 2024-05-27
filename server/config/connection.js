const mongoose = require('mongoose');
const winston = require('winston');

// Configure winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'mongodb.log' })
  ],
});

// MongoDB Atlas connection URI
const uri = process.env.MONGODB_URI || 'mongodb+srv://peensbryan75:9osdJ4eRgTSEDrxE@cluster0.f7qan0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  logger.info('MongoDB connection successful');
})
.catch((err) => {
  logger.error(`MongoDB connection error: ${err.message}`);
});

const connection = mongoose.connection;

connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err.message}`);
});

connection.once('open', () => {
  logger.info('MongoDB connection open');
});

module.exports = connection;
