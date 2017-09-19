var  istopshow =false;
require(["config"],function(){
	require(["jquery","cookie",,"animate","zoom"],function($,cookie){
		$(function(){
			$("#zoom1").elevateZoom({
				zoomWindowWidth:450,
           		zoomWindowHeight:450
			});
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
			$(".top").load("/html/model/top.html");
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
			function delay(){
				$(".addcart").on("click",function() {
					var par = $(this).parents(".pro-box"),
						product = {
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
							return;
						}
					}
					products.push(product);
					$.cookie("products",JSON.stringify(products),{path: "/" ,expires: 30});
					alert("success");
				});
			}
			setTimeout(delay,100);
		});
	});
});