export type ActionId = `${actionTypes}: ${string}`;

export enum actionTypes {
    deletePendingGame = 'deletePendingGame',
}

export const timers = new Map<string, NodeJS.Timeout>();

export const scheduleTask = <T>(
    action: () => any,
    actionId: ActionId | null,
    delayInMs: number
) => {
    const timeout = setTimeout(action, delayInMs);
    if (actionId) {
        timers.set(actionId, timeout);
    }
};

export const scheduleTaskWithoutCancellation = <T>(
    action: () => any,
    delayInMs: number
) => scheduleTask(action, null, delayInMs);

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
