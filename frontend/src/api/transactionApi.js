export const buyCoin = async (data, token) => {
  const res = await fetch("http://10.80.33.17:8080/api/transactions/buy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const text = await res.text(); // 
  console.log("📦 Raw backend response text:", text);
  console.log("📦 Status code:", res.status);

  if (!res.ok) {
    throw new Error(`Buy failed (${res.status}): ${text}`);
  }

  return text ? JSON.parse(text) : {}; // only parse if there's content
};
