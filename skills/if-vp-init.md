---
name: if-vp-init
description: Initialize the video project management repo structure
---

# /if-vp-init — 初始化视频项目管理仓库

在当前目录创建完整的视频项目管理骨架。

## 执行步骤

1. 初始化 git（如未初始化）：
```bash
if [ ! -d .git ]; then git init; fi
```

2. 创建目录结构：
```bash
mkdir -p _templates/prompts
mkdir -p skills
```

3. 写入 `.gitignore`（排除素材、输出和构建产物）：
```bash
cat > .gitignore << 'GITIGNORE'
assets/
outputs/
.codex/
.claude/
GITIGNORE
```

4. 写入 `.current`（初始为空）：
```bash
echo -n "" > .current
```

5. 写入 `_templates/prompts/v01.md`（初始提示词模板）：
```bash
cat > _templates/prompts/v01.md << 'TEMPLATE'
# v01 — 初始版本



TEMPLATE
```

6. 写入 `CLAUDE.md`：
```bash
cat > CLAUDE.md << 'CLAUDE'
# Video Project Manager

## 核心规则

1. **活动项目**：先读取 `.current` 文件确定当前视频项目（如 `003`），以该项目目录为核心工作上下文。
2. **提示词**：在 `{项目}/prompts/` 下，按段落分目录，版本文件命名 `v01.md`, `v02.md`...
3. **输出**：生成视频放入 `{项目}/outputs/segments/candidate/`，命名格式 `{项目号}_{段号}_{段名}_{版本号}_{日期}[_{序号}].mp4`
4. **素材**：图片参考图放在 `{项目}/assets/ref/`，不纳入 git。
5. **追溯**：生成视频后，在提交信息里关联文件名。
6. **提交频率**：每次新建或编辑提示词后立即 git commit，提交信息格式 `{项目号} {段名} v{版本} — {改动摘要}`，如 `003 opening v03 — 强化光影描述`
7. **提示词把关**：生成前先审视提示词是否可优化、是否适配目标工具，避免因提示词问题浪费生成费用。
8. **执行确认**：生成视频前，先列出将要调用的接口或工具及其入参，用户确认后再执行。
9. **生成失败**：视频或图片生成失败不要自动重试，先报告问题等待用户判断。
10. **Seedance2**：使用 Seedance2 时，先输出规范 prompt 让用户审核，确认后再执行生成。

## 可用命令

- `/if-vp-init` — 初始化仓库（仅首次）
- `/if-vp-new` — 新建视频项目
- `/if-vp-switch` — 切换当前项目
- `/if-vp-approve` — 标记输出为确认
- `/if-vp-unapprove` — 退回候选
CLAUDE

```

7. 写入 `AGENTS.md`：
```bash
cat > AGENTS.md << 'AGENTS'
# Video Project Manager

## 核心规则

1. **活动项目**：先读取 `.current` 文件确定当前视频项目（如 `003`），以该项目目录为核心工作上下文。
2. **提示词**：在 `{项目}/prompts/` 下，按段落分目录，版本文件命名 `v01.md`, `v02.md`...
3. **输出**：生成视频放入 `{项目}/outputs/segments/candidate/`，命名格式 `{项目号}_{段号}_{段名}_{版本号}_{日期}[_{序号}].mp4`
4. **素材**：图片参考图放在 `{项目}/assets/ref/`，不纳入 git。
5. **追溯**：生成视频后，在提交信息里关联文件名。
6. **提交频率**：每次新建或编辑提示词后立即 git commit，提交信息格式 `{项目号} {段名} v{版本} — {改动摘要}`，如 `003 opening v03 — 强化光影描述`
7. **提示词把关**：生成前先审视提示词是否可优化、是否适配目标工具，避免因提示词问题浪费生成费用。
8. **执行确认**：生成视频前，先列出将要调用的接口或工具及其入参，用户确认后再执行。
9. **生成失败**：视频或图片生成失败不要自动重试，先报告问题等待用户判断。
10. **Seedance2**：使用 Seedance2 时，先输出规范 prompt 让用户审核，确认后再执行生成。

## 可用命令

- `/if-vp-init` — 初始化仓库（仅首次）
- `/if-vp-new` — 新建视频项目
- `/if-vp-switch` — 切换当前项目
- `/if-vp-approve` — 标记输出为确认
- `/if-vp-unapprove` — 退回候选
AGENTS
```

8. 完成后列出创建的文件结构：
```bash
find . -not -path './.git/*' -not -name '.DS_Store' | sort
```

9. 回显："仓库初始化完成。使用 `/if-vp-new` 创建第一个项目。"
