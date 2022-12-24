let playerId: string = '';

export const getPlayerIdRequest = (
    ...args: [RequestInfo | URL, RequestInit | undefined]
): Promise<string> =>
    playerId
        ? Promise.resolve(playerId)
        : fetch(...args)
              .then((res) => res.json())
              .then((res) => (playerId = res.playerId));
