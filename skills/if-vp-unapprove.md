---
name: if-vp-unapprove
description: Move an approved output back to candidate
---

# /if-vp-unapprove — 退回候选

将当前项目中 approved/ 下的文件移回 candidate/。

## 执行步骤

1. 读取当前项目：
```bash
PROJECT=$(cat .current 2>/dev/null)
if [ -z "$PROJECT" ]; then
  echo "错误：未设置当前项目。请先 /if-vp-switch 或 /if-vp-new。"
  exit 1
fi
echo "当前项目：$PROJECT"
```

2. 列出所有已确认文件：
```bash
echo ""
echo "已确认文件："
FILES=$(find "$PROJECT/outputs" -path "*/approved/*" -type f 2>/dev/null | sort)
if [ -z "$FILES" ]; then
  echo "  (无)"
  exit 0
fi
echo "$FILES" | while read f; do
  if [ -f "$f" ]; then
    echo "  $f"
  fi
done
```

3. 使用 AskUserQuestion 工具让用户选择要退回的文件（支持多选）。列出所有已确认文件作为选项。

4. 对每个选中的文件，从 approved/ 移回 candidate/：
```bash
DEST=$(echo "文件路径" | sed 's/approved/candidate/')
mkdir -p "$(dirname "$DEST")"
mv "文件路径" "$DEST"
echo "  ✓ 文件路径 → $DEST"
```

5. 回显完成状态。
