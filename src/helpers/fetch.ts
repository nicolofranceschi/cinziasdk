const BE_URL = 'http://localhost:3000';

/**
 * Fetches data from the backend API.
 * @param url - The API endpoint to fetch data from.
 * @param options - The options to pass to the fetch function.
 * @returns A Promise that resolves to the response object if the request is successful.
 * @throws An error if the request fails.
 */
export default async function fetchApi(...p: Parameters<typeof fetch>) {
  const [url, options] = p;
  try {
    const response = await fetch(BE_URL + url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetching data from ${url}`);
  }
}
