const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();


const logger = {
  info: (message, meta = {}) => {
    const timestamp = new Date().toISOString();
    console.log(JSON.stringify({
      timestamp,
      level: 'INFO',
      message,
      ...meta
    }));
  },
  error: (message, error = {}) => {
    const timestamp = new Date().toISOString();
    console.error(JSON.stringify({
      timestamp,
      level: 'ERROR',
      message,
      error: error.message || error,
      stack: error.stack
    }));
  },
  warn: (message, meta = {}) => {
    const timestamp = new Date().toISOString();
    console.warn(JSON.stringify({
      timestamp,
      level: 'WARN',
      message,
      ...meta
    }));
  },
  debug: (message, meta = {}) => {
    if (process.env.NODE_ENV !== 'production') {
      const timestamp = new Date().toISOString();
      console.log(JSON.stringify({
        timestamp,
        level: 'DEBUG',
        message,
        ...meta
      }));
    }
  }
};



const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  logger.error('Missing required environment variables', {
    missing: missingEnvVars
  });
  process.exit(1);
}



const app = express();

// Trust proxy (for deployment behind reverse proxies like Nginx, Heroku, etc.)
app.set('trust proxy', 1);

// ============================================
// MIDDLEWARE
// ============================================

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      logger.warn('CORS request blocked', { origin });
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('HTTP Request', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent')
    });
  });

  next();
});

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});



const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);

    logger.info('MongoDB connected successfully', {
      database: mongoose.connection.name,
      host: mongoose.connection.host
    });

    // MongoDB connection event handlers
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

  } catch (error) {
    logger.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();



const ProjectModel = require('./events.models');



// Health check route
app.get('/api/health', (req, res) => {
  const healthData = {
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      name: mongoose.connection.name
    },
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB'
    }
  };

  logger.debug('Health check performed', healthData);
  res.status(200).json(healthData);
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Algobyte Backend API',
    status: 'active',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      work: '/work',
      timeline: '/timeline'
    }
  });
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// GET route for /work endpoint
app.get('/work', async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    logger.info('Fetched work projects', { count: projects.length });
    res.json(projects);
  } catch (err) {
    logger.error('Error fetching work projects', err);
    res.status(500).json({ error: err.message });
  }
});

// GET route for /timeline endpoint
app.get('/timeline', async (req, res) => {
  try {
    const events = await ProjectModel.find();
    logger.info('Fetched timeline events', { count: events.length });
    res.json(events);
  } catch (err) {
    logger.error('Error fetching timeline events', err);
    res.status(500).json({ error: err.message });
  }
});

// Get only upcoming events
app.get('/work/upcoming', async (req, res) => {
  try {
    const projects = await ProjectModel.find({ category: 'upcoming' })
      .sort({ date: 1 })
      .lean();

    logger.info('Fetched upcoming events', { count: projects.length });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    logger.error('Error fetching upcoming events', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch upcoming events',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Get only past events
app.get('/work/past', async (req, res) => {
  try {
    const projects = await ProjectModel.find({ category: 'past' })
      .sort({ date: -1 })
      .lean();

    logger.info('Fetched past events', { count: projects.length });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    logger.error('Error fetching past events', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch past events',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});


if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));

  app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
      return res.status(404).json({ success: false, message: 'API route not found' });
    }
    res.sendFile(path.join(buildPath, 'index.html'));
  });
} else {
  // In development, just 404 unknown routes instead of trying to serve a build
  app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
  });
}



// Global error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: errors
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered'
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // Default error response
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});



const gracefulShutdown = async (signal) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);

  try {
    await new Promise((resolve) => {
      server.close(resolve);
    });
    logger.info('HTTP server closed');

    await mongoose.connection.close();
    logger.info('MongoDB connection closed');

    logger.info('Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    logger.error('Error during graceful shutdown', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception', {
    error: error.message,
    stack: error.stack
  });
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Promise Rejection', {
    reason: reason,
    promise: promise
  });
  gracefulShutdown('unhandledRejection');
});



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info('Server started successfully', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version,
    platform: process.platform
  });
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    logger.error(`Port ${PORT} is already in use`);
  } else {
    logger.error('Server error', error);
  }
  process.exit(1);
});

module.exports = app;