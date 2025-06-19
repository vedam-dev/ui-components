#!/bin/bash

BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
PATTERN="^(HEAD|master|dev|prod|uat|(feature|bugfix|hotfix)\/[A-Z]+-[0-9]+(-[A-Za-z0-9\-]+)*)$"

if [[ ! "$BRANCH_NAME" =~ $PATTERN ]]; then
  echo "❌ Invalid branch name: '$BRANCH_NAME'"
  echo "👉 Expected format: feature/ABC-123-summary"
  echo "✔️  Allowed prefixes: feature, bugfix, hotfix"
  echo "✔️  Ticket format: ABC-123"
  exit 1
fi
