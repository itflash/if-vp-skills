---
name: if-vp-approve
description: Mark a candidate output as approved
---

# /if-vp-approve — 确认候选输出

将当前项目中 candidate/ 下的文件移至 approved/。

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

2. 列出所有候选文件：
```bash
echo ""
echo "候选文件："
FILES=$(find "$PROJECT/outputs" -path "*/candidate/*" -type f 2>/dev/null | sort)
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

3. 使用 AskUserQuestion 工具让用户选择要确认的文件（支持多选）。列出所有候选文件作为选项。

4. 对每个选中的文件，从 candidate/ 移动到 approved/：
```bash
DEST=$(echo "文件路径" | sed 's/candidate/approved/')
mkdir -p "$(dirname "$DEST")"
mv "文件路径" "$DEST"
echo "  ✓ 文件路径 → $DEST"
```

5. 回显完成状态。
