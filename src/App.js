import React, { Component } from 'react';
import './App.css';
import shortenerService from './services/ShortenerService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      shortUrl: '',
      error: '',
      loading: false
    };
  }

  handleUrlChange = (e) => {
    this.setState({ url: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: '' });

    try {
      const shortUrl = await shortenerService.shortenUrl(this.state.url);
      this.setState({ shortUrl: `${shortUrl}` });
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleCopy = () => {
    navigator.clipboard.writeText(this.state.shortUrl);
  }

  render() {
    const { url, shortUrl, error, loading } = this.state;

    return (
      <div className="App">
        <div className="container">
          <h1>URL Kısaltıcı</h1>
          
          <form onSubmit={this.handleSubmit}>
            <input
              type="url"
              value={url}
              onChange={this.handleUrlChange}
              placeholder="URL'yi buraya girin"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Kısaltılıyor...' : 'URL\'yi Kısalt'}
            </button>
          </form>

          {error && <p className="error">{error}</p>}

          {shortUrl && (
            <div className="result">
              <p>Kısaltılmış URL:</p>
              <div className="short-url">
                <input
                  type="text"
                  value={shortUrl}
                  readOnly
                />
                <button onClick={this.handleCopy}>Kopyala</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;