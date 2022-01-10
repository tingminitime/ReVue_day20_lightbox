import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import PicList from '../views/PicList.vue'
import Pic from '../views/Pic.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home
    }
  },
  {
    path: '/pic',
    name: 'PicList',
    // component: PicList,
    components: {
      default: PicList
    },
    meta: {
      type: 'container'
    }
  },
  {
    path: '/pic/:id',
    name: 'Pic',
    // component: Pic,
    components: {
      default: Pic
    },
    props: {
      default (route) {
        return {
          id: route.params.id
        }
      },
      lightbox (route) {
        return {
          id: route.params.id
        }
      }
    },
    meta: {
      type: 'content',
      lightbox: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 因為只有一頁，所以也可以做 brforeEnter
router.beforeEach((to, from, next) => {
  console.log('to: ', to)
  console.log('from: ', from)
  // 當每個路由在切換時準備兩件事，假設從 container容器頁(PicList)跑到內容頁(Pic)，你準備要開 lightbox
  // 第一次從其他地方進來網站

  // 確保client side render 頁面導頁面，不是第一次從其他地方進來網站才要判斷 lightbox
  if (from.matched.length) {
    const fromMatch = from.matched[0]
    const toMatch = to.matched[0]
    let defaultComponent = null

    // 如果在 lightbox 模式下點選到 PicList
    if (toMatch.meta.type === 'container') {
      store.commit('RESET_LIGHTBOX')
    }

    // 處理 from 來源
    if (fromMatch.meta.type === 'container' && to.meta.type === 'content') {
      defaultComponent = fromMatch.components.default
      // 來源已經開 lightbox
    } else if (fromMatch.components.lightbox) {
      // 拿來源的東西當襯底，先記著，等等要打開
      defaultComponent = fromMatch.components.default
      // 新的來之前先關掉，先復原
      fromMatch.components.default = fromMatch.components.lightbox
      fromMatch.components.lightbox = null
      from.meta.lightbox = false
    }

    // 處理 to: 站內路由互換，要判斷你是不是去 content還有lightbox有無墊底，是，那就切換位置，打開 lightbox
    if (defaultComponent && to.meta.type === 'content') {
      toMatch.components.lightbox = toMatch.components.default
      toMatch.components.default = defaultComponent
      to.meta.lightbox = true
    }
  }

  next()
})

export default router
