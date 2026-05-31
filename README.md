# if-vp-skills

AI 辅助视频创作的项目管理工具。通过 5 个自定义 skill，让 Claude Code 和 Codex 能够在多视频项目的仓库中正确识别当前工作上下文，管理提示词版本，追踪输出文件状态。

## 解决的问题

用 AI 做视频时，一个仓库里往往有多个视频项目。直接在根目录下工作，Claude Code 或 Codex 不知道当前在操作哪个项目，提示词迭代混乱，生成的视频找不到对应的提示词版本。

本工具提供了一套约定和 skill：

- **`.current` 索引机制**：告诉 AI "现在在做的项目是哪个"
- **提示词版本化**：`prompts/{段名}/v01.md → v02.md`，每次改动有记录
- **输出可追溯**：文件名自带项目号、版本号、日期，知道哪个提示词生了哪个视频
- **状态标记**：candidate / approved 目录区分候选和定稿
- **跨平台**：一份源文件，构建后同时支持 Claude Code 和 Codex

## 安装

```bash
cd 你的视频项目仓库
cp -r ~/projects/if-vp-skills/{skills,scripts,package.json} .
npm run build
npm run deploy
```

然后 `/if-vp-init` 初始化仓库骨架。

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
