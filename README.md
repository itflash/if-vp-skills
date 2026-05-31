# vp-skills

视频项目管理 skill 集，支持 Claude Code 和 Codex。单一源文件，构建后产出两个平台格式。

## 安装

```bash
cd 你的视频项目仓库
cp -r ~/projects/vp-skills/{skills,scripts,package.json} .
npm run build
```

## 命令

| 命令 | 作用 |
|------|------|
| `/if-vp-init` | 初始化仓库骨架（CLAUDE.md、AGENTS.md、.gitignore、_templates/） |
| `/if-vp-new` | 新建视频项目，自动编号，设为当前项目 |
| `/if-vp-switch` | 列出已有项目，选择切换 |
| `/if-vp-approve` | 将 candidate/ 下的输出文件标记为确认 |
| `/if-vp-unapprove` | 将 approved/ 下的输出文件退回候选 |

## 开发

源文件在 `skills/`，修改后：

```bash
npm run build    # 构建到 .claude/commands/ 和 .codex/skills/
npm run deploy   # 分发到全局 ~/.claude/commands/ 和 ~/.codex/skills/
```
