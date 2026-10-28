# ci-cd-final-project

**Project name: ci-cd-final-project**

JavaScript CI/CD final project using GitHub Actions, ESLint, Jest, Tekton, Buildah, and OpenShift.

- [Complete GitHub Actions workflow](.github/workflows/workflow.yml)
- [Cleanup, Jest, clone, ESLint, and deploy task definitions](.tekton/tasks.yml)
- [Six-task OpenShift pipeline](.tekton/pipeline.yml)
- [Submission answers and evidence checklist](SUBMISSION.md)

## Run locally

Requires Node.js 22 or later.

```sh
npm ci
npm run lint
npm test
npm start
```

Open http://localhost:8000/ or http://localhost:8000/health. On successful startup, the app writes `SERVICERUNNING` between its initialization message and its port 8000 listening message. PORT can override the default.

## GitHub Actions

A push, pull request, or manual dispatch starts `.github/workflows/workflow.yml`. The job runs inside `node:22-bookworm`, so GitHub Actions performs the actual **Initialize containers** lifecycle step. The job checks out source, sets up Node.js, installs dependencies, runs ESLint and Jest, and uploads coverage.

## OpenShift lab deployment

Use an authenticated course lab terminal. Prerequisites:

- OpenShift Pipelines with `tekton.dev/v1` and the cluster resolver enabled.
- The operator-provided `pipeline` service account and `buildah` Task in `openshift-pipelines`.
- Buildah permissions and registry credentials configured for that service account by the course/operator. Do not grant blanket privileged access just to bypass a build error; use the lab's supported Buildah setup.
- Storage class `skills-network-learner`, an internal image registry, and permission to create project resources and RoleBindings.

Confirm the lab has these resources:

```sh
oc project YOUR_COURSE_PROJECT
oc get storageclass skills-network-learner
oc get serviceaccount pipeline
oc get task buildah -n openshift-pipelines
```

If your course uses an older operator with a `buildah` ClusterTask, replace only the `buildah` taskRef in `.tekton/pipeline.yml` with `name: buildah` and `kind: ClusterTask`. Check its parameters and workspace against that installed task before running.

```sh
oc apply -f openshift/setup.yml
oc apply -f .tekton/tasks.yml
oc apply -f .tekton/pipeline.yml
oc create -f .tekton/pipelinerun.yml
```

The task order is `cleanup -> git-clone -> eslint -> jest -> buildah -> deploy`. ESLint installs dependencies on the shared PVC, then Jest uses that installation. Buildah builds and pushes a uniquely tagged image using the operator's real Task. Deploy creates or updates deployment `cicd-app` with that image and checks rollout.

The PVC is named `oc-lab-pvc`, requests `1Gi`, and explicitly uses `skills-network-learner`. Run only one PipelineRun at a time against this PVC. With delayed binding, its status may remain Pending until the first pipeline pod starts.

Buildah uses TLSVERIFY=false only for the cluster-internal registry in this course configuration. Adapt this to the registry trust setup if your cluster requires TLS verification.

Inspect the real results (substitute the generated run name):

```sh
oc get pipelinerun RUN_NAME
oc get pvc oc-lab-pvc
oc get deployment cicd-app
oc get route cicd-app
oc logs deployment/cicd-app | tee oc-pipeline-application-logs
```

If available, `tkn pipelinerun logs RUN_NAME -f` streams every task. If the pipeline fails, inspect task logs and `oc get events --sort-by=.lastTimestamp` rather than submitting a mocked success image.

OpenShift manifests are prepared for the course lab but have not been run on a cluster from this workspace. See SUBMISSION.md for what remains to capture.

## Documentation

- [GitHub container jobs](https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/run-jobs-in-a-container)
- [Tekton Pipelines](https://tekton.dev/docs/pipelines/pipelines/)
- [OpenShift Pipelines security contexts](https://docs.redhat.com/en/documentation/red_hat_openshift_pipelines/1.21/html/securing_openshift_pipelines/configuring-security-context-for-pods)
