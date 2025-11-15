#!/bin/bash

# Script to update all dependencies in a Bun workspace monorepo to latest versions

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔄 Updating all dependencies to latest versions...${NC}"

# Update root dependencies
echo -e "${YELLOW}📦 Updating root package dependencies...${NC}"
bun update

# Find all package.json files in workspaces
echo -e "${YELLOW}📦 Finding workspace packages...${NC}"

# Read workspace paths from root package.json
workspaces=$(node -pe "JSON.parse(require('fs').readFileSync('package.json', 'utf8')).workspaces?.join(' ') || ''" 2>/dev/null || echo "")

if [ -z "$workspaces" ]; then
    echo -e "${BLUE}ℹ️  No workspaces defined in package.json. Checking common directories...${NC}"
    workspaces="apps/* packages/*"
fi

# Update each workspace
for pattern in $workspaces; do
    for workspace_dir in $pattern; do
        if [ -d "$workspace_dir" ] && [ -f "$workspace_dir/package.json" ]; then
            echo -e "${YELLOW}🔧 Updating: $workspace_dir${NC}"
            (cd "$workspace_dir" && bun update)
        fi
    done
done

# Run install at root to ensure everything is linked properly
echo -e "${BLUE}🔗 Running bun install at root to ensure proper linking...${NC}"
bun install

echo -e "${GREEN}✅ All dependencies updated!${NC}"
echo -e "🔍 Please review changes and run tests."
echo -e "💡 Check for any breaking changes in updated packages."

