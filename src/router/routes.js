
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Customer.vue') },
      { path: '/customer', component: () => import('pages/Customer.vue') },
      { path: '/customer/:id', component: () => import('pages/Customer.vue') },
      { path: '/admin', component: () => import('pages/Admin.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
