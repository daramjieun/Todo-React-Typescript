import React, { useRef, useReducer, useContext } from "react"
import Editor from "./components/Edeitor";
import { Todo } from "./types";
import TodoItem from "./components/TodoItem";

// 타입 별칭
// 🚀 서로소 유니언 타입의로 정의
// Acrion 객체의 타입을 정의해서 에러 방지
type Action = {
  type: "CREATE",
  data: {
    id: number;
    content: string;
  }
} | { type: "DELETE", id: number };

function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case 'CREATE': {
      return [...state, action.data]
    }
    case 'DELETE': {
      // action.id가 아닌 것들만 필터링
      // 즉, action으로 전달 받은 id만 삭제된다.
      return state.filter((it) => it.id !== action.id);
    }
  }
}

// 🚀 타입 변수에 타입 설정
// todos를 공급하는 context
export const TodoStateContext = React.createContext<Todo[] | null>(null);

// 상태 변화 함수 공급하는 context
export const TodoDispatchContext = React.createContext<{
  onClickAdd: (text: string) => void;
  onClickDelete: (id: number) => void;
} | null>(null);

// 커스텀 훅
export function useTodoDispatch() {

  const dispatch = useContext(TodoDispatchContext);
  // 만약에 dispatch가 null이라면 조건문이 true가 되어 throw를 던진다.
  // null이 아니면 반환 값의 타입이 객체가 된다.
  if (!dispatch) throw new Error("TodoDispatchContext에 문제가 있다.");
  return dispatch;
}

function App() {
  // state - 사용자가 입력한 todo 저장
  const [todos, dispatch] = useReducer(reducer, []);

  // useRef - 클릭할 때마다 현재 idRef 값에서 1씩 추가
  const idRef = useRef(0);

  // 이벤트 핸들러 함수 - 사용자 입력 값 추가
  // onClickAdd 함수는 Editor 컴포넌트에서 추가 버튼 이벤트 발생시 실행
  // text를 매개변수로 받는다.
  const onClickAdd = (text: string) => {
    // dispatch 함수 작성
    dispatch({
      type: "CREATE",
      data: {
        // 클릭하면 현재 idRef 값에서 1씩 추가
        id: idRef.current++,
        content: text,
      },
    });
  };

  const onClickDelete = (id: number) => {
    dispatch({
      type: "DELETE",
      id: id,
    });
  }

  return (
    <div className="App">
      <h1>Todo List 만들기 - React + Typescript</h1>
      {/* Todo state를 공급하는 Provider */}
      <TodoStateContext.Provider value={todos}>
        {/* 상태 변화 함수를 공급하는 context의 provider */}
        <TodoDispatchContext.Provider
          value={{
            onClickAdd,
            onClickDelete,
          }}
        >
          <Editor />
          {/* 리스트 렌더링 */}
          <div>
            {todos.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </div>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;