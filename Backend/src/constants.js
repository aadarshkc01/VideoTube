export const DB_NAME = "videotube";

// Max size (in bytes) accepted for JSON / urlencoded request bodies
export const REQUEST_BODY_LIMIT = "16kb";

// Cookie options shared by every auth cookie we set
export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
};
