import React from 'react';

const SideBarRoutes = [
    {
      name: 'Overview',
      title: 'Overview',
      path: '/',
      icon: undefined,
      load: React.lazy(() => import('../../pages/Overview/Index')),
    },
    {
      name: 'Portfolio',
      title: 'Portfolio',
      path: '/portfolio',
      icon: undefined,
      load: React.lazy(() => import('../../pages/Portfolio/Index')),
    },
  ];

export { SideBarRoutes };