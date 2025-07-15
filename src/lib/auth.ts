import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { username } from 'better-auth/plugins';
import { db } from '@/db';
import * as schema from '@/db/schema';

export const auth = betterAuth({
	trustedOrigins: ['http://localhost:4321'],
	database: drizzleAdapter(db, {
		provider: 'pg',
		schema,
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [username()],
	advanced: {
		cookiePrefix: 'resonance',
	},
});

export type Session = typeof auth.$Infer.Session;
