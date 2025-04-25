export const DatabaseConfig = (): IDatabaseConfig => ({
  mongo: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/library",
  },
});

interface IDatabaseConfig {
  mongo: {
    uri: string;
  };
}
