#!/bin/bash
set -e

# 构建Vue项目
echo "开始构建父项目..."
npm run build

# 定义子仓库路径（根据实际情况修改）
CHILD_REPO="../dist-repo"

# 检查子仓库是否存在
if [ ! -d "$CHILD_REPO/.git" ]; then
  echo "初始化子仓库..."
  mkdir -p $CHILD_REPO
  cd $CHILD_REPO
  git init
  echo "# 子仓库 - 父项目构建产物" > README.md
  git add README.md
  git commit -m "初始化子仓库"
  cd -
fi

# 同步构建产物到子仓库
echo "同步构建产物到子仓库..."
rm -rf $CHILD_REPO/*
cp -r dist/* $CHILD_REPO/

# 提交子仓库变更
echo "提交子仓库变更..."
cd $CHILD_REPO
git add .
git commit -m "更新构建产物: $(date +'%Y-%m-%d %H:%M:%S')"
echo "构建和同步完成！"