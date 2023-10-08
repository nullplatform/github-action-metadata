<h2 align="center">
    <a href="https://httpie.io" target="blank_">
        <img height="100" alt="nullplatform" src="https://nullplatform.com/favicon/android-chrome-192x192.png" />
    </a>
    <br>
    <br>
    Nullplatform Metadata GitHub Action
    <br>
</h2>

The "Nullplatform Metadata" GitHub Action allows you to query Nullplatform metadata, making it easier to manage various resources within the Nullplatform ecosystem. Whether you need to retrieve information about applications, builds, assets, releases, or deployments, this action provides a simple and automated way to do so.

## Table of Contents

- [Inputs](#inputs)
- [Outputs](#outputs)
- [Usage](#usage)
  - [Use Case 1: Query Application Metadata](#use-case-1-query-application-metadata)
  - [Use Case 2: Query Build Metadata](#use-case-2-query-build-metadata)
- [License](#license)

## Inputs

### `resource`

- **Description**: Specifies the Nullplatform resource to query.
- **Options**: Choose from: `application`, `build`, `asset`, `release`, `deployment`.
- **Required**: Yes

### Inputs for application resource

#### `name`

- **Description**: Allows you to specify the name of the application for filtering the query.
- **Required**: No

#### `status`

- **Description**: Specifies the application status to filter the query.
- **Required**: No

#### `code-repository-url`

- **Description**: Specifies the URL of the application's code repository.
- **Required**: No

#### `code-repository-application-path`

- **Description**: Specifies the path of the application within the code repository.
- **Required**: No

### Inputs for other resources

Please note that inputs for `build`, `asset`, `release`, and `deployment` are not yet supported. Support for these resources is planned for future releases.

## Outputs

### `metadata`

- **Description**: Stores the retrieved nullplatform metadata, which can be further utilized in your workflow.

## Usage

Here are some common use cases for this GitHub Action:

### Use Case 1: Query Application Metadata

```yaml
name: Query Application Metadata
on:
  workflow_dispatch:

jobs:
  query-metadata:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Login to Nullplatform
        id: login-nullplatform
        uses: nullplatform/nullplatform-login-action@v1
        with:
          api-key: ${{ secrets.NULLPLATFORM_API_KEY }}

      - name: Query Nullplatform Application
        id: query-application
        uses: nullplatform/nullplatform-metadata-action@v1
        with:
          resource: application
          name: my-app-name
          status: active

      - name: Use Metadata
        run: |
          echo "Application Metadata:"
          echo "${{ steps.query-application.outputs.metadata }}"
```

In this example, the GitHub Action first logs in to Nullplatform using the "nullplatform-login-action" with the API key `NULLPLATFORM_API_KEY` stored in GitHub secrets before querying nullplatform metadata for an application.

### Use Case 2: Query Build Metadata

```yaml
name: Query Build Metadata
on:
  push:
    branches:
      - main

jobs:
  query-metadata:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Login to Nullplatform
        id: login-nullplatform
        uses: nullplatform/nullplatform-login-action@v1
        with:
          api-key: ${{ secrets.NULLPLATFORM_API_KEY }}

      - name: Query Nullplatform Build
        id: query-build
        uses: nullplatform/nullplatform-metadata-action@v1
        with:
          resource: build

      - name: Use Metadata
        run: |
          echo "Build Metadata:"
          echo "${{ steps.query-build.outputs.metadata }}"
```

In this example, the GitHub Action logs in to nullplatform using the "nullplatform-login-action" with the API key `NULLPLATFORM_API_KEY` stored in GitHub secrets before querying nullplatform metadata for builds triggered on the `main` branch.

## License

This GitHub Action is licensed under the [MIT License](LICENSE).
