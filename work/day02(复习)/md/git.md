### 日志命令
    git log    :  当前分支之前的提交对象(处于一条线上的)
    git reflog :  只要动了HEAD git reflog就会记录!!!!

### 后悔药
    工作目录 -> 暂存区 -> 版本库

    回滚工作目录:
        工作目录:v1   工作目录:v2
        暂存区:v1     git checkout HEAD -- filename
        版本库:v1     checkout 改HEAD指向 改暂存区 改工作目录
        HEAD:v1

        git checkout -- filename
        git checkout HEAD -- filename

    回滾暂存区
        git reset filename
        git reset HEAD filename

    撤回提交(假撤回)
        提交时写错注释了
        提交时忘记将真正的修改加到暂存区
        git commit -m "xx" --amend
        --amend 相当于 git reset --soft HEAD~

### reset三部曲
    第一部： soft   覆盖head
    第二部:  mixed  覆盖head 暂存区
    第三部:  hard   覆盖head 暂存区 工作目录

### tag
    查看tag : git tag
    新建tag : git tag 版本号
    检出到对应版本 :  git checkout -b tagname
    删除tag :  git tag -d tagname

### git特点
     1. 直接记录快照 而非差异比较
     2. 近乎所有操作都是本地执行
     3. 时刻保持数据完整性
     4. 多数操作仅添加数据
     5. 文件的三种状态
        已修改（modified）
        已暂存（staged）
        已提交（committed）

