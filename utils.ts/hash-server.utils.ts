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

export const getHashes = async (lenght: number): Promise<Array<string>> => {
    let hashes = [];
    while (lenght) {
        lenght = lenght - 1;
        hashes.push(await getHash(`${lenght}`));
    }

    return hashes;
};
