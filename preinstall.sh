#!/bin/bash

# Check if CI variable is set to true
if [ "$CI" = "true" ]; then
  echo "CI is true, skipping pre-commit install."
else
  # Install pre-commit hooks
  pre-commit install
fi
