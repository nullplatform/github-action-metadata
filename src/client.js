const http = require('@actions/http-client');
const config = require('./config');
const { isEmpty } = require('./validate');

const TOKEN_VARIABLE_NAME = 'NULLPLATFORM_ACCESS_TOKEN';

class HttpClient {
  constructor() {
    this.client = new http.HttpClient();
    this.client.requestOptions = {
      headers: {
        Authorization: process.env[TOKEN_VARIABLE_NAME],
        [http.Headers.ContentType]: 'application/json',
      },
    };
    this.baseUrl = config.baseUrl;
  }

  async post(url, body) {
    const data = JSON.stringify(body);
    const response = await this.client.post(`${this.baseUrl}/${url}`, data);
    const { statusCode, statusMessage } = response.message;
    if (statusCode !== 200) {
      throw new Error(
        `POST to ${url} failed: [${statusCode}] ${statusMessage}`,
      );
    }
    const result = await response.readBody();
    return JSON.parse(result);
  }

  async get(url, query) {
    let uri = `${this.baseUrl}/${url}`;
    if (!isEmpty(query)) {
      uri = `${uri}?${query}`;
    }
    const response = await this.client.get(uri);
    const { statusCode, statusMessage } = response.message;
    if (statusCode !== 200) {
      throw new Error(
        `GET to ${url} failed: [${statusCode}] ${statusMessage}`,
      );
    }
    const result = await response.readBody();
    return JSON.parse(result);
  }
}

module.exports = HttpClient;