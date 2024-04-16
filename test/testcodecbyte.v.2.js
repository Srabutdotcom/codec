import { Encoder, Decoder } from "../src/codecbyte_v.2/binary.js";
import { functions } from './data.js'; // PASSED -

const encoder = new Encoder
const decoder = new Decoder

const integers = [
   0, 40, 255, 65535, 4294967295, Number.MAX_SAFE_INTEGER,
   -0, -40, -255, -65535, -4294967295, -Number.MAX_SAFE_INTEGER,
] //PASSED - 

const float = [
   0.3, 38.9, 255.22, 65535.1, 42949672.95, Number.MAX_SAFE_INTEGER * 0.01,
   -0, -39.5, -254.5, -6553.5, -4294967.295, -Number.MAX_SAFE_INTEGER * 0.015,
] //PASSED -

const atom = [null, undefined, , true, false, Symbol('test')] //PASSED -

const bigint = [
   0n, 41n, 256n, 65536n, 4294967296n, BigInt(Number.MAX_SAFE_INTEGER),
   -0n, -41n, -256n, -65536n, -4294967296n, -BigInt(Number.MAX_SAFE_INTEGER),
] //PASSED -

const string = [
   '', 'a'.repeat(57), 'a'.repeat(255), 'a'.repeat(256), 'a'.repeat(65536), 'a'.repeat(2 ** 27 - 1),
] //PASSED -

const Objects = [
   new String('Hello World'),
   new Number(100.56),
   new Boolean(true),
   new Date(),
   new URL("https://google.com"),
   /^123/gs,
   new Error('sample', { cause: 'maybe something' })
] // PASSED - 

const obj = { a: 10, b: null, atom } // PASSED - 
const emtpyObj = {} // PASSED - 
const set = new Set(['1', 3, null]) // PASSED -
const map = new Map([
   [1, "one"],
   [2, "two"],
   [3, "three"],
]); // PASSED -

const uint8 = new TextEncoder().encode("😀Hello, 你好, Привет!😀1"); // PASSED -
const buffer = uint8.buffer // PASSED -
const view = new DataView(buffer) // PASSED -
const int8 = new Int8Array(buffer) // PASSED -
const int16 = new Int16Array(buffer.slice(0).transfer(roundUpToHeadOffset(buffer.byteLength, 2))) // PASSED -
const int32 = new Int32Array(buffer.slice(0).transfer(roundUpToHeadOffset(buffer.byteLength, 4))) // PASSED -
const bigint64 = new BigInt64Array(buffer.slice(0).transfer(roundUpToHeadOffset(buffer.byteLength, 8))) // PASSED -
const uint8Clamped = new Uint8ClampedArray(buffer) // PASSED -
const uint16 = new Uint16Array(buffer.slice(0).transfer(roundUpToHeadOffset(buffer.byteLength, 2))) // PASSED -
const uint32 = new Uint32Array(buffer.slice(0).transfer(roundUpToHeadOffset(buffer.byteLength, 4))) // PASSED -
const biguint64 = new BigUint64Array(buffer.slice(0).transfer(roundUpToHeadOffset(buffer.byteLength, 8))) // PASSED -
const float32 = new Float32Array(buffer.slice(0).transfer(roundUpToHeadOffset(buffer.byteLength, 4))) // PASSED -
const float64 = new Float64Array(buffer.slice(0).transfer(roundUpToHeadOffset(buffer.byteLength, 8))) // PASSED -

function objSize(size, obj=([]|{})) {
   const MAX_SAFE_ARRAY_LENGTH = 2**21-1//67108864 / 2
   //const obj = {};
   const arr = [];
   const isSmall = size < MAX_SAFE_ARRAY_LENGTH;
   if(isSmall){
      for(let i=0;i<size;i++){
         obj[i] = Number(i * Math.random(2)).toFixed(2);
      }
   } else {
      const intervalNumber = Math.ceil(size / MAX_SAFE_ARRAY_LENGTH);
      for(let i=0;i<intervalNumber;i++){
         for(let j=0;j<MAX_SAFE_ARRAY_LENGTH;j++){
            const index = i + i*j;
            obj[index] = Number(index * Math.random(2)).toFixed(2);
         }
         arr.push(obj)
      }
   }
   if(isSmall)return obj
   const isArray = obj instanceof Array
   let obj2 = isArray?[]:{}
   for (const key of arr){
      if(isArray){
         obj2 = [...obj, ...key]
      } else {
         obj2 = {...obj,...key}
      }
   }
   return obj2
}

const arrObj = [
   {a:0},
   {b:2},
   {c:4}
]

const specialString = "Hello, 你好, Привет!"

//const bigArray = objSize(2 ** 21 - 2,[]); // PASSED
//const bigObject = objSize(2 ** 21 - 2,{}); // PASSED 

const encoded = encoder.encode(specialString);
const decoded = decoder.decode(encoded);
debugger;
//console.log(bigObject[2 ** 21 - 3])

function roundUpToHeadOffset(num, headOffset) {
   if (Number.isSafeInteger(num / headOffset)) return num;
   return Math.ceil(num / headOffset) * headOffset;
}

function chunkStringOrArray(array = ('string' ?? [10]), chunkSize = 67108864) {
   const chunkedArray = [];
   /* let chunkSize = Math.ceil(array.length / 2);
   while (chunkSize > maxChunkSize) {
       chunkSize = Math.ceil(chunkSize / 2);
   } */
   for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
   }
   return chunkedArray;
}