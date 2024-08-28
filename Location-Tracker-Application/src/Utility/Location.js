const API_KEY = "b2402708b1ba4e1199653c7057cc97d1"; // Replace with your actual OpenCage API key

export async function getAddressFromCoords(coords) {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${coords.lat}+${coords.lng}&key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch address.");
  }
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("No results found for the given coordinates.");
  }
  const address = data.results[0].formatted;
  console.log(`Address: ${address}`);
  return address;
}

export async function getCoordsFromAddress(address) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch coordinates.");
  }
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("No results found for the given address.");
  }
  const coordinates = data.results[0].geometry;
  return {
    lat: coordinates.lat,
    lng: coordinates.lng,
  };
}
