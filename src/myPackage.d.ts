//d.ts 정의 파일
interface Config {
    url: string;
}
declare module "myPackage" {
    //구현을 적는 것이 아닌 타입(호출 시그니처)을 적어준다.
    // -> TS에게 타입에 대해서 설명
    // -> TS는 내가 쓰는 모든 것에 대한 타입을 이해하고 있어야 한다.
    function init(config: Config): boolean;
    function exit(code: number): number;
}
