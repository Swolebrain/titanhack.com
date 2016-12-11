import Dot from './Dot';

export default class DotCreator{
  constructor(numDots){
    this.dots = [];
    numDots = numDots || 200;
    for (let i =0; i < numDots; i++){
      this.dots.push(new Dot());
    }
  }
  update(){
    this.dots.forEach((dot, index)=>{
      dot.update()
      if (dot.isOutOfBounds()){
        let side = Math.random()>0.5 ? "left" : "top"
        if (side == "top"){
          this.dots[index] = new Dot(Math.random()*window.innerWidth, 0.2);
        }
        else {
          this.dots[index] = new Dot(0.2, Math.random()*window.innerWidth);
        }
      }
    });
  }
  render(ctx){
    this.dots.forEach(dot=>dot.render(ctx));
  }
}
