const http = require('@actions/http-client');
const config = require('./config');
const { isEmpty } = require('./validate');

const TOKEN_VARIABLE_NAME = 'NULLPLATFORM_ACCESS_TOKEN';

class HttpClient {
  constructor() {
    this.client = new http.HttpClient();
    this.client.requestOptions = {
      headers: {
        authorization: process.env[TOKEN_VARIABLE_NAME],
        [http.Headers.ContentType]: 'application/json',
      },
    };
    this.baseUrl = config.baseUrl;
  }

  async post(path, body) {
    const url = `${this.baseUrl}/${path}`;
    const data = JSON.stringify(body);
    const response = await this.client.post(url, data);
    const { statusCode, statusMessage } = response.message;
    if (statusCode !== 200) {
      throw new Error(
        `POST to ${url} failed: [${statusCode}] ${statusMessage}`,
      );
    }
    const result = await response.readBody();
    return JSON.parse(result);
  }

  async get(path, query) {
    let url = `${this.baseUrl}/${path}`;
    if (!isEmpty(query)) {
      url = `${url}?${query}`;
    }
    const response = await this.client.get(url);
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
