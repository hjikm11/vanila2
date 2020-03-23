const canvas = document.getElementById("jsCanvas"); 
// 안에 있는 픽셀들을 다루는 것 
//CSS에서 canvas에 width와 height를 줘야함 
const ctx = canvas.getContext("2d");//context : 안에서 픽셀 컨트롤 (2d로)
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;

//pixel modifier에 실제 사이즈를 줌 (canvas에게 알려주기 위해서 )
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//default에 의해 투명이 아닌 하얀 배경이 됨 
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

ctx.strokeStyle = "INITIAL_COLOR";// 그릴 선이 모두 검은색을 가짐
ctx.lineWidth = 2.5; // 그 선의 굵기가 2.5
ctx.fillStyle="INITIAL_COLOR";

let painting = false;
let filling = false;

function stopPainting(event){
    painting = false;
}

function startPainting(event){
    painting = true;
}
 
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){ //클릭하지 않고 마우스를 움직였을 경우 
        ctx.beginPath(); // path = 선 
        ctx.moveTo(x, y); // path를 만들면 마우스의 x y좌표로 path를 옮김 
    } else{ //마우스를 움직이는 동안 계속 발생 
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    //console.log(event);
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    }else {
        filling = true;
        mode.innerText="Paint"
    }

}

function handleCanvasClick(){
   if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
   }
}

function handleCM(event){ //우클릭 방지 함수 
    event.preventDefault();
}

function handleSaveClick(){ //이미지 저장 
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();

}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM); //우클릭 방지 

}

if(colors){
    Array.from(colors).forEach(color =>
    color.addEventListener("click",handleColorClick)
    );
}

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}