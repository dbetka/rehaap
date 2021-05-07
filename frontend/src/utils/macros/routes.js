import { translator } from 'src/dictionary';
import { ICONS } from '@dbetka/vue-material-icons';

export function getDataForRouter (route) {
  return {
    path: route.path,
    name: route.name,
    meta: route.meta,
  };
}

export const ROUTES = {
  error: {
    path: '*',
    name: 'error',
    label: translator.t('title.error'),
    shortLabel: translator.t('title.short.error'),
    meta: {
      onlyBeforeLogin: false,
      requiredAuth: false,
    },
  },
  welcome: {
    path: '/',
    name: 'welcome',
    label: '',
    shortLabel: '',
    icon: ICONS.sensor_door,
    meta: {
      onlyBeforeLogin: true,
      requiredAuth: false,
    },
  },
  about: {
    path: '/about',
    name: 'about',
    label: translator.t('title.about'),
    shortLabel: translator.t('title.about'),
    icon: ICONS.emoji_objects,
    meta: {
      onlyBeforeLogin: false,
      requiredAuth: false,
    },
  },
};
