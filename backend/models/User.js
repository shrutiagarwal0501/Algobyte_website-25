const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Simple logger utility
const logger = {
  info: (message, meta = {}) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] INFO: ${message}`, meta);
  },
  error: (message, error = {}) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`, {
      message: error.message,
      stack: error.stack,
      ...error
    });
  },
  warn: (message, meta = {}) => {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] WARN: ${message}`, meta);
  }
};

// Define User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  accountStatus: {
    type: String,
    enum: ['active', 'suspended', 'deleted'],
    default: 'active'
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  lastPasswordChange: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ resetPasswordToken: 1, resetPasswordExpire: 1 });

// Virtual for checking if account is locked
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Hash password before saving to database
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const startTime = Date.now();
    
    // Generate salt with cost factor for production security
    const saltRounds = process.env.NODE_ENV === 'production' ? 12 : 10;
    const salt = await bcrypt.genSalt(saltRounds);
    
    // Hash password
    this.password = await bcrypt.hash(this.password, salt);
    
    // Update last password change timestamp
    this.lastPasswordChange = Date.now();
    
    const duration = Date.now() - startTime;
    logger.info('Password hashed successfully', {
      userId: this._id,
      duration: `${duration}ms`,
      saltRounds
    });
    
    next();
  } catch (error) {
    logger.error('Password hashing failed', {
      userId: this._id,
      error: error.message
    });
    next(error);
  }
});

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function(enteredPassword) {
  try {
    const startTime = Date.now();
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    const duration = Date.now() - startTime;
    
    logger.info('Password comparison completed', {
      userId: this._id,
      email: this.email,
      matched: isMatch,
      duration: `${duration}ms`
    });
    
    return isMatch;
  } catch (error) {
    logger.error('Password comparison failed', {
      userId: this._id,
      error: error.message
    });
    throw error;
  }
};

// Method to generate reset token
userSchema.methods.getResetPasswordToken = function() {
  try {
    const crypto = require('crypto');
    
    // Generate cryptographically secure random token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire time (10 minutes for production security)
    const expireMinutes = process.env.RESET_TOKEN_EXPIRE_MINUTES || 10;
    this.resetPasswordExpire = Date.now() + expireMinutes * 60 * 1000;

    logger.info('Password reset token generated', {
      userId: this._id,
      email: this.email,
      expiresIn: `${expireMinutes} minutes`
    });

    return resetToken;
  } catch (error) {
    logger.error('Failed to generate reset token', {
      userId: this._id,
      error: error.message
    });
    throw error;
  }
};

// Method to increment failed login attempts
userSchema.methods.incLoginAttempts = async function() {
  try {
    // If lock has expired, reset attempts
    if (this.lockUntil && this.lockUntil < Date.now()) {
      return this.updateOne({
        $set: { loginAttempts: 1 },
        $unset: { lockUntil: 1 }
      });
    }

    // Increment login attempts
    const updates = { $inc: { loginAttempts: 1 } };
    
    // Lock account after 5 failed attempts (configurable)
    const maxAttempts = process.env.MAX_LOGIN_ATTEMPTS || 5;
    const lockTime = process.env.LOCK_TIME_HOURS || 2;
    
    if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
      updates.$set = { lockUntil: Date.now() + lockTime * 60 * 60 * 1000 };
      
      logger.warn('Account locked due to failed login attempts', {
        userId: this._id,
        email: this.email,
        attempts: this.loginAttempts + 1,
        lockDuration: `${lockTime} hours`
      });
    }

    return this.updateOne(updates);
  } catch (error) {
    logger.error('Failed to increment login attempts', {
      userId: this._id,
      error: error.message
    });
    throw error;
  }
};

// Method to reset login attempts after successful login
userSchema.methods.resetLoginAttempts = async function() {
  try {
    if (this.loginAttempts > 0 || this.lockUntil) {
      logger.info('Resetting login attempts', {
        userId: this._id,
        email: this.email,
        previousAttempts: this.loginAttempts
      });
      
      return this.updateOne({
        $set: { loginAttempts: 0, lastLogin: Date.now() },
        $unset: { lockUntil: 1 }
      });
    }
    
    return this.updateOne({ $set: { lastLogin: Date.now() } });
  } catch (error) {
    logger.error('Failed to reset login attempts', {
      userId: this._id,
      error: error.message
    });
    throw error;
  }
};

// Method to sanitize user data for output (remove sensitive fields)
userSchema.methods.toSafeObject = function() {
  const userObject = this.toObject();
  
  // Remove sensitive fields
  delete userObject.password;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpire;
  delete userObject.loginAttempts;
  delete userObject.lockUntil;
  delete userObject.__v;
  
  return userObject;
};

// Static method to find user by email (case-insensitive)
userSchema.statics.findByEmail = async function(email) {
  try {
    return await this.findOne({ 
      email: email.toLowerCase().trim() 
    });
  } catch (error) {
    logger.error('Failed to find user by email', {
      email,
      error: error.message
    });
    throw error;
  }
};

// Pre-remove hook for cleanup
userSchema.pre('remove', function(next) {
  logger.info('User account being removed', {
    userId: this._id,
    email: this.email
  });
  next();
});

// Export model
module.exports = mongoose.model('User', userSchema);