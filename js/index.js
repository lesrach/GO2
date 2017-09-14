$(function(){
	var _width = Math.floor($(document).outerWidth());
	new CarouselLR({
		imgs:[
			{src:"images/banner1.jpg",href:"http://www.go2.cn/gold/"},
			{src:"images/banner2.jpg",href:"http://www.gogoo.cn/index/fruit"}
		],
		width:_width,
		height:90,
		container:$(".banner")[0],
		nextturn:true
	})
	$(".close").click(function(){
		$(".banner").hide();
	})
	$("#search1").click(function(){
		$("#search1,#search2,#search3").attr("class","color-orange");
		this.className = "bg-orange color-white";
		$("#searchbox").css({
			borderColor:"#ff6700"
		}).attr({
			placeholder:'直接输入"供应商&货号"可快速找货'
		})
		$("#search").css({
			backgroundColor:"#ff6700"
		})
	})
	$("#search2").click(function(){
		$("#search1,#search2,#search3").attr({class: "color-orange"});
		this.className = "bg-cyan color-white";
		$("#searchbox").css({
			borderColor:"#4bb9c6"
		}).attr({
			placeholder:'直接输入"实力质造供应商&货号"可快速找货'
		})
		$("#search").css({
			backgroundColor:"#4bb9c6"
		})
	})
	$("#search3").click(function(){
		$("#search1,#search2,#search3").attr("class","color-orange");
		this.className = "bg-orange color-white";
		$("#searchbox").css({
			borderColor:"#ff6700"
		}).attr({
			placeholder:'直接输入"供应厂商名"查看货源'
		})
		$("#search").css({
			backgroundColor:"#ff6700"
		})
	})
})