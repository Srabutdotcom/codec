// https://github.com/nawarian/msgpack-bm/blob/master/github-issues.json

//import { Decoder, Encoder } from "../src/codecArray.js"//"../dist/codecArray.js"//"../src/codecArray.js"//
/* import { Encoder } from "../src/codecbyte/encoder.js";
import { Decoder } from "../src/codecbyte/decoder.js"; */
//import { Encoder, Decoder } from "../src/codecbyte_v.1/dist/index.js";
import { Encoder, Decoder } from "../src/codecbyte_v.2/dist/index.js"//"../src/codecbyte_v.2/index.js";//
import * as msgpack from "../dist/msgpack.js";
import { cborx } from "../dist/cborx.js";
import { timeCount } from './timecounter.js';
import * as codec from '../src/base64.js';
import { base64, binary } from "../dist/datapack.js";
import js from './bigdata.js'



const longString = js//"a".repeat(2**21-1)//

const encoder = new Encoder
const decoder = new Decoder

const codecEnc = new codec.Encoder()
const codecDec = new codec.Decoder()

const binaryEncoder = new binary.Encoder;
const base64Encoder = new base64.Encoder;

const binaryDecoder = new binary.Decoder;
const base64Decoder = new base64.Decoder;

const enc_binary = await timeCount(()=>binaryEncoder.encode(longString),'using my own')
const enc_msgpack = await timeCount(()=>msgpack.encode(longString),'using msgpack')
const enc_cborx = await timeCount(()=>cborx.encode(longString),'using my cborx')
const enc_base64 = await timeCount(async ()=>await base64Encoder.encode(longString),'using my cborx')

const dec_binary = await timeCount(()=>binaryDecoder.decode(enc_binary.o),'using my own')
const dec_msgpack = await timeCount(()=>msgpack.decode(enc_msgpack.o),'using msgpack')
const dec_cborx = await timeCount(()=>cborx.decode(enc_cborx.o),'using my cborx')
const dec_base64 = await timeCount(()=>base64Decoder.decode(enc_base64.o),'using my cborx')

console.log('encode using datapack : ' + enc_binary.e)
console.log('encode using msgpack : ' + enc_msgpack.e)
console.log('encode using cborx : ' + enc_cborx.e)
console.log('encode using codec : ' + enc_base64.e)

console.log('decode using datapack : ' + dec_binary.e)
console.log('decode using msgpack : ' + dec_msgpack.e)
console.log('decode using cborx : ' + dec_cborx.e)
console.log('decode using codec : ' + dec_base64.e)

console.log('string length using datapack : ' + dec_binary.o.length)
console.log('string length using msgpack : ' + dec_msgpack.o.length)
console.log('string length using cborx : ' + dec_cborx.o.length)
console.log('string length using codec : ' + dec_base64.o.length)

//console.dir(dec_datapack.o); 
debugger;