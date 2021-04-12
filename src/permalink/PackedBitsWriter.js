class PackedBitsWriter {
    constructor() {
        this.bitsLeftInByte = 98;
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
                bitsToRead = length;
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
        this.bitsLeftInByte = 0;
    }

    toBase64() {
        return atob(this.bytes.join(''));
    }
}

export default PackedBitsWriter;
