class Stack {
    constructor() {
        this.stack = [];
    }

    push(number) {
        this.stack.push(number);
    }

    pop() {
        return this.stack.pop();
    }

    clear() {
        this.stack = [];
    }

    isEmpty() {
        return this.stack.length === 0;
    }

    getLastElement() {
        return this.stack[this.stack.length - 1];
    }
}

const flatArray = (array) => {
    return array.reduce((acc, val) => {
        return Array.isArray(val) ?
        [...acc, ...flatArray(val)] :
        [...acc, val];
      }, [])
}

const searchInMultiArrayByIndex = (array, value, subIndex) => {
    for (elem of array) {
        if(value === elem[subIndex]) return true;
    }
    return false;
}

module.exports = function check(str, bracketsConfig) {
    const stack = new Stack();

    const flattenConfig = flatArray(bracketsConfig);

    for (brace of str) {

        if (!flattenConfig.includes(brace)) continue;

        if (searchInMultiArrayByIndex(bracketsConfig, brace, 0)) {

            if (searchInMultiArrayByIndex(bracketsConfig, brace, 1)) {
                if (stack.getLastElement() === brace) {
                  stack.pop();
                  continue;
                }
            }

            stack.push(brace);

        } else {

            if (stack.isEmpty()) return false;

            const left = stack.pop();
            const right = flattenConfig[flattenConfig.findIndex(elem => elem === left) + 1];

            if (right !== brace) return false;

        }

    }

    return stack.isEmpty();
 }
