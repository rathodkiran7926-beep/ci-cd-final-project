# Submission answers

## Question 1: README

https://github.com/rathodkiran7926-beep/ci-cd-final-project/blob/main/README.md

Project name: ci-cd-final-project

The feedback inconsistently asks for the repository spelling cicd-final-project on Question 1 and ci-cd-final-project on Question 2. This repository uses its actual public canonical name ci-cd-final-project. If a correct, accessible link is rejected solely for that inconsistency, request a grading review with the feedback attached.

## Question 2: complete workflow

https://github.com/rathodkiran7926-beep/ci-cd-final-project/blob/main/.github/workflows/workflow.yml

This single file contains both the ESLint and Jest steps. Paste the URL and the complete workflow code into the response if the field permits code; the evaluator previously reported a truncated preview.

## Question 3: complete task definitions

https://github.com/rathodkiran7926-beep/ci-cd-final-project/blob/main/.tekton/tasks.yml

Paste this URL plus the complete cleanup and jest definitions from that file if code is permitted. The cleanup task has a remove step using WORKSPACE_SOURCE_PATH. The Jest task runs npm test after the ESLint task has installed dependencies on the shared PVC.

## Question 4: successful GitHub Actions output

Use the newly collected cicd-github-validate file after the corrected container job finishes successfully. It must include the real Initialize containers lifecycle step. Full raw logs are stored in evidence/github-actions-success.txt. Do not submit the old run as evidence of the corrected workflow.

## Question 5: PersistentVolumeClaim screenshot

Capture Storage > PersistentVolumeClaims > oc-lab-pvc in the real course console. Show the namespace, Bound status, storageClassName skills-network-learner and requested capacity 1Gi. Save the screenshot as:

evidence/oc-pipelines-console-pvc-details.png

## Question 6: pipeline details screenshot

Capture Pipelines > Pipelines > oc-final. Show all six task nodes: cleanup, git-clone, eslint, jest, buildah, deploy. Save the screenshot as:

evidence/oc-pipelines-oc-final.png

## Question 7: successful pipeline screenshot

Capture the actual successful PipelineRun showing all six tasks green. Include evidence of deployment/cicd-app being created in the deploy task logs, if required by the evaluator. Save the screenshot as:

evidence/oc-pipelines-oc-green.png

Do not upload application logs for this question. Questions 5 and 6 previously had their screenshot files swapped; verify each image before uploading.

## Question 8: application logs

The updated app prints SERVICERUNNING between its startup and listening messages and defaults to port 8000. Once actually deployed, run this in the course lab:

```sh
oc logs deployment/cicd-app | tee oc-pipeline-application-logs
```

Paste the real resulting text. This file has not been captured from a cluster here. Local application output and generated examples are not OpenShift evidence.
