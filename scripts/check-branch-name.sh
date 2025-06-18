#!/bin/bash

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
PATTERN="^(feature|fix|chore|hotfix)\/[A-Z]+-[0-9]+(-[a-z0-9\-]+)*$"

if [[ ! "$BRANCH_NAME" =~ $PATTERN ]]; then
  echo "❌ Invalid branch name: '$BRANCH_NAME'"
  echo "👉 Expected format: feature/ABC-123-summary"
  echo "✔️  Allowed: feature, fix, chore, hotfix"
  exit 1
fi
