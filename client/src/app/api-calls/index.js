const API_ENDPOINT = "https://uj9ipxzw7j.execute-api.us-east-1.amazonaws.com"

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