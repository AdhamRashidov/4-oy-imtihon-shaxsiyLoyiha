import dotenv from 'dotenv';
dotenv.config();

type configType = {
	API_PORT: number;
	DB_URL: string;
	ADMIN: {
		ADMIN_USERNAME: string;
		ADMIN_PASSWORD: string;
		ADMIN_EMAIL: string;
		ADMIN_PHONE: string;
	};
	TOKEN: {
		ACCESS_KEY: string;
		ACCESS_TIME: string;
		REFRESH_KEY: string;
		REFRESH_TIME: string;
	};
}

export const config: configType = {
	API_PORT: Number(process.env.API_PORT),
	DB_URL: String(process.env.DB_URL),
	ADMIN: {
		ADMIN_USERNAME: String(process.env.ADMIN_USERNAME),
		ADMIN_PASSWORD: String(process.env.ADMIN_PASSWORD),
		ADMIN_EMAIL: String(process.env.ADMIN_EMAIL),
		ADMIN_PHONE: String(process.env.ADMIN_PHONE),
	},
	TOKEN: {
		ACCESS_KEY: String(process.env.ACCESS_KEY),
		ACCESS_TIME: String(process.env.ACCESS_TIME),
		REFRESH_KEY: String(process.env.REFRESH_KEY),
		REFRESH_TIME: String(process.env.REFRESH_TIME),
	},
}