(function (w) {
    //初始化一个命名空间
    w.$ = {}
    w.$.layout = function (imgArrs) {
        //获取元素
        var swiperWrap = document.querySelector(".swiper-wrap");
        var pointsWrap = swiperWrap.querySelector(".points-wrap")

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

        //小圆点的布局
        if(pointsWrap){
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

        //操作css
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

        //开始滑屏逻辑
        move(swiperWrap,swiperList,imgArrs)
    }

    //wrap:滑屏区域
    //node:滑屏元素
    function  move(wrap,node,imgArrs) {
        //小圆点的包裹器
        var pointsWrap = wrap.querySelector(".points-wrap")
        /*
            1. 找到滑屏元素一开始的位置
            2. 计算出手指滑动的距离(参照物是视口)
            3. 将手指滑动的距离 加给元素一开始的位置
        */
        var eleStartX =0;
        var touchStartX = 0;
        var touchDisX = 0;
        var index = 0; //抽象滑屏元素的实时位置
        wrap.addEventListener("touchstart",(ev)=>{
            var touch = ev.changedTouches[0];
            eleStartX = node.offsetLeft//滑屏元素一开始的位置
            touchStartX = touch.clientX //手指一开始的位置

            //因为在move的时候是不需要过渡的
            node.style.transition = "";
        })
        wrap.addEventListener("touchmove",(ev)=>{
            var touch = ev.changedTouches[0];
            var touchNowX = touch.clientX;
            touchDisX = touchNowX - touchStartX; //手指滑动的距离

            node.style.left = eleStartX + touchDisX +"px";
        })
        wrap.addEventListener("touchend",()=>{
            //二分之一跳转
            index =  Math.round(node.offsetLeft / document.documentElement.clientWidth)

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
                pointsItems[-index].classList.add("active")
            }


            node.style.transition = ".3s left linear"
            node.style.left = index*document.documentElement.clientWidth +"px";
        })
    }
})(window)