export const alphabet = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ];

export const drawHangman = (canvasRef, num) => {
  const canvas = canvasRef.current;
  canvas.width = 270;
  canvas.height = 400;
  const context = canvas.getContext('2d');
  context.lineWidth = 2;

  if (num >= 0) {
    context.beginPath();
    context.moveTo(10, 375);
    context.lineTo(260, 375);
    context.moveTo(60, 375);
    context.lineTo(60, 50);
    context.lineTo(150, 50);
    context.moveTo(149, 50);
    context.lineTo(149, 80);
    context.moveTo(60, 80)
    context.lineTo(90 ,50)
    context.closePath();
    context.stroke();
  }
  if (num >= 1) {
    context.beginPath();
    context.arc(147, 110, 30, 20, 40 * Math.PI);
    context.closePath();
    context.stroke();
  }
  if (num >= 2) {
    context.beginPath();
    context.moveTo(147, 140);
    context.lineTo(147, 220);
    context.closePath();
    context.stroke();
  }
  if (num >= 3) {
    context.beginPath();
    context.moveTo(147, 141);
    context.lineTo(187, 186);
    context.closePath();
    context.stroke();
  }
  if (num >= 4) {
    context.beginPath();
    context.moveTo(147, 141);
    context.lineTo(107, 190);
    context.closePath();
    context.stroke();
  }
  if (num >= 5) {
    context.beginPath();
    context.moveTo(147, 220);
    context.lineTo(187, 300);
    context.closePath();
    context.stroke();
  }
  if (num >= 6) {
    context.beginPath();
    context.moveTo(147, 220);
    context.lineTo(107, 300);
    context.closePath();
    context.stroke();
  }
  if (num >= 7) {
    context.beginPath();
    context.arc(147, 110, 30, 20, 40 * Math.PI);
    context.fillStyle = 'red';
    context.fill()
    context.closePath();
    context.stroke();
  }
};