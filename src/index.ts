import { cors } from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { auth } from '@/lib/auth';

// FIXME: implement the better auth api
// const swag = await auth.api.generateOpenAPISchema();

const app = new Elysia()
	.use(
		swagger({
			path: '/docs',
			documentation: {
				info: {
					title: 'Resonance Documentation',
					version: '0.0.1',
					license: {
						name: "'EUPL-1.2'",
						url: 'https://eupl.eu/',
					},
				},
			},
		}),
	)
	.use(
		cors({
			origin: 'http://localhost:4321',
			methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
			credentials: true,
			allowedHeaders: ['Content-Type', 'Authorization'],
		}),
	)
	.mount(auth.handler)
	.post('/hello', () => 'world')
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
