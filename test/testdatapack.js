import { base64/* , binary */ } from '../src/datapack.js'
import { js } from './bigdata.js';
import { timeCount } from './timecounter.js';

//const binaryEncoder = new binary.Encoder;
const base64Encoder = new base64.Encoder;

//const binaryDecoder = new binary.Decoder;
const base64Decoder = new base64.Decoder;

const enc_base64 = await timeCount(async ()=>await base64Encoder.encode(js),'using my cborx')
const dec_base64 = await timeCount(()=>base64Decoder.decode(enc_base64.o),'using my cborx')

debugger;
