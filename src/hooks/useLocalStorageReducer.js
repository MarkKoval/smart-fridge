import { useEffect, useReducer } from "react";

export function useLocalStorageReducer(key, reducer, initialState) {
  const initializer = () => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return initialState;
      const parsed = JSON.parse(raw);
      return parsed ?? initialState;
    } catch {
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore quota/permission errors
    }
  }, [key, state]);

  return [state, dispatch];
}
