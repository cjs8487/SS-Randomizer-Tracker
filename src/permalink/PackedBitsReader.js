import { Base64 } from 'js-base64';

class PackedBitsReader {
    constructor(bytes) {
        this.bytes = bytes;
        this.currentByteIndex = 0;
        this.currentBitIndex = 0;
    }

    static fromBase64(data) {
        return new PackedBitsReader(Base64.toUint8Array(data));
    }

    read(length) {
        let bitsRead = 0;
        let value = 0;
        let bitsLeftToRead = length;
        while (bitsRead !== length) {
            let bitsToRead;
            if (bitsLeftToRead > 8) {
                bitsToRead = 8;
            } else {
                bitsToRead = bitsLeftToRead;
            }
            if (bitsToRead + this.currentBitIndex > 8) {
                bitsToRead = 8 - this.currentBitIndex;
            }

            const mask = ((1 << bitsToRead) - 1) << this.currentBitIndex;
            const currentByte = this.bytes[this.currentByteIndex];
            // eslint-disable-next-line operator-assignment
            value = ((currentByte & mask) >> this.currentBitIndex) << bitsRead | value;

            this.currentBitIndex += bitsToRead;
            this.currentByteIndex += this.currentBitIndex >> 3;
            this.currentBitIndex %= 8;
            bitsLeftToRead -= bitsToRead;
            bitsRead += bitsToRead;
        }
        return value;
    }
}

export default PackedBitsReader;
