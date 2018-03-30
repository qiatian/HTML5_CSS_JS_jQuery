//当页面加载完毕
// window.onload = function () {
//     // alert(0);
//     waterFall();
//
// }
$(window).on('load',function () {
//实现瀑布流布局
    waterFall();
    //滚动加载
    $(window).on('scroll',function () {
        //是否加载
        if (checkWillLoad()){
            //造数据
            var data = {'dataImg':[{'img':'1.jpg'},{'img':'1.jpg'},
                {'img':'1.jpg'},{'img':'1.jpg'},{'img':'1.jpg'},
                {'img':'1.jpg'}]};
            //遍历创建盒子
            $.each(data.dataImg,function (index,value) {
                var newBox = $('<div>').addClass('box').appendTo($('#main'));
                var newPic = $('<div>').addClass('pic').appendTo($(newPic));
                $('<img>').attr('src','imgs/'+$(value).attr('img')).appendTo($(newPic));


            });
            //重新实现瀑布流
            waterFall();

        }

    });
});

function waterFall() {
//    拿到所哟的盒子
    var allBox = $('#main>.box');
    alert($(allBox).length);
    //取出其中一个盒子的宽度
    var boxWidth = $(allBox).eq(0).outerWidth();
    alert(boxWidth);
    //求出屏幕宽度
    var screenWidth = $(window).width();
    //求出列数
    var cols = Math.floor(screenWidth/boxWidth);
    //父标签居中
    $('#main').css({
       'width':cols * boxWidth + 'px',
        'margin':'0 auto'
    });

    //对子盒子定位
    var heightArr = [];
    //遍历
    $.each(allBox,function (index,value) {
        //取出单独盒子高度
        var boxHeight = $(value).outerHeight();
        //判断
        if(index<cols){//第一行盒子
            heightArr[index] = boxHeight;
        }else {
            //取出高度数组中最矮的盒子的高度
            var minBoxHeight = Math.min.apply(null,heightArr);
            //取出最矮高度对应的索引
            var minBoxIndex = $.inArray(minBoxHeight,heightArr);
            //定位 拿到当前盒子
            $(value).css({
                'position':'absolute',
                'top':minBoxHeight + 'px',
                'left':minBoxIndex * boxWidth + 'px'
            });

            //更新数组中最矮的高度
            heightArr[minBoxIndex] += boxHeight;

        }
    })

}

//设置滚动条件
function checkWillLoad() {
    //拿到最后一个盒子
    var lastBox = $('#main>div').last();

    //取出最后一个盒子高度的一半+头部偏离位置
    var lastBoxDis = $(lastBox).outerHeight() + $(lastBox).offset().top;

    //求出浏览器屏幕的高度
    var clientHeight = $(window).height();
    // 页面偏离浏览器的高度
    var scrollTopHeight = $(window).scrollTop();

    console.log(lastBoxDis,clientHeight);
    //比较返回
    return lastBoxDis <= clientHeight + scrollTopHeight;


}