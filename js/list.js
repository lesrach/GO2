var istopshow = false;
require(["config"],function(){
	require(["jquery","cookie","template","animate"],function($,cookie,template){
		$(function(){
			$(".head").load("/html/model/header.html",function(){
				/*cookie*/
				var islogin = $.cookie("islogin"),
					un = $.cookie("username");
				if(islogin == "true"){
					$(".head-left").html(`你好<a href="#" class="color-or">${un}</a><a href="#">个人中心</a><a class="exit">退出</a> `);
					$(".exit").click(function(event) {
						$.cookie("islogin",false,{expires:30,path:"/"});
						location = "/index.html";
					});
				}
			});
			$(".rightnav").load("/html/model/rightnav.html",function(){
				$(".rightnav9").click(function(){
					var _top = $(document).height();
					$("html,body").animate({scrollTop:_top},0);
				})
				$(".rightnav8").click(function(){
					$("html,body").animate({scrollTop:0},0);
				})
			});
			$(".logo-search").load("/html/model/logosearch.html");
			$(".footnav").load("/html/model/footnav.html");
			$(".footer").load("/html/model/footer.html");
			var _width = Math.floor($(document).outerWidth());

			new CarouselLR({
				imgs:[
					{src:"/images/banner1.jpg",href:"http://www.go2.cn/gold/"},
					{src:"/images/banner2.jpg",href:"http://www.gogoo.cn/index/fruit"}
				],
				width:_width,
				height:90,
				container:$(".ad1")[0],
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
			/*处理滚动相关事件*/
			$(window).scroll(function(){
				var wHeight = $(window).height(),
					scroll = $(window).scrollTop();
				if (!istopshow && scroll>wHeight){
					$(".top").animate({top:0});
					istopshow = true;
				} else if(istopshow && scroll<wHeight) {
					$(".top").animate({top:"-60px"});
					istopshow = false;
				}
			})
			
			/*模板加载*/
			$.getJSON("/json/list.json",function(data){
				data = data.splice(0,30);
				var html = template("template",{products:data});
				$(".contentbox .main").html(html);
				ayxload();
			})
			$.getJSON("/json/index.json",function(data){
				var guess1html = template("guess-temp", {products: data.guess1}),
					guess2html = template("guess-temp", {products: data.guess2}),
					guess3html = template("guess-temp", {products: data.guess3});
				$("#guess li").eq(4).html(guess1html);
				$("#guess li").eq(1).html(guess1html);
				$("#guess li").eq(2).html(guess2html);
				$("#guess li").eq(3).html(guess3html);
				$("#guess li").eq(0).html(guess3html);
				$("#guess .pages div").css({
					width: "60px",
					height: "12px",
					borderRadius: "6px"
				});
				/*模拟进入商品页*/
				$(".pro-box").find("img").parent().click(function(e) {
					e.preventDefault();
					console.log(1);
					location = "/html/product.html";
				});
				/*模拟进入列表页*/
				$(".section,.find").find("a").click(function(e) {
					e.preventDefault();
					location = "/html/list.html";
				});
				/*刷新排序*/
			})

			$(".all").click(function(event) {
				$.getJSON("/json/list.json",function(data){
					data = data.splice(0,30);
					var html = template("template",{products:data});
					$(".contentbox .main").html(html);
					ayxload();
				})
			});
			$(".people").click(function(event) {
				$.getJSON("/json/list.json",function(data){
					data.sort(function(a,b){
						return parseInt(b.hot)-parseInt(a.hot);
					})
					data = data.splice(0,30);
					var html = template("template",{products:data});
					$(".contentbox .main").html(html);
					ayxload();
				})
			});
			$(".fightpower").click(function(event) {
				$.getJSON("/json/list.json",function(data){
					data.sort(function(a,b){
						return parseInt(b.fight)-parseInt(a.fight);
					})
					data = data.splice(0,30);
					var html = template("template",{products:data});
					$(".contentbox .main").html(html);
					ayxload();
				})
			});
			$(".cheap").click(function(event) {
				$.getJSON("/json/list.json",function(data){
					data.sort(function(a,b){
						return parseInt(a.price)-parseInt(b.price);
					})
					data = data.splice(0,30);
					var html = template("template",{products:data});
					$(".contentbox .main").html(html);
					ayxload();
				})
			});
			$(".new").click(function(event) {
				$.getJSON("/json/list.json",function(data){
					data.reverse();
					data = data.splice(0,30);
					var html = template("template",{products:data});
					$(".contentbox .main").html(html);
					ayxload();
				})
			});
			/*价格区间处理*/
			$(".minprice,.maxprice").keyup(function(){
				var text = this.value;
				text = text.replace(/[^0-9]/g,"");
				this.value = text;
			})
			$(".sub").click(function(event) {
				event.preventDefault();
				var min = parseInt($(".minprice").val()),
					max = parseInt($(".maxprice").val());
				if(max>min){
					$.getJSON("/json/list.json",function(data){
						data = data.filter(function(datas){
							return (datas.price<max && datas.price>min);
						});
						if(data.length == 0){
							$(".contentbox .main").html("没有你需要的商品，请重新设定");
							return;
						}
						data = data.splice(0,30);
						var html = template("template",{products:data});
						$(".contentbox .main").html(html);
						ayxload();
					})
				}
			});
			/*异步加载后绑定事件*/
			function ayxload(){
				$(".imgbox").mouseenter(function(event) {
					$(this).find(".share").animate({bottom:0},200);
				});
				$(".imgbox").mouseleave(function(event) {
					$(this).find(".share").animate({bottom:"-30px"},200);
				});
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
			}
		})
	})
})