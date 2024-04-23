const API_ENDPOINT = "http://localhost:8080"

export function submitQuoteRequest(data) {
  return fetch(API_ENDPOINT + "/quote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function getQuotes(email) {
  return fetch(API_ENDPOINT + "/quote/" + email, {
    method: "GET",
  });
}