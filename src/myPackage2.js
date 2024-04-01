// @ts-check
// -> TS에게 JS파일을 확인하라고 알림

//JSDoc : 코멘트로 이루어진 문법 - 함수 바로 위에 코멘트를 적어준다.
//        JS파일에 코멘트를 적으면 TS가 읽고 타입을 확인해준다.
/**
 * Initalizes the project
 * @param {object} config
 * @param {boolean} config.debug
 * @param {string} config.url
 * @returns boolean
 */
export function init(config) {
    return true;
}

/**
 * Exits the program
 * @param {number} code
 * @returns number
 */
export function exit(code) {
    return code + 1;
}
