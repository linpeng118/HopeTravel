import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _32866621 = () => interopDefault(import('..\\pages\\test1\\index.vue' /* webpackChunkName: "pages_test1_index" */))
const _dc237dc4 = () => interopDefault(import('..\\pages\\m2\\custom\\index.vue' /* webpackChunkName: "pages_m2_custom_index" */))
const _5e563f52 = () => interopDefault(import('..\\pages\\m2\\custom\\gushi.vue' /* webpackChunkName: "pages_m2_custom_gushi" */))
const _3a6bc1fc = () => interopDefault(import('..\\pages\\m2\\custom\\list.vue' /* webpackChunkName: "pages_m2_custom_list" */))
const _26e971ad = () => interopDefault(import('..\\pages\\m2\\custom\\store.vue' /* webpackChunkName: "pages_m2_custom_store" */))
const _3745c698 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/test1",
      component: _32866621,
      name: "test1"
    }, {
      path: "/m2/custom",
      component: _dc237dc4,
      name: "m2-custom"
    }, {
      path: "/m2/custom/gushi",
      component: _5e563f52,
      name: "m2-custom-gushi"
    }, {
      path: "/m2/custom/list",
      component: _3a6bc1fc,
      name: "m2-custom-list"
    }, {
      path: "/m2/custom/store",
      component: _26e971ad,
      name: "m2-custom-store"
    }, {
      path: "/",
      component: _3745c698,
      name: "index"
    }],

    fallback: false
  })
}
