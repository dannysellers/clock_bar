document.addEventListener('DOMContentLoaded', startTimer);

function startTimer() {
	setInterval(displayTime, 1000);
	displayTime();
}

function padZero(num) {
// fix Date methods removing leading zeroes
	if (num < 10) {
		return "0" + String(num);
	} else {
		return String(num);
	}
}

function formatHour(h) {
	var hour = h % 12;
	
	if (hour == 0) {
		hour = 12;
	}
	
	return String(hour)
}

function getTimePeriod(h) {
	if (h < 12) {
		return "AM"
	} else {
		return "PM"
	}
}

function displayTime() {
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
	
	var timeString = formatHour(h) + ":" + padZero(m) + ":" + padZero(s) + " " + getTimePeriod(h);
	
	document.querySelector("#current-time").innerHTML = timeString;
	
	// --- Analog clock --- //
	var canvas = document.querySelector("#clock");
	var context = canvas.getContext("2d");
	
	var clockRadius = 75;
	var clockX = canvas.width / 2;
	var clockY = canvas.width / 2;
	
	Math.TAU = 2 * Math.PI;

	function drawArm(progress, armThickness, armLength, armColor) {
		var armRadians = (Math.TAU * progress) - (Math.TAU / 4);
		
		var targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
		var targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);
		
		context.lineWidth = armThickness;
		context.strokeStyle = armColor;
		
		context.beginPath();
		context.moveTo(clockX, clockY);
		context.lineTo(targetX, targetY);
		context.stroke();
	}
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawArm(h / 12, 7, 0.50, "#000000");
	drawArm(m / 60, 4, 0.75, "#000000");
	drawArm(s / 60, 2, 1.00, "#FF0000");
}