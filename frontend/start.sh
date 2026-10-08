#!/bin/bash
# Preview adapter: the Emergent preview expects the frontend on 0.0.0.0:3000.
# The actual app is the imported TanStack Start project; run its dev server.
cd /app/seamless-sign-up-main/seamless-sign-up-main
exec npx vite dev --host 0.0.0.0 --port 3000
