const dotenv = require('dotenv');
const core = require('@actions/core');
const HttpClient = require('./client');
const { isEmpty, isValidResource } = require('./validate');
const {
  Resource, Input, Output, ApplicationStatus,
} = require('./enums');

dotenv.config();

const buildApplicationQuery = () => {
  const query = {};
  const name = core.getInput(Input.NAME);
  const repositoryUrl = core.getInput(Input.REPOSITORY_URL);
  const repositoryAppPath = core.getInput(Input.REPOSITORY_APP_PATH);
  const status = core.getInput(Input.STATUS);

  if (!isEmpty(name)) {
    query[Input.NAME] = name;
  }

  if (!isEmpty(repositoryUrl)) {
    query[Input.REPOSITORY_URL] = repositoryUrl;
  }

  if (!isEmpty(repositoryAppPath)) {
    query[Input.REPOSITORY_APP_PATH] = repositoryAppPath;
  }

  query[Input.STATUS] = isEmpty(status) ? ApplicationStatus.ACTIVE : status;

  return query;
};

const buildQuery = (resource) => {
  let queryObject = {};
  switch (resource) {
    case Resource.APPLICATION:
      queryObject = buildApplicationQuery();
      break;
    case Resource.BUILD:
      // Not supported yet
      break;
    case Resource.RELEASE:
      // Not supported yet
      break;
    case Resource.DEPLOYMENT:
      // Not supported yet
      break;
    default:
      // No query
      break;
  }
  return new URLSearchParams(queryObject).toString();
};

const run = async () => {
  try {
    const client = new HttpClient();

    const resource = core.getInput(Input.RESOURCE);

    core.info('Validating inputs...');

    if (isEmpty(resource)) {
      core.setFailed('Input "resource" cannot be empty');
    } else if (!isValidResource(resource)) {
      core.setFailed('Input "resource" must be one of these valid resources: application, build, release, deployment');
    }

    const query = buildQuery(resource);

    core.info(`Getting Nullplatform metadata for ${resource} resource with query: ${query}...`);

    const result = await client.get(resource, query);

    core.info(`Successfully queried ${resource} resource, got ${result.length} results`);

    core.setOutput(Output.METADATA, result);
  } catch (error) {
    core.setFailed(`Query metadata failed: ${error.message}`);
  }
};

run();
