### 学习flex的主线(2组核心概念)
    主轴 侧轴
    容器 项目
### flex容器上的属性
    控制主侧轴分别是哪一根 以及他们的方向
        flex-flow:row nowrap
    富裕空间管理
        主轴 : justify-content
        侧轴 :
                align-items      优先级低    以一组item为单位
                algin-self       优先级中等  以自己为单位
                algin-content    优先级高(有可能会失效) 以所有内容为单位

### flex项目上的属性
    order 调整项目的排列顺序;
    algin-self 侧轴的富余空间管理;
    flex 等分布局 等比例布局

### 如何合理的使用flex
    flex的经典使用场景:等分布局 等比例布局
    尽量避免使用flex-shrink
        flex-shrink:0


