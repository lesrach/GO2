<?php
	header ("Access-Control-Allow-Origin: *");
	$un = $_REQUEST["username"];
	$pw = $_REQUEST["password"];
	mysql_connect("localhost:3306", "root", "");
	mysql_select_db("lesrach");
	$sql = "SELECT * FROM wodesql WHERE username = '$un' AND password = '$pw'";
	$result = mysql_query($sql);
	if ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
		echo '{"status":1, "message":"success", "data":'. json_encode($row) .'}';
	} else {
		echo '{"status":0, "message":"failed", "data":{}}';
	}
	mysql_close();
?>