const Resource = Object.freeze({
  APPLICATION: 'application',
  BUILD: 'build',
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
  REPOSITORY_URL: 'repository_url',
  REPOSITORY_APP_PATH: 'repository_app_path',
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
