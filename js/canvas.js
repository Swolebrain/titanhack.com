import Dot from './Dot';
import DotCreator from './DotCreator';

export default function initCanvas(){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  let dc;
  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);
  animate();
  ctx.fillStyle = "#08080f";
  function animate(){
    ctx.fillRect(0,0,canvas.width, canvas.height);
    dc.update();
    dc.render(ctx);
    window.requestAnimationFrame(animate);
  }
  function sizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dc = new DotCreator(400);
  }
}
