require(["config"],function(){
	require(["jquery","cookie","template"],function($,cookie,template){
		$(function(){
			var islogin = $.cookie("islogin");
			// if(!islogin){
			// 	location = "/index.html";
			// }
			$(".username").html($.cookie("username"));
			$(".phone").html($.cookie("phone"));
			function setDate(){
				var date = new Date();
				$(".year").text(date.getFullYear());
				$(".month").text(add2(date.getMonth()));
				$(".date").text(add2(date.getDate()));
				$(".hour").text(add2(date.getHours()));
				$(".minute").text(add2(date.getMinutes()));
				$(".second").text(add2(date.getSeconds()));
			}
			setDate();
			setInterval(setDate,1000);
			function add2(str){
				str = str.toFixed(0);
				if(str.length<2){
					str = "0"+str;
				}
				return str;
			}
			/*加载购货单*/
			var products = $.cookie("products");
			if(typeof products === "undefined"){
				location = "/index.html";
			}
			_products = JSON.parse(products);
			var  _protext = template("pro-temp",{products:_products});
			$("#cartbox").html(_protext);
			$("#all").html($(".product").length);
			/*设置左边栏高度*/
			if($(".right").height()>$(".list").height()){
				$(".list").css({
					height: $(".right").height() +"px"
				})
			}
			/*全选*/
			$("#selectall").click(function(){
				var checked = $(this).prop("checked");
					$(".choose").prop("checked",checked);
			})
			$(".choose").click(function(){
				$("#selectall").prop("checked",($(".choose").length == $(".choose:checked").length));
			})
			/*购货单操作*/
			$(".clean").click(function(){
				$(".alertbox").css({display:"block"});
				$(".info").html("确定清空进货单？");
			});
			$("#deleteall").click(function() {
				$(".alertbox").css({display:"block"});
				if($(".choose:checked").length ==0){
					$(".info").html("请选择要删除的项目");
					$(".cancel").css({display:"none"});
				} else{
					$(".info").html("确定批量删除？");
				}
			});
			$(".al-cancel,.cancel").click(function() {
				$(".alertbox").css({display:"none"});
			});
			$(".sure").click(function() {
				var html = $(".info").html();
				if(html == "确定清空进货单？"){
					$.cookie("products","",{expires:30,path:"/"});
					(".product").remove();
				} else if(html == "请选择要删除的项目"){
					$(".alertbox").css({display:"none"});
				} else if(html == "确定批量删除？"){
					$(".choose:checked").parents(".product").find(".name").each(function(index, el) {
						for(var i=0; i<_products.length ;i++){
							console.log(el);
							if(_products[i].name == $(el).html() ){
								_products.splice(i,1);
							}
						}
					});
					$.cookie("products",JSON.stringify(_products),{expires:30,path:"/"});
					$(".choose:checked").parents(".product").remove();
				}
				$(".alertbox").css({display:"none"});
			});
		})	
	})
})