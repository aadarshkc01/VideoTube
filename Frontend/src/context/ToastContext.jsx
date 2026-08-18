import { createContext, useCallback, useContext, useRef, useState } from "react";

const ToastContext = createContext(null);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const timers = useRef({});

    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        clearTimeout(timers.current[id]);
        delete timers.current[id];
    }, []);

    const push = useCallback(
        (message, variant = "default") => {
            const id = ++idCounter;
            setToasts((prev) => [...prev, { id, message, variant }]);
            timers.current[id] = setTimeout(() => dismiss(id), 4000);
        },
        [dismiss]
    );

    const toast = {
        show: (message) => push(message, "default"),
        error: (message) => push(message, "error"),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <div className="toast-stack" role="status" aria-live="polite">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`toast ${t.variant === "error" ? "toast--error" : ""}`}
                        onClick={() => dismiss(t.id)}
                    >
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
