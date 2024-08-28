export const trimText = (text, limit = 100) => {
  if (text) {
    if (text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  }
};
