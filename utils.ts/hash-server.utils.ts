export const getHash = async (updateValue?: string) => {
    const crypto = await import('node:crypto');
    return crypto
        .createHash('sha256')
        .update(updateValue || Math.random().toString())
        .digest('hex');
};

export const getHashesFromValues = async (values: Array<string>) => {
    let hashes = new Map<string, string>();

    for (let value of values) {
        hashes.set(value, await getHash(value));
    }

    return hashes;
};

export const getHashes = async (length: number): Promise<Array<string>> => {
    let hashes = [];
    while (length) {
        length = length - 1;
        hashes.push(await getHash(`${length}`));
    }

    return hashes;
};
