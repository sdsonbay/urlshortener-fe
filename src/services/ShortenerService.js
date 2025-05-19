class ShortenerService {
  constructor() {
    this.API_URL = 'http://localhost:8081/api/v1/shortener';
  }

  async shortenUrl(url) {
    const response = await fetch(`${this.API_URL}/shorten`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occured!');
    }

    const data = await response.json();
    return data.shortUrl;
  }
}

const shortenerService = new ShortenerService();
export default shortenerService;