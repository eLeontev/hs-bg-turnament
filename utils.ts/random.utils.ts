export const getRandom = <T>(arr: Array<T>) =>
    arr[Math.floor(Math.random() * arr.length)];

export const getExcludedRandom = <T>(arr: Array<T>): [T, Array<T>] => {
    const randomItem = getRandom(arr);
    const arrWithExcludedRandom: Array<T> = arr.filter(
        (item) => item !== randomItem
    );

    return [randomItem, arrWithExcludedRandom];
};
