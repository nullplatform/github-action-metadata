const Resource = Object.freeze({
  APPLICATION: 'application',
  BUILD: 'build',
  ASSET: 'asset',
  RELEASE: 'release',
  DEPLOYMENT: 'deployment',
});

const ApplicationStatus = Object.freeze({
  PENDING: 'pending',
  CREATING: 'creating',
  UPDATING: 'updating',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  FAILED: 'failed',
});

const Input = Object.freeze({
  RESOURCE: 'resource',
  NAME: 'name',
  STATUS: 'status',
  // @deprecated 'use Input.CODE_REPOSITORY.URL'
  REPOSITORY_URL: 'repository-url',
  // @deprecated 'use Input.CODE_REPOSITORY.APPLICATION_PATH'
  REPOSITORY_APP_PATH: 'repository-app-path',
  CODE_REPOSITORY: {
    URL: 'code-repository-url',
    APPLICATION_PATH: 'code-repository-application-path',
  },
});

const Output = Object.freeze({
  METADATA: 'metadata',
});

const Variable = Object.freeze({
  NULLPLATFORM_ACCESS_TOKEN: 'NULLPLATFORM_ACCESS_TOKEN',
});

module.exports = {
  Resource,
  Input,
  Output,
  Variable,
  ApplicationStatus,
};
