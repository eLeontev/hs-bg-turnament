export type ActionId = `${actionTypes}: ${string}`;

export enum actionTypes {
    deletePendingGame = 'deletePendingGame',
    togglePhaseInPlayGame = 'togglePhaseInPlayGame',
}

export const timers = new Map<string, NodeJS.Timeout>();

export const scheduleTask = <T>(
    action: () => any,
    actionId: ActionId,
    delayInMs: number
) => {
    const timeout = setTimeout(action, delayInMs);
    timers.set(actionId, timeout);
};

export const cancelTask = (actionId: ActionId) => {
    if (timers.has(actionId)) {
        clearTimeout(timers.get(actionId));
        timers.delete(actionId);

        return;
    }

    console.warn(actionId, 'is not found');
};

export const formActionId = (actionType: actionTypes, id: string): ActionId =>
    `${actionType}: ${id}`;
