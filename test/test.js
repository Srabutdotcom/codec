const url = import.meta.url

import { primitives, objects, functions } from './data.js';
import { Encoder, Decoder, base64urlEncode, base64urlDecode, base64ToBytes, bytesToBase64, writencoded, readencoded} from '../src/codec.js';

await writencoded(new URL('primitives.enc', url), primitives);
const primitivesDecoded = await readencoded(new URL('primitives.enc', url));

await writencoded(new URL('objects.enc', url), objects);
const objectsDecoded = await readencoded(new URL('objects.enc', url));

await writencoded(new URL('functions.enc', url), functions);
const functionsDecoded = await readencoded(new URL('functions.enc', url));

debugger;