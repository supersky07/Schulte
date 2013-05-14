<!DOCTYPE>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>舒尔特表</title>
		<link href="css/style.css" type="text/css" rel="stylesheet" charset="utf-8" />
		<script type="text/javascript" src="http://lib.sinaapp.com/js/jquery/1.8/jquery.min.js"></script>
	</head>
	<body>
		<div class="container">
			<input type="hidden" id="time" value="0.00">
			<div class="type">
				<div class="title">类型选择</div>
				<div class="item">
					<input type="radio" name="type" value="num1" id="num1">
					<span class="chooseType">数字1-16</span>
				</div>
				<div class="item">
					<input type="radio" name="type" value="num2" checked="checked" id="num2">
					<span class="chooseType">数字1-25</span>
				</div>
				<div class="item">
					<input type="radio" name="type" value="num3" id="num3">
					<span class="chooseType">数字1-36</span>
				</div>
				<div class="item">
					<input type="radio" name="type" value="letter1" id="letter1">
					<span class="chooseType">小写英文字母</span>
				</div>
				<div class="item">
					<input type="radio" name="type" value="letter2" id="letter2">
					<span class="chooseType">大写英文字母</span>
				</div>
				<div class="item">
					<input type="radio" name="type" value="dynasty" id="dynasty">
					<span class="chooseType">中国历史朝代</span>
				</div>
				<div class="item">
					<input type="radio" name="type" value="elements1" id="elements1">
					<span class="chooseType">元素前25（汉字）</span>
				</div>
				<div class="item">
					<input type="radio" name="type" value="elements2" id="elements2">
					<span class="chooseType">元素前25（字母）</span>
				</div>
			</div>
			<div class="setting">
				<div class="title">参数设置</div>
				<div class="item">
					<input type="checkbox" checked="checked" id="changeColor">
					<span class="changeSetting">渐进颜色</span>
				</div>
				<div class="item">
					<input type="checkbox" id="mark">
					<span class="changeSetting">点击后标记</span>
				</div>
			</div>

			<canvas id="timeCanvas" width="100" height="50"></canvas>
			<div class="operateZone">
				<input type="button" value="重绘" id="reDraw" class="btn">
			</div>
			<canvas id="myCanvas" width="620" height="620"></canvas>
			<canvas id="myCanvas1" width="620" height="620"></canvas>
			<canvas id="myCanvas2" width="620" height="620"></canvas>

			<div class="rank">
				<div class="title">排行榜前10</div>
				<canvas id="rankCanvas" width="200" height="370"></canvas>
			</div>
		</div>
	</body>
	<script type="text/javascript" src="js/shulte.js"></script>
</html>