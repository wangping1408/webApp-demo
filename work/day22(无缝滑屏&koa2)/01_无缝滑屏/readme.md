### 滑屏组件库的使用
    1. 引入swiper.js 引入swiper.css
    2. 在页面上指定滑屏区域
        div.swiper-wrap
        如果需要小圆点:指定小圆点的包裹器
            div.points-wrap
        如果需要无缝
            div.swiper-wrap 加 needWF
        如果需要自动滑屏
            div.swiper-wrap 加 needWF & needAuto
    3. 准备图片数组;调用滑屏方法
        var imgArrs = ["./img/1.jpg", "./img/2.jpg","./img/3.jpg", "./img/4.jpg","./img/5.jpg"]
        $.layout(imgArrs)
