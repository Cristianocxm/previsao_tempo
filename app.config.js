import 'dotenv/config';

export default {
  expo: {
    name: "PrevisaoTempo",
    slug: "PrevisaoTempo",
    extra: {
      apiKey: process.env.API_KEY
    }
  }
};
