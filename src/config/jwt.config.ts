import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET || 'super-secret-for-dev',
    expiresIn: '1h'
})); 