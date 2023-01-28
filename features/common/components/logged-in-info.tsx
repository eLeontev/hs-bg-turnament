import { Group, Text } from '@mantine/core';

import { LabelTrans } from '../../../i18n/i18n.trans.component';
import { InlineLink } from './link.component';

import { useI18nLabelTranslate } from '../../../i18n/i18n.hooks';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

import { pendingGamesPageUrl } from '../../../constants/urls';

export const LoggedInInfo = () => {
    const t = useI18nLabelTranslate();
    return (
        <Group>
            <Text component="p">
                <LabelTrans
                    i18nKey={labelI18nKeys.welcomeHelperText}
                ></LabelTrans>
            </Text>
            <InlineLink
                href={pendingGamesPageUrl}
                label={t(labelI18nKeys.welcomeRedirectLink)}
            ></InlineLink>
        </Group>
    );
};
