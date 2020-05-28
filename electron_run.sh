#!/bin/bash
# Install node client
npm i
# Copy node client build to electron
ionic build && npx cap copy electron
# Run electron
npx cap open
