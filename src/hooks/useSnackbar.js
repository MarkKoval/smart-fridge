import { useCallback, useState } from "react";

export function useSnackbar() {
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const notify = useCallback((message, severity = "info") => {
    setSnack({ open: true, message, severity });
  }, []);

  const close = useCallback(() => {
    setSnack((s) => ({ ...s, open: false }));
  }, []);

  return { snack, notify, close };
}
