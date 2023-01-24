import { translate } from './i18n.service';

import { useI18nStore, localeSelector } from './i18n.store';

import { namespaces } from './i18n.enums';

import { TransProps, NsTransProps } from './i18n.models';

const Trans = <T extends namespaces>({ i18nKey, ns }: TransProps<T>) => {
    const locale = useI18nStore(localeSelector);
    return <>{translate(locale, ns, i18nKey)}</>;
};

export const LabelTrans = ({ i18nKey }: NsTransProps<namespaces.labels>) => (
    <Trans i18nKey={i18nKey} ns={namespaces.labels}></Trans>
);

export const HeroTrans = ({ i18nKey }: NsTransProps<namespaces.heroes>) => (
    <Trans i18nKey={i18nKey} ns={namespaces.heroes}></Trans>
);

export const MinionTrans = ({ i18nKey }: NsTransProps<namespaces.minions>) => (
    <Trans i18nKey={i18nKey} ns={namespaces.minions}></Trans>
);
