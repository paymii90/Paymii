// src/api/messageApi.js

export const fetchMessages = async (ipAddress) => {
  const BASE_URL = `${ipAddress}/api/messages`;
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch messages", error);
    return [];
  }
};

export const sendMessage = async ({ userId, firstName, content }, ipAddress) => {
  const BASE_URL = `${ipAddress}/api/messages`;
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, firstName, content }),
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to send message", error);
  }
};
