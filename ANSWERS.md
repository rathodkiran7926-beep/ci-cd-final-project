# Ready-to-copy submission answers

These answers refer to the actual public repository. OpenShift evidence remains pending a real lab run.

## 1. README

https://github.com/rathodkiran7926-beep/ci-cd-final-project/blob/main/README.md

Project name: ci-cd-final-project

## 2. ESLint and Jest GitHub Actions workflow

URL for both the ESLint step and Jest unit-test step:
https://github.com/rathodkiran7926-beep/ci-cd-final-project/blob/main/.github/workflows/workflow.yml

```yaml
name: CI - Lint and Unit Tests

on:
  push:
  pull_request:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    container:
      image: node:22-bookworm
    steps:
      - name: Checkout source
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint with ESLint
        run: npm run lint

      - name: Run unit tests with Jest
        run: npm test

      - name: Upload test coverage
        uses: actions/upload-artifact@v4
        with:
          name: jest-coverage
          path: coverage/
          if-no-files-found: error
```

## 3. Cleanup and Jest Tekton tasks

URL for both tasks:
https://github.com/rathodkiran7926-beep/ci-cd-final-project/blob/main/.tekton/tasks.yml

```yaml
apiVersion: tekton.dev/v1
kind: Task
metadata:
  name: cleanup
spec:
  workspaces:
    - name: source
  steps:
    - name: remove
      image: alpine:3.21
      env:
        - name: WORKSPACE_SOURCE_PATH
          value: $(workspaces.source.path)
      script: |
        #!/bin/sh
        set -eu
        # Restrict deletion to this Task's mounted source workspace.
        test "$WORKSPACE_SOURCE_PATH" = /workspace/source
        rm -rf -- "$WORKSPACE_SOURCE_PATH"/* \
          "$WORKSPACE_SOURCE_PATH"/.[!.]* \
          "$WORKSPACE_SOURCE_PATH"/..?*
---
apiVersion: tekton.dev/v1
kind: Task
metadata:
  name: jest
spec:
  workspaces:
    - name: source
  steps:
    - name: jest
      image: node:22-alpine
      workingDir: $(workspaces.source.path)/repo
      env:
        - name: HOME
          value: /tmp
        - name: npm_config_cache
          value: /tmp/npm-cache
      script: |
        #!/bin/sh
        set -eu
        npm test
```

## 4. Successful GitHub Actions output

Copyable verified report from successful run 40719043994:

```text
GitHub Actions validation report (verified from the run API and logs)
Repository: rathodkiran7926-beep/ci-cd-final-project
Workflow: CI - Lint and Unit Tests
Run ID: 40719043994
Commit: a6ac9fd05f0da2cc81c8c0b4f8b5b9ab90fd2730
Status: completed
Conclusion: success
Run URL: https://github.com/rathodkiran7926-beep/ci-cd-final-project/actions/runs/40719043994

Job: build-and-test - success
All workflow steps:
SUCCESS  Set up job
SUCCESS  Initialize containers
SUCCESS  Checkout source
SUCCESS  Set up Node.js
SUCCESS  Install dependencies
SUCCESS  Lint with ESLint
SUCCESS  Run unit tests with Jest
SUCCESS  Upload test coverage
SUCCESS  Post Set up Node.js
SUCCESS  Post Checkout source
SUCCESS  Stop containers
SUCCESS  Complete job

Actual ESLint and Jest log excerpts:
> ci-cd-final-project@1.0.0 lint
> eslint .
> ci-cd-final-project@1.0.0 test
> jest --runInBand --coverage
PASS tests/app.test.js
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
All files |     100 |      100 |     100 |     100 |                   
 app.js   |     100 |      100 |     100 |     100 |                   
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        0.334 s
Ran all test suites.
```

Complete raw terminal logs: https://github.com/rathodkiran7926-beep/ci-cd-final-project/blob/main/cicd-github-validate

## 5. PVC details screenshot

Upload your actual course-cluster screenshot as oc-pipelines-console-pvc-details.png. It must show oc-lab-pvc, skills-network-learner, and 1Gi. This screenshot has not been captured here.

## 6. Pipeline details screenshot

Upload your actual course-cluster screenshot as oc-pipelines-oc-final.png. It must show cleanup -> git-clone -> eslint -> jest -> buildah -> deploy. This screenshot has not been captured here.

## 7. Successful PipelineRun screenshot

Upload your actual course-cluster screenshot as oc-pipelines-oc-green.png. Show all six tasks green and the actual deployment/cicd-app creation evidence requested by your grader. This screenshot has not been captured here.

## 8. Actual application logs

Run in the lab after successful deployment:

```sh
oc logs deployment/cicd-app | tee oc-pipeline-application-logs
```

Paste the actual output. The app is now configured to print SERVICERUNNING and listen on port 8000, but no OpenShift log capture has occurred from this workspace.

