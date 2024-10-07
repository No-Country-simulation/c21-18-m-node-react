import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
	PORT: env.get('PORT').required().asPortNumber(),
	POSTGRES_URL: env.get('POSTGRES_URL').required().asUrlString(),
	POSTGRES_USER: env.get('POSTGRES_USER').required().asString(),
	POSTGRES_DB: env.get('POSTGRES_DB').required().asString(),
	POSTGRES_PORT: env.get('POSTGRES_PORT').required().asPortNumber(),
	POSTGRES_PASSWORD: env.get('POSTGRES_PASSWORD').required().asString(),
};
// PUBLIC_PATH=public

// POSTGRES_URL=postgresql://postgres:123456@localhost:5432/TODO
// POSTGRES_USER=postgres
// POSTGRES_DB=TODO
// POSTGRES_PORT=5432
// POSTGRES_PASSWORD=123456
