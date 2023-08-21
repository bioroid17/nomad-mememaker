const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const bType = document.getElementsByName("btype");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const saveBtn = document.getElementById("save-btn");
const colorOptions = Array.from(
	document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const fontStyle = document.getElementById("font-style");
const fontFamily = document.getElementById("font-family");
const fontSize = document.getElementById("font-size");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value; // 5
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

function onMove(event) {
	if (isPainting) {
		ctx.lineTo(event.offsetX, event.offsetY);
		ctx.stroke();
		return;
	}
	ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
	isPainting = true;
}
function cancelPainting() {
	isPainting = false;
	if (bType[1].checked) {
		ctx.fill();
	}
	ctx.beginPath();
}
function onLineWidthChange(event) {
	ctx.lineWidth = event.target.value;
}
function onColorChange(event) {
	const colorValue = event.target.value;
	changeColor(colorValue);
}
function onColorClick(event) {
	const colorValue = event.target.dataset.color;
	changeColor(colorValue);
	color.value = colorValue;
}
function changeColor(colorValue) {
	ctx.strokeStyle = colorValue;
	ctx.fillStyle = colorValue;
}
function onModeClick() {
	if (isFilling) {
		isFilling = false;
		modeBtn.innerText = "💧 Fill";
	} else {
		isFilling = true;
		modeBtn.innerText = "🎨 Draw";
	}
}
function onCanvasClick() {
	if (isFilling) {
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	}
}
function onDestroyClick() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraserClick() {
	ctx.strokeStyle = "white";
	ctx.fillStyle = "white";
	isFilling = false;
	modeBtn.innerText = "💧 Fill";
}
function onFileChange(event) {
	const file = event.target.files[0];
	const url = URL.createObjectURL(file);
	const image = new Image();
	image.src = url;
	image.onload = function () {
		ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		fileInput.value = null;
	};
}
function onDoubleClick(event) {
	const text = textInput.value;
	if (text !== "") {
		ctx.save();
		ctx.lineWidth = 1;
		ctx.font = `${fontStyle.value} ${fontSize.value}px ${fontFamily.value}`;
		if (bType[1].checked) {
			ctx.fillText(text, event.offsetX, event.offsetY);
		} else {
			ctx.strokeText(text, event.offsetX, event.offsetY);
		}
		ctx.restore();
	}
}
function onSaveClick() {
	const url = canvas.toDataURL();
	const a = document.createElement("a");
	a.href = url;
	a.download = "myDrawing.png";
	a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
saveBtn.addEventListener("click", onSaveClick);

fileInput.addEventListener("change", onFileChange);
