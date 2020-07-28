const removeFromArray = (internalId, array) => {
  const i = array.findIndex(
    (possibleElement) => possibleElement.internalId === internalId,
  );
  if (i) {
    return [...array.slice(0, i), ...array.slice(i + 1)];
  }
  return [];
};

export const MarkersReducer = (state, { type, data }) => {
  switch (type) {
    case 'ADD_MARKER':
      return { data: [...state.data, data] };
    case 'REMOVE_MARKER':
      return {
        data: removeFromArray(data, state.data),
      };
    case 'RESET_DATA':
      return { data };
    default:
      throw new Error();
  }
};
