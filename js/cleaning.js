require(["config"],function(){
	require(["jquery","cookie"],function($,cookie){
		$(function(){
			$(".content").css({
				height: $(window).height()-137+"px"
			})
			window.onresize = function(){
				$(".footer").css({
					width: $(".head").width()-46+"px"
				})
				$(".content").css({
					height: $(window).height()-137+"px"
				})
			}
			/*cookie操作*/
			var pro = JSON.parse($.cookie("pro-clean"));
			console.log( pro);
			$(".username").html($.cookie("username"));
			$(".pro-name").prop("value",pro.name);
			$(".color").prop("value",pro.color);
			$(".size").prop("value",pro.size);
			$("input.num").prop("value",1);
			$(".single-price").prop("value",pro.price);
			$(".name").prop("value",pro.builder);
			$(".phone").prop("value",pro.phone);
			$(".site").prop("value",pro.site);
			/*表单*/
			$(".must").blur(function(){
				if(this.value ==""){
					$(this).addClass("error");
				}
				if(this.value != ""){
					$(this).removeClass('error');
				}
			})
			$(".price,.num,.phone,.re-phone,.single-price").keyup(function(){
				var va = $(this).val();
				va = va.replace(/[^0-9]/g,"");
				this.value = va;
			})
			$(".num").blur(function(){
				$(".pro-num").html(this.value);
				$(".price,.count").html(this.value*$(".single-price").val())
			})
		})
	});
});
	
