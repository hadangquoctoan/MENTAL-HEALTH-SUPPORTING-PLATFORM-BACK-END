export const jwtConfig = () => ({
  secret: process.env.JWT_SECRET || 'super_secret_jwt_key_mental_health_2026',
  expiresIn: process.env.JWT_EXPIRATION || '7d',
});
