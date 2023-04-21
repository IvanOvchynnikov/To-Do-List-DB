const input_user=document.querySelector('.input__add');
const button_add=document.querySelector('.Add');
const list=document.querySelector('.list');

const todos = [

]

const render = ()=>{
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
    todos.forEach((item,index) => {
        const listItem = document.createElement('div')
        listItem.classList = 'list__item'
        const html =
            `
                   <div class="item__status">
                    <input id="${index}" type="checkbox" class="item__checkbox" hidden="hidden">
                    <label class="item_checker ${item.status && "active"}" for="${index}">                
                    </label>
                </div>
                <label class="item__task" for="${index}">
                    ${item.text}
                </label>
            `
        listItem.innerHTML = html
        list.appendChild(listItem)
    })
}
render();

button_add.addEventListener('click', ()=>{
    if(input_user.value==""){
        alert("Please write some task");
    }
    else{
        todos.push(
            {
                text: input_user.value.trim(),
                status: false,
            }
        );
        render();
    }
})
document.addEventListener('click',(event)=>{

    console.log(event)
    if(event.target.tagName==="LABEL" || event.target.tagName==="svg"){
        const pos=event.target.htmlFor;
        todos[pos].status = !todos[pos].status;
        render();
    }
})