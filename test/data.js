// samples of primitive variant
export const primitives = [
   null,
   undefined,
   , // empty slot
   true,
   false,
   -0,
   0,
   1.00,
   NaN,
   Infinity,
   -Infinity,
   1.123,
   1e3,
   -1e-2,
   7_000_000,
   1n,
   '',
   'string',
   Symbol('test'),
   0o10, // octal
   0xFF, // hexadecimal
   0b1010, // binary
   '007'
]

const helloBlob = new Blob(["Hello"]);
const arrayBuffer = await helloBlob.arrayBuffer();
const uint8Array = new Uint8Array(arrayBuffer);

// samples of object variant
export const objects = [
   {},
   [],
   [1,,4],
   new Number(1.25),
   new String('strObject'),
   new Boolean(true),
   new Date(),
   /['"=]/gs,
   new Error("New Error", {cause:'i don\'t know'}),
   //helloBlob,
   new DataView(arrayBuffer),
   arrayBuffer,
   new Int8Array(arrayBuffer),
   new Uint8Array(arrayBuffer),
   new Uint8ClampedArray(arrayBuffer),
   new Int16Array([...uint8Array]),
   new Uint16Array([...uint8Array]),
   new Int32Array([...uint8Array]),
   new Uint32Array([...uint8Array]),
   new Float32Array([...uint8Array]),
   new Float64Array([...uint8Array]),
   new BigInt64Array([...uint8Array].map(e=>BigInt(e))),
   new BigUint64Array([...uint8Array].map(e=>BigInt(e))),
   new Array(1, "2", 30),
   ['a', [1, 2, 3], 'b'],
   { a: 10, c: { 'd': 100n }, b: 'stri' },
   { p(a){} },
   new Map([
      ['name', 'John Doe'],
      ['age', 30],
      ['city', 'New York']
   ]),
   new Set([1, 2, 2, "apple", "orange", "apple"]),
   new URL("https://google.com")
]

// samples of function variant
export const functions = [
   // named or declaration function
   function add(a, b) {
      return a + b;
   },
   // anonymous function
   function (a, b) {
      return a + b;
   },
   // arrow function
   (a, b) => a + b,
   // generator function
   function* fibonacci() {
      let a = 0;
      let b = 1;
      while (true) {
         yield a;
         [a, b] = [b, a + b];
      }
   },
   // async function
   async function fetchData() {
      const response = await fetch('https://api.example.com');
      const data = await response.json();
      return data;
   },
   // async generator function
   async function* asyncGenerator() {
      let i = 0;
      while (i < 3) {
         yield await Promise.resolve(i++);
      }
   },
   //class
   class Person {
      constructor(name) {
         this.name = name;
      }

      greet() {
         return `Hello, my name is ${this.name}`;
      }
   }
]

export const specialString = "Hello, 你好, Привет!"