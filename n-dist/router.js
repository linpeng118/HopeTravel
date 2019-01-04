import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _3dd73d3e = () => interopDefault(import('..\\pages\\local_regiment\\index.vue' /* webpackChunkName: "pages_local_regiment_index" */))
const _5b4f5110 = () => interopDefault(import('..\\pages\\test1\\index.vue' /* webpackChunkName: "pages_test1_index" */))
const _e80458e2 = () => interopDefault(import('..\\pages\\m2\\custom\\index.vue' /* webpackChunkName: "pages_m2_custom_index" */))
const _8e6051a2 = () => interopDefault(import('..\\pages\\local_regiment\\components\\tags\\index.vue' /* webpackChunkName: "pages_local_regiment_components_tags_index" */))
const _5865d1c3 = () => interopDefault(import('..\\pages\\m2\\custom\\gushi.vue' /* webpackChunkName: "pages_m2_custom_gushi" */))
const _5635fa71 = () => interopDefault(import('..\\pages\\m2\\custom\\list.vue' /* webpackChunkName: "pages_m2_custom_list" */))
const _20f9041e = () => interopDefault(import('..\\pages\\m2\\custom\\store.vue' /* webpackChunkName: "pages_m2_custom_store" */))
const _4e79359a = () => interopDefault(import('..\\pages\\local_regiment\\components\\items\\hotItem.vue' /* webpackChunkName: "pages_local_regiment_components_items_hotItem" */))
const _74e810a5 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
      path: "/local_regiment",
      component: _3dd73d3e,
      name: "local_regiment"
    }, {
      path: "/test1",
      component: _5b4f5110,
      name: "test1"
    }, {
      path: "/m2/custom",
      component: _e80458e2,
      name: "m2-custom"
    }, {
      path: "/local_regiment/components/tags",
      component: _8e6051a2,
      name: "local_regiment-components-tags"
    }, {
      path: "/m2/custom/gushi",
      component: _5865d1c3,
      name: "m2-custom-gushi"
    }, {
      path: "/m2/custom/list",
      component: _5635fa71,
      name: "m2-custom-list"
    }, {
      path: "/m2/custom/store",
      component: _20f9041e,
      name: "m2-custom-store"
    }, {
      path: "/local_regiment/components/items/hotItem",
      component: _4e79359a,
      name: "local_regiment-components-items-hotItem"
    }, {
      path: "/",
      component: _74e810a5,
      name: "index"
    }],

    fallback: false
  })
}
