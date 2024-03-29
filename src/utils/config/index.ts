interface Config {
  apiBaseUrl: string;
  googleClientId: string;
  googleClientSecret: string;
}

export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  googleClientId: process.env.GOOGLE_CLIEND_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIEND_SECRET || "",
};
