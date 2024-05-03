import { useTodoDispatch } from "../App";
import { Todo } from "../types";

interface Props extends Todo { }

export default function TodoItem(props: Props) {

    // 커스텀 훅 불러오기
    const dispatch = useTodoDispatch();

    const onClickButton = () => {
        // 커스텀 훅 사용
        dispatch.onClickDelete(props.id);
    };

    return (
        <div>
            {props.id}번 : {props.content}
            <button onClick={onClickButton}>삭제</button>
        </div>
    )
}
