const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// ============================================
// LOGGER UTILITY
// ============================================

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

// ============================================
// HELPER FUNCTIONS
// ============================================

// Generate JWT Token
const generateToken = (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    });
    
    logger.debug('JWT token generated', { userId: id });
    return token;
  } catch (error) {
    logger.error('JWT token generation failed', error);
    throw new Error('Token generation failed');
  }
};

// Send token response
const sendTokenResponse = (user, statusCode, res, message) => {
  try {
    const token = generateToken(user._id);

    logger.info('Token response sent', {
      userId: user._id,
      email: user.email,
      statusCode
    });

    res.status(statusCode).json({
      success: true,
      message,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    logger.error('Failed to send token response', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

// Create email transporter
const createEmailTransporter = () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: parseInt(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    logger.debug('Email transporter created', {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT
    });

    return transporter;
  } catch (error) {
    logger.error('Failed to create email transporter', error);
    throw error;
  }
};

// Send welcome email function
async function sendWelcomeEmail(userName, userEmail) {
  try {
    const transporter = createEmailTransporter();

    const mailOptions = {
      from: `"Algobyte - Banasthali Vidyapith" <${process.env.EMAIL_FROM}>`,
      to: userEmail,
      subject: 'Welcome to Algobyte Community!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 40px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
              font-weight: 600;
            }
            .header p {
              margin: 10px 0 0;
              font-size: 16px;
              opacity: 0.9;
            }
            .content {
              padding: 40px 30px;
            }
            .greeting {
              font-size: 20px;
              font-weight: 600;
              color: #333;
              margin-bottom: 20px;
            }
            .message {
              font-size: 16px;
              color: #555;
              margin-bottom: 20px;
              line-height: 1.8;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 30px;
              text-align: center;
              border-top: 1px solid #dee2e6;
            }
            .footer p {
              margin: 5px 0;
              color: #6c757d;
              font-size: 14px;
            }
            @media only screen and (max-width: 600px) {
              .container {
                margin: 0;
                border-radius: 0;
              }
              .content {
                padding: 30px 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Algobyte!</h1>
              <p>Bringing the saga of Technofilic nerds</p>
            </div>
            
            <div class="content">
              <p class="greeting">Hello ${userName},</p>
              
              <p class="message">
                We're thrilled to have you join the <strong>Algobyte community</strong> at 
                <strong>Banasthali Vidyapith</strong>! You're now part of an innovative tech 
                community where learning, collaboration, and growth happen every day.
              </p>

              <p class="message">
                <strong>Get Started:</strong><br>
                1. Explore our services and resources<br>
                2. Register for upcoming events<br>
                3. Connect with other members<br>
                4. Stay updated with latest tech trends
              </p>

              <p class="message">
                <strong>Need Help?</strong><br>
                If you have any questions or need assistance, feel free to reach out to us at 
                <a href="mailto:algobyte@banasthali.in" style="color: #667eea; text-decoration: none;">
                  algobyte@banasthali.in
                </a>
              </p>

              <p class="message" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
                We're excited to see what you'll achieve with Algobyte!<br><br>
                <strong>Happy Learning!</strong><br>
                <em>The Algobyte Team</em>
              </p>
            </div>

            <div class="footer">
              <p><strong>Algobyte</strong></p>
              <p>Computer Science Club | Banasthali Vidyapith</p>
              <p>Rajasthan, India</p>
              <p style="margin-top: 15px;">
                <a href="mailto:algobyte@banasthali.in" style="color: #667eea; text-decoration: none; margin: 0 10px;">
                  Email Us
                </a>
              </p>
              <p style="margin-top: 15px; font-size: 12px; color: #999;">
                &copy; ${new Date().getFullYear()} Algobyte. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    
    logger.info('Welcome email sent successfully', {
      recipient: userEmail,
      userName
    });
  } catch (error) {
    logger.error('Failed to send welcome email', {
      recipient: userEmail,
      error: error.message
    });
  }
}

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// Sanitize input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

// ============================================
// ROUTES
// ============================================

// @route   GET /api/auth/test-email
// @desc    Test email configuration
// @access  Public
router.get('/test-email', async (req, res) => {
  logger.info('Email configuration test initiated');
  
  try {
    // Check environment variables
    const requiredEnvVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
      logger.warn('Missing email environment variables', { missingVars });
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    logger.debug('Email environment variables validated', {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER
    });

    const transporter = createEmailTransporter();
    
    // Verify SMTP connection
    await transporter.verify();
    logger.info('SMTP connection verified successfully');

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USER,
      subject: 'Email Configuration Test - Algobyte',
      html: `
        <h2>Email Configuration Test Successful</h2>
        <p>Your email configuration is working correctly.</p>
        <p><strong>Server:</strong> ${process.env.EMAIL_HOST}</p>
        <p><strong>Port:</strong> ${process.env.EMAIL_PORT}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <hr>
        <p>Your Algobyte website can now send:</p>
        <ul>
          <li>Welcome emails on signup</li>
          <li>Password reset emails</li>
        </ul>
      `
    });

    logger.info('Test email sent successfully', {
      messageId: info.messageId,
      recipient: process.env.EMAIL_USER
    });

    res.json({
      success: true,
      message: 'Email configuration is working perfectly. Check your inbox.',
      messageId: info.messageId
    });

  } catch (error) {
    logger.error('Email configuration test failed', error);
    
    res.status(500).json({
      success: false,
      message: 'Email test failed',
      error: process.env.NODE_ENV === 'production' ? 'Email configuration error' : error.message
    });
  }
});

// @route   POST /api/auth/signup
// @desc    Register new user and send welcome email
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      logger.warn('Signup attempt with missing fields', { email });
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email).toLowerCase();

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      logger.warn('Signup attempt with invalid email format', { email: sanitizedEmail });
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: sanitizedEmail });
    if (existingUser) {
      logger.warn('Signup attempt with existing email', { email: sanitizedEmail });
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create user
    const user = await User.create({ 
      name: sanitizedName, 
      email: sanitizedEmail, 
      password 
    });

    logger.info('New user registered successfully', {
      userId: user._id,
      email: user.email
    });

    // Send welcome email asynchronously (non-blocking)
    sendWelcomeEmail(user.name, user.email).catch(err => {
      logger.error('Welcome email failed (non-blocking)', {
        userId: user._id,
        error: err.message
      });
    });

    sendTokenResponse(user, 201, res, 'User registered successfully! Welcome to Algobyte!');

  } catch (error) {
    logger.error('Signup failed', {
      email: req.body?.email,
      error: error.message
    });
    
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: process.env.NODE_ENV === 'production' ? 'Registration failed' : error.message
    });
  }
});

// @route   POST /api/auth/signin
// @desc    Login user
// @access  Public
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      logger.warn('Signin attempt with missing credentials');
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const sanitizedEmail = sanitizeInput(email).toLowerCase();

    // Find user and include password field
    const user = await User.findOne({ email: sanitizedEmail }).select('+password');

    if (!user) {
      logger.warn('Signin attempt with non-existent email', { email: sanitizedEmail });
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      logger.warn('Signin attempt on locked account', {
        userId: user._id,
        email: user.email
      });
      return res.status(401).json({
        success: false,
        message: 'Account is temporarily locked. Please try again later.'
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      logger.warn('Signin attempt with incorrect password', { email: sanitizedEmail });
      
      // Increment failed login attempts
      await user.incLoginAttempts();
      
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Reset login attempts on successful login
    await user.resetLoginAttempts();

    logger.info('User signed in successfully', {
      userId: user._id,
      email: user.email
    });

    sendTokenResponse(user, 200, res, 'Login successful! Welcome back!');

  } catch (error) {
    logger.error('Signin failed', {
      email: req.body?.email,
      error: error.message
    });
    
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: process.env.NODE_ENV === 'production' ? 'Login failed' : error.message
    });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      logger.warn('Forgot password attempt without email');
      return res.status(400).json({
        success: false,
        message: 'Please provide email address'
      });
    }

    const sanitizedEmail = sanitizeInput(email).toLowerCase();

    logger.info('Password reset requested', { email: sanitizedEmail });

    // Find user
    const user = await User.findOne({ email: sanitizedEmail });

    if (!user) {
      logger.warn('Password reset requested for non-existent email', { email: sanitizedEmail });
      // Return success anyway to prevent email enumeration
      return res.status(200).json({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.'
      });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;

    logger.debug('Password reset token generated', {
      userId: user._id,
      email: user.email
    });

    try {
      const transporter = createEmailTransporter();
      await transporter.verify();

      const mailOptions = {
        from: `"Algobyte - Banasthali Vidyapith" <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: 'Password Reset Request - Algobyte',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 5px 5px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 5px 5px; }
              .button { display: inline-block; background: #667eea; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .warning { color: #d9534f; margin-top: 20px; padding: 15px; background: #f8d7da; border-radius: 5px; border-left: 4px solid #d9534f; }
              .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Password Reset Request</h1>
              </div>
              <div class="content">
                <h2>Hi ${user.name},</h2>
                <p>You requested to reset your password for your Algobyte account.</p>
                <p>Please click the button below to reset your password:</p>
                <div style="text-align: center;">
                  <a href="${resetUrl}" class="button">Reset Password</a>
                </div>
                <div class="warning">
                  <strong>This link will expire in 10 minutes.</strong>
                </div>
                <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
                <p><strong>For security, never share this link with anyone.</strong></p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                <p>Best regards,<br><strong>The Algobyte Team</strong></p>
              </div>
              <div class="footer">
                <p>Algobyte - Banasthali Vidyapith</p>
                <p>&copy; ${new Date().getFullYear()} Algobyte. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      await transporter.sendMail(mailOptions);
      
      logger.info('Password reset email sent successfully', {
        userId: user._id,
        email: user.email
      });

      res.status(200).json({
        success: true,
        message: 'Password reset email sent! Please check your inbox.'
      });

    } catch (emailError) {
      logger.error('Password reset email failed', {
        userId: user._id,
        error: emailError.message
      });

      // Clear reset token if email fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: 'Email could not be sent. Please try again later.'
      });
    }

  } catch (error) {
    logger.error('Forgot password request failed', {
      email: req.body?.email,
      error: error.message
    });
    
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again.'
    });
  }
});

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password using token
// @access  Public
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body;
    const token = req.params.token;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a new password'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    // Hash the token from URL
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    logger.debug('Password reset attempt with token');

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      logger.warn('Password reset attempted with invalid or expired token');
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token. Please request a new password reset.'
      });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    logger.info('Password reset successful', {
      userId: user._id,
      email: user.email
    });

    res.status(200).json({
      success: true,
      message: 'Password reset successful! You can now login with your new password.'
    });

  } catch (error) {
    logger.error('Password reset failed', {
      error: error.message
    });
    
    res.status(500).json({
      success: false,
      message: 'Error resetting password'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Unauthorized access attempt to /me endpoint');
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Please login.'
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      logger.warn('User not found for valid token', { userId: decoded.id });
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    logger.debug('User data retrieved', { userId: user._id });

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    logger.error('Failed to get user data', {
      error: error.message
    });
    
    res.status(401).json({
      success: false,
      message: 'Not authorized. Invalid token.'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', (req, res) => {
  logger.info('User logout');
  
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;