const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = 2;
const colors = [
	"#55efc4",
	"#00b894",
	"#ffeaa7",
	"#fdcb6e",
	"#e17055",
	"#fab1a0",
	"#00cec9",
	"#81ecec",
	"#74b9ff",
	"#0984e3",
	"#ff7675",
	"#d63031",
	"#e84393",
	"#fd79a8",
	"#6c5ce7",
	"#a29bfe",
	"#dfe6e9",
	"#b2bec3",
	"#636e72",
	"#2d3436",
];

let x = 0;
let y = 0;

function onMove(event) {
	ctx.beginPath();
	ctx.moveTo(x, y);
	const color = colors[Math.floor(Math.random() * colors.length)];
	ctx.lineTo(event.offsetX, event.offsetY);
	ctx.strokeStyle = color;
	ctx.stroke();
}

function onClick() {
	x = Math.floor(Math.random() * 800);
	y = Math.floor(Math.random() * 800);
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("click", onClick);
