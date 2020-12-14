### 1. git两条主线
	a.工作目录 暂存区 版本库
	b.git对象 树对象 提交对象

### 2. 集中式(svn) vs 分布式(git)
    集中式缺点:
        如果宕机就不可以进行版本控制
        所有的历史记录都在单一的服务器上 如果不备份有丢失的风险
    分布式优点:
        每一个客户端都是一份完整的版本库;比较安全
        可以离线进行版本控制

### 3. git安装完的基本配置 && 为一些长的命令去配置别名
     git config --global user.name "damu"
     git config --global user.email damu@example.com
     git config --list
     git config --global alias.lol "log --oneline --decorate --graph --all"

### 4. 基本的linux命令
    echo
    ll
    find ./
    find ./ -type f
    cat
    vim

### 5. git底层命令
    git hash-object -w 文件路径 : 生成git对象
    git update-index --add 文件路径 :生成git对象并更新暂存区
        git hash-object -w 文件路径
        git update-index --cacheinfo 100644 git对象对应的hash 对应的文件名
    git write-tree : 将暂存区中的内容做快照生成树对象
    echo 'first commit' | git commit-tree d8329f : 生成提交对象

    git cat-file -p hash   : 查看hash所对应的内容
    git cat-file -t hash   : 查看hash所对应内容的类型
    git ls-files -s        : 查看暂存区的状态

6. git高层命令
    初始化仓库:git init
    将工作目录的修改生成git对象并加到暂存区:git add ./
    生成树对象&提交对象 : git commit -m "提交注释" && git commit -a -m "提交注释"
    查看文件的状态:git status
    查看有哪些修改没有被加到暂存区:git diff
    查看有哪些暂存没有被提交:git diff --staged
    查看提交记录:git log --oneline && git log --oneline --decorate --graph --all

7. 分支操作
    查看分支列表 : git branch
                  git branch --merged
                  git branch --no-merged 

    强制删除分支 : git branch -D 分支名
    删除分支 : git branch -d 分支名

    创建&切换分支 : git checkout -b 分支名
    创建分支 : git branch 分支名
    √ 创建分支(版本穿梭): git branch name commitHash
    切换分支 : git checkout 分支名
        切换分支会影响到 head 工作目录 暂存区
        √ 最佳实践: 一定要在干净的情况下 切换分支
                 如果工作做到一半想要切到另外一个分支;要么先提交一次;要么使用存储
                    git stash : 进行存储
                    git stash list : 查看存储
                    git stash pop : 取出第一次存储
    合并分支(先切到主分支): git merge 分支名
        快进合并 : 主分支 与 被合并的分支在一条线上
        典型合并 : 主分支 与 被合并的分支存在分叉的情况
            有可能产生冲突: 在团队内部交流;确定冲突代码的处理方案;修改 暂存 提交就相当于解决冲突了!



