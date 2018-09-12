"use strict";
const ctx = self;
function fibonacci(num) {
    if (num <= 1)
        return 1;
    return fibonacci(num - 1) + fibonacci(num - 2);
}
console.log(fibonacci(1));
console.log(fibonacci(1));
console.log(fibonacci(1));
console.log(fibonacci(1));
console.log(fibonacci(1));
// Respond to message from parent thread
ctx.addEventListener("message", (event) => console.log(event));
//# sourceMappingURL=worker.js.map