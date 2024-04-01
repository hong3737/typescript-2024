// JS 모듈 사용 방법 (TS정의) - "strict": true
//myPackage.js, myPackage.d.ts 활용
// import { init, exit } from "myPackage";

// init({
//     url: "true",
// });

// exit(1);

//========================================================
//JS파일을 TS에서 아용하는 밥법
//index.ts파일에 mypackage2 파일 불러오기 - "allowJs": true
// import { init, exit } from "./myPackage2";

//========================================================
//Block Chain
// -> 여러 개의 (데이터)블록이 사슬처럼 (해쉬값으로)묶인 것

import crypto from "crypto"; // - "esModuleInterop": true
//import * as crypto from "crypto";도 가능
//TS로 작성되지 않은 패키지를 import할 때 정의되지 않았다(찾을 수 없다)는 에러발생 가능 -> 이때 타입 정의를 일일이 다 적고 싶지 않은 경우
// -> DefinitelyTyped 설치
//    npm i -D @types/타입정의를 설치하고 싶은 패키지명
//    npm i -D @types/node : nodejs의 모든 타입 정의

interface BlockShape {
    hash: string; //해쉬값 : 해당 블록의 고유 서명과 같음
    prevHash: string; //이전 해쉬값
    height: number; //블록의 위치 표시
    data: string; //블록이 보호할 데이터
}
class Block implements BlockShape {
    public hash: string;
    constructor(
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    //static method
    // -> 클래스 안에서 사용하는 함수
    // -> 클래스 인스턴스가 없어도 부를 수 있는 함수
    // ex) const p = new player(); // p가 클래스 인스턴스
    //           p.killball();     // non static method
    static calculateHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class BlockChain {
    private blocks: Block[];
    constructor() {
        this.blocks = [];
    }
    private getPrevHash() {
        if (this.blocks.length === 0) return "";
        return this.blocks[this.blocks.length - 1].hash;
    }
    public addBlock(data: string) {
        const newBlock = new Block(
            this.getPrevHash(),
            this.blocks.length + 1,
            data
        );
        this.blocks.push(newBlock);
    }
    public getBlocks() {
        // return this.blocks; //이렇게 하면 --1.의 보안문제 발생
        //새로운 배열을 만들어 return
        return [...this.blocks];
    }
}

const blockChain = new BlockChain();

blockChain.addBlock("First one");
blockChain.addBlock("Second one");
blockChain.addBlock("Third one");
blockChain.addBlock("Four one");

//--1.누구든 여러 단계를 거치지 않고도 해당 블록체인에 새로운 블록을 추가할 수 있다는 아래와 같은 보안 문제!
//새로운 배열을 만들어 return 후엔 아래와 같이 해도 원래 블록체인에 연결되지 않는다.
// blockChain.getBlocks().push(new Block("XXXXX", 111, "Hackedddd!!"));

console.log(blockChain.getBlocks());
