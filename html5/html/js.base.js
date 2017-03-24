**
 * Created by Administrator on 2017/3/9 0009.
 */
var $=function(){
    return new Base()
}
function Base(){
    this.elements=[];
}
//Base.prototype.elements=[];
//获取id节点
Base.prototype.getid=function(id){
    this.elements.push(document.getElementById(id));
    return this;
    }
//获取class节点数组
Base.prototype.getclass=function(classname,idName){
    var node=null;
    if(arguments.length==2){
        node=document.getElementById(idName);
    }else{
        node=document;
    }
    var all=node.getElementsByTagName('*');
    for(var i=0;i<all.length;i++){
        if(all[i].className==classname){
            this.elements.push(all[i])
        }
    }
    return this;
}
//获取元素节点数组
Base.prototype.gettags=function(tag){
    var tags=document.getElementsByTagName(tag);
    for(var i=0;i<tags.length;i++){
        this.elements.push(tags[i])
    }
    return this;
}
//添加class样式
Base.prototype.addClass=function(classname){
    for(var i=0;i<this.elements.length;i++){
        if(!this.elements[i].className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)'))){
            this.elements[i].className+=' '+classname;
        }
    }
    return this;
}
//删除class样式
Base.prototype.removeClass=function(classname){
    for(var i=0;i<this.elements.length;i++){
        if(this.elements[i].className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)'))){
            this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+classname+'(\\s|$)'),'')
        }
    }
    return this;
}
//获取节点数组中的某一个节点
Base.prototype.getElement=function(num){
    var element=this.elements[num];
    this.elements=[];
    this.elements[0]=element;
    return this;
}
//设置样式
Base.prototype.css=function(attr,value){
   //this.elements[0].style[attr]=value;
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length==1){
            if(typeof window.getComputedStyle!='undefined'){
                return window.getComputedStyle(this.elements[i],null)[attr]
            }else if(typeof this.elements[i].currentStyle!='undefined'){
                return this.elements[i].currentStyle[attr]
            }
        }
        this.elements[i].style[attr]=value;
    }
    return this;
};
//设置html
Base.prototype.html=function(str){
    for(var i=0;i<this.elements.length;i++){
        if(arguments.length==0){
            return this.elements[i].innerHTML
        }
        this.elements[i].innerHTML=str;
    }
    return this;
}
//点击事件
Base.prototype.click=function(fn){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onclick=fn;
    }
    return this;
}
//设置鼠标移入移出
Base.prototype.hover=function(over,out){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onmouseover=over;
        this.elements[i].onmouseout=out;
    }
    return this;
}
//设置显示
Base.prototype.show=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display='block';

    }
    return this;
}
//设置隐藏
Base.prototype.hide=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display='none';
    }
    return this;
}
//居中显示
Base.prototype.center=function(width,height){
    var top=(document.documentElement.clientHeight-300)/2;
    var left=(document.documentElement.clientWidth-300)/2;
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.top=top+'px';
        this.elements[i].style.left=left+'px';
    }
    return this;
}
//触发浏览器窗口事件
Base.prototype.resize=function(fn){
    window.onresize=fn;
    return this;
}
//锁屏功能
Base.prototype.lock=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.width=document.documentElement.clientWidth+'px';
        this.elements[i].style.height=document.documentElement.clientHeight+'px';
        this.elements[i].style.display='block'
        document.documentElement.style.overflow='hidden'
    }
    return this;
}
//取消锁屏
Base.prototype.unlock=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].style.display='none'
        document.documentElement.style.overflow='auto'
    }
}

//拖拽
Base.prototype.drag=function(){
    for(var i=0;i<this.elements.length;i++){
        this.elements[i].onmousedown=function(e){
            var _this=this;
            var e=e||window.event;
            var diffx= e.clientX- _this.offsetLeft;
            var diffy= e.clientY- _this.offsetTop;
            document.onmousemove=function(e){
                var e=e||window.event;
                _this.style.top= e.clientY-diffy+'px';
                _this.style.left= e.clientX-diffx+'px';
            }
            document.onmouseup=function(){
                this.onmousemove=null;
                this.onmouseup=null;
            }
        }
    }
    return this;
}
