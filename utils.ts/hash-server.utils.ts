export const getHash = async () => {
    const crypto = await import('node:crypto');
    return crypto
        .createHash('sha256')
        .update(Math.random().toString())
        .digest('hex');
};
