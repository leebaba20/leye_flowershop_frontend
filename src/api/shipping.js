const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export async function saveShippingInfo(shippingData) {
  const res = await fetch(`${apiBaseUrl}/shipping`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(shippingData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to save shipping info');
  }
  return res.json();
}
