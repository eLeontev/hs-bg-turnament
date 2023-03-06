export enum playGameActions {
    phaseChangedTo = 'phaseChangedTo',
    heroSelected = 'heroSelected',
    heroesSelected = 'heroesSelected',
    gameOver = 'gameOver',
}

export enum playGamePlayerActions {
    selectHero = 'selectHero',
    purchaseMinion = 'purchaseMinion',
    sellMinion = 'sellMinion',
    playMinion = 'playMinion',
    rollTavernMinions = 'rollTavernMinions',
    upgradeTavern = 'upgradeTavern',
    freezeMinions = 'freezeMinions',
    useHeroPower = 'useHeroPower',
    rearrangeMinionsAttackOrder = 'rearrangeMinionsAttackOrder',
}
