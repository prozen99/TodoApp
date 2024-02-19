const list=document.getElementById('list'); // 'tagname'은 문자열이
const createBtn=document.getElementById('create-btn');// create-btn이라는 아아디 연결

let todos=[{
    
}]; // 배열안에 데이터를 넣어주고 , 그 데이터를 이용해서 화면생성

createBtn.addEventListener('click',createNewTodo); // 
//create-btn 아이디를 가진 버튼이 클릭된다면 createNewTodo() 함수를 호출합니다

function createNewTodo() // 호출되었을때 나오는 함수
{
    //새로운 아이템 객체 생성
    const item ={
        id: new Date().getTime(), // 사실상 동시에 누르지 않으면 유니크한값
        text: '',
        complete:false
    }

    //배열 처음에 새로운 아이템을 추가
    todos.unshift(item); //배열의 첫번째에 element를 insert 해주는 것입니다.
    // item에 객체값 채우고 unshift로 올려주는거임

    //요소 생성하기 
    const {itemEl,inputEl,editEl,removeEl}=createTodoElement(item); //요소 생성하기
    //뒤에 함수 매개변수로 item 을 넣으면 지금 결과값을 불러와줄테니까 그 결과값을 저장하는거임.

    //그리고 값은 만들어놨는데 실제 list인 todo-list 부분에 값을 넣어줘야함 
    //prepend는 node를 집어 넣는것 , 인데 pretend는 첫번째 child 노드 앞에 넣은거임
    // 맨앞에 새롭게 추가하는 거임 pre=앞에 pend = append 약어 
    // 결론 : 리스트 요소 안에 방금 생성한 아이템 요소 추가
    list.prepend(itemEl);

    inputEl.removeAttribute('disabled');// 속성제거 disabled 

    inputEl.focus();
}

//요소 생성하는 함수 만들기
function createTodoElement(item)
{
    const itemEl=document.createElement('div');// div 태그를 생성하기 위해서
    //createElement() 함수를 이용해주었음.
    itemEl.classList.add('item');// class 이름을 item으로해줌

    const checkboxEl=document.createElement('input');// input 태그 생성
    checkboxEl.type='checkbox';
    checkboxEl.checked=item.complete;// true false 값을 저장해야함.

    if(item.complete)//page를 refersh 했을때도 새로 생성되있는것들은 
    //complete=true임.
    {
        itemEl.classList.add('complete');// 클래스 이름에 complete 추가
        //뭐 스타일을 주거나 관리하기 위해서
    }
    const inputEl=document.createElement('input');
    inputEl.type='text';// div로 공간을 만들고 , 체크박스 만들고 내부의 내용
    // 채우려고 type text이기 떄문에 text값만 불러옴 
    inputEl.value=item.text; // item 객체의 text 값 넣기.

    inputEl.setAttribute('disabled',''); // setAttribute =속성추가 disabled

    const actionEl=document.createElement('div');
    actionEl.classList.add('actions');// 클래스 이름에 actions 추가

    const editEl=document.createElement('button');
    editEl.classList.add('material-icons');
    editEl.innerText='edit';

    const removeEl=document.createElement('button');
    removeEl.classList.add('material-icons','remove-btn');
    removeEl.innerText='remove_circle';

    actionEl.append(editEl);  // 구조에 맞게 
	actionEl.append(removeEl);// edit + remove는 action 클래스 내부의 것들이니까 2개를 합쳐주고
 
	itemEl.append(checkboxEl); //item이라는 이름의 클래스를 가진 녀석들은 
	itemEl.append(inputEl); // item 밑에다가 이렇게 하나씩 노드를 추가해준거임 실제로 사용자 화면에보이게
	itemEl.append(actionEl);//actions클래스 이름을 가진
    // 녀석의 하위노드에 두가지를 붙임.

  // Event
  inputEl.addEventListener("input", () => {
    item.text = inputEl.value;//실제로 Todo List 텍스트 부분에
    //넣는 데이터 값을 item.text에 넣어주는거임 todoList의
});
checkboxEl.addEventListener("change", () => {
    item.complete = checkboxEl.checked;

    if (item.complete) {
        itemEl.classList.add("complete");
    } else {
        itemEl.classList.remove("complete");
    }

    saveToLocalStorage();
});

//focus가 되면 disabled가 없고 focus가 안되면 disabled 가 있음

inputEl.addEventListener("blur", () => {
    inputEl.setAttribute("disabled", "");//blur 이벤트가 발생하면
    //disabled 의 속성을 추가한다

    saveToLocalStorage(); // 임의로 만든 로컬저장소를 불러옴 
});

editEl.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");// disabled 속성 제거
    inputEl.focus();// focus를 두기
});

//이 버튼을 누르면 데이터도 지우고 요소도 지워줘야함 
removeEl.addEventListener('click',()=>{
    todos=todos.filter(t=>t.id !==item.id);//filter 는 배열같이 literable한
    //녀석들을 순회하면서 조건에 맞는거는 필터링이 되고 다른것만 출력 
    itemEl.remove();// 제거하는기능 만들기
    saveToLocalStorage();
    
});
    
    
    
     
    // itemEl:itemEl inputEl:inputEl 과 같은 기능들을 
    //JavaScript에서는 itemEl, inputEl, editEl, removeEl 과 같이 축약으로 써짐
    return{itemEl,inputEl,editEl,removeEl}
    
}


function saveToLocalStorage()//로컬 스토리지는 항상
//문자열로 데이터를 넣어야하는데 그럴려면 
{
    const data=JSON.stringify(todos); //배열을 string 값으로 바까줌
    localStorage.setItem("my_todos",data); 
    // window 객체인데 그런건 생략할수 있으니까
    //localStorage로 .setItem해서 (key, value ) 값넣어주기.

}

function loadFromLocalStorage()// local Storage로 데이터가져옴
//가져올때는 
{
    const data=localStorage.getItem("my_todos");//데이터의 key값을
    //가져옴
    if(data)
    {
        todos=JSON.parse(data);//JSON 스트링을 convert(바꿈)
        // 객체로 바꿔주는거임.
    }
}

//근데 데이터만 가져오고 요소를 안만들면 추가적으로 화면에는 보이지않음

function displayTodos()
{
    loadFromLocalStorage(); //데이터 가져오기 \
    //지금 이함수를 호출하면 todos 라는 배열에다가 값을 넣어주는거임
    for(let i=0;i<todos.length;i++) //배열 길이까지 돌면서
    {
        const item=todos[i];//첫번째 객체가 item에 저장
        const {itemEl}=createTodoElement(item);//새로운 리스트의
        //데이터와 정보를 받고

        list.append(itemEl);// 아이템 리스트에 추가시켜준다.
    }

}

displayTodos();



