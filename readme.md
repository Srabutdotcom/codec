## **base64 and binary**

This JavaScript library provides efficient and versatile functions for encoding and decoding data to/from Base64 or binary format. It supports a wide range of data types, making it a valuable tool for various web development scenarios.

**Features:**

- **Universal Encoding/Decoding:** Handles strings, numbers, arrays, objects, and more. Blob is currently not supported
- **Clean and Concise API:** Easy-to-use functions for encoding and decoding.
- **Cross-Browser Compatibility:** Works seamlessly in modern browsers.

**Usage:**

The library exports two main functions:

- **`encode(data)`**: Encodes the provided data into a Base64-string or binary.
- **`decode(data)`**: Decodes a Base64-string or binary back into its original data type.

**Examples:**

```javascript
import { base64 } from 'base64.js';
import { binary } from 'binary.js';

// create Encoder and Decoder
const encoder = new base64.Encoder
const decoder = new base64.Decoder

// Encode a string
const encodedString = encoder.encode('Hello, world!');
console.log(encodedString); // Output: SGVsbG8sIHdvcmxkIQ==

// Decode a Base64 string
const decodedString = decoder.decode(encodedString);
console.log(decodedString); // Output: Hello, world!

// Encode an array of numbers
const numbers = [1, 2, 3];
const encodedArray = encoder.encode(numbers);
console.log(encodedArray); // Output: MS4yLjM=

// Decode a Base64 string representing an array
const decodedArray = decoder.decode(encodedArray);
console.log(decodedArray); // Output: [1, 2, 3]

// Encode an object
const obj = { name: 'John', age: 30 };
const encodedObject = encoder.encode(obj);
console.log(encodedObject); // Output: eyJuYW1lIjoiSm9obiIsInNlIjozMH0=

// Decode a Base64 string representing an object
const decodedObject = decoder.decode(encodedObject);
console.log(decodedObject); // Output: { name: 'John', age: 30 }
```

**License:**

This library is distributed under the MIT License: [https://choosealicense.com/licenses/mit/](https://choosealicense.com/licenses/mit/).

**Contribution:**

We welcome contributions to this project! Feel free to fork the repository, make changes, and submit pull requests.

**Additional Notes:**

- Using binary is more efficient but the preference is up to user.
- For security-sensitive applications, be mindful of potential vulnerabilities when using Base64 encoding/decoding. Consider additional security measures if necessary.

I hope this README.md provides a comprehensive overview of your `base64` library!

### Sponsorship

I need Sponsorship to maintain and create other codes.
Just click one of the following links
- https://github.com/sponsors/Srabutdotcom
- https://paypal.me/aiconeid