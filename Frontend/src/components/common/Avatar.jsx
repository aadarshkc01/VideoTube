const Avatar = ({ src, alt = "", size = 36 }) => {
    const initials = (alt || "?").trim().charAt(0).toUpperCase();

    if (!src) {
        return (
            <div
                className="avatar"
                style={{
                    width: size,
                    height: size,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: size * 0.4,
                    fontWeight: 600,
                    color: "var(--text-dim)",
                }}
            >
                {initials}
            </div>
        );
    }

    return (
        <img
            className="avatar"
            src={src}
            alt={alt}
            width={size}
            height={size}
            style={{ width: size, height: size }}
            loading="lazy"
        />
    );
};

export default Avatar;
