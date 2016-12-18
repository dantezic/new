

var canvas  = document.querySelector('#game');
var context = canvas.getContext('2d');
var x1 = -2.1;
var x2 = 0.6;
var y1 = -1.2;
var y2 = 1.2;
var h = 1;
var image_x = 0;
var image_y = 0;

function draw() {

// мы определяем область, которую мы рисуем. Здесь, фрактал целиком
image_x = document.querySelector('#l').value;
image_y = document.querySelector('#h').value;
color = document.querySelector('#color').value;
var iteration_max = document.querySelector('#i').value;

document.querySelector('#game').setAttribute("width", image_x);
document.querySelector('#game').setAttribute("height", image_y);

context.clearRect(0, 0, image_x, image_y);

// рассчитывается размер изображения:
var zoom_x = image_x/(x2 - x1);
var zoom_y = image_y/(y2 - y1);

for(var x = 0; x < image_x; x++) {
    for(var y = 0; y < image_y; y++) {
        var c_r = x / zoom_x + x1;
        var c_i = y / zoom_y + y1;
        var z_r = 0;
        var z_i = 0;
        var i = 0;

        do{
            var tmp = z_r;
            z_r = z_r*z_r - z_i*z_i + c_r;
            z_i = 2*z_i*tmp + c_i;
            i = i+1;
        } while(z_r*z_r + z_i*z_i < 4 && i < iteration_max);
//цвета
			if(color == "березовый") {
            	context.fillStyle = "rgba(33, 156, 179, " + i/iteration_max +")";
            } else if(color == "yad") {
            	context.fillStyle = "rgba(0, " + Math.round(i/iteration_max*255) +", 0, 1)";
            	if(i/iteration_max == 1) {
            		context.fillStyle = "black";
            	}
            } else if(color == "red") {
            	context.fillStyle = "rgba(" + Math.round(i/iteration_max*255) +", 0, 0, 1)";
            	if(i/iteration_max == 1) {
            		context.fillStyle = "black";
            	}
            } else if(color == "blue") {
            	context.fillStyle = "rgba(0, 0, " + Math.round(i/iteration_max*255) +", 1)";
            	if(i/iteration_max == 1) {
            		context.fillStyle = "black";
            	}
            }
            
            context.fillRect(x, y, 1, 1);

        }
    }
//Отрисовка
context.fillStyle = "black";
context.fillRect(0, 0, image_x, 1);
context.fillRect(0, 0, 1, image_y);
context.fillRect(0, image_y-1, image_x, image_y);
context.fillRect(image_x-1, 0, image_x, image_y);
}

function zoom(event) {
	var x = new Number();
	var y = new Number();

	if (event.x != undefined && event.y != undefined)
	{
	  x = event.x;
	  y = event.y;
	}
	else // Получение позиции
	{
	  x = event.clientX + document.body.scrollLeft +
	      document.documentElement.scrollLeft;
	  y = event.clientY + document.body.scrollTop +
	      document.documentElement.scrollTop;
	}
	//Вычитает два числа и присваивает результат первому.
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	x = x1+(x/image_x)*(Math.abs(x2-x1));
	y = y1+(y/image_y)*(Math.abs(y2-y1));
	x1 = x-h;
	x2 = x+h;
	y1 = y-h;
	y2 = y+h;
	h -= h/(1/(document.querySelector('#z').value)*10);
	draw();
}

var canvas = document.querySelector('#game');
canvas.addEventListener("mousedown", zoom, false);