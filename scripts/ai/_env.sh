# scripts/_env.sh
if [ -f ".ai-env" ]; then
  set -a
  # shellcheck disable=SC2046
  eval $(cat .ai-env | sed 's/^/export /')
  set +a
fi
mkdir -p "$OUT_DIR"
