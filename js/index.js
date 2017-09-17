require(["config"],function(){
	require(["jquery","cookie","template","animate"],function($,cookie,template){
		$(function(){
			var _width = Math.floor($(document).outerWidth());
			/*添加轮播图*/
			new CarouselLR({
				imgs:[
					{src:"/images/banner1.jpg",href:"http://www.go2.cn/gold/"},
					{src:"/images/banner2.jpg",href:"http://www.gogoo.cn/index/fruit"}
				],
				width:_width,
				height:90,
				container:$(".banner")[0],
				isnext:true,
				circlestyle:{
					bgColor: "transparent",
					textAlign: "center",
					bgHeight: 14,
					clWidth: 8
				}
			})
			new CarouselLR({
				imgs:[
					{src:"/images/images/ad2banner-1.jpg",href:"http://http://mdst.go2.cn/?pos=go2_a4pos=a4.70416.1"},
					{src:"/images/images/ad2banner-2.jpg",href:"http://qiamei.go2.cn/?pos=go2_a4pos=a4.70415.2"},
					{src:"/images/images/ad2banner-3.jpg",href:"http://buka.go2.cn/?pos=go2_a4pos=a4.70414.3"},
					{src:"/images/images/ad2banner-4.jpg",href:"http://jqlld.go2.cn/?pos=go2_a4pos=a4.70413.4"}
				],
				width:1190,
				height:265,
				container:$(".ad2")[0],
				isnext:true,
				circlestyle:{
					bgColor: "transparent",
					textAlign: "center",
					bgHeight: 30,
					clWidth: 12
				}
			})
			$(".close").click(function(){
				$(".banner").hide();
			})
			$(".nav-pullbox").mouseenter(function() {
				$(".nav-pulldown").show();
			});
			$(".nav-pullbox,.nav-pulldown").mouseleave(function(){
				$(".nav-pulldown").hide();
			});
			/* 搜索切换 */
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
			/* 加载模版字符串 */
			$.getJSON("/json/index.json",function(data){
				var recomhtml = template("recommend-temp", {products: data.recommend}),
					createhtml = template("create-temp", {products: data.create}),
					firsthtml =	template("firsthand-temp", {products: data.firsthand});
					choicehtml = template("choice-temp", {products: data.choice}),
					threehtml = template("three-temp", {products: data.three}),
					sevenhtml = template("seven-temp", {products: data.seven}),
				$("#recommend").html(recomhtml);
				$("#create").html(createhtml);
				$("#firsthand").html(firsthtml);
				$("#choice").html(choicehtml);
				$("#three").html(threehtml);
				$("#seven").html(sevenhtml);
				/*添加新的轮播图*/
				$("<div></div>").addClass('choice-cou fr').prependTo('#choice');
				new CarouselLR({
					imgs:[
						{src:"/images/images/choice-cou1.jpg",href:"http://yimihui03.go2.cn"},
						{src:"/images/images/choice-cou2.jpg",href:"/lightning/"}
					],
					width:198,
					height:476,
					container:$(".choice-cou")[0],
					isnext:true,
					circlestyle:{
						bgColor: "transparent",
						textAlign: "center",
						bgHeight: 30,
						clWidth: 12
					}
				});
			})
		})
	})
})