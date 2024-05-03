import { useState } from "react";
import { useTodoDispatch } from "../App";

export default function Editor() {

    // 커스텀 훅으로 불러오기
    const dispatch = useTodoDispatch();

    // state - 사용자 입력 기능
    const [text, setText] = useState("");

    // 이벤트 핸들러 함수 - 사용자 입력 
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }
    // 이벤트 핸들러 - 추가
    // 추가 버튼 누르면 인수로 text state 전달
    const onClickButton = () => {
        // 커스텀 훅 사용
        dispatch.onClickAdd(text);
        // 추가하고 setText 호출해서 입력 폼 비워준다.
        setText("");
    }

    return (
        <div>
            <input type="text" value={text} onChange={onChangeInput} />
            <button onClick={onClickButton}>추가</button>
        </div>
    );
}