import 'server-only';

const dictionaries = {
  it: () => import('@/dictionaries/it.json').then((m) => m.default),
  en: () => import('@/dictionaries/en.json').then((m) => m.default),
  bn: () => import('@/dictionaries/bn.json').then((m) => m.default),
};

export const getDictionary = async (locale) => {
  const loader = dictionaries[locale] ?? dictionaries.it;
  return loader();
};
