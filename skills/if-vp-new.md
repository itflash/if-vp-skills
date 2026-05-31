---
name: if-vp-new
description: Create a new video project with auto-incrementing ID
---

# /if-vp-new — 新建视频项目

在仓库中创建新的视频项目，设为当前项目。

- `if-vp-new` — 自动分配编号（001, 002, …）
- `if-vp-new <name>` — 使用指定目录名

## 执行步骤

1. 确认 `_templates/` 存在：
```bash
test -d _templates || { echo "错误：_templates/ 不存在。请先运行 /if-vp-init。"; exit 1; }
```

2. 确定项目目录名：
```bash
if [ -n "$1" ]; then
  PROJECT="$1"
else
  NEXT=$(find . -maxdepth 1 -type d -name '[0-9][0-9][0-9]' 2>/dev/null | sed 's|^./||' | sort -n | tail -1 | sed 's/^0*//')
  if [ -z "$NEXT" ]; then
    NEXT=1
  else
    NEXT=$((NEXT + 1))
  fi
  PROJECT=$(printf "%03d" $NEXT)
fi
echo "创建项目：$PROJECT"
```

3. 从模板创建项目目录并补全子目录：
```bash
cp -r _templates "$PROJECT"
mkdir -p "$PROJECT/assets/ref"
mkdir -p "$PROJECT/outputs/segments/candidate"
mkdir -p "$PROJECT/outputs/segments/approved"
mkdir -p "$PROJECT/outputs/final/candidate"
mkdir -p "$PROJECT/outputs/final/approved"
mkdir -p "$PROJECT/docs"
```

4. 写入 `.current`：
```bash
echo -n "$PROJECT" > .current
```

5. 回显项目结构和说明：
```
项目 $PROJECT 已创建，已设为当前项目。
目录结构：
  prompts/     — 提示词（按段落分目录，版本命名 v01.md）
  assets/ref/  — 参考图片素材
  outputs/     — 生成输出（segments/、final/，各有 candidate/ approved/）
  docs/        — 项目文档
```
