import "dotenv/config";
import { Google } from "arctic";

const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;

if (!clientId) throw new Error("GOOGLE_OAUTH_CLIENT_ID is not set");
if (!clientSecret) throw new Error("GOOGLE_OAUTH_CLIENT_SECRET is not set");
if (!redirectUri) throw new Error("GOOGLE_OAUTH_REDIRECT_URI is not set");

export const google = new Google(clientId, clientSecret, redirectUri);
