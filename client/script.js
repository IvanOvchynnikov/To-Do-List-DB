const input_user=document.querySelector('.input__add');
const button_add=document.querySelector('.Add');
const list=document.querySelector('.list');

let todos = []

const render = (todos)=>{
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
                    <label data-id=${item._id} class="item_checker ${item.status && "active"}" for="${index}">                
                    </label>
                </div>
                <label data-id=${item._id} class="item__task ${item.status && "disable"}"for="${index}">
                    ${item.text}
                </label>
            `
        listItem.innerHTML = html
        list.appendChild(listItem)
    })
}


document.addEventListener('keyup', function(event){
    if (event.key === 'Enter') {
        button_add.click();
    }
})

button_add.addEventListener ('click', async ()=>{
    if(input_user.value==""){
        alert("Please write some task");
    }
    else{
        await addTodos(input_user.value.trim(),false);
        input_user.value="";
        await getTodos();
    }
})
document.addEventListener('click',async (event)=>{

    console.log(event)
    if(event.target.tagName==="LABEL" || event.target.tagName==="svg"){
        const pos=event.target.htmlFor;
        let id=event.target.dataset.id;
        await changeTodos(id,!todos[pos].status);
        todos[pos].status = !todos[pos].status;
        render(todos);
    }
})

const getTodos = async ()=>{
    await fetch('http://localhost:5555/tasks/',{method:'GET'}).
    then(res=>{
        return res.json();
    }).then(res=>{
        console.log(res.tasks);
        todos = res.tasks
        render(todos);
    })
}

getTodos();

const addTodos = async (text,status)=>{
    await fetch('http://localhost:5555/tasks/',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text,
            status,
        })
    });
}
const changeTodos = async (id,status)=>{
    await fetch(`http://localhost:5555/tasks/${id}`,{
        method:'PATCH',
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
            status,
        })
    });
}


