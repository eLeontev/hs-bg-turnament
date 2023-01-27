import { Group, Text } from '@mantine/core';

import { InlineLink } from '../../common/components/link.component';

import { useI18nTranslate } from '../../../i18n/i18n.hooks';

import { loginPageUrl } from '../../../constants/urls';

import { labelI18nKeys } from '../../../i18n/enums/i18n.label.enums';

export const LoginInfo = () => {
    const t = useI18nTranslate();
    return (
        <Group>
            <Text>{t(labelI18nKeys.loginInfoText)}</Text>
            <InlineLink
                href={loginPageUrl}
                label={t(labelI18nKeys.loginPageLink)}
            ></InlineLink>
        </Group>
    );
};
