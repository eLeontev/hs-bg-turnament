export const getEndpoint = <T>(url: string): Promise<T> =>
    fetch(`http://localhost:3000${url}`).then(
        (res: Response): Promise<T> => res.json()
    );

export const postEndoint = <T, B>(url: string, body: B): Promise<T> =>
    fetch(`http://localhost:3000${url}`, {
        method: 'post',
        body: JSON.stringify(body),
    }).then((res: Response): Promise<T> => res.json());
