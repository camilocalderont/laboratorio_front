const API_BASE = "http://127.0.0.1:3333/api"; // reemplazar con la URL real del backend

export const postData = async <T>(endpoint: string, data: any): Promise<T> => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("API request failed");
  }
  return response.json();
};

export const getData = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_BASE}${endpoint}`);
  if (!response.ok) {
    throw new Error("API request failed");
  }
  return response.json();
};
