import { useState, useCallback } from "react";

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback(
    (message) => addToast(message, "success"),
    [addToast]
  );

  const error = useCallback(
    (message) => addToast(message, "error"),
    [addToast]
  );

  const warning = useCallback(
    (message) => addToast(message, "warning"),
    [addToast]
  );

  const info = useCallback(
    (message) => addToast(message, "info"),
    [addToast]
  );

  return { toasts, addToast, removeToast, success, error, warning, info };
};

export default useToast;
