require(["config"],function(){
	require(["jquery"],function(){
		$(function(){
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
		})
	})
})