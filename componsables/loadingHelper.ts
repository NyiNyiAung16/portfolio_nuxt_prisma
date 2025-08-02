type data = {
  type: string;
  value: boolean;
}

export function setLoading({ type, value } : data) {
  return { type, value };
}

export function resetLoading() {
 return { type: "", value: false };
}
