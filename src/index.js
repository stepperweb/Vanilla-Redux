import { createStore } from "redux"; // npm install redux 이후 위에 import redux를 하면서 createStore(state = data 저장소) 생성.

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "ADD";
const MINUS = "MINUS";

const reducer = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
  // console.log(count, action);
  // if (action.type === "ADD") {
  //   return count + 1;
  // } else if (action.type === "MINUS") {
  //   return count - 1;
  // } else {
  //   return count;
  // }
};
// 2. createStore만 생성하면 에러가 발생 reducer함수를 생성해서 createStore에 전달인자로 준다.
// reducer는 함수다. 바로 우리의 data(state)를 modify(의미를 찾고 수정하는) 함수다.
// reducer가 리턴하는 것이 곧 data(state);  object로 불러와지면 안에는 네가지 메소드가 있다 (dispatch, subscribe, getState, replaceReducer)
// 위와 같이 state 만 들어가면 undefined로 콘솔에 찍혔지만, state에 값을 할당하면 그대로 state = 0이 default값으로 되어 리턴한다.
// 두번째 인자로 action이 들어가는데 밑에 store에 dispatch메소드를 해서 거기입력된 state의 값을 modify해서 불러오게끔 한다.

const store = createStore(reducer); // reducer에 modify한 값을 바꾸면서 getState로 불러옴
// 1. store변수에 createStore()함수 생성 *저장소 생성.

const onChange = () => {
  number.innerText = store.getState();
};
store.subscribe(onChange);

add.addEventListener("click", () => store.dispatch({ type: ADD }));
minus.addEventListener("click", () => store.dispatch({ type: MINUS }));

//////////////////////////

// vanill js로 버튼클릭시 숫자가 바뀌는 것을 구현할 때...

// let count = 0;

// const counterUpdate = () => {
//   number.innerHTML = count;
// };

// const handlerAdd = () => {
//   count = count + 1;
//   counterUpdate();
// };

// const handlerMinus = () => {
//   count = count - 1;
//   counterUpdate();
// };

// add.addEventListener("click", handlerAdd);
// minus.addEventListener("click", handlerMinus);

/* ////////////// TO DO ///////////////////////// */

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const add_todo = "ADD_toDo";
const minus_todo = "MINUS_toDo";

const addTodo = (text) => {
  return {
    type: add_todo,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: minus_todo,
    id,
  };
};

const reduceData = (state = [], action) => {
  //console.log(action);
  //mutate state을 절대로 하지말자... arr.push와 같은것 하지말기 새로운 new state을 만들고 리턴해라...
  switch (action.type) {
    case add_todo:
      return [...state, { text: action.text, id: Date.now() }];
    case minus_todo:
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

const storeData = createStore(reduceData);

//storeData.subscribe(() => console.log(storeData.getState()));

// const createTodo = (toDo) => {
//   const li = document.createElement("li");
//   li.innerText = toDo;
//   ul.appendChild(li);
// };

const dispatchAddToDo = (text) => {
  storeData.dispatch(addTodo(text));
};

const dispatchDeleteToDo = (e) => {
  console.log(e.target.parentNode.id); // e.target은 현재클릭한 것을 지침, parentNode는 클릭한 대상 부모, id는 클릭한 대상부모의 아이디..
  const id = parseInt(e.target.parentNode.id);
  storeData.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  console.log(storeData.getState());
  const toDos = storeData.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerHTML = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

storeData.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  // createTodo(toDo);
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
