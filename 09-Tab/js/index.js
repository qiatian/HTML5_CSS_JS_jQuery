/**
 * Created by sanjingrihua on 2018/3/26.
 */
function $(id) {
//    类型比较
    return typeof  id === 'string' ? document.getElementById(id):id;
}
//当网页加载完毕时调用
window.onload = function () {
    //拿到所有的li标签和对应的内容
    var lis = $('tab-header').getElementsByTagName('li');
    var contents = $('tab-content').getElementsByClassName('dom');

    // console.log(lis,contents);

//    验证
    if (lis.length !== contents.length)return;

//    遍历
    for (var i=0;i<lis.length;i++){
        var  li = lis[i];
        li.id = i;

    //    监听鼠标在li上面的移动
        li.onmousemove = function () {

            for(var j=0;j<lis.length;j++){
            //    让所有的li标签都不被选中
                lis[j].className = '';
                contents[j].style.display = 'none';
            }
        //    设置当前对象的classname
            this.className = 'selected';
            contents[this.id].style.display = 'block';

        }


    }
}