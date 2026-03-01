# Adsterra Popunder 广告集成 Spec

## Why
用户希望在网站中集成 Adsterra.com 的 Popunder 广告脚本，以实现网站变现。

## What Changes
- 在 index.html 中添加 Adsterra Popunder 广告脚本
- 脚本配置：
  - key: 460952f61a2dd343c40b8b452b684d45
  - format: iframe
  - height: 250
  - width: 300

## Impact
- Affected specs: 网站广告系统
- Affected code: index.html

## ADDED Requirements

### Requirement: 广告脚本集成
系统应当在 index.html 页面中集成 Adsterra Popunder 广告脚本。

#### Scenario: 广告脚本加载
- **WHEN** 用户访问网站页面
- **THEN** Adsterra 广告脚本应正确加载并显示广告

#### Scenario: 脚本配置
- **WHEN** 页面加载时
- **THEN** atOptions 配置对象应正确初始化，包含正确的 key、format、height、width 参数
