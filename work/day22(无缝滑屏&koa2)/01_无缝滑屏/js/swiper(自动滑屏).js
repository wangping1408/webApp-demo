(function (w) {
    //初始化一个命名空间
    w.$ = {}
    w.$.layout = function (imgArrs) {
        //获取元素
        var swiperWrap = document.querySelector(".swiper-wrap");
        var pointsWrap = swiperWrap.querySelector(".points-wrap");
        var needWF = swiperWrap.getAttribute("needWF");
        var needAuto = swiperWrap.getAttribute("needAuto");


        //小圆点的布局 当有无缝存在的时候应该要提前渲染
        if(pointsWrap){
            //给小圆点的包裹器打一个flag
            pointsWrap.size = imgArrs.length;
            var pointsList = document.createElement("ul");
            pointsList.classList.add("points-list");
            for(var i=0;i<imgArrs.length;i++){
                var pointsItem = document.createElement("li");
                pointsItem.classList.add("points-item");
                if(i===0)
                    pointsItem.classList.add("active");
                pointsList.appendChild(pointsItem);
            }
            pointsWrap.appendChild(pointsList)
        }

        //只要swiperWrap.getAttribute("needWF")这个值不是null就应该有无缝
        // 当needWF不为null时 我们应该将图片复制一组

        if(needWF !== null){
            imgArrs = imgArrs.concat(imgArrs);
        }


        //无缝滑屏的整体布局
        var swiperList = document.createElement("ul");
        swiperList.classList.add("swiper-list");
        for(var i=0;i<imgArrs.length;i++){
            var swiperItem = document.createElement("li");
            swiperItem.classList.add("swiper-item");
            var imgNode =document.createElement("img");
            imgNode.src = imgArrs[i];
            swiperItem.appendChild(imgNode);
            swiperList.appendChild(swiperItem);
        }
        swiperWrap.appendChild(swiperList)

        //操作css 控制滑屏元素与滑屏区域的宽度的
        var styleNode = document.createElement("style");
        styleNode.innerHTML = `.swiper-wrap .swiper-list{
            width: ${imgArrs.length*100}%;
        }`;
        styleNode.innerHTML += `.swiper-wrap .swiper-list .swiper-item{
            width: ${(1/imgArrs.length)*100}%;
        }`;
        document.head.appendChild(styleNode);

        //因为swiper-list定位起来了准备做运动了 需要我们去同步swiper-wrap的高度
        setTimeout(()=>{
            var height = swiperList.offsetHeight;
            swiperWrap.style.height = `${height}px`;
        },500)

        //开始手动滑屏逻辑
        move(swiperWrap,swiperList,imgArrs,needWF,needAuto);
        //开始自动滑屏逻辑
        autoMove(swiperList,needWF,needAuto,pointsWrap,imgArrs,0)
    }

    //wrap:滑屏区域
    //node:滑屏元素
    //手动滑屏的方法
    function  move(wrap,node,imgArrs,needWF,needAuto) {
        //小圆点的包裹器
        var pointsWrap = wrap.querySelector(".points-wrap")
        /*
            1. 找到滑屏元素一开始的位置
            2. 计算出手指滑动的距离(参照物是视口)
            3. 将手指滑动的距离 加给元素一开始的位置
            4. 无缝:
                当点到第一组第一张的时候 应该立马跳到第二组的第一张
                当点到第二组的最后一张时 应该立马跳到第一组的最后一张
        */
        var eleStartX =0;
        var touchStartX = 0;
        var touchDisX = 0;
        var index = 0; //抽象滑屏元素的实时位置
        wrap.addEventListener("touchstart",(ev)=>{

            //停下自动滑屏
            clearInterval(node.timer)


            var touch = ev.changedTouches[0];
            touchStartX = touch.clientX //手指一开始的位置

            //因为在move的时候是不需要过渡的
            node.style.transition = "";

            //无缝逻辑  改变的就是元素一开始的位置
            if(needWF !== null){
                /*当点到第一组第一张的时候 应该立马跳到第二组的第一张
                当点到第二组的最后一张时 应该立马跳到第一组的最后一张*/
                //当前的index代表的是滑屏元素的位置 合理的值处于0到-9
                index =  transform(node,"translateX") / document.documentElement.clientWidth;
                if(index === 0){
                    index = -imgArrs.length /2;
                }else if(index === 1-imgArrs.length ){
                    index = 1- imgArrs.length /2;
                }
                console.log(index)
                transform(node,"translateX",index*document.documentElement.clientWidth)
            }
            //有可能无缝的逻辑已经改变了元素一开始的位置了 所以滑屏元素一开始的位置应该在touchstart的最后来求
            eleStartX = transform(node,"translateX")
        })
        wrap.addEventListener("touchmove",(ev)=>{
            var touch = ev.changedTouches[0];
            var touchNowX = touch.clientX;
            touchDisX = touchNowX - touchStartX; //手指滑动的距离

            transform(node,"translateX",eleStartX + touchDisX)
        })
        wrap.addEventListener("touchend",()=>{
            //二分之一跳转
            index =  Math.round(transform(node,"translateX") / document.documentElement.clientWidth)

                       //边界情况的处理
            if(index>0){
                index=0;
            }else if(index < (1-imgArrs.length) ){
                index=1-imgArrs.length
            }

            //处理小圆点
            if(pointsWrap){
                var pointsItems = pointsWrap.querySelectorAll(".points-list .points-item");
                pointsItems.forEach((pointItem)=>{
                    pointItem.classList.remove("active")
                })
                //pointsWrap.size 是为了无缝时 小圆点不会出问题
                pointsItems[-(index%pointsWrap.size)].classList.add("active")
            }


            node.style.transition = ".3s transform linear"
            transform(node,"translateX",index*document.documentElement.clientWidth)


            //重新开启自动滑屏
            autoMove(node,needWF,needAuto,pointsWrap,imgArrs,index)
        })
    }

    function autoMove(node,needWF,needAuto,pointsWrap,imgArrs,autoFlag) {
        if(needWF!==null && needAuto!==null){
            clearInterval(node.timer) //循环定时器没有必要开多次
            // var autoFlag = 0
            node.timer = setInterval(()=>{

                //加上过渡动画
                node.style.transition = ".5s transform linear"

                //实现自动轮播的逻辑
                autoFlag--;
                transform(node,"translateX",autoFlag*document.documentElement.clientWidth);


                //小圆点同步
                if(pointsWrap){
                    var pointsItems = pointsWrap.querySelectorAll(".points-list .points-item");
                    pointsItems.forEach((pointItem)=>{
                        pointItem.classList.remove("active")
                    })
                    //pointsWrap.size 是为了无缝时 小圆点不会出问题
                    pointsItems[-(autoFlag%pointsWrap.size)].classList.add("active")
                }
            },1000)

            //transitionend:等node节点的过渡完成之后才会触发
            node.addEventListener("transitionend",()=>{
                //实现自动轮播的无缝  自动轮播到第二组的最后一张
                if(autoFlag === 1-imgArrs.length){
                    //第二组的最后一张应该是要立即跳到第一组的最后一张的 不能有过渡
                    node.style.transition = ""
                    //立马跳到第一组的最后一张
                    autoFlag = 1-imgArrs.length/2
                    transform(node,"translateX",autoFlag*document.documentElement.clientWidth);
                }
            })
        }
    }

    function transform(node,type,val) {
        //扩展了dom的api 给元素节点加了一个transform属性 用来存储当前节点所有的变换的类型及其值
        if(!node.transform){node.transform={}}
        //node身上百分百有了transform属性

        if(arguments.length === 3){
            //设置
            var text = "";
            node.transform[type] = val;

            for(var name in node.transform){
                switch (name){
                    case "translateX":
                    case "translateY":
                    case "translateZ":
                        text+=name+"("+node.transform[name]+"px) "
                        break;
                    case "rotateX":
                    case "rotateY":
                    case "rotate":
                        text+=name+"("+node.transform[name]+"deg) "
                        break;
                    case "scaleX":
                    case "scaleY":
                    case "scale":
                        text+=name+"("+node.transform[name]+") "
                        break;
                }
            }

            node.style.transform = node.style.webkitTransform = text;
        }else if(arguments.length === 2){
            //读取
            val = node.transform[type]
            if(val === undefined){
                //返回默认值
                switch (type){
                    case "translateX":
                    case "translateY":
                    case "translateZ":
                    case "rotateX":
                    case "rotateY":
                    case "rotate":
                        val = 0;
                        break;
                    case "scaleX":
                    case "scaleY":
                    case "scale":
                        val = 1;
                        break;
                }
            }
            return val
        }
    }

    w.$.transform =transform;
})(window)