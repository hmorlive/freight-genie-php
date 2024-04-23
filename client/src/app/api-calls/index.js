const API_ENDPOINT = "http://localhost:8080";

export function submitQuoteRequest(data) {
  return fetch(API_ENDPOINT + "/quote/request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function getQuotes(email) {
  return fetch(API_ENDPOINT + "/quotes/all", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}