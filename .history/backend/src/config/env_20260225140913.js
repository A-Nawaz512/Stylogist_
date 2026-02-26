// src/config/env.js
import 'dotenv/config';

// In a real scenario, use Zod for strict schema validation
const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d'
};

// Fail-fast validation
if (!env.mongoUri) {
  console.error('FATAL ERROR: MONGO_URI is not defined in the environment.');
  process.exit(1);
}

if (!env.jwtSecret) {
  console.error('FATAL ERROR: JWT_SECRET is not defined in the environment.');
  process.exit(1);
}

export default env;