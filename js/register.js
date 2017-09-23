var code,
	codesrc;//验证码
require(["config"],function(){
	require(["jquery"],function(){
		$(function(){
			$(".buyer").show();
			jugcode();
			$(".buyer").find(".checkimg")[0].innerHTML="<img src="+ codesrc+">";
			$($(".rolebox")[0]).click(function(){
				if($(".buyer").css("display") =="none"){
					$(".rolebox").attr({class:"rolebox"});
					$(this).attr({class:"rolebox selected"})
					$(".buyer").css("display","block");
					$(".provider,.agent").css("display","none");
					jugcode();
					$(".buyer").find(".checkimg")[0].innerHTML="<img src="+ codesrc+">";
				}
			})
			$($(".rolebox")[1]).click(function(){
				if($(".provider").css("display") =="none"){
					$(".rolebox").attr({class:"rolebox"});
					$(this).attr({class:"rolebox selected"})
					$(".provider").css({display:"block"});
					$(".buyer,.agent").css({display:"none"});
					jugcode();
					$(".provider").find(".checkimg")[0].innerHTML="<img src="+ codesrc+">";
				}
			})
			$($(".rolebox")[2]).click(function(){
				if($(".agent").css("display") =="none"){
					$(".rolebox").attr({class:"rolebox"});
					$(this).attr({class:"rolebox selected"})
					$(".agent").css({display:"block"});
					$(".provider,.buyer").css({display:"none"});
					jugcode();
					$(".agent").find(".checkimg")[0].innerHTML="<img src="+ codesrc+">";
				}
			})
			$("#provider-rule").click(function(){
				var turn = $("#provider-rule").prop("checked")
				$(".recruit").prop("checked",turn);
			})
			$(".recruit").click(function(){
				var len = $(".recruit:checked").length;
				$("#provider-rule").prop("checked",len == 3);
			})
			$("input[type='text'],input[type='password']").click(function(){
				$(this).prop("class","focus");
			})
			$("input[type='text'],input[type='password']").blur(function(){
				$(this).prop("class","");
			})
			//////////验证
			//用户名
			$("#buyer-username,#provider-username,#agent-username").blur(function(){
				var reg = /^([A-Za-z0-9]|[\u4e00-\u9fa5]){2,20}$/ ,
					text = this.value;
				if(!reg.test(text)){
					$(this).next(".info")[0].innerHTML = "<span class='fr color-red'>用户名只能包含汉字、数字或字母，且长度为2到20位<span>"
					this.className = "error";
				} else{
					$(this).next(".info")[0].innerHTML = "";
					this.className = "";
				}
				$.ajax({
					url:"http://localhost/go2/php/check.php",
					type:"get",
					data:"username="+text,
					dataType:"json",
					success:function(data){
						console.log(data);
						if(data.status == 0){
							$(this).next(".info")[0].innerHTML = "该用户已存在"
						}
					}
				})
			})
			//密码
			$("#buyer-password,#provider-password,#agent-password").blur(function(){
				var reg = /^[A-Za-z0-9]{6,20}$/,
					text = this.value;
				if(!reg.test(text)){
					$(this).next(".info")[0].innerHTML = "<span class='fr color-red'>请输入6-20位字母或数字的密码<span>"
					this.className = "error";
				} else{
					$(this).next(".info")[0].innerHTML = "";
					this.className = "";
				}
			})
			//验证密码
			$("#buyer-repassword,#provider-repassword,#agent-password").blur(function(){
				var text = this.value,
					pass = $(this).parent().prev().children("input")[0].value,
					reg = /^[A-Za-z0-9]{6,20}$/;
				if(!reg.test(text)){
					$(this).next(".info")[0].innerHTML = "<span class='fr color-red'>请输入6-20位字母或数字的密码<span>"
					this.className = "error";
				} else{
					$(this).next(".info")[0].innerHTML = "";
					this.className = "";
					if(pass != text){
						$(this).next(".info")[0].innerHTML = "<span class='fr color-red'>两次输入的密码不相同，请检查<span>"
						this.className = "error";
					}else{
						$(this).next(".info")[0].innerHTML = "";
						this.className = "";
					}
				}
				
			})
			
			
			//手机号码
			$("#buyer-phone,#provider-phone,#agent-phone").blur(function(){
				var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
					text = this.value;
				if(!reg.test(text)){
					$(this).next(".info")[0].innerHTML = "<span class='fr color-red'>请正确填写您的手机号码<span>"
					this.className = "error";
				} else{
					$(this).next(".info")[0].innerHTML = "";
					this.className = "";
				}
			})
			//qq号码
			$("#buyer-qq,#provider-qq,#agent-qq").blur(function(){
				var reg = /^\d{5,11}$/,
					text = this.value;
				if(!reg.test(text)){
					$(this).next(".info")[0].innerHTML = "<span class='fr color-red'>请输入5-11位的QQ号码<span>"
					this.className = "error";
				} else{
					$(this).next(".info")[0].innerHTML = "";
					this.className = "";
				}
			})
			//邮箱地址
			$("#buyer-email,#provider-email,#agent-email").blur(function(){
				var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
					text = this.value;
				if(!reg.test(text)){
					$(this).next(".info")[0].innerHTML = "<span class='fr color-red'>请输入正确的邮箱格式<span>"
					this.className = "error";
				} else{
					$(this).next(".info")[0].innerHTML = "";
					this.className = "";
				}
			})
			//GO2店铺地址
			$("#provider-GO2shop").blur(function(){
				var reg = /^[A-Za-z0-9]{6,16}*$/,
					text = this.value;
				if(!reg.test(text)){
					$(this).next(".info")[0].innerHTML = "<span class='fr color-red'>请输入正确的邮箱格式<span>"
					this.className = "error";
				} else{
					$(this).next(".info")[0].innerHTML = "";
					this.className = "";
				}
			})
			//联系人
			$("#provider-connect,#agent-connect").blur(function(){
				var reg = /^[\u4e00-\u9fa5]{2,}*$/,
					text = this.value;
				if(!reg.test(text)){
					$(this).next(".info")[0].innerHTML = "<span class='fr color-red'>联系人只能是汉字，且至少2位<span>"
					this.className = "error";
				} else{
					$(this).next(".info")[0].innerHTML = "";
					this.className = "";
				}
			})
			//提交
			$("#buyer-sub,#provider-sub,#agent-sub").click(function(e){
				e.preventDefault();
				var stop = false;
				var content = $(this).parents("form"),
					must = $(".must",content).parent().next("input"),
					info = $(".info",content),
					par = $(this).parents("form"),
				    username = par.find('input[name="username"]').val(),
				    password = par.find('input[name="password"]').val(),
				    qq = par.find('input[name="qq"]').val(),
				    email = par.find('input[name="email"]').val(),
				    phone = par.find('input[name="phone"]').val(),
				    senddata = "username="+username+"&password=" + password +"&email=" + email +"&phone=" + phone +"&qq=" + qq;;
				must.each(function(index,curr){
					if(curr.value == ""){
						$(this).nextAll(".info")[0].innerHTML = "<span class='fr color-red'>请填写必填选项<span>"
						this.className = "error";
						
					}
				})
				info.each(function(index,curr){
					if(curr.innerHTML!= ""){
						e.preventDefault();
						stop = true;
					}
				})
				if(!par.find("input[name='agreement']").prop("checked")){
					stop = true;
				}
				if(stop){
					return;
				}
				$.ajax({
					url:"/php/register.php",
					type:"post",
					data: senddata,
					dataType:"json",
					success:function(data){
						console.log(data);
					}
				})
			})
			验证码
			$("#buyer-check,#provider-check,#agent-check").blur(function(){
				if(this.value != code){
					$(this).nextAll(".info")[0].innerHTML = "<span class='fr color-red'>验证码错误<span>"
					this.className = "error";
				} else{
					$(this).nextAll(".info")[0].innerHTML = "";
					this.className = "";
				}
			})
			更换验证码
			$(".changeimg").click(function(){
				jugcode();
				$(this).prev()[0].innerHTML = "<img src="+ codesrc+">";
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
			$(".getnote").click(function(e){
				e.preventDefault();
			})
		})
	})
})
