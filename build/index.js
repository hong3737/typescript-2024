"use strict";
// JS 모듈 사용 방법 (TS정의) - "strict": true
//myPackage.js, myPackage.d.ts 활용
// import { init, exit } from "myPackage";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const crypto_1 = __importDefault(require("crypto")); // - "esModuleInterop": true
class Block {
    constructor(prevHash, height, data) {
        this.prevHash = prevHash;
        this.height = height;
        this.data = data;
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    //static method
    // -> 클래스 안에서 사용하는 함수
    // -> 클래스 인스턴스가 없어도 부를 수 있는 함수
    // ex) const p = new player(); // p가 클래스 인스턴스
    //           p.killball();     // non static method
    static calculateHash(prevHash, height, data) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto_1.default.createHash("sha256").update(toHash).digest("hex");
    }
}
class BlockChain {
    constructor() {
        this.blocks = [];
    }
    getPrevHash() {
        if (this.blocks.length === 0)
            return "";
        return this.blocks[this.blocks.length - 1].hash;
    }
    addBlock(data) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(newBlock);
    }
    getBlocks() {
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
