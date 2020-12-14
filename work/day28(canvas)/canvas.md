### 学习canvas得使用同步的编程思想
### 学习canvas要忘记大部分dom层面的渲染
### canvas本质上就是一个html标签
    <canvas width="400" height="400"></canvas>
### js-api
    得到画笔(canvas上下文)
        var oc = document.querySelector("#oc");
        var ctx = oc.getContext("2d");
            ctx的api分三拨:
                调整画笔状态的: ctx.lineWidth ....
                进行路径设置的: ctx.moveTo ....
                绘图: ctx.fill ....
                canvas设置相关: ctx.beginPath() ctx.save() ctx.restore()