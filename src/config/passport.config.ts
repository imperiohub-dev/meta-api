import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userDb } from "../db";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
  throw new Error(
    "Missing required Google OAuth environment variables: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL"
  );
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const nombre = profile.displayName;
        const picture = profile.photos?.[0]?.value;
        const googleId = profile.id;

        if (!email) {
          return done(new Error("No email found in Google profile"));
        }

        // Crear o actualizar usuario (upsert directo por email)
        const user = await userDb.upsertByEmail({
          email,
          nombre: nombre || email.split("@")[0],
          picture,
          googleId,
        });

        return done(null, user);
      } catch (error) {
        return done(error as Error);
      }
    }
  )
);

export default passport;
