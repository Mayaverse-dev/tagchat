#!/bin/bash
# TagChat daily backup to Artemis SSD
# Backs up source, releases, and server data

BACKUP_BASE="/Volumes/artemis/Backups/tagchat"
SOURCE="/Volumes/artemis/Cursor/tagchat"
DATE=$(date +%Y-%m-%d)
BACKUP_DIR="$BACKUP_BASE/$DATE"
LATEST_LINK="$BACKUP_BASE/latest"

if [ ! -d "/Volumes/artemis" ]; then
  echo "ERROR: Artemis SSD not mounted"
  exit 1
fi

mkdir -p "$BACKUP_DIR"

rsync -a --delete \
  --exclude='node_modules' \
  --exclude='.cache' \
  --exclude='dist' \
  --exclude='dist-electron' \
  --exclude='target' \
  --exclude='*.dmg' \
  --exclude='*.exe' \
  --link-dest="$LATEST_LINK" \
  "$SOURCE/" "$BACKUP_DIR/"

# Also back up the release binaries separately (they're large, only copy if new)
RELEASE_BACKUP="$BACKUP_BASE/releases"
mkdir -p "$RELEASE_BACKUP"
if [ -d "$SOURCE/server/releases" ]; then
  rsync -a "$SOURCE/server/releases/" "$RELEASE_BACKUP/"
fi

# Back up the signing keys
KEY_BACKUP="$BACKUP_BASE/keys"
mkdir -p "$KEY_BACKUP"
cp -f "$HOME/.tauri/tagchat.key" "$KEY_BACKUP/" 2>/dev/null
cp -f "$HOME/.tauri/tagchat.key.pub" "$KEY_BACKUP/" 2>/dev/null

# Update the latest symlink
rm -f "$LATEST_LINK"
ln -s "$BACKUP_DIR" "$LATEST_LINK"

# Prune backups older than 30 days
find "$BACKUP_BASE" -maxdepth 1 -type d -name "20*" -mtime +30 -exec rm -rf {} \;

echo "$(date): Backup complete → $BACKUP_DIR"
