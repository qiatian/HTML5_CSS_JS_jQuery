/**
 * Created by sanjingrihua on 2018/3/26.
 */
function $(id) {
    return typeof id === 'string'?document.getElementById(id):id;
}

//当网页加载完毕
window.onload = function () {
    //瀑布流布局
    waterFall('main','box');
    
    //滚动加载盒子
    window.onscroll = function (){
        // alert(0);
        if (cheackWillLoad()){

            // alert(0);
            //不断加载数据
            var data = {'dataImg':[{'img':'1.jpg'},{'img':'1.jpg'},
                {'img':'1.jpg'},{'img':'1.jpg'},{'img':'1.jpg'},
                {'img':'1.jpg'}]};
            //加载数据
            for(var i=0;i<data.dataImg.length;i++){
                //创建最外面的盒子
                var newBox = document.createElement('div');
                newBox.className = 'box';
                $('main').appendChild(newBox);

                //创建里面的盒子
                var newPic = document.createElement('div');
                newPic.className = 'pic';
                newBox.appendChild(newPic);

                //创建img
                var newImg = document.createElement('img');
                newImg.src = 'imgs/'+ data.dataImg[i].img;

                newPic.appendChild(newImg);

                // alert(newImg.src);
            }
            waterFall('main','box');

        }
    }
}

//实现瀑布流布局
function waterFall(parent,box) {
//    居中  子盒子在父盒子中居中
    //拿到父盒子中所有的子盒子
    var allBox = $(parent).getElementsByClassName(box);
    // console.log(allBox);
    // alert(allBox.length);
    //求出盒子宽度
    var boxWidth = allBox[0].offsetWidth;
    // alert(boxWidth);
    // 求出浏览器宽度
    var screenWidth = document.body.offsetWidth;
    // alert(screenWidth);

    //求出列数
    var cols = Math.floor(screenWidth/boxWidth);
    // alert(cols);

    //让父标签居中
    $(parent).style.width = boxWidth * cols + 'px';
    $(parent).style.margin = '0 auto';

//    子盒子定位
    //高度数组
    var heightArr = [];
    //遍历数组
    for(var i=0;i<allBox.length;i++){
        //求出单独盒子的高度
        var boxHeight = allBox[i].offsetHeight;
        //取出第一行
        if (i<cols){//第一行中的盒子
            heightArr.push(boxHeight);

        }else {//需要定位的盒子
            //求出最矮盒子的高度
            var minBoxHeight = Math.min.apply(this,heightArr);
            //求出最爱盒子对应的索引
            var minBoxIndex = getMinBoxIndex(minBoxHeight,heightArr);

            //定位子盒子
            allBox[i].style.position = 'absolute';
            allBox[i].style.top = minBoxHeight + 'px';
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';

            //更新数组中最矮盒子的高度
            heightArr[minBoxIndex] += boxHeight;

            // alert(minBoxHeight);
        }
    }

}
//取出数组中最爱盒子对应的索引
function getMinBoxIndex(val,arr) {
    for(var i in arr){
        if (val == arr[i]) return i;
    }
}

//判断是否符合条件
function cheackWillLoad() {

    //取出所有盒子
    var  allBox = $('main').getElementsByClassName('box');
    //取出最后一个盒子
    var lastBox = allBox[allBox.length-1];

    //求出最后一个盒子高度的一半，加上头部偏离位置
    var lastBoxDis = lastBox.offsetHeight*0.5+lastBox.offsetTop;
    //求出浏览器的高度 混合模式
    var screenHeight = document.body.clientHeight || document.documentElement.clientHeight;

    var scrollTopHeight = document.body.scrollTop;
    // alert(screenHeight);

    // alert(lastBoxDis);
    // alert(screenHeight+scrollTopHeight);

    return lastBoxDis <= screenHeight +scrollTopHeight;
}