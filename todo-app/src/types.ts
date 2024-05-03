// 공통으로 여러 컴포넌트에서 사용되는 타입을 유지해야 될 때 
// 별도의 타입스크립트 파일을 만들어서 분리하는 것이 좋다.

// todos 배열에 담길 todo 아이템 타입 정의
export interface Todo {
    id: number;
    content: string;
}