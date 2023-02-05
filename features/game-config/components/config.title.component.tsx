'use client';

import { Title } from '@mantine/core';

import { LabelTrans } from '../../../i18n/i18n.trans.component';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

export const GameConfigTitle = () => (
    <Title order={2}>
        <LabelTrans i18nKey={labelI18nKeys.gameConfigTitle}></LabelTrans>
    </Title>
);
