import { Config } from '.';

const config: Config = {
  PORT: process.env.PORT || 4000,
  SERVER: process.env.SERVER || '',
  GRAPHQL: {
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT || '/',
  },
  AUTH: {
    FACEBOOK_ID: process.env.FACEBOOK_ID || '',
  },
  SUBSCRIPTION: {
    SUBSCRIPTION_ENDPOINT: process.env.SUBSCRIPTION_ENDPOINT || '',
  },
  CLOUDINARY: {
    API: process.env.API || '',
    UPLOAD_PRESET: process.env.UPLOAD_PRESET || '',
    CLOUD_NAME: process.env.CLOUD_NAME || '',
    URL: (name: string) =>
      `https://api.cloudinary.com/v1_1/${name}/image/upload`,
  },
  GOOGLE: {
    KEY: process.env.GOOGLE_KEY || '',
  },
};

export default config;
