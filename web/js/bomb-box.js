// JavaScript Document
function openLayer(){
	addBg("layer");//添加背景
    openCont("layer");//弹出层
}
function closeLayer(){
	closeE("layer")	//关闭层
}
function openCont(o){
	if(!document.getElementById(o)) return false;
	fadeIn(o);//添加渐变
	popLayer(o);//层的位置
	hideSelect();//隐藏select
	window.onresize = function(){popLayer(o);} //改变窗体重新调整位置
    window.onscroll = function(){popLayer(o);} //滚动窗体重新调整位置
}
//设置层定位位置
function popLayer(o){
	var layId = document.getElementById(o);
	var scrollLeft = (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	var scrollTop = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
	var clientWidth,clientHeight;
	if(window.innerWidth){clientWidth = window.innerWidth;}else{clientWidth = document.documentElement.clientWidth;}
	if(window.innerHeight){clientHeight = window.innerHeight;}else{clientHeight = document.documentElement.clientHeight;}
	layId.style.left = scrollLeft + ((clientWidth - layId.offsetWidth) / 2) + 'px';
	layId.style.top = scrollTop + ((clientHeight - layId.offsetHeight) / 2) + 'px';
}
//添加背景
function addBg(o){
	if(!document.getElementById(o)) return false;
	if(document.getElementById("layBg") == null){
		var bgId = document.createElement("div");
		bgId.setAttribute("id","layBg");
		bgId.style.background = "#000";
		bgId.style.width = "100%";
		bgId.style.height = Math.max(document.body.clientHeight,document.body.offsetHeight,document.documentElement.clientHeight)+"px"
		bgId.style.position = "absolute";
		bgId.style.top = "0";
		bgId.style.left = "0";
		bgId.style.zIndex = "999";
		bgId.style.opacity = "0.6";
		bgId.style.filter = "Alpha(opacity=70)";
		document.body.appendChild(bgId);	
	}else{
		document.getElementById("layBg").style.display = "block";	
	}
	var layBg = document.getElementById("layBg");
	layBg.onclick = function(){
		closeE(o)
	}
}
//渐变效果
function fadeIn(o){
	var layerId = document.getElementById(o);
	layerId.style.display = "block";
	layerId.style.filter = "alpha(opacity:0)";
	layerId.style.opacity = 0;
	layerId.style.zIndex = "1000"
	var num = 0;
	var interval = setInterval(function(){num+=10;if(num >= 100){num=100;clearInterval(interval);}layerId.style.filter = "alpha(opacity:"+num+")";layerId.style.opacity = num/100;},30)
}
//select隐藏
function hideSelect(){
	var selects = document.getElementsByTagName('select');
	for(i = 0; i < selects.length; i++){selects[i].style.visibility = "hidden"}
}
//关闭层
function closeE(o){
	window.onresize = null;
	document.getElementById(o).style.display = "none"
	document.getElementById("layBg").style.display = "none";
	var selects = document.getElementsByTagName('select');
	for(i = 0; i < selects.length; i++){selects[i].style.visibility = "visible";}
}