export const AppConfig = (): IAppConfig => ({
  env: process.env.NODE_ENV || "DEVELOPMENT",
  port: parseInt(process.env.PORT) || 3000,
  frontEndUrl: process.env.FRONTEND_URL || "*",
});

interface IAppConfig {
  env: string;
  port: number;
  frontEndUrl: string;
}
