const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchWithRetry(url: string, maxRetries = 3) {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      const response = await fetch(url);
      
      if (response.status === 429) {
        const backoffTime = Math.min(1000 * Math.pow(2, retries), 10000);
        await sleep(backoffTime);
        retries++;
        continue;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (retries === maxRetries - 1) throw error;
      retries++;
      await sleep(1000 * Math.pow(2, retries));
    }
  }
  
  throw new Error('Max retries reached');
}