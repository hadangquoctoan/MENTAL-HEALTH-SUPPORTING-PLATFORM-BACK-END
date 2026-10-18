export const databaseConfig = () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  name: process.env.DB_NAME || 'mental_health_db',
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || '12345',
});
