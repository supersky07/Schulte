<?php
	header("content-type:text/html; charset=utf-8");
	$type = $_REQUEST['type'];
	$jsonArr = array();

	$con = mysql_connect("localhost","supersky07","supersky07");
	if (!$con){
	  	die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("supersky07", $con);
	mysql_set_charset('utf8',$con);

	$result = mysql_query("SELECT * FROM rank where type = '".$type."' order by time asc limit 10");
	$index = 1;
	while($row = mysql_fetch_array($result)){
	  	$name = $row['name'];
	  	$time = $row['time'];
	  	$date = $row['date'];
	  	$type = $row['type'];
	  	$mark = $row['mark'];
	  	
	  	$temp_json_arr = array("rank"=>$index,"date"=>$date, "time"=>$time, "name"=>$name, "type"=>$type, "mark"=>$mark);
	  	array_push($jsonArr, $temp_json_arr);
	  	$index++;
	}

	mysql_close($con);
	echo json_encode($jsonArr);
?>