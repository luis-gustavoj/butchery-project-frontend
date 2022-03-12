export const mergeRefs = (...refs) => {
  console.log(refs);

  return (node) => {
    for (const ref of refs) {
      if (ref !== null) {
        ref.current = node;
      }
    }
  };
};
