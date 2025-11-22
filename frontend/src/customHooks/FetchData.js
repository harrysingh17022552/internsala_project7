export const FetchData = async (url, method) => {
  const response = await fetch(url, {
    method: method,
    headers: { "content-type": "application/json" },
  });
  const responseData = await response.json();
  if (response.ok) {
    return responseData;
  }
  alert("Failed to Fetch");
};
