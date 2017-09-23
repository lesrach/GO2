<?php
	header("Access-Control-Allow-Origin:*");
	$username = $_POST["username"]; // 获取用户名
	$password = $_POST["password"]; // 获取密码
	$qq = $_POST["qq"];
	$phone = $_POST["phone"];
	$email = $_POSTT["email"];
	mysql_connect("localhost:3306", "root", "");
	mysql_select_db("lesrach");
	$sql = "INSERT INTO wodesql (username, password,phone,email,qq) VALUES ('$username', '$password', '$phone', '$email','$qq')";
	$result = mysql_query($sql);
	if ($result) {
		echo '{"status":1, "message":"success"}';
	} else {
		echo '{"status":0, "message":"failed"}';
	}
	mysql_close();
?>