import { Base64 } from 'js-base64';

class PackedBitsWriter {
    constructor() {
        this.bitsLeftInByte = 8;
        this.currentByte = 0;
        this.bytes = [];
    }

    write(value, length) {
        let val = value;
        let len = length;
        let bitsToRead;
        while (len > 0) {
            if (len >= this.bitsLeftInByte) {
                bitsToRead = this.bitsLeftInByte;
            } else {
                bitsToRead = len;
            }

            const mask = (1 << bitsToRead) - 1;
            this.currentByte |= (val & mask) << (8 - this.bitsLeftInByte);
            this.bitsLeftInByte -= bitsToRead;
            len -= bitsToRead;
            val >>= bitsToRead;
            if (this.bitsLeftInByte <= 0) {
                this.flush();
            }
        }
    }

    flush() {
        this.bytes.push(this.currentByte);
        this.currentByte = 0;
        this.bitsLeftInByte = 8;
    }

    toBase64() {
        return Base64.fromUint8Array(Uint8Array.from(this.bytes));
    }
}

export default PackedBitsWriter;
