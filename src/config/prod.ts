import { Config } from '.';

const config: Config = {
  PORT: process.env.REACT_APP_PORT || '',
  SERVER: process.env.REACT_APP_SERVER || '',
  GRAPHQL: {
    GRAPHQL_ENDPOINT: process.env.REACT_APP_GRAPHQL_ENDPOINT || '',
  },
  AUTH: {
    FACEBOOK_ID: process.env.REACT_APP_FACEBOOK_ID || '',
  },
  SUBSCRIPTION: {
    SUBSCRIPTION_ENDPOINT: process.env.REACT_APP_SUBSCRIPTION_ENDPOINT || '',
  },
  CLOUDINARY: {
    API: process.env.REACT_APP_API || '',
    UPLOAD_PRESET: process.env.REACT_APP_UPLOAD_PRESET || '',
    CLOUD_NAME: process.env.REACT_APP_CLOUD_NAME || '',
    URL: (name: string) =>
      `https://api.cloudinary.com/v1_1/${name}/image/upload`,
  },
  GOOGLE: {
    KEY: process.env.REACT_APP_GOOGLE_KEY || '',
  },
};

export default config;
