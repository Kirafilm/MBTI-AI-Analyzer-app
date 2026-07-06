#!/usr/bin/env bash
set -euo pipefail

# Deploy API to Google Cloud Run.
# Prerequisites: gcloud CLI, billing enabled, APIs enabled (see docs below).
#
# Usage:
#   export GCP_PROJECT_ID=your-project
#   export GCP_REGION=asia-east1
#   ./scripts/deploy-cloud-run.sh
#
# Optional env file for secrets (not committed):
#   export CLOUD_RUN_ENV_FILE=.env.production

: "${GCP_PROJECT_ID:?Set GCP_PROJECT_ID}"
: "${GCP_REGION:=asia-east1}"
SERVICE_NAME="${CLOUD_RUN_SERVICE_NAME:-mbti-api}"

gcloud config set project "$GCP_PROJECT_ID"

gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

DEPLOY_ARGS=(
  run deploy "$SERVICE_NAME"
  --source .
  --region "$GCP_REGION"
  --platform managed
  --allow-unauthenticated
  --port 8080
  --memory 512Mi
  --cpu 1
  --min-instances 0
  --max-instances 3
)

if [[ -n "${CLOUD_RUN_ENV_FILE:-}" && -f "$CLOUD_RUN_ENV_FILE" ]]; then
  DEPLOY_ARGS+=(--env-vars-file "$CLOUD_RUN_ENV_FILE")
fi

gcloud "${DEPLOY_ARGS[@]}"

echo ""
echo "API URL:"
gcloud run services describe "$SERVICE_NAME" --region "$GCP_REGION" --format='value(status.url)'
