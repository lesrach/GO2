var code,codesrc;
require(["config"],function(){
	require(["jquery","cookie"],function($,cookie){
		$(function(){
			$("#login-username").focus(function(){
				this.className = "focus";
				$(this).prev()[0].className = "name-img splite splite-hfocus focus";
			})
			$("#login-username").blur(function(){
				this.className = "";
				$(this).prev()[0].className = "name-img splite splite-hnow";
				if(this.value !=""){
					$(this).nextAll(".login-info").text("");
				}
			})
			$("#login-password").focus(function(){
				this.className = "focus";
				$(this).prev()[0].className = "name-img splite splite-pfocus focus";
			})
			$("#login-password").blur(function(){
				this.className = "";
				$(this).prev()[0].className = "name-img splite splite-pnow";
				if(this.value !=""){
					$(this).nextAll(".login-info").text("");
				}
			})
			jugcode();
			setTimeout('$(".codeimg")[0].innerHTML="<img src="+ codesrc+">"',1000);
			$("#changecode").click(function(){
				jugcode();
				$(".codeimg")[0].innerHTML="<img src="+ codesrc+">";
			})
			$(".login-code").blur(function(){
				if(this.value != code){
					$(".login-code")[0].className = "login-code error"; 
					$(this).nextAll(".login-info")[0].innerHTML = "验证码错误";
				} else{
					$(".login-code")[0].className = "login-code"; 
					$(this).nextAll(".login-info")[0].innerHTML = "";
				}
			})
			$("#login-sub").click(function(e){
				e.preventDefault();
				var exit = false;
				if($("#login-username")[0].value ==""){
					$("#login-username").nextAll(".login-info")[0].innerHTML= "请输入用户名";
					$("#login-username")[0].className = "error"; 
					$("#login-username").prev()[0].className = "name-img splite splite-hnow error"; 
				}
				if($("#login-password")[0].value ==""){
					$("#login-password").nextAll(".login-info")[0].innerHTML= "请输入密码";
					$("#login-password")[0].className = "error"; 
					$("#login-password").prev()[0].className = "name-img splite splite-pnow error"; 
				}
				if($(".login-code")[0].value ==""){
					$(".login-code").nextAll(".login-info")[0].innerHTML= "请输入验证码";
					$(".login-code")[0].className = "login-code error"; 
				}
				$(".login-info").each(function(index,curr){
					if(curr.innerHTML!=""){
						exit = true;
					}
				})
				if(exit){
					return;
				}
				console.log("send");
				$.ajax({
					url: "/php/login.php",
					type: "get",
					dataType:"json",
					data: "username=" +  $("#login-username").val() +"&password=" + $("#login-password").val(),
					success: function(data){
						console.log(data);
						if(data.status == 1){
							$.cookie("islogin",true,{expires:30,path:"/"});
							$.cookie("username",$("#login-username").val(),{expires:30,path:"/"});
							location = "/index.html";
						}
					}
				})
			})
		})

		function jugcode(){
			$.ajax({
				type:"get",
				url:"http://route.showapi.com/26-4",
				data:{
					showapi_sign:"a2bede57b62649b2bc42a1c043b07dab",
					showapi_appid:"45024",
				},
				success: function(data){
					if(data.showapi_res_code ==0 ){
						var data = data.showapi_res_body;
						code = data.text;
						codesrc = data.img_path;
					}
				}
			})
		}
	})
})
