const BASE_URL = "http://localhost:3000";

export async function http(url: string, method: string, body?: any) {
  let headers = {
    "Content-Type": "application/json",
  } as any;
  if (localStorage.getItem("token")) {
    headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  const res = await fetch(BASE_URL! + url, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  return res.json();
}
