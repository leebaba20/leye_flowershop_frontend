const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// Initialize payment
export async function initializePayment(userId, amount, email) {
  const res = await fetch(`${apiBaseUrl}/payment/initialize-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ userId, amount, email }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to initialize payment');
  }
  return res.json();
}

// Verify payment
export async function verifyPayment(reference) {
  const res = await fetch(`${apiBaseUrl}/payment/verify-payment?reference=${reference}`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to verify payment');
  }
  return res.json();
}
