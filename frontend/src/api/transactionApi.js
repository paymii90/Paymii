export const buyCoin = async (data, token, ipAddress) => {
  const res = await fetch(`${ipAddress}/api/transactions/buy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const text = await res.text(); // Read raw response
  console.log("📦 Raw backend response text:", text);
  console.log("📦 Status code:", res.status);

  if (!res.ok) {
    throw new Error(`Buy failed (${res.status}): ${text}`);
  }

  return text ? JSON.parse(text) : {}; // Only parse if content exists
};

export const sellCoin = async (data, token, ipAddress) => {
  const res = await fetch(`${ipAddress}/api/transactions/sell`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const text = await res.text(); // Read raw response
  console.log("📦 Raw backend response text:", text);
  console.log("📦 Status code:", res.status);

  if (!res.ok) {
    throw new Error(`Sell failed (${res.status}): ${text}`);
  }

  return text ? JSON.parse(text) : {}; // Only parse if content exists
};
