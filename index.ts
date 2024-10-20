export {getElements,closeAllMenu}
 
type ContextMenuType = {
    contextMenuTop:HTMLElement,
    methodMenu:HTMLElement,
    contextMenuDown:HTMLElement,
}

type ListNode ={
    text:string,
    icon:string
}

const list:ListNode[] = [{
    text: "Ice Skate",
    icon :"uil-trophy"
 }, {
    text: "Basketball",
    icon :"uil-basketball"
 },{
    text: "Football",
    icon :"uil-football"
 },{
    text: "Volleyball",
    icon :"uil-volleyball"
 }]

// get elements
const getElements=():ContextMenuType=>{  
    const contextMenuTop = document.querySelector(".wrapperTop")! as HTMLElement;
    return {
        contextMenuTop, methodMenu: contextMenuTop.querySelector(".method")!, contextMenuDown: document.querySelector(".wrapperDown")!
    }
}

// close all the open menu
const closeAllMenu=():void=>{
    const {contextMenuTop, contextMenuDown} = getElements(); 
    if(contextMenuDown!.style.visibility==='visible') contextMenuDown!.style.visibility="hidden"
    if(contextMenuTop!.style.visibility==='visible') contextMenuTop!.style.visibility="hidden"
}


const  createListNode =(node:ListNode):HTMLElement =>{
    const {text,icon} = node; 
    const li:HTMLElement = document.createElement('li');
    li.setAttribute('class','item');
    const i:HTMLElement = document.createElement('i');
    i.setAttribute('class', `uil ${icon}` )
    const span:HTMLElement = document.createElement("span")
    span.textContent = text
    li.appendChild(i)
    li.appendChild(span)
    return li
}

window.addEventListener("load",()=>{

    // create context menu for bottom-half the screen, sports menu 
    const sportList:HTMLElement =  document.getElementById('sportsList')!; 
    const ul:HTMLUListElement = document.createElement('ul');
    ul.setAttribute('class','menu');
    ul.setAttribute("id","downMenu");
    sportList.appendChild(ul);
   
    list.forEach((sport:ListNode)=>{
        const li:HTMLElement = createListNode(sport)
        ul.appendChild(li)
    });

    // add listener for clicking on the menu button, it stop the propagation to close the menu
    const items:HTMLCollectionOf<Element> = document.getElementsByClassName("item");
    for (let i = 0; i < items.length; i++)  items[i].addEventListener("click", e=>e.stopPropagation()); 

})


window.addEventListener("contextmenu", (e: MouseEvent) => {
    e.preventDefault();
    closeAllMenu();
    //position of mouse click
    const x:number = e.offsetX;
    const y:number = e.offsetY;
    // window size
    const winWidth:number = window.innerWidth;
    const winHeight:number = window.innerHeight;

    // top or bottom of size
    const isTop:boolean = y < winHeight/2;
    
    if(isTop){
        const {contextMenuTop, methodMenu} = getElements(); 
        const cmWidth:number = contextMenuTop.offsetWidth;
        const cmHeight:number = contextMenuTop.offsetHeight;
        if( x > (winWidth - cmWidth - methodMenu.offsetWidth)) {
            methodMenu.style.left = "-200px";
        } else {
            methodMenu.style.left = "";
            methodMenu.style.right = "-200px";
        } 
        contextMenuTop.style.left = `${x > winWidth - cmWidth ? winWidth - cmWidth - 5 : x}px`;
        contextMenuTop.style.top = `${y > winHeight - cmHeight ? winHeight - cmHeight - 5 : y}px`;
        contextMenuTop.style.visibility = "visible";

    }else{
        const {contextMenuDown} = getElements(); 
        const cmWidth = contextMenuDown.offsetWidth;
        const cmHeight = contextMenuDown.offsetHeight;

        contextMenuDown.style.left = `${x > winWidth - cmWidth ? winWidth - cmWidth -5 : x}px`;
        contextMenuDown.style.top = `${y > winHeight - cmHeight ? winHeight - cmHeight - 5 : y}px`;
        contextMenuDown.style.visibility = "visible";
    }
});

document.addEventListener("click", () =>{
    closeAllMenu()
});

document.addEventListener("keyup",(e)=>{
    if(e.key==="Escape")    closeAllMenu()
})