# Coursera CI/CD Final Project

A JavaScript HTTP service with continuous integration using GitHub Actions and a Tekton pipeline for OpenShift builds and deployment.

**Project name:** Coursera CI/CD Final Project  
**Stack:** Node.js, ESLint, Jest, Docker, GitHub Actions, Tekton, OpenShift

## Run locally

Requires Node.js 22 or later.

```sh
npm ci
npm run lint
npm test
npm start
```

Open http://localhost:8080/ for project details and http://localhost:8080/health for health status. Requests and startup messages are written to standard output for OpenShift application logs.

## Add this folder to GitHub

Create an empty public repository on GitHub. Run these commands from this folder, replacing the URL with your repository URL:

```sh
git init -b main
git add .
git commit -m "Add CI/CD final project with GitHub Actions and Tekton"
git remote add origin https://github.com/rathodkiran7926-beep/CI_CD_Final_Project.git
git push -u origin main
```

Include hidden folders `.github` and `.tekton` when uploading manually. Do not upload `node_modules` or `coverage`. The push starts `.github/workflows/workflow.yml`. Check the Actions tab for the actual result.

## OpenShift setup and deployment

Prerequisites: an authenticated `oc` CLI session, an OpenShift project with permission to create builds and RBAC resources, the OpenShift Pipelines operator with `tekton.dev/v1` support, a working internal image registry, and a default storage class. The cluster must permit outbound pulls from Docker Hub and Quay and npm package downloads. These manifests must be validated on your course cluster; they have not been run on a cluster here.

1. Select your course project with `oc project YOUR_PROJECT`. If you are allowed to create a separate project, use `oc new-project coursera-cicd`.
2. Replace `rathodkiran7926-beep/CI_CD_Final_Project` in `.tekton/pipelinerun.yml` with your public GitHub repository. Change `revision` if your default branch is not `main`.
3. Commit and push the change.
4. Apply the setup and start a run:

```sh
oc apply -f openshift/setup.yml
oc apply -f .tekton/tasks.yml
oc apply -f .tekton/pipeline.yml
oc create -f .tekton/pipelinerun.yml
```

The pipeline is named `oc-final` and runs `cleanup -> clone -> jest-test -> build-deploy`. It uses the `oc-pipelines-pvc` volume for source files. Run only one PipelineRun at a time against this shared PVC. On storage using `WaitForFirstConsumer`, the PVC may remain Pending until the first pipeline pod starts.

The cleanup task removes only the `repo` directory inside its workspace. The Jest task installs dependencies, runs ESLint, and runs unit tests with a 100% coverage threshold for request handling. The final task submits a binary Docker build to OpenShift, updates the Deployment to the resulting image digest, waits for rollout, and prints the application logs. No privileged Tekton build container is needed; the cluster's build service performs the image build.

Inspect the result (replace `RUN_NAME` with the name printed by `oc create`):

```sh
oc get pipelinerun RUN_NAME
oc get pipelinerun RUN_NAME -o yaml
oc get pvc oc-pipelines-pvc
oc get builds
oc get deployment cicd-final-app
oc get route cicd-final-app
oc logs deployment/cicd-final-app --tail=100
```

If `tkn` is installed, use `tkn pipelinerun logs RUN_NAME -f` to stream all task logs. Visit the HTTPS host printed by `oc get route cicd-final-app` and then collect application logs again to include real HTTP requests.

For troubleshooting, check PipelineRun task logs, `oc get events --sort-by=.lastTimestamp`, and the OpenShift build logs. Restricted lab permissions, registry configuration, image availability, or storage settings may require changes specific to your cluster.

## Assignment evidence

See [SUBMISSION.md](SUBMISSION.md) for the eight rubric items, URL formats, exact screenshot filenames, and instructions for capturing real outputs. No OpenShift screenshots, successful Actions output, or cluster logs have been fabricated.

## References

- [Tekton Pipeline specification](https://tekton.dev/docs/pipelines/pipelines/)
- [OpenShift Pipelines security documentation](https://docs.redhat.com/en/documentation/red_hat_openshift_pipelines/1.21/html/securing_openshift_pipelines/index)

