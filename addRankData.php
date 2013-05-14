<?php
	header("content-type:text/html; charset=utf-8");
	$name = $_REQUEST['name'];
	$time = $_REQUEST['time'];
	$type = $_REQUEST['type'];
	$mark = $_REQUEST['mark'];
	$date = date("Y-m-d H:i:s");

	$con = mysql_connect("localhost","supersky07","supersky07");
	if (!$con){
	  	die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("supersky07", $con);
	mysql_set_charset('utf8',$con);

	$sql = "insert into rank (name,time,date,ip,type,mark,remark) values ('".$name."', ".$time.", '".$date."','1.1.1.1', '".$type."', '".$mark."','test')";
	
	if (!mysql_query($sql,$con)){
	  	die('Error: ' . mysql_error());
	}

	mysql_close($con);

	echo 'Success';
?>