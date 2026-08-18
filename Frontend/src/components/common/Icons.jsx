/* A small hand-picked set of inline icons, kept intentionally minimal
   (single stroke weight, 20px grid) instead of pulling in an icon library. */
const base = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
};

export const HomeIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
    </svg>
);

export const CompassIcon = (props) => (
    <svg {...base} {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="m15 9-2 6-4 2 2-6 4-2Z" />
    </svg>
);

export const LibraryIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M4 6h6v14H4z" />
        <path d="M14 6h6v14h-6z" />
    </svg>
);

export const HistoryIcon = (props) => (
    <svg {...base} {...props}>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l3 2" />
        <path d="M5 4 3 7" />
    </svg>
);

export const HeartIcon = ({ filled, ...props }) => (
    <svg {...base} fill={filled ? "currentColor" : "none"} {...props}>
        <path d="M12 20s-7-4.4-9.5-8.7C.9 8 2 4.5 5.4 3.7c2-.5 3.9.4 5 2.1 1.1-1.7 3-2.6 5-2.1C18.9 4.5 20 8 18.5 11.3 15 15.6 12 20 12 20Z" />
    </svg>
);

export const SearchIcon = (props) => (
    <svg {...base} {...props}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </svg>
);

export const UploadIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
    </svg>
);

export const BellIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
        <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
);

export const ChevronDownIcon = (props) => (
    <svg {...base} {...props}>
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export const PlayCircleIcon = (props) => (
    <svg {...base} {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8.5v7l6-3.5-6-3.5Z" fill="currentColor" stroke="none" />
    </svg>
);

export const ThumbUpIcon = ({ filled, ...props }) => (
    <svg {...base} fill={filled ? "currentColor" : "none"} {...props}>
        <path d="M7 10v10H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3Z" />
        <path d="M7 10l4-7a2 2 0 0 1 2 2v3h5a2 2 0 0 1 2 2.3l-1.4 7A2 2 0 0 1 16.6 20H9a2 2 0 0 1-2-2v-8Z" />
    </svg>
);

export const MoreIcon = (props) => (
    <svg {...base} {...props}>
        <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
);

export const PlusIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M12 5v14M5 12h14" />
    </svg>
);

export const TrashIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M4 7h16" />
        <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        <path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
    </svg>
);

export const EditIcon = (props) => (
    <svg {...base} {...props}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
);

export const GlobeIcon = (props) => (
    <svg {...base} {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
);

export const LockIcon = (props) => (
    <svg {...base} {...props}>
        <rect x="5" y="11" width="14" height="9" rx="1.5" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
);
