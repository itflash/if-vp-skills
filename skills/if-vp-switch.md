---
name: if-vp-switch
description: Switch the active video project
---

# /if-vp-switch — 切换当前视频项目

列出所有项目，让用户选择后切换。

## 执行步骤

1. 扫描已有项目并显示：
```bash
PROJECTS=$(find . -maxdepth 1 -type d -name '[0-9][0-9][0-9]' 2>/dev/null | sed 's|^./||' | sort)
if [ -z "$PROJECTS" ]; then
  echo "没有找到项目。请先用 /if-vp-new 创建。"
  exit 1
fi
CURRENT=$(cat .current 2>/dev/null)
echo "已有项目："
for p in $PROJECTS; do
  if [ "$CURRENT" = "$p" ]; then
    echo "  $p  ← 当前"
  else
    echo "  $p"
  fi
done
```

2. 使用 AskUserQuestion 工具让用户选择项目（单选）。列出所有项目作为选项，当前项目标注 "(当前)"。

3. 将用户选择的项目名称写入 `.current`：
```bash
echo -n "用户选择的项目名" > .current
```

4. 回显切换结果并列出该项目结构：
```bash
echo "已切换到项目 XXX。"
echo ""
echo "项目结构："
find "XXX" -maxdepth 2 -not -name '.DS_Store' | sort
```
