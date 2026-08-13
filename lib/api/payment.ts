const API_BASE = "/api";
const API_URL = API_BASE || "http://localhost:5000/api";

export async function createCheckoutSession(rentalOrderId: string) {
  const response = await fetch(`${API_URL}/payments/create-checkout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rentalOrderId,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create checkout session");
  }

  return result;
}
