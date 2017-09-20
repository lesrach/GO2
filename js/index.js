var istopshow = false,
	isleftshow = false;
require(["config"],function(){
	require(["jquery","cookie","template","animate"],function($,cookie,template){
		$(function(){
			/*cookie*/
			var islogin = $.cookie("islogin"),
				un = $.cookie("username");
			if(islogin){
				$(".head-left").html(`你好<a href="#" class="color-orange">${un}</a><a href="#">个人中心</a><a class="exit">退出</a> `);
				$(".exit").click(function(event) {
					$.cookie("islogin",false,{expires:30,path:"/"});
					location = "/index.html";
				});
			}
			/*加载尾部*/
			$(".footer").load("/html/model/footer.html");
			/*添加轮播图*/
			var _width = Math.floor($(document).outerWidth());
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
			});
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
			});
			new CarouselLR({
				imgs:[
					{src:"/images/images/ad3-cou1.jpg",href:"http://http://mdst.go2.cn/?pos=go2_a4pos=a4.70416.1"},
					{src:"/images/images/ad3-cou2.jpg",href:"http://qiamei.go2.cn/?pos=go2_a4pos=a4.70415.2"},
					{src:"/images/images/ad3-cou3.jpg",href:"http://buka.go2.cn/?pos=go2_a4pos=a4.70414.3"},
					{src:"/images/images/ad3-cou4.jpg",href:"http://jqlld.go2.cn/?pos=go2_a4pos=a4.70413.4"}
				],
				width:1190,
				height:265,
				container:$(".ad3")[0],
				isnext:true,
				circlestyle:{
					bgColor: "transparent",
					textAlign: "center",
					bgHeight: 30,
					clWidth: 12
				}
			});
			new CarouselLR({
				imgs:[
					{src:"",href:""},
					{src:"",href:""},
					{src:"",href:""},
				],
				width:1190,
				height:520,
				container:$("#guess")[0],
				isnext:true,
				circlestyle:{
					bgColor: "transparent",
					textAlign: "center",
					bgHeight: 30,
					clWidth: 12
				}
			});
			$(".close").click(function(){
				$(".banner").hide();
			})
			$(".nav-pullbox").mouseenter(function() {
				$(".nav-pulldown").show();
			});
			$(".nav-pullbox,.nav-pulldown").mouseleave(function(){
				$(".nav-pulldown").hide();
			});
			/* 滚动事件 */
			$(window).on("scroll",function(){
				var scroll = $(window).scrollTop(),
					winHeight = $(window).height();
				if(scroll>winHeight/2 && !isleftshow){
					$(".leftnav").css({display:"block"});
					isleftshow = true;
				}else if(scroll<winHeight/2 && isleftshow){
					$(".leftnav").css({display:"none"});
					isleftshow = false;
				}
				if(scroll > winHeight && !istopshow){
					$(".top").stop().animate({
						top:"0"
					},200);
					istopshow = true;
				}else if(scroll<winHeight && istopshow){
					$(".top").stop().animate({
						top:"-60px"
					},200);
					istopshow = false;
				}
			}) 
			/* 左浮动点击跳楼 */
			$(".leftnav a").on("click",function(){
				var _index = $(this).index(),
					_top = $(".section-box").eq(_index).offset().top;
				$("html,body").animate({scrollTop:_top},0);
			})
			$(".rightnav9").click(function(){
				var _top = $(document).height();
				$("html,body").animate({scrollTop:_top},0);
			})
			$(".rightnav8").click(function(){
				$("html,body").animate({scrollTop:0},0);
			})
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
					furhtml = template("seven-temp", {products: data.fur}),
					goldhtml = template("seven-temp", {products: data.gold}),
					supplyhtml = template("seven-temp", {products: data.supply}),
					masshtml = template("seven-temp", {products: data.mass}),
					exchangehtml = template("seven-temp", {products: data.exchange}),
					savehtml = template("seven-temp", {products: data.save}),
					sourcehtml = template("recommend-temp", {products: data.sourcep}),
					guess1html = template("seven-temp", {products: data.guess1}),
					guess2html = template("seven-temp", {products: data.guess2}),
					guess3html = template("seven-temp", {products: data.guess3});
				$("#recommend").html(recomhtml);
				$("#create").html(createhtml);
				$("#firsthand").html(firsthtml);
				$("#choice").html(choicehtml);
				$("#three").html(threehtml);
				$("#seven").html(sevenhtml);
				$("#fur").html(furhtml);
				$("#gold").html(goldhtml);
				$("#supply").html(supplyhtml);
				$("#mass").html(masshtml);
				$("#exchange").html(exchangehtml);
				$("#save").html(savehtml);
				$("#source").html(sourcehtml);
				$("#netbox div").html(furhtml);
				$("#man").html(masshtml);
				$("#guess li").eq(4).html(guess1html);
				$("#guess li").eq(1).html(guess1html);
				$("#guess li").eq(2).html(guess2html);
				$("#guess li").eq(3).html(guess3html);
				$("#guess li").eq(0).html(guess3html);
				/*choice区块 添加新的轮播图*/
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
				/*真皮推荐区块 添加新的轮播图*/
				$("<div></div>").addClass('gold-cou fl').prependTo('#goldbox');
				new CarouselLR({
					imgs:[
						{src:"/images/images/gold-cou1.jpg",href:"http://yimihui03.go2.cn"},
						{src:"/images/images/gold-cou2.jpg",href:"/lightning/"}
					],
					width:198,
					height:476,
					container:$(".gold-cou")[0],
					isnext:true,
					circlestyle:{
						bgColor: "transparent",
						textAlign: "center",
						bgHeight: 30,
						clWidth: 12
					}
				});
				/*全部网供货源区块 添加新的轮播图*/
				$("<div></div>").addClass('net-cou fl').prependTo('#netbox');
				new CarouselLR({
					imgs:[
						{src:"/images/images/net-cou1.jpg",href:"http://yimihui03.go2.cn"},
						{src:"/images/images/net-cou2.jpg",href:"/lightning/"}
					],
					width:198,
					height:476,
					container:$(".net-cou")[0],
					isnext:true,
					circlestyle:{
						bgColor: "transparent",
						textAlign: "center",
						bgHeight: 30,
						clWidth: 12
					}
				});
				/*添加购物车*/
				$(".addcart").on("click",function() {
					var par = $(this).parents(".pro-box"),
						product = {
							name: par.find(".name a").html(),
							price: par.find(".price").html(),
							phone: par.find(".phone").html(),
							qq: par.find(".qq").html(),
							site: par.find(".site").html(),
							src: par.find("img").prop("src"),
							link: par.find("img").parent().prop("href")
						},
					products = $.cookie("products") || [];
					if(!products.push){
						products = JSON.parse(products);
					}
					for(var i=0; i<products.length; i++){
						if(products[i].name == product.name){
							$(".tocart").css({display:"block"});
							$(".tocart p").html('这件商品已经加入进货单！<a href="/html/cart.html" title="">查看进货单&gt&gt&gt</a>');
							return;
						}
					}
					products.push(product);
					$.cookie("products",JSON.stringify(products),{path: "/" ,expires: 30});
					$(".tocart").css({display:"block"});
				});
				$(".alertclose,.know").click(function() {
					$(".tocart").css({display:"none"});
				});
				$("#guess .pages div").css({
					width: "60px",
					height: "12px",
					borderRadius: "6px"
				});
				/*添加图片滑动框*/
				$(".pro-box .imgbox").mouseenter(function() {
					$(this).find(".share").animate({
						bottom: "0"
					},200)
				});
				$(".pro-box .imgbox").mouseleave(function() {
					$(this).find(".share").animate({
						bottom: "-30"
					},200)
				});
			})
			/*******************************模板加载完毕*****************************/
			/*三日&七日切换*/
			$(".choice2 a").eq(0).mouseenter(function(){
				$(this).prop({class:"active"}).next().prop({class:"normol"});
				$("#seven").css({display:"none"});
				$("#three").css({display:"block"});
			})
			$(".choice2 a").eq(1).mouseenter(function(){
				$(this).prop({class:"active"}).prev().prop({class:"normol"});
				$("#three").css({display:"none"});
				$("#seven").css({display:"block"});
			})
			/*真皮&金牌&厂家切换*/
			$(".gold a").eq(0).mouseenter(function(){
				$(this).prop({class:"active"}).next().prop({class:"normol"})
											  .next().prop({class:"normol"});
				$("#fur").css({display:"block"});
				$("#gold,#supply").css({display:"none"});
			})
			$(".gold a").eq(1).mouseenter(function(){
				$(this).prop({class:"active"}).prev().prop({class:"normol"})
											  .end().next().prop({class:"normol"});
				$("#gold").css({display:"block"});
				$("#fur,#supply").css({display:"none"});
			})
			$(".gold a").eq(2).mouseenter(function(){
				$(this).prop({class:"active"}).prev().prop({class:"normol"})
											  .prev().prop({class:"normol"});
				$("#supply").css({display:"block"});
				$("#fur,#gold").css({display:"none"});
			})
			/*有大货&无忧退货&库存切换*/
			$(".mass a").eq(0).mouseenter(function(){
				$(this).prop({class:"active"}).next().prop({class:"normol"})
											  .next().prop({class:"normol"});
				$("#mass").css({display:"block"});
				$("#exchange,#save").css({display:"none"});
			})
			$(".mass a").eq(1).mouseenter(function(){
				$(this).prop({class:"active"}).prev().prop({class:"normol"})
											  .end().next().prop({class:"normol"});
				$("#exchange").css({display:"block"});
				$("#mass,#save").css({display:"none"});
			})
			$(".mass a").eq(2).mouseenter(function(){
				$(this).prop({class:"active"}).prev().prop({class:"normol"})
											  .prev().prop({class:"normol"});
				$("#save").css({display:"block"});
				$("#mass,#exchange").css({display:"none"});
			})
			/*全部网供货源切换*/
			$(".net a").mouseenter(function(){
				$(".net").find(".active").prop({class:"normol"});
				$(this).prop({class:"active"});
				$("#netbox").children().not(".net-cou").css({display:"none"});
				var that = this;
				$(".net a").each(function(index,curr){
					if( that == curr){
						console.log(index);
						$("#netbox").children().not(".net-cou").eq(index).css({display:"block"});
					}
				})
			})
		})
	})
})