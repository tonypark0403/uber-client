import dev from './dev';
import prod from './prod';

export interface Config {
  PORT: string;
  SERVER: string;
  GRAPHQL: {
    GRAPHQL_ENDPOINT: string;
  };
  AUTH: {
    FACEBOOK_ID: string;
  };
  SUBSCRIPTION: {
    SUBSCRIPTION_ENDPOINT: string;
  };
  CLOUDINARY: {
    API: string;
    UPLOAD_PRESET: string;
    CLOUD_NAME: string;
    URL: (name: string) => string;
  };
  GOOGLE: {
    KEY: string;
  };
}

const config = process.env.NODE_ENV === 'production' ? prod : dev;

export default config;
