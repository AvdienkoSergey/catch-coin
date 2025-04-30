#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Read workspaces from package.json
WORKSPACES=$(node -e "const pkg = require('./package.json'); console.log(pkg.workspaces.join('\n'));")

# Function to clean and install dependencies for a workspace
clean_and_install() {
    local workspace=$1
    echo "Processing workspace: $workspace"
    
    # Remove node_modules if it exists
    if [ -d "$workspace/node_modules" ]; then
        echo "Removing node_modules in $workspace"
        rm -rf "$workspace/node_modules"
    fi
    
    # Remove yarn.lock if it exists
    if [ -f "$workspace/yarn.lock" ]; then
        echo "Removing yarn.lock in $workspace"
        rm "$workspace/yarn.lock"
    fi
}

# Process each workspace
echo "$WORKSPACES" | while read -r workspace; do
    if [ -n "$workspace" ]; then
        clean_and_install "$workspace"
    fi
done

# Run yarn install in the root directory
echo "Running yarn install in the root directory"
yarn install

echo "Done! All workspaces have been cleaned and dependencies have been reinstalled." 