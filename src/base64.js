const encoder = new TextEncoder
const decoder = new TextDecoder
const MAXARGS = testMaxArguments();
const emptySlot = Symbol('emptySlot')

class Encoder {
   encoder = base64Encoder 
   constructor(options = { data: null }) {
      const { data } = options;
      this.raw = data;
   }
   encode(data = this.raw) {
      if (!arguments.length && !this.raw) throw new Error('data is undefined');
      const type = arguments[0] === null ? 'null' : typeof arguments[0];//NOTE - to avoid missinterprete of undefined to null using parameter data
      switch (type) {
         case 'null': return this.encoder(226, )
         case 'undefined': return this.encoder(227, )
         case 'number': return this.encodeNumber(0, data)
         case 'boolean': return this.encoder(data?230:229,)
         case 'string': return this.encoder(100, data)
         case 'bigint': return this.encoder(231, data.toString());
         case 'symbol': return this.encoder(232, data.description);
         case 'function': return this.encoder(233, data.toString());
         case 'object': return this.encodeObjectVariant(data)
      }
   }
   encodeNumber(type, data) {
      if(Object.is(-0,data)) return this.encoder(50,)
      return this.encoder(type, Number(data).toString())
   }
   encodeObjectVariant(data) {
      if (!arguments.length) throw new Error('data is undefined')
      const instance = (data)?.constructor ?? Object
      switch (instance) {
         case RegExp: return this.encoder(239, { source: data.source, flags: data.flags })
         case Error: return this.encoder(240, { message: data.message, cause: data.cause })
         case URL : return this.encoder(238, data.href)
         case ArrayBuffer: {
            const uint8 = new Uint8Array(data);
            return this.encoder(243, uint8.toString())
         }
         case DataView: {
            const uint8 = new Uint8Array(data.buffer);
            return this.encoder(244, uint8.toString())
         }
         case Int8Array: return this.encoder(245, data.toString())
         case Uint8Array: return this.encoder(249, data.toString())
         case Uint8ClampedArray: return this.encoder(250, data.toString())
         case Int16Array: return this.encoder(246, data.toString())
         case Uint16Array: return this.encoder(251, data.toString())
         case Int32Array: return this.encoder(247, data.toString())
         case Uint32Array:  return this.encoder(252, data.toString())
         case Float32Array: return this.encoder(254, data.toString())
         case Float64Array: return this.encoder(255, data.toString())
         case BigInt64Array: return this.encoder(248, data.toString())
         case BigUint64Array: return this.encoder(253, data.toString())
         case String: return this.encoder(234, data)
         case Number: return this.encodeNumber(235, data)
         case Boolean: return this.encoder(236, data)
         case Date: return this.encoder(237, data.valueOf())
         case Array: return this.encodeArray(data);
         case Object: return this.encodeObject(data);
         case Map: return this.encodeMap(data)
         case Set: return this.encodeSet(data)
         default: return this.encodeObject(data);
      }//end of Switch
   }
   encodeArray(data) {
      const array = []
      let i = 0;
      for (const e of data) {
         if((i in data)==false){ array.push(this.encoder(228,)); i++;continue}
         array.push(this.encode(e));i++;
      }
      return this.encoder(162, array)
   }
   encodeObject(data) {
      const object = {}
      for (const e in data) {
         object[e] = this.encode(data[e])
      }
      return this.encoder(194, object)
   }
   encodeMap(data) {
      const array = this.encode([...data.entries()]);
      return this.encoder(242, array)
   }
   encodeSet(data) {
      const array = this.encode([...data.values()]);
      return this.encoder(241, array)
   }
}

class Decoder {
   decoder = base64Decoder
   constructor(options = { data: null }) {
      const { data, } = options;
      this.raw = data;
   }
   decode(data = this.raw) {
      if (!arguments.length && !this.raw) throw new Error('data is undefined');
      const [type, src] = this.decoder(data)
      switch (type) {
         case 0: return +src
         case 50: return -0
         case 100: return src
         case 162: return this.getArray(src);
         case 194: return this.getObject(src);
         case 226: return null;
         case 227: return undefined;
         case 228: return emptySlot
         case 229: return false
         case 230: return true
         case 231: return BigInt(src)
         case 232: return Symbol(src)
         case 233: return this.getFunction(src);
         case 234: return new String(src);
         case 235: return new Number(src);
         case 236: return new Boolean(src);
         case 237: return new Date(+src);
         case 238: return new URL(src);
         case 239: return new RegExp(src.source, src.flags);
         case 240:return new Error(src.message, { cause: src.cause })
         case 241: return new Set(this.decode(src))
         case 242: return new Map(this.decode(src))
         case 243: return new Uint8Array(src.split(',')).buffer;
         case 244: return new DataView(new Uint8Array(src.split(',')).buffer);
         case 245: return new Int8Array(src.split(','));
         case 246: return new Int16Array(src.split(','));
         case 247: return new Int32Array(src.split(','));
         case 248: return new BigInt64Array(src.split(',').map(e => BigInt(e)));
         case 249: return new Uint8Array(src.split(','));
         case 250: return new Uint8ClampedArray(src.split(','));
         case 251: return new Uint16Array(src.split(','));  
         case 252: return new Uint32Array(src.split(','));
         case 253: return new BigUint64Array(src.split(',').map(e => BigInt(e)));
         case 254: return new Float32Array(src.split(','));
         case 255: return new Float64Array(src.split(','));
         default: return src;
      }
   }

   getArray(data) {
      const array = [];
      for (const e of data) {
         const decoded = this.decode(e);
         if(decoded==emptySlot){
            array.length++; continue;
         }
         array.push(this.decode(e))
      }
      return array;
   }
   getObject(data) {
      const object = {}
      for (const e in data) {
         object[e] = this.decode(data[e])
      }
      return object;
   }
   getFunction(str) {
      const isFunction = str.match(/^\s*(async\s*)?function/)
      if (isFunction) return returnFunction(str);
      const isClass = str.match(/^\s*class/)
      if (isClass) return returnFunction(str);
      const isArrowFunction = str.match(/^\s*(.*)\s*=>/);
      if (isArrowFunction) return returnFunction(str);
      return Function('return ' + 'function ' + str)();

      function returnFunction(str) {
         return Function('return ' + str)()
      }
   }
}

function base64urlEncode(input) {
   return btoa(input)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
}

function base64urlDecode(input) {
   input = input.replace(/-/g, '+').replace(/_/g, '/');
   const padding = input.length % 4;
   if (padding) {
      input += '='.repeat(4 - padding);
   }
   return atob(input);
}

//https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
function base64ToBytes(base64) {
   if (!base64.match(/^77\+9/)) { return atob(base64); }// `expanded` as identifier
   const binString = atob(base64.replace(/77\+9/,''))
   
   const uin8arr = Uint8Array.from(binString, (m) => m.codePointAt(0));
   return decoder.decode(uin8arr);
}

function bytesToBase64(str) {
   //const tmp = tryBtoa(str);
   let o 
   try {
      o = btoa(str)
   } catch (error) {
      o=error;
   }
   if (typeof o == 'string') return o;
   const bytes = encoder.encode('\uFFFD' + str);
   // to avoid max call stack where the arguments length max is 65535
   const CHUNK_SIZE = MAXARGS; // Adjust the chunk size as needed
   let binString = ''

   for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
      const chunk = bytes.slice(i, i + CHUNK_SIZE);
      binString += String.fromCodePoint(...chunk);
   }

   return btoa(binString);
}

function base64Encoder(type, value){
   return bytesToBase64(JSON.stringify([type, value]))
}

function base64Decoder(base64){
   return JSON.parse(base64ToBytes(base64))
}

/* const a = bytesToBase64("a Ā 𐀀 文 🦄")// 'YSDEgCDwkICAIOaWhyDwn6aE'
const b = base64ToBytes(a) // "a Ā 𐀀 文 🦄" */

/**
 * 
 * @param {URL|string} path 
 * @param {any} data 
 * @returns 
 */
function writencoded(path, data) {
   const encoded = new Encoder().encode(data);
   try {
      Deno.writeTextFileSync(path, encoded);
   } catch (error) {
      return new Error(error)
   } finally {
      return true;
   }
}
/**
 * 
 * @param {URL|string} path 
 * @returns 
 */
function readencoded(path) {
   const response = fetch(path);
   const text = response.text();
   if (!text) return ''
   return new Decoder().decode(text);
}

function hasNonUTF8Chars(str) {
   return /[^\u0000-\u007F]/.test(str);
}

function testMaxArguments() {
   let args = [];
   let i = 16;
   let maxArgs = Math.pow(2,i)-1;

   try {
      while (true) {
         args = new Array(maxArgs); // Add a dummy argument
         Function.prototype.apply.call(null, testMaxArguments, args);
         maxArgs = Math.pow(2,i++)-1;
      }
   } catch (e) {
      //console.log('Maximum arguments:', maxArgs);
      return maxArgs
   }
}

export { Encoder, Decoder, base64urlEncode, base64urlDecode, base64ToBytes, bytesToBase64, writencoded, readencoded }

//`esbuild ./src/base64.js --bundle --minify --format=esm --target=es2022 --outdir=dist`