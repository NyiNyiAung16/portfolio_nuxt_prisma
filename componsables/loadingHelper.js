export function setLoading({ type, value }) {
  return { type, value };
}

export function resetLoading() {
 return { type: "", value: false };
}
