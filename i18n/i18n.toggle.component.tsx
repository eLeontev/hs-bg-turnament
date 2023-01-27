import { Flex, Menu, Text } from '@mantine/core';
import { IconLanguage, IconPoint } from '@tabler/icons';

import { IconButton } from '../features/common/components/button.component';
import { LabelTrans } from './i18n.trans.component';

import { useLocale } from './i18n.hooks';

import { i18nLocales, localesArray } from './i18n.constants';

import { locales } from './enums/i18n.enums';
import { labelI18nKeys } from './enums/i18n.label.enums';

type I18nMenuItemProps = {
    locale: locales;
    selectedLocale: locales;
    setLocale: (locale: locales) => void;
};
const I18nMenuItem = ({
    locale,
    selectedLocale,
    setLocale,
}: I18nMenuItemProps) => (
    <Menu.Item
        onClick={() => setLocale(locale)}
        rightSection={selectedLocale === locale && <IconPoint size={14} />}
    >
        <LabelTrans i18nKey={i18nLocales[locale]}></LabelTrans>
    </Menu.Item>
);

export const I18nToggler = () => {
    const { selectedLocale, setLocale } = useLocale();

    return (
        <>
            <Text mr={16}>
                <LabelTrans i18nKey={i18nLocales[selectedLocale]}></LabelTrans>
            </Text>
            <Menu shadow="md" width={150}>
                <Menu.Target>
                    <Flex mr={40}>
                        <IconButton>
                            <IconLanguage></IconLanguage>
                        </IconButton>
                    </Flex>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>
                        <LabelTrans
                            i18nKey={labelI18nKeys.selectLanguage}
                        ></LabelTrans>
                    </Menu.Label>
                    {localesArray.map((locale) => (
                        <I18nMenuItem
                            key={locale}
                            locale={locale}
                            selectedLocale={selectedLocale}
                            setLocale={setLocale}
                        ></I18nMenuItem>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </>
    );
};
