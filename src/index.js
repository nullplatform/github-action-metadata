const dotenv = require('dotenv');
const core = require('@actions/core');
const HttpClient = require('./client');
const { isEmpty, isValidResource } = require('./validate');

dotenv.config();

const QUERY_OUTPUT_NAME = 'metadata';

async function run() {
  try {
    const client = new HttpClient();

    const resource = core.getInput('resource');
    const query = core.getInput('query');

    core.info('Validating inputs...');

    if (isEmpty(resource)) {
      core.setFailed('Input "resource" cannot be empty');
    } else if (!isValidResource(resource)) {
      core.setFailed('Input "resource" must be one of these valid resources: application, build, release, deployment');
    }

    core.info(`Getting Nullplatform metadata for ${resource} resource with query: ${query}...`);

    const result = await client.get(resource, query);

    core.info(`Successfully queried ${resource} resource, got ${result.length} results`);

    core.setOutput(QUERY_OUTPUT_NAME, result);
  } catch (error) {
    core.setFailed(`Query metadata failed: ${error.message}`);
  }
}

run();
