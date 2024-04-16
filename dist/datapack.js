var b=Object.defineProperty;var l=(n,e)=>{for(var t in e)b(n,t,{get:e[t],enumerable:!0})};var p={};l(p,{Decoder:()=>h,Encoder:()=>c,base64ToBytes:()=>w,base64urlDecode:()=>D,base64urlEncode:()=>I,bytesToBase64:()=>g,readencoded:()=>N,writencoded:()=>_});var E=new TextEncoder,m=new TextDecoder,T=U(),y=Symbol("emptySlot"),c=class{encoder=F;constructor(e={data:null}){let{data:t}=e;this.raw=t}async encode(e=this.raw){if(!arguments.length&&!this.raw)throw new Error("data is undefined");switch(arguments[0]===null?"null":typeof arguments[0]){case"null":return this.encoder(226);case"undefined":return this.encoder(227);case"number":return this.encodeNumber(0,e);case"boolean":return this.encoder(e?230:229);case"string":return this.encoder(100,e);case"bigint":return this.encoder(231,e.toString());case"symbol":return this.encoder(232,e.description);case"function":return this.encoder(233,e.toString());case"object":return await this.encodeObjectVariant(e)}}encodeNumber(e,t){return Object.is(-0,t)?this.encoder(50):this.encoder(e,Number(t).toString())}async encodeObjectVariant(e){if(!arguments.length)throw new Error("data is undefined");switch(e?.constructor??Object){case RegExp:return this.encoder(239,{source:e.source,flags:e.flags});case Error:return this.encoder(240,{message:e.message,cause:e.cause});case URL:return this.encoder(238,e.href);case ArrayBuffer:{let r=new Uint8Array(e);return this.encoder(243,r.toString())}case DataView:{let r=new Uint8Array(e.buffer);return this.encoder(244,r.toString())}case Int8Array:return this.encoder(245,e.toString());case Uint8Array:return this.encoder(249,e.toString());case Uint8ClampedArray:return this.encoder(250,e.toString());case Int16Array:return this.encoder(246,e.toString());case Uint16Array:return this.encoder(251,e.toString());case Int32Array:return this.encoder(247,e.toString());case Uint32Array:return this.encoder(252,e.toString());case Float32Array:return this.encoder(254,e.toString());case Float64Array:return this.encoder(255,e.toString());case BigInt64Array:return this.encoder(248,e.toString());case BigUint64Array:return this.encoder(253,e.toString());case String:return this.encoder(234,e);case Number:return this.encodeNumber(235,e);case Boolean:return this.encoder(236,e);case Date:return this.encoder(237,e.valueOf());case Array:return await this.encodeArray(e);case Object:return await this.encodeObject(e);case Map:return await this.encodeMap(e);case Set:return await this.encodeSet(e);default:return await this.encodeObject(e)}}async encodeArray(e){let t=[],r=0;for(let i of e){if(!(r in e)){t.push(this.encoder(228)),r++;continue}t.push(await this.encode(i)),r++}return this.encoder(162,t)}async encodeObject(e){let t={};for(let r in e)t[r]=await this.encode(e[r]);return this.encoder(194,t)}async encodeMap(e){let t=await this.encode([...e.entries()]);return this.encoder(242,t)}async encodeSet(e){let t=await this.encode([...e.values()]);return this.encoder(241,t)}},h=class{decoder=R;constructor(e={data:null}){let{data:t}=e;this.raw=t}decode(e=this.raw){if(!arguments.length&&!this.raw)throw new Error("data is undefined");let[t,r]=this.decoder(e);switch(t){case 0:return+r;case 50:return-0;case 100:return r;case 162:return this.getArray(r);case 194:return this.getObject(r);case 226:return null;case 227:return;case 228:return y;case 229:return!1;case 230:return!0;case 231:return BigInt(r);case 232:return Symbol(r);case 233:return this.getFunction(r);case 234:return new String(r);case 235:return new Number(r);case 236:return new Boolean(r);case 237:return new Date(+r);case 238:return new URL(r);case 239:return new RegExp(r.source,r.flags);case 240:return new Error(r.message,{cause:r.cause});case 241:return new Set(this.decode(r));case 242:return new Map(this.decode(r));case 243:return new Uint8Array(r.split(",")).buffer;case 244:return new DataView(new Uint8Array(r.split(",")).buffer);case 245:return new Int8Array(r.split(","));case 246:return new Int16Array(r.split(","));case 247:return new Int32Array(r.split(","));case 248:return new BigInt64Array(r.split(",").map(i=>BigInt(i)));case 249:return new Uint8Array(r.split(","));case 250:return new Uint8ClampedArray(r.split(","));case 251:return new Uint16Array(r.split(","));case 252:return new Uint32Array(r.split(","));case 253:return new BigUint64Array(r.split(",").map(i=>BigInt(i)));case 254:return new Float32Array(r.split(","));case 255:return new Float64Array(r.split(","));default:return r}}getArray(e){let t=[];for(let r of e){if(this.decode(r)==y){t.length++;continue}t.push(this.decode(r))}return t}getObject(e){let t={};for(let r in e)t[r]=this.decode(e[r]);return t}getFunction(e){if(e.match(/^\s*(async\s*)?function/)||e.match(/^\s*class/)||e.match(/^\s*(.*)\s*=>/))return s(e);return Function("return function "+e)();function s(o){return Function("return "+o)()}}};function I(n){return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function D(n){n=n.replace(/-/g,"+").replace(/_/g,"/");let e=n.length%4;return e&&(n+="=".repeat(4-e)),atob(n)}function w(n){if(!n.match(/^77\+9/))return atob(n);let e=atob(n.replace(/77\+9/,"")),t=Uint8Array.from(e,r=>r.codePointAt(0));return m.decode(t)}function g(n){let e;try{e=btoa(n)}catch(s){e=s}if(typeof e=="string")return e;let t=E.encode("\uFFFD"+n),r=T,i="";for(let s=0;s<t.length;s+=r){let o=t.slice(s,s+r);i+=String.fromCodePoint(...o)}return btoa(i)}function F(n,e){return g(JSON.stringify([n,e]))}function R(n){return JSON.parse(w(n))}async function _(n,e){let t=await new c().encode(e);try{Deno.writeTextFileSync(n,t)}catch(r){return new Error(r)}finally{return!0}}async function N(n){let t=await(await fetch(n)).text();return t?new h().decode(t):""}function U(){let n=[],e=16,t=Math.pow(2,e)-1;try{for(;;)n=new Array(t),Function.prototype.apply.call(null,U,n),t=Math.pow(2,e++)-1}catch{return t}}var x={};l(x,{Decoder:()=>d,Encoder:()=>a});var a=class{#e={null:this.encodeNull,undefined:this.encodeUndefined,boolean:this.encodeBoolean,number:this.encodeNumber,string:this.encodeString,bigint:this.encodeBigInt,symbol:this.encodeSymbol,function:this.encodeFunction,object:this.encodeObjectVariant};#t={Array:this.encodeArray,Object:this.encodeObject,String:this.encodeString,Number:this.encodeNumber,Boolean:this.encodeBoolean,Date:this.encodeDate,URL:this.encodeURL,RegExp:this.encodeRegExp,Error:this.encodeError,Set:this.encodeSet,Map:this.encodeMap,ArrayBuffer:function(e){return this.encodeBuffer(e,243)},DataView:function(e){return this.encodeBuffer(e,244)},Int8Array:function(e){return this.encodeBuffer(e,245)},Int16Array:function(e){return this.encodeBuffer(e,246)},Int32Array:function(e){return this.encodeBuffer(e,247)},BigInt64Array:function(e){return this.encodeBuffer(e,248)},Uint8Array:function(e){return this.encodeBuffer(e,249)},Uint8ClampedArray:function(e){return this.encodeBuffer(e,250)},Uint16Array:function(e){return this.encodeBuffer(e,251)},Uint32Array:function(e){return this.encodeBuffer(e,252)},BigUint64Array:function(e){return this.encodeBuffer(e,253)},Float32Array:function(e){return this.encodeBuffer(e,254)},Float64Array:function(e){return this.encodeBuffer(e,255)}};reString=new Map;constructor(e){this.forceFloat32=e?.forceFloat32??!1,this.maxDepth=e?.maxDepth??100,this.initialBufferSize=e?.initialBufferSize??8192,this.pos=0,this.view=new DataView(new ArrayBuffer(this.initialBufferSize)),this.bytes=new Uint8Array(this.view.buffer)}reinitializeState(){this.pos=0}encodeSharedRef(e){return this.reinitializeState(),this.doEncode(e,1),this.bytes.subarray(0,this.pos)}encode(e){return this.reinitializeState(),this.doEncode(e,1),this.bytes.slice(0,this.pos)}doEncode(e,t){if(t>this.maxDepth)throw new Error(`Too deep objects in depth ${t}`);let r=arguments[0]===null?"null":typeof arguments[0];this.#e?.[r].call(this,e,t)}encodeNull(){this.writeU8(226)}encodeUndefined(){this.writeU8(227)}encodeBoolean(e){e instanceof Boolean&&this.writeU8(236),e==!1?this.writeU8(229):this.writeU8(230)}encodeNumber(e){if(e instanceof Number&&this.writeU8(235),Number.isSafeInteger(e)==!1)return this.encodeNumberAsFloat(e);e>=0?Object.is(-0,e)?this.writeU8(50):e<41?this.writeU8(e):e<256?(this.writeU8(41),this.writeU8(e)):e<65536?(this.writeU8(42),this.writeU16(e)):e<4294967296?(this.writeU8(43),this.writeU32(e)):e<=Number.MAX_SAFE_INTEGER?(this.writeU8(44),this.writeU64(e)):this.encodeNumberAsFloat(e):e>-41?this.writeU8(-e+50):e>-256?(this.writeU8(91),this.writeU8(-e)):e>-65536?(this.writeU8(92),this.writeU16(-e)):e>-4294967296?(this.writeU8(93),this.writeU32(-e)):e>=-Number.MAX_SAFE_INTEGER?(this.writeU8(94),this.writeU64(-e)):this.encodeNumberAsFloat(e)}encodeNumberAsFloat(e){this.writeU8(99),this.writeF64(e)}encodeBigInt(e){this.writeU8(231),this.encodeNumber(parseInt(e))}encodeString(e){e instanceof String&&this.writeU8(234),e.length>=67108864?this.encodeLongString(e):this.reString.has(e)?(this.writeU8(45),this.writeU32(this.reString.get(e))):this.encodeShortString(e)}encodeLongString(e){let t=v(e,67108864);this.writeU8(161),this.writeU8(t.length);for(let r of t)this.encodeShortString(r)}encodeShortString(e){let r=e.length;this.ensureBufferSizeToWrite(5+r);let i=this.encodeStringUTF8(e,this.bytes,this.pos+5),o=5-this.writeStringHeader(i);this.bytes.copyWithin(this.pos,this.pos+o,this.pos+i+o),this.bytes.fill(0,this.pos+i,this.pos+i+o),this.pos+=i}encodeStringUTF8(e,t,r){let i=H.encodeInto(e,t.subarray(r));return e.length<=57&&this.reString.has(e)==!1&&this.reString.set(e,r-5),i.written}writeStringHeader(e){let t=0;if(e<58)this.writeU8(e+100),t++;else if(e<256)this.writeU8(158),this.writeU8(e),t+=2;else if(e<65536)this.writeU8(159),this.writeU16(e),t+=3;else if(e<268435455)this.writeU8(160),this.writeU32(e),t+=5;else throw new Error(`Too long string: ${e} bytes in UTF-8`);return t}encodeSymbol(e){this.writeU8(232),this.encodeString(e.description)}encodeFunction(e){this.writeU8(233),this.encodeString(e.toString())}encodeObjectVariant(e,t){let r=e?.constructor?.name??"Object";if(r=="Blob")throw Error("please use encodeAsync instead");this.#t?.[r].call(this,e,t)}writeTagAndSize(e,t,r){if(t<29)this.writeU8(t+(e==191?162:194));else if(t<256)this.writeU8(e),this.writeU8(t);else if(t<65536)this.writeU8(e+1),this.writeU16(t);else if(t<2097151)this.writeU8(e+2),this.writeU32(t);else throw new Error(`Too large ${r}: ${t}`)}encodeArray(e,t,r="Array"){let i=e.length??e.size;if(this.writeTagAndSize(191,i,r),r!=="Array")return this.writeU8a(e);let s=0;for(let o of e){if(e instanceof Array&&!(s in e)){this.writeU8(228),s++;continue}this.ensureBufferSizeToWrite(10),this.doEncode(o,t+1),s++}}encodeObject(e,t){let r=Object.keys(e),i=r.length;this.writeTagAndSize(223,i,"Object");for(let s of r){let o=e[s];this.ensureBufferSizeToWrite(20),this.doEncode(s),this.doEncode(o,t+1)}}encodeDate(e){let t=BigInt(e.valueOf());return this.writeU8(237),this.writeBigInt64(t)}encodeURL(e){return this.writeU8(238),this.doEncode(e.href)}encodeRegExp(e){let{source:t,flags:r}=e;return this.writeU8(239),this.doEncode({source:t,flags:r},1)}encodeError(e){let{message:t,cause:r}=e;return this.writeU8(240),this.encodeObject({message:t,cause:r},1)}encodeSet(e){this.writeU8(241),this.encodeArray(e,1)}encodeMap(e){this.writeU8(242),this.encodeArray(e,1)}encodeBuffer(e,t){let r=e instanceof ArrayBuffer?e:e.buffer,i=new Uint8Array(r);this.writeU8(t),this.encodeArray(i,1,"BYTES")}encodeBinary(e,t){let r=e.length;if(r<256)this.writeU8(t),this.writeU8(r);else if(r<65536)this.writeU8(t+1),this.writeU16(r);else if(r<4294967296)this.writeU8(t+2),this.writeU32(r);else throw new Error(`Too large binary: ${r}`);this.writeU8a(e)}ensureBufferSizeToWrite(e){let t=this.pos+e;this.view.byteLength<t&&this.resizeBuffer(t*2)}resizeBuffer(e){let t=new ArrayBuffer(e),r=new Uint8Array(t),i=new DataView(t);r.set(this.bytes),this.view=i,this.bytes=r}writeU8(e){this.view.setUint8(this.pos,e),this.pos++}writeU8a(e){let t=e.length;this.ensureBufferSizeToWrite(t),this.bytes.set(e,this.pos),this.pos+=t}writeI8(e){this.view.setInt8(this.pos,e),this.pos++}writeU16(e){this.view.setUint16(this.pos,e),this.pos+=2}writeI16(e){this.view.setInt16(this.pos,e),this.pos+=2}writeU32(e){this.view.setUint32(this.pos,e),this.pos+=4}writeI32(e){this.view.setInt32(this.pos,e),this.pos+=4}writeF32(e){this.view.setFloat32(this.pos,e),this.pos+=4}writeF64(e){this.view.setFloat64(this.pos,e),this.pos+=8}writeU64(e){O(this.view,this.pos,e),this.pos+=8}writeI64(e){M(this.view,this.pos,e),this.pos+=8}writeBigUint64(e){this.view.setBigUint64(this.pos,e),this.pos+=8}writeBigInt64(e){this.view.setBigInt64(this.pos,e),this.pos+=8}};function v(n="string",e=67108864){let t=[];for(let r=0;r<n.length;r+=e)t.push(n.slice(r,r+e));return t}var H=new TextEncoder;function O(n,e,t){let r=t/4294967296,i=t;n.setUint32(e,r),n.setUint32(e+4,i)}function M(n,e,t){let r=Math.floor(t/4294967296),i=t;n.setUint32(e,r),n.setUint32(e+4,i)}var k="array",C="map_key",L="map_value",u="bytes",z=RangeError,S=new z("Insufficient data"),d=class{headByte=-1;emptySlot=Symbol("emptySlot");posMapString=new Map;#e={number:this.decodeNumber,string:this.decodeString,Array:this.decodeArray,Object:this.decodeObject,45:this.readString,226:function(){return null},227:function(){},228:function(){return this.emptySlot},229:function(){return!1},230:function(){return!0},231:function(){return this.requiredToReadHeadByte(),BigInt(this.doDecodeSync())},232:this.decodeSymbol,233:this.decodeFunction,234:function(){return this.requiredToReadHeadByte(),new String(this.doDecodeSync())},235:function(){return this.requiredToReadHeadByte(),new Number(this.doDecodeSync())},236:function(){return new Boolean(this.readU8())},237:function(){return new Date(parseInt(this.readI64AsBigInt()))},238:function(){return this.requiredToReadHeadByte(),new URL(this.doDecodeSync())},239:this.decodeRegExp,240:this.decodeError,241:function(){return this.requiredToReadHeadByte(),new Set(this.doDecodeSync())},242:function(){return this.requiredToReadHeadByte(),new Map(this.doDecodeSync())},243:this.decodeBuffer,244:function(){return new DataView(this.decodeBuffer())},245:function(){return this.decodeTypedArray("Int",8)},246:function(){return this.decodeTypedArray("Int",16)},247:function(){return this.decodeTypedArray("Int",32)},248:function(){return this.decodeTypedArray("BigInt",64)},249:function(){return this.state=u,this.requiredToReadHeadByte(),this.doDecodeSync()},250:function(){return this.decodeTypedArray("Uint",8,"Clamped")},251:function(){return this.decodeTypedArray("Uint",16)},252:function(){return this.decodeTypedArray("Uint",32)},253:function(){return this.decodeTypedArray("BigUint",64)},254:function(){return this.decodeTypedArray("Float",32)},255:function(){return this.decodeTypedArray("Float",64)}};constructor(e){this.maxStrLength=e?.maxStrLength??4294967295,this.maxBinLength=e?.maxBinLength??4294967295}reinitializeState(){this.totalPos=0,this.headByte=-1}setBuffer(e){this.bytes=A(e),this.view=V(this.bytes),this.pos=0}hasRemaining(e){return this.view.byteLength-this.pos>=e}createExtraByteError(e){let{view:t,pos:r}=this;return new RangeError(`Extra ${t.byteLength-r} of ${t.byteLength} byte(s) found at buffer[${e}]`)}requiredToReadHeadByte(){this.headByte=-1}decode(e){this.reinitializeState(),this.setBuffer(e);let t=this.doDecodeSync();if(this.hasRemaining(1))throw this.createExtraByteError(this.pos);return t}doDecodeSync(){let e=this.readHeadByte(),t=this.#e?.[e]?.call(this);return this.requiredToReadHeadByte(),this.state=null,t}readHeadByte(){return this.headByte===-1&&(this.headByte=this.readU8()),this.headByte>=100&&this.headByte<=161?"string":this.headByte>=0&&this.headByte<=44||this.headByte>=50&&this.headByte<=94||this.headByte>=98&&this.headByte<100?"number":this.headByte>=162&&this.headByte<=193?"Array":this.headByte>=194&&this.headByte<=225?"Object":this.headByte}readString(){let e=this.readU32();if(this.posMapString.has(e))return this.posMapString.get(e);let t=this.bytes[e]-100,r=B(this.bytes,e+1,t);return this.posMapString.set(e,r),r}decodeNumber(){if(this.headByte<41&&Number.isSafeInteger(this.headByte))return this.headByte;if(this.headByte>50&&this.headByte<=90&&Number.isSafeInteger(this.headByte))return-(this.headByte-50);switch(this.headByte){case 41:return this.readU8();case 42:return this.readU16();case 43:return this.readU32();case 44:return this.readU64();case 50:return-0;case 91:return-this.readU8();case 92:return-this.readU16();case 93:return-this.readU32();case 94:return-this.readU64();case 98:return this.readF32();case 99:return this.readF64()}}decodeStringUsingChunk(){let e=this.readU8(),t="";for(let r=0;r<e;r++)this.requiredToReadHeadByte(),t+=this.doDecodeSync();return t}decodeString(){let e=0,t=0;switch(this.headByte<158&&(e=this.headByte-100),this.headByte){case 158:{e=this.lookU8(),t=1;break}case 159:{e=this.lookU16(),t=2;break}case 160:{e=this.lookU32(),t=4;break}case 161:return this.decodeStringUsingChunk()}return this.decodeUtf8String(e,t)}decodeUtf8String(e,t){if(e>this.maxStrLength)throw new f(`Max length exceeded: UTF-8 byte length (${e}) > maxStrLength (${this.maxStrLength})`);if(this.bytes.byteLength<this.pos+t+e)throw S;let r=this.pos+t,i=B(this.bytes,r,e);return this.pos+=t+e,i}decodeSymbol(){this.requiredToReadHeadByte();let e=this.doDecodeSync();return Symbol(e)}decodeFunction(){this.requiredToReadHeadByte();let e=this.doDecodeSync();return Y(e)}decodeRegExp(){this.requiredToReadHeadByte();let{source:e,flags:t}=this.doDecodeSync();return new RegExp(e,t)}decodeError(){this.requiredToReadHeadByte();let{message:e,cause:t}=this.doDecodeSync();return new Error(e,{cause:t})}decodeBinary(e,t){if(e>this.maxBinLength)throw new f(`Max length exceeded: bin length (${e}) > maxBinLength (${this.maxBinLength})`);if(!this.hasRemaining(e+t))throw S;let r=this.pos+t,i=this.bytes.subarray(r,r+e);return this.pos+=t+e,i}binary(e,t){let r=this.decodeBinary(e,t),{byteOffset:i,length:s}=r;return r.buffer.slice(i,i+s)}binary8(){let e=this.lookU8(),t=this.decodeBinary(e,1),{byteOffset:r,length:i}=t;return t.buffer.slice(r,r+i)}binary16(){let e=this.lookU16(),t=this.decodeBinary(e,2),{byteOffset:r,length:i}=t;return t.buffer.slice(r,r+i)}binary32(){let e=this.lookU32(),t=this.decodeBinary(e,4),{byteOffset:r,length:i}=t;return t.buffer.slice(r,r+i)}decodeBuffer(){this.state=u,this.requiredToReadHeadByte();let e=this.doDecodeSync(),{byteOffset:t,length:r}=e;return e.buffer.slice(t,t+r)}decodeTypedArray(e,t,r=""){let i=this.decodeBuffer();return e!=="Uint"&&(r=""),new self[e+t+r+"Array"](i.transfer(G(i.byteLength,t/8)))}arraySize(e=191){let t=0,r=1,i=this.state==u;return this.headByte<e?t=this.headByte-(e==191?162:194):this.headByte==e?t=i?this.lookU8():this.readU8():this.headByte==e+1?(t=i?this.lookU16():this.readU16(),r=2):this.headByte==e+2&&(t=i?this.lookU32():this.readU32(),r=4),{size:t,headOffset:r}}decodeArray(){let{size:e,headOffset:t}=this.arraySize();if(this.state==u)return this.decodeBinary(e,t);let r=[];this.requiredToReadHeadByte();for(let i=0;i<e;i++){this.state=k;let s=this.doDecodeSync();if(s==this.emptySlot){r.length++;continue}r.push(s)}return this.state=null,r}decodeObject(){let{size:e,_headOffset:t}=this.arraySize(223),r={};this.requiredToReadHeadByte();for(let i=0;i<e;i++){this.state=C;let s=this.doDecodeSync();this.state=L;let o=this.doDecodeSync();r[s]=o}return this.state=null,r}lookU8(){return this.view.getUint8(this.pos)}lookU16(){return this.view.getUint16(this.pos)}lookU32(){return this.view.getUint32(this.pos)}readU8(){let e=this.view.getUint8(this.pos);return this.pos++,e}readI8(){let e=this.view.getInt8(this.pos);return this.pos++,e}readU16(){let e=this.view.getUint16(this.pos);return this.pos+=2,e}readI16(){let e=this.view.getInt16(this.pos);return this.pos+=2,e}readU32(){let e=this.view.getUint32(this.pos);return this.pos+=4,e}readI32(){let e=this.view.getInt32(this.pos);return this.pos+=4,e}readU64(){let e=X(this.view,this.pos);return this.pos+=8,e}readI64(){let e=q(this.view,this.pos);return this.pos+=8,e}readU64AsBigInt(){let e=this.view.getBigUint64(this.pos);return this.pos+=8,e}readI64AsBigInt(){let e=this.view.getBigInt64(this.pos);return this.pos+=8,e}readF32(){let e=this.view.getFloat32(this.pos);return this.pos+=4,e}readF64(){let e=this.view.getFloat64(this.pos);return this.pos+=8,e}};function A(n){return n instanceof Uint8Array?n:ArrayBuffer.isView(n)?new Uint8Array(n.buffer,n.byteOffset,n.byteLength):n instanceof ArrayBuffer?new Uint8Array(n):Uint8Array.from(n)}function V(n){if(n instanceof ArrayBuffer)return new DataView(n);let e=A(n);return new DataView(e.buffer,e.byteOffset,e.byteLength)}function q(n,e){let t=n.getInt32(e),r=n.getUint32(e+4);return t*4294967296+r}function X(n,e){let t=n.getUint32(e),r=n.getUint32(e+4);return t*4294967296+r}var f=class n extends Error{constructor(e){super(e);let t=Object.create(n.prototype);Object.setPrototypeOf(this,t),Object.defineProperty(this,"name",{configurable:!0,enumerable:!1,value:n.name})}};var $=new TextDecoder;function B(n,e,t){let r=n.subarray(e,e+t);return $.decode(r)}function Y(n){if(n.match(/^\s*(async\s*)?function/)||n.match(/^\s*class/)||n.match(/^\s*(.*)\s*=>/))return i(n);return Function("return function "+n)();function i(s){return Function("return "+s)()}}function G(n,e){return Number.isSafeInteger(n/e)?n:Math.ceil(n/e)*e}export{p as base64,x as binary};