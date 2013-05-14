//+++++常量定义区++++++++++++++++++++++++++++++++
var c = document.getElementById("myCanvas");
var c1 = document.getElementById("myCanvas1");
var c2 = document.getElementById("myCanvas2");
var timeC = document.getElementById("timeCanvas");
var rankC = document.getElementById("rankCanvas");
var ctx = c.getContext("2d");
var ctx1 = c1.getContext("2d");
var ctx2 = c2.getContext("2d");
var timeContext = timeC.getContext("2d");
var rankContext = rankC.getContext("2d");

var valuesObj = {
	'elements1': ['氢','氦','锂','铍','硼','碳','氮','氧','氟','氖','钠','镁','铝','硅','磷','硫'],
	'elements2': ['H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S'],
	'letter1': ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y'],
	'letter2': ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y'],
	'dynasty': ['尧','舜','禹','夏朝','商朝','西周','春秋','战国','秦朝','西汉','东汉','三国','西晋','东晋','南朝','北朝','隋朝','唐朝','五代','宋朝','元朝','明朝','清朝','民国','中国'],
	'num1': ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'],
	'num2': ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25'],
	'num3': ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36'],
};
var dataObj = {
	'elements1':{
		width_num: 4,
		height_num: 4,
		height: 130,
		width: 130,
		font_size : 80
	},
	'elements2':{
		width_num: 4,
		height_num: 4,
		height: 130,
		width: 130,
		font_size : 70
	},
	'num1': {
		width_num: 4,
		height_num: 4,
		height: 130,
		width: 130,
		font_size : 80
	},
	'num2': {
		width_num: 5,
		height_num: 5,
		height: 110,
		width: 110,
		font_size : 70
	},
	'num3': {
		width_num: 6,
		height_num: 6,
		height: 90,
		width: 90,
		font_size : 60
	},
	'letter1': {
		width_num: 5,
		height_num: 5,
		height: 110,
		width: 110,
		font_size : 70
	},
	'letter2': {
		width_num: 5,
		height_num: 5,
		height: 110,
		width: 110,
		font_size : 70
	},
	'dynasty': {
		width_num: 5,
		height_num: 5,
		height: 120,
		width: 120,
		font_size : 50
	}
};
//-----------------------------------------------

//+++++++变量定义区++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var temp_left, temp_top, index = 0, valueArr = [], numFlagArr = [], valueFlagObj = {}, t;
var canvasArr = [];
var stack = [];

var setting = {
	variableColor: true,
	mark: false
};

var opts = {
	rate: 1,
	item_width : 110, 			//用户不可改
	item_height : 110,			//用户不可改
	item_spacing : 5,			//恒定
	item_total_width : 620,		//用户不可改
	item_total_height : 620,	//用户不可改
	container_width: 700,		//用户不可改
	container_height: 700,		//用户不可改
	item_width_num: 5, 			//用户不可改		
	item_height_num: 5, 		//用户不可改			
	item_total_num: 25,			//用户不可改
	type : 'num2'			//用户可改，系统根据用户更改再更改上面
};
//-------------------------------------------------------------------------------------	

//++++++++++DOM事件绑定+++++++++++++++++++++++++++++++++++++++++++++++
var bindDom = function (){
	$('#myCanvas2').click(function(ev){
		var mouseX, mouseY, indexI, indexJ;
		if(ev.layerX || ev.layerX==0){
			mouseX = ev.layerX;
			mouseY = ev.layerY;
		}else if(ev.offsetX || ev.offsetX==0){
			mouseX = ev.offsetX;
			mouseY = ev.offsetY;
		}

		indexI = parseInt(mouseY / (opts.item_height + opts.item_spacing));
		indexJ = parseInt(mouseX / (opts.item_width + opts.item_spacing));

		pubFuns.setShadow(indexI, indexJ, valueArr, canvasArr[indexI][indexJ]);
	});

	$('#reDraw').click(function(){
		initOpts();
		initCanvas();
		pubFuns.endTime();
		pubFuns.updateRankListAjax();
		document.getElementById('time').value = 0.00;
	});

	//++++++++++++++类型选择的radio+++++++++++
	$(':radio[name="type"]').click(function(){
		bindDomFuncs.changeType(this.value);
	});
	$('.chooseType').click(function(){
		var temp = $(this).siblings(":input");
		temp.attr('checked','checked');
		bindDomFuncs.changeType(temp.val());
	});
	//-----------------------------------------

	//++++++++参数设置+++++++++++++++++++++++++
	$(':checkbox').click(function(){
		var temp = $(this);
		bindDomFuncs.bridge(temp);
	});
	$('.changeSetting').click(function(){
		var temp = $(this).siblings(":input");

		if(t){
		}else{
			temp.attr('checked', temp.attr('checked') == "checked" ? false:true);
			bindDomFuncs.bridge(temp);
		}
	});
	//-----------------------------------------
};
//--------------------------------------------------------------------

//+++++++++++DOM事件绑定的回调函数++++++++++++++++++
var bindDomFuncs = {
	bridge : function(temp){
		if(temp.attr('id') == 'changeColor'){
			bindDomFuncs.changeColor(temp.attr('checked') == "checked");
		}else if(temp.attr('id') == 'mark'){
			bindDomFuncs.changeMark(temp.attr('checked') == "checked");
		}
	},
	changeType : function(value){
		opts.type = value;
		
		//因为要改变大小，所以先清除canvas原内容
		ctx.clearRect(0, 0, opts.item_total_width,  opts.item_total_height);
		ctx1.clearRect(0, 0, opts.item_total_width, opts.item_total_height);
		ctx2.clearRect(0, 0, opts.item_total_width, opts.item_total_height);
		
		$("#reDraw").trigger("click");
	},
	changeColor : function(flag){
		setting.variableColor = flag;
		$("#reDraw").trigger("click");
	},
	changeMark : function(flag){
		setting.mark = flag;
	}
};
//---------------------------------------------------

//++++初始化参数++++++++++++++++++++++++
var initOpts = function(){
	if (screen.width <= 640){
		opts.rate = 0.7;
		opts.container_width = 580;
	}else if (screen.width > 640 && screen.width <= 800){
		opts.rate = 0.8;
		opts.container_width = 630;
	}else if (screen.width > 800 && screen.width <= 1024){
		opts.rate = 0.9;
		opts.container_width = 630;
	}else{
	}

	//根据每行数量初始化 item宽度和高度
	opts.item_width_num = dataObj[opts.type].width_num;
	opts.item_height_num = dataObj[opts.type].height_num;
	opts.item_width = dataObj[opts.type].width * opts.rate;
	opts.item_height = dataObj[opts.type].height * opts.rate;

	opts.item_total_width = opts.item_width * opts.item_width_num + opts.item_spacing * (opts.item_width_num - 1);
	opts.item_total_height = opts.item_height * opts.item_height_num + opts.item_spacing * (opts.item_height_num - 1);

	opts.container_width = opts.item_width * opts.item_width_num + opts.item_spacing * (opts.item_width_num - 1) + 80;
	opts.container_height = opts.item_height * opts.item_height_num + opts.item_spacing * (opts.item_height_num - 1) + 80; 
	opts.item_total_num = opts.item_width_num * opts.item_height_num;

	stack.length = 0;
};
//----------------------------------------------

//+++++Canvas初始化方法++++++++++++++++++++++++++++++++++++++++++++++
var initCanvas = function (){
	var tempValueArr = [];

	//设置容器、canvas的属性值
	$('.container').css('width', opts.container_width);
	$('.container').css('height', opts.container_height);
	$('.operateZone').css('left', opts.container_width / 2 + 50);
	$('#timeCanvas').css('left', opts.container_width / 2 - 100);

	//清除canvas内容
	ctx.clearRect(0, 0, opts.item_total_width,  opts.item_total_height);
	ctx1.clearRect(0, 0, opts.item_total_width, opts.item_total_height);
	ctx2.clearRect(0, 0, opts.item_total_width, opts.item_total_height);

	//初始化数字数组和数字标识数组
	valueArr = valuesObj[opts.type].slice(0);
	tempValueArr = valuesObj[opts.type].slice(0);

	for(var i = 0;i < opts.item_height_num;i++){
		for(var j = 0;j < opts.item_width_num;j++){
			temp_left = j * (opts.item_width + opts.item_spacing);
			temp_top = i * (opts.item_height + opts.item_spacing);
			ctx.beginPath();
			ctx.fillStyle = 'white';
			ctx.fillRect(temp_left, temp_top, opts.item_width, opts.item_height);
			ctx.stroke();
		}
	}

	for(var i = 0;i < opts.item_height_num;i++){
		canvasArr[i] = new Array();
		for(var j = 0;j < opts.item_width_num;j++){
			var value = tempValueArr.splice(Math.floor(Math.random() * tempValueArr.length), 1);
			canvasArr[i][j] = value;

			//++++++++根据显示的内容不同，设置不同的偏移值+++++++++++++++++
			if(opts.type == 'num1' || opts.type == 'num2' || opts.type == 'num3'){
				if(value < 10){
					temp_left = j * (opts.item_width + opts.item_spacing) + 30;
				}else if(value >= 10 && value < 20){
					temp_left = j * (opts.item_width + opts.item_spacing) + 25;
				}else{
					temp_left = j * (opts.item_width + opts.item_spacing) + 20;
				}
			}else if(opts.type == 'dynasty'){
				if(value == '尧' || value == '舜' || value == '禹'){
					temp_left = j * (opts.item_width + opts.item_spacing) + 40;
				}else{
					temp_left = j * (opts.item_width + opts.item_spacing) + 10;
				}
			}else{
				temp_left = j * (opts.item_width + opts.item_spacing) + 30;
			}
			if(opts.type == 'num3'){
				temp_top = i * (opts.item_height + opts.item_spacing) + 60;
			}else{
				temp_top = i * (opts.item_height + opts.item_spacing) + 80;
			}
			//------------------------------------------------------------

			//渐变填色
			if(setting.variableColor){
				var gradient = ctx1.createLinearGradient(0,0,c.width,0);
				gradient.addColorStop("0","magenta");
				gradient.addColorStop("0.5","blue");
				gradient.addColorStop("1.0","red");
				ctx1.fillStyle = gradient;
			}else{
				ctx1.fillStyle = "black";
			}

			ctx1.font = dataObj[opts.type].font_size + " Georgia";
			ctx1.fillText(value.toString(), temp_left, temp_top);
		}
	}

	timeContext.clearRect(0, 0, 100, 50);
	timeContext.font = "40px Arial";
	timeContext.fillText('0.00', 0, 30);
}
//-------------------------------------------------------------------

//+++++++++公用方法定义区++++++++++++++++++++++++++++++++++++++++++++
var pubFuns = {
	setShadow : function (i, j, arr, value){
		var temp_left, temp_top;
		/*
		 *可以执行点击的条件：
		 *1.栈中没输入，同时点击的是数组第一个值
		 *2.栈中有数据，且栈顶元素是当前点击元素的前一个元素
		 */
		if((stack.length == 0 && arr[0] == value) || (pubFuns.compareValueOfArr(arr,stack[stack.length - 1],value))){
			//将值放入栈中
			stack.push(value);

			temp_left = j * (opts.item_width + opts.item_spacing);
			temp_top = i * (opts.item_height + opts.item_spacing);

			if(stack.length == opts.item_total_num){
				ctx2.beginPath();
				ctx2.fillStyle = 'black';
				ctx2.globalAlpha = 0.4;
				ctx2.fillRect(0, 0,  opts.item_total_width,  opts.item_total_height);
				ctx2.stroke();
			}else{
				ctx2.beginPath();
				ctx2.fillStyle = 'black';
				ctx2.globalAlpha = 0.2;
				ctx2.fillRect(temp_left, temp_top, opts.item_width, opts.item_height);
				ctx2.stroke();
				if(!setting.mark){
					setTimeout(function(){
						ctx2.clearRect(temp_left, temp_top, opts.item_width, opts.item_height);
					},100);
				}
			}

			//开始计时和结束计时
			if(stack.length == 1){
				setTimeout(pubFuns.startTime(),10);
			}else if(stack.length == opts.item_total_num){
				pubFuns.endTime();
				pubFuns.addRankData(setting.mark);
			}
		}else{
		}
	},
	startTime : function(){
		var time = (parseFloat(document.getElementById('time').value) + parseFloat(0.01)).toFixed(2);

		timeContext.clearRect(0, 0, 100, 50);
		timeContext.font = "40px Arial";
		timeContext.fillText(time.toString(), 0, 30);

		document.getElementById('time').value = time;

		//设置不可修改参数
		$('input:checkbox').each(function(index,el){
		    el.disabled = true;
		});

		t = setTimeout(arguments.callee, 10);
	},
	endTime : function(){
		//设置可改参数
		$('input:checkbox').each(function(index,el){
		    el.disabled = false;
		});
		clearTimeout(t);
		t = null;
	},
	updateRankListAjax : function(){
		$.ajax({ 
			url: "getRankListData.php?type=" + opts.type, 
			success: function(data){
				pubFuns.updateRankList(data);
			},
			error: function(){
				alert('获取数据出错！');
			}
		});
	},
	updateRankList : function(temp_data){
		var data = eval(temp_data);
		var temp_top;

		rankContext.clearRect(0, 0, 200, 370);
		for(var i = 0;i < data.length;i++){
			temp_top = (i + 1) * 35;

			//渐变填色
			/*var gradient = rankContext.createLinearGradient(0,0,rankC.width,rankC.height);
			gradient.addColorStop("0","blue");
			gradient.addColorStop("0.3","black");
			gradient.addColorStop("0.6","red");
			gradient.addColorStop("1.0","green");
			rankContext.fillStyle = gradient;*/
			if(data[i].mark == 'true'){
				rankContext.fillStyle = 'green';
			}else{
				rankContext.fillStyle = 'black';
			}

			rankContext.font = "20px Arial";
			rankContext.fillText(data[i].rank, 5, temp_top);

			rankContext.font = "20px Arial";
			rankContext.fillText(data[i].name, 35, temp_top);

			rankContext.font = "20px Arial";
			rankContext.fillText(data[i].time, 140, temp_top);
		}
	},
	addRankData : function(mark){
		 var time = parseFloat(document.getElementById('time').value);
		 var count = 0, temp, realName = '';
		 if(time < 90){
		 	 var name = window.prompt('恭喜完成！请输入您的昵称(最多8个字节)','');  
	         if( name == "" || name == null ){  
	             name = "匿名";  
	         }

	         for(var i = 0;count <= 8 && i < name.length;i++){
	         	temp = name.charAt(i);
	         	if ((name.charCodeAt(i) > 128)) {
			        count = count + 2;
			    } else { 
			        count = count + 1;
			    }
			    if(count <= 8){
			    	 realName = realName + temp;
			    }
	         }

	         $.ajax({ 
				url: "addRankData.php?name=" + realName + "&time=" + time + "&type=" + opts.type + "&mark=" + mark, 
				success: function(data){
					$("#reDraw").trigger("click");
				},
				error: function(){
					alert('添加数据出错！');
				}
			});
		 }else{
		 	alert('同学，难道你真的找了这么久？继续努力！');
		 	$("#reDraw").trigger("click");
		 }
	},
	compareValueOfArr : function(arr,value1,value2){
		var temp = false;
		for(var i = 0;i < arr.length;i++){
			if(arr[i] == value1 && i < (arr.length - 1) && arr[i + 1] == value2){
				temp = true;
				break;
			}
		}
		return temp;
	}
};
//-------------------------------------------------------------------

//++++++++程序入口++++++++++++
$(document).ready(function(){
	initOpts();
	initCanvas();
	bindDom();
	pubFuns.updateRankListAjax();
});
//-----------------------------