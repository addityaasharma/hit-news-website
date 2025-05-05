import { createRouter, createWebHistory } from 'vue-router'
import Normallayout from '@/layout/NormalLayout.vue'
import HitSpecial from '@/views/HitSpecial.vue'
import Shorts from '@/components/Shorts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Normallayout,
      children: [
        {
          path: '',
          name: 'newsfeed',
          component: () => import('@/components/NewsFeed.vue'),
        },
        {
          path: '/:id',
          name: 'HitSpecial',
          component: HitSpecial,
        },
        {
          path: 'shorts',
          name: 'shorts',
          component: Shorts,
        },
      ],
    },
  ],
})

export default router
