# vp-skills — 视频项目管理 skill 集

## 项目结构

```
skills/          ← 源文件，唯一编辑点
scripts/
  build.mjs      ← 构建：skills/ → .claude/commands/ + .codex/skills/
  deploy.mjs     ← 分发到全局 ~/.claude/commands/ + ~/.codex/skills/
```

## 修改 skill

1. 编辑 `skills/if-vp-*.md`
2. `npm run build` 构建
3. `npm run deploy` 分发到全局

构建产物 `.claude/` 和 `.codex/` 不纳入 git。

## 约定

- Git 提交信息使用中文
- 回复使用中文
