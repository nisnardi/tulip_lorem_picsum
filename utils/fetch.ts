export async function fetchPicsumImageList() {
  const API_URL = process.env.EXPO_PUBLIC_PICSUM_API_URL;
  const picsumListUrl = `${API_URL}/v2/list`;
  const response = await fetch(picsumListUrl);
  return response.json();
}
