# Submission checklist

Replace `rathodkiran7926-beep/CI_CD_Final_Project` in the links below with the repository you create. Use `main` or your actual default branch. Submit evidence only after the corresponding run succeeds.

| Points | Required response | File or source |
| --- | --- | --- |
| 2 | Project README GitHub URL | `https://github.com/rathodkiran7926-beep/CI_CD_Final_Project/blob/main/README.md` |
| 4 | ESLint and Jest workflow GitHub URL | `https://github.com/rathodkiran7926-beep/CI_CD_Final_Project/blob/main/.github/workflows/workflow.yml` |
| 4 | Cleanup and Jest Tekton tasks GitHub URL | `https://github.com/rathodkiran7926-beep/CI_CD_Final_Project/blob/main/.tekton/tasks.yml` |
| 2 | PVC details screenshot | `evidence/oc-pipelines-console-pvc-details.png` |
| 2 | Successful GitHub Actions terminal output | `evidence/github-actions-success.txt` |
| 2 | OpenShift pipeline details screenshot | `evidence/oc-pipelines-oc-final.png` |
| 2 | Successful OpenShift pipeline screenshot | `evidence/oc-pipelines-oc-green.png` |
| 2 | Actual application logs | `evidence/openshift-application-logs.txt` |

## Screenshots from your OpenShift console

Select the project used for the run.

1. Under Storage > PersistentVolumeClaims, open `oc-pipelines-pvc`. Capture its name, namespace, Bound status, access mode, capacity, and storage class. Save as `oc-pipelines-console-pvc-details.png`.
2. Under Pipelines > Pipelines, open `oc-final`. Capture the name and task graph. Save as `oc-pipelines-oc-final.png`.
3. Open the successful PipelineRun. Capture the run name, Succeeded status, and green task graph for all four tasks. Save as `oc-pipelines-oc-green.png`.

Console labels vary by OpenShift version. Keep the full relevant details visible. Do not use a local mockup as cluster evidence.

## GitHub Actions terminal output

After you push and the run succeeds, use GitHub CLI if installed:

```sh
gh auth login
gh run list --repo rathodkiran7926-beep/CI_CD_Final_Project --workflow workflow.yml
gh run view RUN_ID --repo rathodkiran7926-beep/CI_CD_Final_Project
gh run view RUN_ID --repo rathodkiran7926-beep/CI_CD_Final_Project --log > evidence/github-actions-success.txt
```

Replace RUN_ID with the successful run ID. The full logs should show checkout, Node.js setup, dependency installation, ESLint, Jest, coverage upload, and successful job completion. You can also download the real logs from the run's GitHub Actions page and extract the relevant job text.

## OpenShift application logs

Visit the application route, then capture actual logs:

```sh
oc logs deployment/cicd-final-app --tail=100 > evidence/openshift-application-logs.txt
```

The startup message and HTTP requests should appear. Paste the actual text into the assignment response.

Commit and push your evidence files after capture. Screenshots and outputs are pending until you run GitHub Actions and OpenShift yourself. A passing score depends on the evaluator and the evidence you submit.

