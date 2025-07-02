#!/bin/bash
cd /home/kavia/workspace/code-generation/mememaster-91266-6e3153b8/frontend_react
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

