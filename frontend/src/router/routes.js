import { getDataForRouter, ROUTES } from 'utils/macros/routes';
import PWelcome from 'pages/welcome';
import PError from 'pages/error';

export const routes = [
  [ROUTES.error, PError],
  [ROUTES.welcome, PWelcome],
  [ROUTES.about, () => import('pages/about.vue')],
]
  .map(([route, component]) => ({
    ...getDataForRouter(route),
    component,
  }));
