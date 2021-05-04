import dotenv from 'dotenv';
// load env configuration
dotenv.config();
const env = process.env.NODE_ENV || 'development';

const configs = {
  common: {
    ENV: env,
    DEV: env === 'development',
    // Server Setting
    PROTOCL: process.env.APPPROTOCOL || 'http',
    HOST: process.env.APPHOST || 'localhost',
    PORT: process.env.APPPORT || 7078,
    DB_SETTINGS: {
      host: process.env.DBHOST || 'localhost',
      port: process.env.DBPORT || 5433,
      username: process.env.DBUSERNAME || 'postgres',
      password: process.env.DBPASSWORD || 'au4a83',
      database: process.env.DBDATABASE || 'splitwise-clone',
      schema: process.env.DBSCHEMA || 'public',
    },
  },
  development: {},
  production: {
    PORT: process.env.APPPORT || 7077,
  },
  test: {
    PORT: 7072,
  },
};
const config = { ...configs.common, ...configs[env] };
export { config };
