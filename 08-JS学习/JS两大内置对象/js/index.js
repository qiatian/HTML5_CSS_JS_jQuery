/**
 * Created by sanjingrihua on 2018/3/26.
 */
//JS的CRUD
//增
   document.write('hello world');

   //拿到div
   var main = document.getElementById('main');
   //创建一个图片标签
   var img = document.createElement('img');
   img.src = 'imgs/icon_01.jpg';
   //添加到div
   main.appendChild(img);

   //删除
  img.remove();

  //改，拿到对 应标签进行改
 //查getElementBy。。。

console.log(main.childNodes);

