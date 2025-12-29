export const ProductAction = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  TOGGLE_USED: "TOGGLE_USED",
};

export function productsReducer(state, action) {
  switch (action.type) {
    case ProductAction.ADD: {
      return [action.payload, ...state];
    }
    case ProductAction.UPDATE: {
      const updated = action.payload;
      return state.map((p) => (p.id === updated.id ? { ...p, ...updated } : p));
    }
    case ProductAction.DELETE: {
      const id = action.payload;
      return state.filter((p) => p.id !== id);
    }
    case ProductAction.TOGGLE_USED: {
      const { id, nowISO } = action.payload;
      return state.map((p) => {
        if (p.id !== id) return p;
        const nextUsed = !p.isUsed;
        return {
          ...p,
          isUsed: nextUsed,
          usedAt: nextUsed ? nowISO : null,
        };
      });
    }
    default:
      return state;
  }
}
