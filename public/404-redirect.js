// Preserve the requested path for the static SPA route resolver on GitHub Pages.
const locationInfo = window.location;
const pathSegmentsToKeep = 0;

locationInfo.replace(
  `${locationInfo.protocol}//${locationInfo.hostname}${locationInfo.port ? `:${locationInfo.port}` : ''}` +
    `${locationInfo.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/')}/?/` +
    `${locationInfo.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~')}` +
    `${locationInfo.search ? `&${locationInfo.search.slice(1).replace(/&/g, '~and~')}` : ''}` +
    locationInfo.hash,
);
