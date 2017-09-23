var  istopshow =false;
require(["config"],function(){
	require(["jquery","cookie",,"animate","zoom"],function($,cookie){
		$(function(){
			$("#zoom1").elevateZoom({
				zoomWindowWidth:450,
           		zoomWindowHeight:450
			});
			/*cookie*/
			var islogin = $.cookie("islogin"),
				un = $.cookie("username");
			if(islogin == "true"){
				$(".head .fl").html(`你好<a href="#" class="color-or">${un}</a><a href="#">个人中心</a><a class="exit">退出</a> `);
				$(".exit").click(function(event) {
					$.cookie("islogin",false,{expires:30,path:"/"});
					location = "/index.html";
				});
			}
			
			$(".listimg img").mouseenter(function() {
				var src = $(this).prop("src");
				$(".imgbox img").prop({
					"src": src,
					"data-zoom-image": src
				})
			});
			$(".product-left").css({
				height: $(".product-right").height()+"px"
			})
			new CarouselLR({
				imgs:[
					{src:"/images/product/pro-cou1.jpg",href:"http://www.edugou.com/school/1.html"},
					{src:"/images/product/pro-cou2.jpg",href:"http://www.edugou.com/school/1.html"},
					{src:"/images/product/pro-cou3.jpg",href:"http://www.edugou.com/school/1.html"}
				],
				width:785,
				height:80,
				container:$(".ad")[0],
				isnext:true,
				circlestyle:{
					bgColor: "transparent",
					textAlign: "center",
					bgHeight: 14,
					clWidth: 8
				}
			});
			$(".footer").load("/html/model/footer.html");
			$(".top").load("/html/model/top.html",function(){
				$(".addcart").click(function(e) {
					var product = {
							name: $(".name").html(),
							price: $("#price").html(),
							phone: $(".phone").html(),
							qq: $(".qq").html(),
							site: $(".ssite").html(),
							src: $(".imgbox img").prop("src"),
							link: location
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
				});
				$(".alertclose,.know").click(function() {
					$(".tocart").css({display:"none"});
				});
			});
			$(".rightnav").load("/html/model/rightnav.html");
			$(window).on("scroll",function(){
				var scroll = $(window).scrollTop(),
					winHeight = $(window).height();
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
			});
			$(".rightnav9").click(function(){
				var _top = $(document).height();
				$("html,body").animate({scrollTop:_top},0);
			})
			$(".rightnav8").click(function(){
				$("html,body").animate({scrollTop:0},0);
			})
			$(".buy").click(function(){
				var product = {
					name: $(".name").html(),
					price: $("#price").html(),
					phone: $(".phone").html(),
					qq: $(".qq").html(),
					site: $(".ssite").html(),
					src: $(".imgbox img").prop("src"),
					builder: $(".header").html().trim(),
					color: $(".color.focus").html(),
					size: $(".stand.focus").html()
				}
				$.cookie("pro-clean",JSON.stringify(product),{expires:30,path:"/"})
			})
			$(".stand").click(function(){
				$(".stand.focus").removeClass('focus');
				$(this).addClass("focus");
			})
			$(".color").click(function(){
				$(".color.focus").removeClass('focus');
				$(this).addClass("focus");
			})
			function delay(){
				
			}
			setTimeout(delay,100);
		});
	});
});