/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".app.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/app.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var organisms_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! organisms/header */ "./src/components/organisms/header.vue");
/* harmony import */ var organisms_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! organisms/menu */ "./src/components/organisms/menu.vue");
/* harmony import */ var organisms_footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! organisms/footer */ "./src/components/organisms/footer.vue");
/* harmony import */ var organisms_loading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! organisms/loading */ "./src/components/organisms/loading.vue");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var molecules_snackbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! molecules/snackbar */ "./src/components/molecules/snackbar.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    MSnackbar: molecules_snackbar__WEBPACK_IMPORTED_MODULE_5__["default"],
    OHeader: organisms_header__WEBPACK_IMPORTED_MODULE_0__["default"],
    OMenu: organisms_menu__WEBPACK_IMPORTED_MODULE_1__["default"],
    OFooter: organisms_footer__WEBPACK_IMPORTED_MODULE_2__["default"],
    OLoading: organisms_loading__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  computed: { ...Object(vuex__WEBPACK_IMPORTED_MODULE_4__["mapGetters"])(['isLoading', 'routerId']),
    ...Object(vuex__WEBPACK_IMPORTED_MODULE_4__["mapGetters"])('menu', ['isOpen'])
  },
  methods: { ...Object(vuex__WEBPACK_IMPORTED_MODULE_4__["mapMutations"])('menu', {
      openMenu: 'open',
      closeMenu: 'close'
    }),

    openMenuIfLogin() {
      /* this.$store.getters['user/isLogin'] && */
      this.openMenu();
    }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/button.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/atoms/button.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var atoms_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! atoms/loader */ "./src/components/atoms/loader.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'a-button',
  components: {
    ALoader: atoms_loader__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    addClass: {
      type: [Array, String],
      default: ''
    },
    loadingImg: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    getClass() {
      const classes = [this.addClass];

      if (this.loading) {
        classes.push('f-loading');
      }

      return classes;
    }

  },
  methods: {
    emitClick(event) {
      if (this.disabled === false) {
        this.$emit('click', event);
      }
    }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/button/primary.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/atoms/button/primary.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var atoms_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! atoms/button */ "./src/components/atoms/button.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'a-button-primary',
  components: {
    AButton: atoms_button__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    addClass: {
      type: [Array, String],
      default: ''
    },
    type: {
      type: String,
      default: 'button'
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/button/secondary.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/atoms/button/secondary.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var atoms_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! atoms/button */ "./src/components/atoms/button.vue");
/* harmony import */ var utils_style_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/style-manager */ "./src/utils/style-manager.js");
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'a-button-secondary',
  components: {
    AButton: atoms_button__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    addClass: {
      type: [Array, String],
      default: ''
    }
  },
  computed: {
    loadingImg() {
      if (this.$store.getters['theme/name'] === utils_style_manager__WEBPACK_IMPORTED_MODULE_1__["THEMES"].dark) {
        return '/img/zhp-52.png';
      } else {
        return '/img/zhp-green-52.png';
      }
    }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/link-menu.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/atoms/link-menu.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'a-link-menu',
  props: {
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/loader.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/atoms/loader.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'a-loader',
  props: {
    addClass: {
      type: [Array, String],
      default: ''
    },
    img: {
      type: String,
      default: '/img/zhp-52.png'
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/molecules/snackbar.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/molecules/snackbar.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'm-snackbar',
  computed: { ...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('snackbar', ['isOpen', 'message', 'error', 'success']),

    colorClasses() {
      if (this.error) return 'f-error';
      if (this.success) return 'f-success';else return '';
    }

  },
  methods: { ...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapMutations"])('snackbar', ['close'])
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/footer.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/organisms/footer.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'o-footer',
  methods: { ...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapMutations"])('menu', ['toggle']),

    isActualPath({
      path = ''
    }) {
      if (this.$store.getters['menu/isOpen']) {
        return path === '';
      } else {
        return this.$route.path === path;
      }
    }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/header.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/organisms/header.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var utils_macros_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/macros/routes */ "./src/utils/macros/routes.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'o-header',
  computed: { ...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('header', ['pageTitle', 'backRouteName']),

    isMainPage() {
      return [utils_macros_routes__WEBPACK_IMPORTED_MODULE_1__["ROUTES"].welcome.name].includes(this.$route.name);
    },

    pathBackButton() {
      return utils_macros_routes__WEBPACK_IMPORTED_MODULE_1__["ROUTES"].welcome.path;
    }

  },
  methods: {
    redirectToCollectedPointsOrScoreboard() {
      this.$router.push(utils_macros_routes__WEBPACK_IMPORTED_MODULE_1__["ROUTES"].about);
    }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/loading.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/organisms/loading.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var atoms_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! atoms/loader */ "./src/components/atoms/loader.vue");
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'o-loading',
  components: {
    ALoader: atoms_loader__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/menu.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/organisms/menu.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var utils_style_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/style-manager */ "./src/utils/style-manager.js");
/* harmony import */ var utils_macros_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! utils/macros/routes */ "./src/utils/macros/routes.js");
/* harmony import */ var src_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/router */ "./src/router/index.js");
/* harmony import */ var _dbetka_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @dbetka/utils */ "./node_modules/@dbetka/utils/dist/index.js");
/* harmony import */ var _dbetka_utils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_dbetka_utils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var atoms_link_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! atoms/link-menu */ "./src/components/atoms/link-menu.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'o-menu',
  components: {
    ALinkMenu: atoms_link_menu__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  data: () => ({
    THEMES: utils_style_manager__WEBPACK_IMPORTED_MODULE_1__["THEMES"],
    VERSION: "0.1.0",
    canToggleTheme: true
  }),
  computed: { ...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('menu', ['isOpen']),

    links() {
      const isAdmin = this.checkIsAdmin();
      const isUnlimited = isAdmin && this.checkIsNotLimited();
      const isCommon = this.checkIsCommon();
      const links = [utils_macros_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"].start, utils_macros_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"].temporaryPoints, isCommon ? utils_macros_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"].collectPoint : undefined, isAdmin ? utils_macros_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"].scoreboard : utils_macros_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"].collectedPoints, isUnlimited ? utils_macros_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"].editEvent : undefined, isUnlimited ? utils_macros_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"].newPoint : undefined, utils_macros_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"].map, isCommon ? utils_macros_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"].about : undefined];
      return links.filter(route => _dbetka_utils__WEBPACK_IMPORTED_MODULE_4__["uCheck"].isUndefined(route) === false);
    },

    themeName() {
      return this.$store.getters['theme/name'];
    }

  },
  methods: { ...Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapMutations"])('menu', ['toggle', 'close']),

    openGuide() {
      this.$store.commit('guide/open');
      this.close();
    },

    isActualPath({
      path = ''
    }) {
      return this.$route.path === path;
    },

    toggleTheme() {
      if (this.canToggleTheme) {
        this.canToggleTheme = false;
        this.$store.commit('theme/toggle');
        src_router__WEBPACK_IMPORTED_MODULE_3__["default"].hardReload();
        this.close();
        setTimeout(() => {
          this.canToggleTheme = true;
        }, 500);
      }
    },

    signOut() {
      this.$store.dispatch('user/signOut').finally(() => this.onSignOut());
    },

    onSignOut() {
      this.$router.push(utils_macros_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"].welcome.path);
    }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/pages/error.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/pages/error.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var templates_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! templates/page */ "./src/components/templates/page.vue");
/* harmony import */ var atoms_button_primary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! atoms/button/primary */ "./src/components/atoms/button/primary.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'p-error',
  components: {
    AButtonPrimary: atoms_button_primary__WEBPACK_IMPORTED_MODULE_1__["default"],
    TPage: templates_page__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  methods: {
    redirectToMainPage() {
      const isLogin = this.$store.getters['user/isLogin'];
      const route = isLogin ? this.ROUTES.start : this.ROUTES.welcome;
      this.$router.push(route.path);
    }

  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/pages/welcome.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/pages/welcome.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var templates_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! templates/page */ "./src/components/templates/page.vue");
/* harmony import */ var atoms_button_primary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! atoms/button/primary */ "./src/components/atoms/button/primary.vue");
/* harmony import */ var atoms_button_secondary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! atoms/button/secondary */ "./src/components/atoms/button/secondary.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'p-welcome',
  components: {
    AButtonSecondary: atoms_button_secondary__WEBPACK_IMPORTED_MODULE_2__["default"],
    AButtonPrimary: atoms_button_primary__WEBPACK_IMPORTED_MODULE_1__["default"],
    TPage: templates_page__WEBPACK_IMPORTED_MODULE_0__["default"]
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/templates/page.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/templates/page.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var utils_macros_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/macros/routes */ "./src/utils/macros/routes.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 't-page',
  props: {
    backRoute: {
      type: Object,
      default: () => ({
        name: ''
      })
    },
    letSwipeMenu: {
      type: Boolean,
      default: true
    }
  },

  mounted() {
    const route = utils_macros_routes__WEBPACK_IMPORTED_MODULE_0__["ROUTES"][this.$router.currentRoute.name] || {};
    const title = route.label;
    this.$store.commit('header/setPageTitle', title);
    this.$store.commit('header/setBackRouteName', this.backRoute);

    if (title) {
      document.title = `${title} - ${"HarcMap"}`;
    } else {
      document.title = "HarcMap";
    }
  },

  computed: { ...Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapGetters"])('user', ['isLogin'])
  },
  methods: { ...Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapMutations"])('menu', ['open']),

    openMenu() {
      if (this.letSwipeMenu && this.isLogin) {
        this.open();
      }
    }

  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/import-glob-loader/index.js!./src/style/dark.sass":
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/import-glob-loader!./src/style/dark.sass ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".fade-enter-active, .fade-leave-active {\n  transition: opacity 0.3s;\n}\n\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n}\n\n.slider-pagination-bullet {\n  background-color: #fafafa !important;\n  opacity: 0.3 !important;\n}\n\n.swiper-container-horizontal .slider-pagination-bullet-active, .swiper-container-vertical .slider-pagination-bullet-active {\n  background-color: #fafafa !important;\n  opacity: 1 !important;\n}\n\n.a-input.f-select, .a-field {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  transition-duration: 200ms;\n}\n\n.t-base, body {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n\nhtml {\n  overflow-y: hidden;\n  background-color: #121212;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  overflow-x: hidden;\n  font-family: Roboto, sans-serif;\n  color: #fafafa;\n  background-color: #121212;\n}\n\n* {\n  box-sizing: border-box;\n}\n\n.f-bold {\n  font-weight: bold;\n}\n\n.f-display-none {\n  display: none;\n}\n\n.f-hidden {\n  visibility: hidden;\n}\n\n.f-visible {\n  visibility: visible;\n}\n\n.f-disabled {\n  opacity: 0.5;\n}\n\n.f-list-disc {\n  list-style: disc;\n}\n\n.f-cursor-pointer {\n  cursor: pointer;\n}\n\n.f-cursor-default {\n  cursor: default;\n}\n\n.f-block {\n  display: block;\n}\n\n.f-inline-block {\n  display: inline-block;\n}\n\n.f-flex, .m-panel.f-start, .m-panel.f-header, .m-list-element.f-popup, .m-clock, .a-list-tile, .a-link.f-menu {\n  display: flex !important;\n}\n\n.f-flex-1, .a-list-tile {\n  flex: 1;\n}\n\n.f-flex-0 {\n  flex: 0;\n}\n\n.f-flex-col, .m-panel.f-start, .m-panel.f-header.f-center, .a-list-tile {\n  flex-direction: column;\n}\n\n.f-flex-row, .m-panel.f-header.f-side {\n  flex-direction: row;\n}\n\n.f-flex-al-center, .m-panel.f-start, .m-panel.f-header.f-side {\n  align-items: center;\n}\n\n.f-flex-just-center, .m-clock {\n  justify-content: center;\n}\n\n.f-flex-al-end {\n  align-items: flex-end;\n}\n\n.f-flex-just-end, .m-panel.f-header.f-center {\n  justify-content: flex-end;\n}\n\n.f-flex-al-start {\n  align-items: flex-start;\n}\n\n.f-flex-just-start, .a-list-tile {\n  justify-content: start;\n}\n\n.f-flex-just-space-between {\n  justify-content: space-between;\n}\n\n.f-flex-just-space-around {\n  justify-content: space-around;\n}\n\n.f-height-100 {\n  height: 100%;\n}\n\n.f-m--2 {\n  margin: -16px -16px !important;\n}\n\n.f-m--1 {\n  margin: -8px -8px !important;\n}\n\n.f-m-0 {\n  margin: 0 0 !important;\n}\n\n.f-m-1 {\n  margin: 8px 8px !important;\n}\n\n.f-m-2 {\n  margin: 16px 16px !important;\n}\n\n.f-m-3 {\n  margin: 24px 24px !important;\n}\n\n.f-m-4 {\n  margin: 32px 32px !important;\n}\n\n.f-m-5 {\n  margin: 40px 40px !important;\n}\n\n.f-m-6 {\n  margin: 48px 48px !important;\n}\n\n.f-m-auto {\n  margin: auto auto !important;\n}\n\n.f-mx--2 {\n  margin-left: -16px !important;\n  margin-right: -16px !important;\n}\n\n.f-ml--2 {\n  margin-left: -16px !important;\n}\n\n.f-mr--2 {\n  margin-right: -16px !important;\n}\n\n.f-mx--1 {\n  margin-left: -8px !important;\n  margin-right: -8px !important;\n}\n\n.f-ml--1 {\n  margin-left: -8px !important;\n}\n\n.f-mr--1 {\n  margin-right: -8px !important;\n}\n\n.f-mx-0 {\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n}\n\n.f-ml-0 {\n  margin-left: 0 !important;\n}\n\n.f-mr-0 {\n  margin-right: 0 !important;\n}\n\n.f-mx-1 {\n  margin-left: 8px !important;\n  margin-right: 8px !important;\n}\n\n.f-ml-1 {\n  margin-left: 8px !important;\n}\n\n.f-mr-1 {\n  margin-right: 8px !important;\n}\n\n.f-mx-2 {\n  margin-left: 16px !important;\n  margin-right: 16px !important;\n}\n\n.f-ml-2 {\n  margin-left: 16px !important;\n}\n\n.f-mr-2 {\n  margin-right: 16px !important;\n}\n\n.f-mx-3 {\n  margin-left: 24px !important;\n  margin-right: 24px !important;\n}\n\n.f-ml-3 {\n  margin-left: 24px !important;\n}\n\n.f-mr-3 {\n  margin-right: 24px !important;\n}\n\n.f-mx-4 {\n  margin-left: 32px !important;\n  margin-right: 32px !important;\n}\n\n.f-ml-4 {\n  margin-left: 32px !important;\n}\n\n.f-mr-4 {\n  margin-right: 32px !important;\n}\n\n.f-mx-5 {\n  margin-left: 40px !important;\n  margin-right: 40px !important;\n}\n\n.f-ml-5 {\n  margin-left: 40px !important;\n}\n\n.f-mr-5 {\n  margin-right: 40px !important;\n}\n\n.f-mx-6 {\n  margin-left: 48px !important;\n  margin-right: 48px !important;\n}\n\n.f-ml-6 {\n  margin-left: 48px !important;\n}\n\n.f-mr-6 {\n  margin-right: 48px !important;\n}\n\n.f-mx-auto {\n  margin-left: auto !important;\n  margin-right: auto !important;\n}\n\n.f-ml-auto {\n  margin-left: auto !important;\n}\n\n.f-mr-auto {\n  margin-right: auto !important;\n}\n\n.f-my--2 {\n  margin-top: -16px !important;\n  margin-bottom: -16px !important;\n}\n\n.f-mt--2 {\n  margin-top: -16px !important;\n}\n\n.f-mb--2 {\n  margin-bottom: -16px !important;\n}\n\n.f-my--1 {\n  margin-top: -8px !important;\n  margin-bottom: -8px !important;\n}\n\n.f-mt--1 {\n  margin-top: -8px !important;\n}\n\n.f-mb--1 {\n  margin-bottom: -8px !important;\n}\n\n.f-my-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n}\n\n.f-mt-0 {\n  margin-top: 0 !important;\n}\n\n.f-mb-0 {\n  margin-bottom: 0 !important;\n}\n\n.f-my-1 {\n  margin-top: 8px !important;\n  margin-bottom: 8px !important;\n}\n\n.f-mt-1 {\n  margin-top: 8px !important;\n}\n\n.f-mb-1, .m-row.f-header, .a-text.f-title.f-table, .f-title.f-table.m-box.f-panel, .f-table.m-banner.f-panel {\n  margin-bottom: 8px !important;\n}\n\n.f-my-2 {\n  margin-top: 16px !important;\n  margin-bottom: 16px !important;\n}\n\n.f-mt-2 {\n  margin-top: 16px !important;\n}\n\n.f-mb-2 {\n  margin-bottom: 16px !important;\n}\n\n.f-my-3 {\n  margin-top: 24px !important;\n  margin-bottom: 24px !important;\n}\n\n.f-mt-3, .m-area.f-button.f-fill {\n  margin-top: 24px !important;\n}\n\n.f-mb-3 {\n  margin-bottom: 24px !important;\n}\n\n.f-my-4 {\n  margin-top: 32px !important;\n  margin-bottom: 32px !important;\n}\n\n.f-mt-4 {\n  margin-top: 32px !important;\n}\n\n.f-mb-4, .m-area.f-button.f-fill {\n  margin-bottom: 32px !important;\n}\n\n.f-my-5 {\n  margin-top: 40px !important;\n  margin-bottom: 40px !important;\n}\n\n.f-mt-5 {\n  margin-top: 40px !important;\n}\n\n.f-mb-5 {\n  margin-bottom: 40px !important;\n}\n\n.f-my-6 {\n  margin-top: 48px !important;\n  margin-bottom: 48px !important;\n}\n\n.f-mt-6 {\n  margin-top: 48px !important;\n}\n\n.f-mb-6 {\n  margin-bottom: 48px !important;\n}\n\n.f-my-auto {\n  margin-top: auto !important;\n  margin-bottom: auto !important;\n}\n\n.f-mt-auto {\n  margin-top: auto !important;\n}\n\n.f-mb-auto {\n  margin-bottom: auto !important;\n}\n\n.f-scroll-default {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.f-p--2 {\n  padding: -16px -16px;\n}\n\n.f-p--1 {\n  padding: -8px -8px;\n}\n\n.f-p-0, .t-page.f-start {\n  padding: 0 0;\n}\n\n.f-p-1 {\n  padding: 8px 8px;\n}\n\n.f-p-2, .m-slide {\n  padding: 16px 16px;\n}\n\n.f-p-3 {\n  padding: 24px 24px;\n}\n\n.f-p-4 {\n  padding: 32px 32px;\n}\n\n.f-p-5 {\n  padding: 40px 40px;\n}\n\n.f-p-6 {\n  padding: 48px 48px;\n}\n\n.f-p-auto {\n  padding: auto auto;\n}\n\n.f-px--2 {\n  padding-left: -16px;\n  padding-right: -16px;\n}\n\n.f-pl--2 {\n  padding-left: -16px;\n}\n\n.f-pr--2 {\n  padding-right: -16px;\n}\n\n.f-px--1 {\n  padding-left: -8px;\n  padding-right: -8px;\n}\n\n.f-pl--1 {\n  padding-left: -8px;\n}\n\n.f-pr--1 {\n  padding-right: -8px;\n}\n\n.f-px-0 {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.f-pl-0 {\n  padding-left: 0;\n}\n\n.f-pr-0 {\n  padding-right: 0;\n}\n\n.f-px-1 {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\n.f-pl-1 {\n  padding-left: 8px;\n}\n\n.f-pr-1 {\n  padding-right: 8px;\n}\n\n.f-px-2 {\n  padding-left: 16px;\n  padding-right: 16px;\n}\n\n.f-pl-2, .a-list-tile {\n  padding-left: 16px;\n}\n\n.f-pr-2 {\n  padding-right: 16px;\n}\n\n.f-px-3 {\n  padding-left: 24px;\n  padding-right: 24px;\n}\n\n.f-pl-3 {\n  padding-left: 24px;\n}\n\n.f-pr-3 {\n  padding-right: 24px;\n}\n\n.f-px-4 {\n  padding-left: 32px;\n  padding-right: 32px;\n}\n\n.f-pl-4 {\n  padding-left: 32px;\n}\n\n.f-pr-4 {\n  padding-right: 32px;\n}\n\n.f-px-5 {\n  padding-left: 40px;\n  padding-right: 40px;\n}\n\n.f-pl-5 {\n  padding-left: 40px;\n}\n\n.f-pr-5 {\n  padding-right: 40px;\n}\n\n.f-px-6 {\n  padding-left: 48px;\n  padding-right: 48px;\n}\n\n.f-pl-6 {\n  padding-left: 48px;\n}\n\n.f-pr-6 {\n  padding-right: 48px;\n}\n\n.f-px-auto {\n  padding-left: auto;\n  padding-right: auto;\n}\n\n.f-pl-auto {\n  padding-left: auto;\n}\n\n.f-pr-auto {\n  padding-right: auto;\n}\n\n.f-py--2 {\n  padding-top: -16px;\n  padding-bottom: -16px;\n}\n\n.f-pt--2 {\n  padding-top: -16px;\n}\n\n.f-pb--2 {\n  padding-bottom: -16px;\n}\n\n.f-py--1 {\n  padding-top: -8px;\n  padding-bottom: -8px;\n}\n\n.f-pt--1 {\n  padding-top: -8px;\n}\n\n.f-pb--1 {\n  padding-bottom: -8px;\n}\n\n.f-py-0 {\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\n.f-pt-0 {\n  padding-top: 0;\n}\n\n.f-pb-0 {\n  padding-bottom: 0;\n}\n\n.f-py-1 {\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n\n.f-pt-1 {\n  padding-top: 8px;\n}\n\n.f-pb-1 {\n  padding-bottom: 8px;\n}\n\n.f-py-2, .m-grid.f-temporary-points, .f-temporary-points.m-row.f-header {\n  padding-top: 16px;\n  padding-bottom: 16px;\n}\n\n.f-pt-2 {\n  padding-top: 16px;\n}\n\n.f-pb-2 {\n  padding-bottom: 16px;\n}\n\n.f-py-3 {\n  padding-top: 24px;\n  padding-bottom: 24px;\n}\n\n.f-pt-3, .a-message.f-table {\n  padding-top: 24px;\n}\n\n.f-pb-3 {\n  padding-bottom: 24px;\n}\n\n.f-py-4 {\n  padding-top: 32px;\n  padding-bottom: 32px;\n}\n\n.f-pt-4 {\n  padding-top: 32px;\n}\n\n.f-pb-4 {\n  padding-bottom: 32px;\n}\n\n.f-py-5 {\n  padding-top: 40px;\n  padding-bottom: 40px;\n}\n\n.f-pt-5 {\n  padding-top: 40px;\n}\n\n.f-pb-5 {\n  padding-bottom: 40px;\n}\n\n.f-py-6 {\n  padding-top: 48px;\n  padding-bottom: 48px;\n}\n\n.f-pt-6 {\n  padding-top: 48px;\n}\n\n.f-pb-6 {\n  padding-bottom: 48px;\n}\n\n.f-py-auto {\n  padding-top: auto;\n  padding-bottom: auto;\n}\n\n.f-pt-auto {\n  padding-top: auto;\n}\n\n.f-pb-auto {\n  padding-bottom: auto;\n}\n\n.f-fill-abs {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.f-fill-rel {\n  position: relative;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.f-fill-fix {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.f-relative {\n  position: relative;\n}\n\n.f-absolute {\n  position: absolute;\n}\n\n.f-z-index-6 {\n  z-index: 6;\n}\n\n.f-text-bold, .a-text.f-title.f-table, .f-title.f-table.m-box.f-panel, .f-table.m-banner.f-panel, .a-text.f-strong, .m-box.f-panel, .f-strong.m-banner.f-panel {\n  font-weight: bold;\n}\n\n.f-text-normal {\n  font-weight: normal;\n}\n\n.f-text-uppercase {\n  text-transform: uppercase;\n}\n\n.f-text-italic {\n  font-style: italic;\n}\n\n.f-text-underline {\n  text-decoration: underline;\n}\n\n.f-text-center, .t-page.f-start, .a-subtitle, .a-logo, .a-chip, .a-button {\n  text-align: center;\n}\n\n.f-text-right {\n  text-align: right;\n}\n\n.f-text-left, .a-assist {\n  text-align: left;\n}\n\n.f-text-justify {\n  text-align: justify;\n}\n\n.f-text-info {\n  color: #0F9EED;\n}\n\n.f-text-warning {\n  color: #F1AB68;\n}\n\n.f-text-danger {\n  color: #ee1c25;\n}\n\n.f-text-white {\n  color: #fafafa;\n}\n\n.f-text-gray {\n  color: rgba(250, 250, 250, 0.7);\n}\n\n.f-text-subtext, .a-version {\n  color: rgba(250, 250, 250, 0.7);\n}\n\n.f-text-standard {\n  color: #fafafa;\n}\n\n.f-text-primary {\n  color: #07632C;\n}\n\n.f-text-primary-contrast {\n  color: #fafafa;\n}\n\n.f-text-primary-hover {\n  color: #07632C;\n  opacity: 0.7;\n}\n\n.f-text-secondary {\n  color: #582187;\n}\n\n.f-line-18 {\n  line-height: 18px;\n}\n\n.f-line-20 {\n  line-height: 20px;\n}\n\n.f-line-24 {\n  line-height: 24px;\n}\n\n.f-line-32 {\n  line-height: 32px;\n}\n\n.f-text-48 {\n  font-size: 48px;\n}\n\n.f-text-32 {\n  font-size: 32px;\n}\n\n.f-text-28, .a-title.f-size-28 {\n  font-size: 28px;\n}\n\n.f-text-24, .a-title {\n  font-size: 24px;\n}\n\n.f-text-22, .a-text.f-title.f-menu, .f-title.f-menu.m-box.f-panel, .f-menu.m-banner.f-panel, .a-text.f-title.f-big, .f-title.f-big.m-box.f-panel, .a-text.f-title.m-banner.f-panel, .f-title.m-banner.f-panel.m-box, .f-big.m-banner.f-panel, .m-banner.f-panel, .a-logo.f-big {\n  font-size: 22px;\n}\n\n.f-text-20, .a-link.f-menu {\n  font-size: 20px;\n}\n\n.f-text-18, .a-text.f-title.f-table, .f-title.f-table.m-box.f-panel, .f-table.m-banner.f-panel, .a-subtitle {\n  font-size: 18px;\n}\n\n.f-text-16, .m-slide, .m-list-element.f-popup, .a-text.f-subtitle.f-start, .f-subtitle.f-start.m-box.f-panel, .f-subtitle.f-start.m-banner.f-panel, .a-text.f-subtitle.f-menu, .f-subtitle.f-menu.m-box.f-panel, .f-subtitle.f-menu.m-banner.f-panel, .a-text.f-strong, .m-box.f-panel, .f-strong.m-banner.f-panel, .a-select, .a-message.f-table, .a-input, .a-field, body {\n  font-size: 16px;\n}\n\n.f-text-14, .m-snackbar, .a-logo, .a-button {\n  font-size: 14px;\n}\n\n.f-text-12, .a-assist, .a-label.f-button-icon-footer, .a-chip {\n  font-size: 12px;\n}\n\n.f-min-100 {\n  min-width: 100%;\n}\n\n.f-100 {\n  width: 100% !important;\n}\n\n.f-40 {\n  width: 40% !important;\n}\n\n.f-90 {\n  width: 90% !important;\n}\n\n.f-w-auto {\n  width: auto !important;\n}\n\n#app {\n  position: relative;\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n.a-assist.f-error, .a-assist.a-message.f-table.f-error {\n  color: #ee1c25;\n}\n\n.a-button {\n  min-width: 184px;\n  height: 36px;\n  border: 1px solid #07632C;\n  border-radius: 20px;\n  font-weight: 500;\n  line-height: 16px;\n  letter-spacing: 0.75px;\n  text-transform: uppercase;\n  color: #fafafa;\n  margin: 0;\n  padding: 0 20px;\n  align-self: center;\n  outline: none;\n}\n.a-button:focus {\n  opacity: 0.5;\n}\n@media (hover: hover) and (pointer: fine) {\n  .a-button:hover {\n    opacity: 0.5;\n  }\n}\n.a-button:disabled {\n  opacity: 0.3;\n}\n\n.a-button.f-fill {\n  display: block;\n  min-width: 100%;\n  height: 56px;\n  border-radius: 28px;\n}\n\n.a-button.f-icon {\n  min-width: auto;\n  min-height: auto;\n  width: auto;\n  height: 40px;\n  line-height: 40px;\n  padding: 5px;\n  background-color: transparent;\n  color: inherit;\n  border: none;\n  border-radius: 0;\n  text-transform: none;\n  letter-spacing: normal;\n}\n.a-button.f-icon:focus, .a-button.f-icon:hover, .a-button.f-icon:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n\n.a-button.f-icon.f-arrow-back {\n  width: 48px;\n  height: 48px;\n  margin: 0;\n  margin-right: 4px;\n  padding: 8px;\n  padding-left: 0;\n}\n\n.a-button.f-icon.f-footer {\n  flex: 1;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  background-color: #07632C;\n}\n.a-button.f-icon.f-footer:hover, .a-button.f-icon.f-footer:focus {\n  opacity: 1;\n}\n.a-button.f-icon.f-footer.f-selected {\n  background-color: #054520;\n}\n\n.a-button.f-icon.f-footer.f-big, .a-button.f-icon.f-footer.m-banner.f-panel {\n  position: relative;\n  padding-bottom: 10px;\n  overflow: visible;\n}\n.a-button.f-icon.f-footer.f-big.f-selected span, .a-button.f-icon.f-footer.f-selected.m-banner.f-panel span {\n  -webkit-animation: rotate-center 0.6s ease-in-out both;\n  animation: rotate-center 0.6s ease-in-out both;\n}\n\n@-webkit-keyframes rotate-center {\n  0% {\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@keyframes rotate-center {\n  0% {\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n.f-icon-inside {\n  display: flex;\n  align-items: center;\n}\n\n.a-button.f-icon.f-minimal {\n  padding-left: 0;\n}\n\n.a-button.f-icon.f-size-36 {\n  height: 46px;\n  line-height: normal;\n}\n\n.a-button.f-loading.f-primary, .a-button.f-loading.f-primary:disabled {\n  opacity: 1;\n  background-color: rgba(7, 99, 44, 0.5);\n}\n.a-button.f-loading.f-secondary, .a-button.f-loading.f-secondary:disabled {\n  opacity: 1;\n  border-color: rgba(7, 99, 44, 0.5);\n}\n\n.a-button.f-menu {\n  width: auto;\n  height: 42px;\n  padding: 10px 15px;\n  text-transform: uppercase;\n  background-color: #121212;\n  color: inherit;\n  border: none;\n}\n.a-button.f-menu:hover {\n  background-color: #121212;\n  color: inherit;\n  border: none;\n}\n\n.a-button.f-primary {\n  background-color: #07632C;\n  border: none;\n  font-weight: 600;\n  color: #fafafa;\n}\n.a-button.f-primary:focus {\n  background: #054520;\n}\n\n.a-button.f-secondary {\n  font-weight: 700;\n  color: #fafafa;\n  background-color: transparent;\n}\n.a-button.f-secondary:focus {\n  opacity: 0.76;\n}\n\n.a-button-transparent {\n  width: 150px;\n  font-weight: normal;\n  height: 32px;\n  background-color: transparent;\n  color: #fafafa;\n  font-size: 14px;\n  padding: 2px 2px;\n  border: solid transparent 1px;\n  margin: 5px;\n}\n.a-button-transparent:hover {\n  border: solid #fafafa 1px;\n}\n.a-button-transparent:disabled {\n  color: rgba(250, 250, 250, 0.38);\n  border: solid 1px transparent;\n  cursor: not-allowed;\n}\n\n.a-checkbox {\n  display: inline-block;\n}\n\n.a-chip {\n  width: 28px;\n  height: 17px;\n  background: #582187;\n  color: #fafafa;\n  border-radius: 10px;\n  font-weight: 700;\n  line-height: 14px;\n  letter-spacing: 0.15px;\n}\n\n.a-cover.f-menu.f-show {\n  visibility: visible;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n\n.a-cover.f-menu {\n  position: fixed;\n  visibility: hidden;\n  z-index: 39;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: transparent;\n  transition: 0.5s visibility, 0.5s background-color;\n}\n\n.a-field {\n  width: auto;\n  height: 56px;\n  line-height: 24px;\n  border: 1px solid rgba(250, 250, 250, 0.5);\n  border-radius: 2px;\n  outline: none;\n  padding: 15px;\n  padding-top: 16px;\n  padding-bottom: 14px;\n  margin: 0;\n  background-color: transparent;\n  color: inherit;\n}\n.a-field:disabled {\n  opacity: 0.5;\n}\n.a-field:focus, .a-field:focus-within, .a-field.f-correct, .a-field.f-error, .a-field.a-message.f-table.f-error {\n  padding: 14px;\n  padding-top: 15px;\n  padding-bottom: 13px;\n  border-width: 2px;\n}\n.a-field:focus, .a-field:focus-within {\n  border-color: #07632C;\n}\n.a-field.f-error, .a-field.a-message.f-table.f-error, .a-field.f-correct {\n  padding-right: 52px;\n}\n.a-field.f-correct {\n  border-color: #07632C;\n}\n.a-field[type=date]::-webkit-calendar-picker-indicator, .a-field[type=datetime-local]::-webkit-calendar-picker-indicator {\n  filter: invert(1);\n}\n\n.a-field.f-error, .a-field.a-message.f-table.f-error {\n  padding: 14px;\n  padding-top: 15px;\n  padding-bottom: 13px;\n  border-width: 2px;\n  border-color: #ee1c25;\n}\n\n.a-field.f-select {\n  padding: 0;\n}\n\n.a-field.f-textarea {\n  min-height: 80px;\n  resize: none;\n}\n\n.a-icon {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  width: 24px;\n  height: 24px;\n  font-size: 24px;\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n  /* Support for IE. */\n  font-feature-settings: \"liga\";\n}\n\n.a-icon.f-active-point {\n  color: #07632C;\n}\n\n.f-clock {\n  position: relative;\n  top: 2px;\n  margin-right: 8px;\n}\n\n.a-icon.f-close-popup.f-map {\n  top: 4px;\n  right: 4px;\n}\n\n.a-icon.f-close-popup {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  z-index: 10;\n}\n\n.a-icon.f-disabled-point {\n  opacity: 0.5;\n}\n\n.a-icon.f-first-category {\n  color: #ee1c25;\n}\n\n.a-icon.f-footer {\n  display: block;\n  width: 100%;\n  margin: 0 auto;\n  line-height: 24px;\n}\n\n.a-icon.f-footer.f-big, .a-icon.f-footer.m-banner.f-panel {\n  position: relative;\n  width: 60px;\n  height: 60px;\n  font-size: 48px;\n  line-height: 46px;\n  padding-top: 6px;\n  margin-top: -28px;\n  margin-bottom: -1px;\n  border-radius: 40px;\n  background-color: #582187;\n}\n\n.a-icon.f-future-point {\n  color: #07632C;\n}\n\n.a-icon.f-header {\n  margin-left: 5px;\n}\n\n.a-icon.f-input {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  width: 52px;\n  height: 52px;\n  padding: 13px;\n  font-size: 26px;\n}\n\n.a-icon.f-input.f-correct {\n  color: #07632C;\n}\n\n.a-icon.f-input.f-error {\n  color: #ee1c25;\n}\n\n.a-icon.f-list {\n  margin: 6px;\n  margin-top: 4px;\n}\n\n.a-icon.f-menu {\n  width: 40px;\n  height: 56px;\n  background-color: transparent;\n  transition: background-color ease-in-out 0.5s;\n  text-align: center;\n  line-height: 56px;\n  font-size: 26px;\n  margin-left: 8px;\n}\n.a-icon.f-menu.f-selected {\n  background-color: #582187;\n}\n\n.a-icon.f-second-category {\n  color: #0F9EED;\n}\n\n.a-icon.f-snackbar {\n  margin: 12px;\n}\n\n.a-icon.f-third-category {\n  color: #F1AB68;\n}\n\n.a-img.f-loader {\n  display: inline-block;\n  width: 32px;\n  height: 32px;\n  animation: animation-loader 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;\n}\n\n@keyframes animation-loader {\n  0%, 100% {\n    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);\n  }\n  0% {\n    transform: rotateY(0deg);\n  }\n  50% {\n    transform: rotateY(1800deg);\n    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);\n  }\n  100% {\n    transform: rotateY(3600deg);\n  }\n}\n.a-img.f-loader.f-big, .a-img.f-loader.m-banner.f-panel {\n  width: 86px;\n  height: 86px;\n}\n\n.a-img.f-loader.f-fill {\n  width: 52px;\n  height: 52px;\n}\n\n.a-img.f-map-round {\n  display: block;\n  width: 180px;\n  height: 180px;\n  margin: 24px auto;\n  border-radius: 50%;\n  background-image: url(\"/img/Harc_mapa.png\");\n  background-position: -315px -70px;\n  background-repeat: no-repeat;\n}\n\n.a-img.f-panel {\n  position: relative;\n  display: block;\n  width: 100%;\n  height: 250px;\n  margin: 0;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: auto 100%;\n}\n\n.a-input {\n  outline: none;\n  background-color: transparent;\n  color: inherit;\n}\n\n.a-field.f-icon {\n  padding-right: 53px;\n}\n.a-field.f-icon:focus, .a-field.f-icon.f-filled {\n  padding-right: 52px;\n}\n\n.a-input.f-select {\n  width: 100%;\n  border: none;\n  line-height: 24px;\n  padding: 15px;\n  padding-top: 16px;\n  padding-bottom: 14px;\n}\n.a-input.f-select:focus, .a-input.f-select.f-correct, .a-input.f-select.f-error {\n  opacity: 1;\n  padding: 14px;\n  padding-top: 15px;\n  padding-bottom: 13px;\n}\n\n.a-label.f-button-icon-footer {\n  margin: 0 auto;\n  line-height: 16px;\n}\n\n.a-label.f-field {\n  position: absolute;\n  top: 17px;\n  left: 12px;\n  padding: 0 4px;\n  line-height: 24px;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  transition-duration: 200ms;\n  background-color: #121212;\n  color: rgba(250, 250, 250, 0.7);\n}\n\n.a-field:focus ~ .a-label.f-field, .a-field:focus-within ~ .a-label.f-field, .a-field.f-filled ~ .a-label.f-field {\n  top: -7px;\n  left: 13px;\n  font-size: 12px;\n  line-height: 16px;\n}\n.a-field:focus ~ .a-label.f-field, .a-field:focus-within ~ .a-label.f-field {\n  color: rgba(250, 250, 250, 0.7);\n}\n.a-field:focus ~ .a-label.f-field.f-correct {\n  color: #07632C;\n}\n.a-field.f-correct ~ .a-label.f-field.f-correct {\n  color: #07632C;\n}\n\n.a-field:focus ~ .a-label.f-field.f-error, .a-field.f-error ~ .a-label.f-field.f-error {\n  color: #ee1c25;\n}\n\n.a-label.f-select {\n  margin: 15px;\n  line-height: 24px;\n}\n\n.a-link {\n  color: #fafafa;\n  font-weight: bold;\n  text-decoration: underline;\n}\n\n.a-link.f-menu.f-selected {\n  display: block;\n  color: #fafafa;\n  background-color: rgba(88, 33, 135, 0.3);\n}\n\n.a-link.f-menu {\n  display: block;\n  color: rgba(250, 250, 250, 0.7);\n  text-decoration: none;\n  line-height: 58px;\n  height: 56px;\n  font-size: 16px;\n}\n\n.a-list-tile {\n  line-height: 24px;\n  text-align: start;\n  font-family: Roboto, sans-serif;\n}\n\n.a-loader {\n  display: inline-block;\n  transform: translateZ(1px);\n}\n\n.a-logo {\n  line-height: 24px;\n  padding-bottom: 2px;\n}\n\n.a-logo.f-big, .a-logo.m-banner.f-panel {\n  padding-bottom: 14px;\n}\n\n.a-message.f-error, .a-message.f-table.f-error {\n  color: #ee1c25;\n}\n\n.a-message.f-table {\n  color: rgba(250, 250, 250, 0.7);\n  font-weight: bold;\n}\n\n.a-option {\n  padding: 16px;\n  line-height: 16px;\n}\n\n.a-option.f-pointed {\n  background-color: rgba(7, 99, 44, 0.2);\n  font-weight: bold;\n}\n\n.a-option.f-selected {\n  background-color: rgba(7, 99, 44, 0.2);\n}\n\n.a-radio {\n  display: inline-block;\n  padding: 3px 5px;\n}\n.a-radio input {\n  position: relative;\n  top: 2px;\n  cursor: pointer;\n  margin-right: 5px;\n}\n\n.a-select {\n  position: relative;\n  border: none;\n  border-bottom: 1px solid rgba(250, 250, 250, 0.5);\n  background-color: transparent;\n  border-radius: unset;\n  width: 300px;\n  height: 40px;\n  color: #fafafa;\n  -webkit-appearance: none;\n  box-shadow: unset;\n  font-family: Roboto, serif;\n  align-items: unset;\n  padding-top: 15px;\n  padding-left: 8px;\n  outline: none;\n  z-index: 10;\n  cursor: pointer;\n}\n\n.a-select:focus {\n  outline: none;\n}\n\n.a-select:disabled {\n  opacity: 0.5;\n}\n\n.a-assist {\n  height: 32px;\n  padding: 4px 0;\n  padding-left: 16px;\n  overflow: hidden;\n  white-space: normal;\n}\n\n.a-text.f-strong, .m-box.f-panel, .f-strong.m-banner.f-panel {\n  line-height: 24px;\n  letter-spacing: 0.25px;\n}\n\n.a-subtitle {\n  line-height: 28px;\n  letter-spacing: 0.5px;\n  color: #fafafa;\n}\n\n.a-text.f-subtitle.f-menu, .f-subtitle.f-menu.m-box.f-panel, .f-subtitle.f-menu.m-banner.f-panel {\n  font-weight: bold;\n  line-height: 14px;\n  padding: 8px;\n  padding-left: 16px;\n  padding-bottom: 24px;\n  color: rgba(250, 250, 250, 0.7);\n}\n\n.a-text.f-subtitle.f-start, .f-subtitle.f-start.m-box.f-panel, .f-subtitle.f-start.m-banner.f-panel {\n  font-weight: bold;\n  line-height: 20px;\n  color: rgba(250, 250, 250, 0.6);\n}\n\n.a-title {\n  font-weight: bold;\n  padding: 16px 0;\n}\n\n.a-text.f-title.f-big, .f-title.f-big.m-box.f-panel, .a-text.f-title.m-banner.f-panel, .f-title.m-banner.f-panel.m-box, .f-big.m-banner.f-panel, .m-banner.f-panel {\n  font-weight: 700;\n  line-height: 28px;\n  letter-spacing: 0.5px;\n  color: #fafafa;\n  text-transform: uppercase;\n  padding: 14px 16px;\n}\n\n.a-text.f-title.f-menu, .f-title.f-menu.m-box.f-panel, .f-menu.m-banner.f-panel {\n  font-weight: bold;\n  line-height: 22px;\n  padding: 0;\n  padding-left: 16px;\n  padding-top: 16px;\n}\n\n.a-version {\n  position: fixed;\n  right: 8px;\n  bottom: 60px;\n  font-size: 12px;\n}\n\n.m-area.f-button.f-fill {\n  display: block;\n  padding: 0;\n}\n\n.m-area.f-button {\n  display: inline-block;\n  padding: 6px;\n  margin: 0 auto;\n  margin-top: 16px;\n}\n\n.m-banner-map {\n  position: absolute;\n  z-index: 10;\n  display: flex;\n  width: 100%;\n  min-width: 92px;\n  height: 80px;\n  padding: 16px;\n  background: rgba(0, 0, 0, 0.6);\n  color: #fafafa;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 700;\n  line-height: 24px;\n  text-align: center;\n}\n\n.m-banner-timer {\n  position: absolute;\n  z-index: 10;\n  left: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  padding: 4px 8px;\n  background: rgba(0, 0, 0, 0.6);\n  color: #fafafa;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 700;\n  line-height: 20px;\n  text-align: center;\n}\n\n.m-banner-map.f-message-success {\n  height: 56px;\n  background: rgba(7, 99, 44, 0.5);\n  color: #fafafa;\n}\n\n.m-banner.f-panel {\n  background-color: rgba(88, 33, 135, 0.3);\n}\n\n.m-box.f-panel {\n  height: 56px;\n  padding: 16px;\n  background-color: #582187;\n  color: rgba(250, 250, 250, 0.7);\n}\n\n.m-clock {\n  border-bottom: 1px solid rgba(250, 250, 250, 0.2);\n}\n\n.m-collection.f-button {\n  text-align: center;\n}\n\n.m-countdown-timer-warning {\n  color: red;\n}\n\n.m-countdown-timer {\n  color: #fafafa;\n}\n\n.m-cover {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 90;\n}\n\n.m-cover.f-popup {\n  background: rgba(0, 0, 0, 0.5);\n  overflow-y: auto;\n}\n\n.m-grid, .m-row.f-header {\n  display: grid;\n}\n\n.m-grid.f-category-sum, .f-category-sum.m-row.f-header {\n  grid-template-columns: 80px 128px 120px;\n}\n\n.m-grid.f-collected-points, .f-collected-points.m-row.f-header {\n  justify-items: center;\n  align-items: center;\n  border-top: 1px solid rgba(250, 250, 250, 0.2);\n}\n.m-grid.f-collected-points:last-child, .f-collected-points.m-row.f-header:last-child {\n  border-bottom: 1px solid rgba(250, 250, 250, 0.2);\n}\n\n.m-grid.f-point, .f-point.m-row.f-header {\n  grid-template-columns: 30px 60px 88px 80px 70px;\n}\n\n.m-grid.f-score, .f-score.m-row.f-header {\n  grid-template-columns: 170px 88px 70px;\n}\n\n.m-grid.f-search-point, .f-search-point.m-row.f-header {\n  grid-template-columns: 30px 50px 216px 40px;\n  border-top: 1px solid rgba(250, 250, 250, 0.2);\n}\n.m-grid.f-search-point:nth-child(1), .f-search-point.m-row.f-header:nth-child(1) {\n  border-top: none;\n}\n\n.m-grid.f-split-2, .f-split-2.m-row.f-header {\n  grid-template-columns: repeat(2, 50%);\n}\n\n.m-grid.f-split-3, .f-split-3.m-row.f-header {\n  grid-template-columns: repeat(3, 33.3333333333%);\n}\n\n.m-grid.f-temporary-points, .f-temporary-points.m-row.f-header {\n  grid-template-columns: 40px 1fr 40px;\n  justify-items: left;\n  align-items: center;\n  border-bottom: 1px solid rgba(250, 250, 250, 0.2);\n  line-height: 24px;\n  font-size: 18px;\n  font-style: italic;\n  letter-spacing: 0.5px;\n  font-family: Roboto, sans-serif;\n}\n\n.m-input {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  padding: 0;\n  margin: 0;\n  margin-bottom: 8px;\n}\n\n.m-list-element.f-popup {\n  min-height: 32px;\n  padding: 0 8px;\n  line-height: 16px;\n  color: #fafafa;\n  text-align: left;\n  font-weight: normal;\n  cursor: pointer;\n}\n.m-list-element.f-popup:hover {\n  background-color: rgba(88, 33, 135, 0.3);\n}\n\n.m-pointer {\n  position: relative;\n  top: calc(50vh - 16px / 2);\n  left: calc(50% - 16px / 2);\n  width: 16px;\n  height: 16px;\n  background-color: transparent;\n  border: 2px solid black;\n  border-radius: 50%;\n}\n.m-pointer:before {\n  content: \"\";\n  position: absolute;\n  top: calc((16px - 4px - 2px) / 2);\n  left: calc(-50vw + (12px) / 2);\n  z-index: -1;\n  display: block;\n  width: 100vw;\n  height: 2px;\n  background: rgba(0, 0, 0, 0.6);\n}\n.m-pointer:after {\n  content: \"\";\n  position: absolute;\n  left: calc((16px - 4px - 2px) / 2);\n  top: calc(-50vh + 4px + 2px);\n  z-index: -1;\n  display: block;\n  width: 2px;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.6);\n}\n\n.m-options {\n  position: absolute;\n  left: 0;\n  top: calc(100% + 1px - 32px);\n  right: 0;\n  background-color: #121212;\n  color: #fafafa;\n  border-radius: 4px;\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n  overflow: hidden;\n  z-index: 100;\n}\n\n.m-options.f-top {\n  top: auto;\n  bottom: calc(100% + 6px);\n}\n\n.m-panel.f-header.f-side {\n  width: 33px;\n}\n\n.m-panel.f-start {\n  background-color: #2d1145;\n}\n\n.m-row.f-header {\n  color: rgba(250, 250, 250, 0.7);\n  border-bottom: 1px solid rgba(250, 250, 250, 0.2);\n}\n\n.m-slide {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100vw;\n  height: 100vh;\n  white-space: normal;\n  text-align: left;\n  color: #fafafa;\n}\n\n.m-snackbar {\n  position: absolute;\n  left: 8px;\n  top: 64px;\n  right: 8px;\n  z-index: 49;\n  display: flex;\n  line-height: 16px;\n  font-weight: bold;\n  background-color: #0F9EED;\n  color: #fafafa;\n  border-radius: 4px;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n}\n\n.m-snackbar.f-error, .m-snackbar.a-message.f-table.f-error {\n  background-color: #ee1c25;\n}\n\n.m-snackbar.f-success {\n  background-color: #07632C;\n}\n\n.o-float-container {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 150;\n  background-color: #121212;\n}\n\n.o-footer {\n  position: relative;\n  z-index: 50;\n  display: flex;\n  height: 56px;\n  overflow: visible;\n  background-color: #054520;\n  border-top: 2px solid #054520;\n  color: #fafafa;\n}\n\n.o-header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  height: 56px;\n  overflow: hidden;\n  color: #fafafa;\n  background: #07632C;\n  border-bottom: 2px solid #054520;\n  padding-left: 16px;\n  padding-right: 16px;\n}\n\n.o-loading {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  top: 56px;\n  padding-top: 36vh;\n  z-index: 100;\n  text-align: center;\n  background-color: #07632C;\n}\n\n.o-map {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.o-menu {\n  position: absolute;\n  z-index: 40;\n  top: 0;\n  left: 100%;\n  bottom: 56px;\n  width: 90%;\n  padding: 10px 0;\n  padding-top: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background-color: #121212;\n  color: #fafafa;\n  transition: 0.5s left;\n  border-left: rgba(250, 250, 250, 0.2) 1px solid;\n  box-shadow: none;\n}\n\n.o-menu.f-open {\n  left: 10%;\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n\n.o-nav {\n  height: 60px;\n}\n\n.o-popup {\n  width: 280px;\n  background: #07632C;\n  box-shadow: rgba(0, 0, 0, 0.5) 1px 1px 3px 1px;\n  margin: 32vh auto 0 auto;\n  padding: 56px 32px 48px 32px;\n  text-align: center;\n  color: #fafafa;\n  font-weight: bold;\n  font-size: 20px;\n}\n\n.o-popup.f-map {\n  position: absolute;\n  width: 240px;\n  height: auto;\n  margin: 0;\n  padding: 8px 0;\n  background-color: #121212;\n  color: #fafafa;\n  border-radius: 4px;\n  border: solid 1px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 1px 6px rgba(60, 64, 67, 0.28);\n}\n\n.o-popup.f-score {\n  position: absolute;\n  left: 8px;\n  top: calc(56px + 8px);\n  right: 8px;\n  width: auto;\n  min-height: 200px;\n  padding: 8px;\n  margin: 0;\n  background: #121212;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  text-align: center;\n  color: #fafafa;\n  font-weight: bold;\n  font-size: 20px;\n}\n\n.t-base {\n  display: flex;\n  flex-direction: column;\n  background-color: #121212;\n}\n\n.t-page {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: #121212;\n  overflow: hidden;\n  overflow-y: auto;\n  padding: 16px 16px;\n}\n\n.t-page.f-map {\n  padding: 0;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.dark-map-layer {\n  filter: invert(100%) sepia(100%) saturate(0%) brightness(100%) contrast(100%);\n}\n\n.ol-zoom {\n  left: unset !important;\n  right: 8px;\n  top: unset !important;\n  bottom: 50px;\n}\n\n.ol-control {\n  border-radius: 0 !important;\n  padding: 1px !important;\n}\n\n.ol-control button {\n  background-color: rgba(88, 33, 135, 0.5) !important;\n  border: none !important;\n  border-radius: 0 !important;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/import-glob-loader/index.js!./src/style/export-for-js/dark.scss":
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/import-glob-loader!./src/style/export-for-js/dark.scss ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
exports.locals = {
	"stroke": "#000000",
	"danger": "#ee1c25",
	"warning": "#F1AB68",
	"info": "#0F9EED"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/import-glob-loader/index.js!./src/style/export-for-js/light.scss":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/import-glob-loader!./src/style/export-for-js/light.scss ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
exports.locals = {
	"stroke": "#000000",
	"danger": "#ee1c25",
	"warning": "#F1AB68",
	"info": "#0F9EED"
};
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/import-glob-loader/index.js!./src/style/light.sass":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/import-glob-loader!./src/style/light.sass ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".fade-enter-active, .fade-leave-active {\n  transition: opacity 0.3s;\n}\n\n.fade-enter, .fade-leave-to {\n  opacity: 0;\n}\n\n.slider-pagination-bullet {\n  background-color: #4c4c4c !important;\n  opacity: 0.3 !important;\n}\n\n.swiper-container-horizontal .slider-pagination-bullet-active, .swiper-container-vertical .slider-pagination-bullet-active {\n  background-color: #4c4c4c !important;\n  opacity: 1 !important;\n}\n\n.a-input.f-select, .a-field {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  transition-duration: 200ms;\n}\n\n.t-base, body {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n\nhtml {\n  overflow-y: hidden;\n  background-color: #fafafa;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  overflow-x: hidden;\n  font-family: Roboto, sans-serif;\n  color: #4c4c4c;\n  background-color: #fafafa;\n}\n\n* {\n  box-sizing: border-box;\n}\n\n.f-bold {\n  font-weight: bold;\n}\n\n.f-display-none {\n  display: none;\n}\n\n.f-hidden {\n  visibility: hidden;\n}\n\n.f-visible {\n  visibility: visible;\n}\n\n.f-disabled {\n  opacity: 0.5;\n}\n\n.f-list-disc {\n  list-style: disc;\n}\n\n.f-cursor-pointer {\n  cursor: pointer;\n}\n\n.f-cursor-default {\n  cursor: default;\n}\n\n.f-block {\n  display: block;\n}\n\n.f-inline-block {\n  display: inline-block;\n}\n\n.f-flex, .m-panel.f-start, .m-panel.f-header, .m-list-element.f-popup, .m-clock, .a-list-tile, .a-link.f-menu {\n  display: flex !important;\n}\n\n.f-flex-1, .a-list-tile {\n  flex: 1;\n}\n\n.f-flex-0 {\n  flex: 0;\n}\n\n.f-flex-col, .m-panel.f-start, .m-panel.f-header.f-center, .a-list-tile {\n  flex-direction: column;\n}\n\n.f-flex-row, .m-panel.f-header.f-side {\n  flex-direction: row;\n}\n\n.f-flex-al-center, .m-panel.f-start, .m-panel.f-header.f-side {\n  align-items: center;\n}\n\n.f-flex-just-center, .m-clock {\n  justify-content: center;\n}\n\n.f-flex-al-end {\n  align-items: flex-end;\n}\n\n.f-flex-just-end, .m-panel.f-header.f-center {\n  justify-content: flex-end;\n}\n\n.f-flex-al-start {\n  align-items: flex-start;\n}\n\n.f-flex-just-start, .a-list-tile {\n  justify-content: start;\n}\n\n.f-flex-just-space-between {\n  justify-content: space-between;\n}\n\n.f-flex-just-space-around {\n  justify-content: space-around;\n}\n\n.f-height-100 {\n  height: 100%;\n}\n\n.f-m--2 {\n  margin: -16px -16px !important;\n}\n\n.f-m--1 {\n  margin: -8px -8px !important;\n}\n\n.f-m-0 {\n  margin: 0 0 !important;\n}\n\n.f-m-1 {\n  margin: 8px 8px !important;\n}\n\n.f-m-2 {\n  margin: 16px 16px !important;\n}\n\n.f-m-3 {\n  margin: 24px 24px !important;\n}\n\n.f-m-4 {\n  margin: 32px 32px !important;\n}\n\n.f-m-5 {\n  margin: 40px 40px !important;\n}\n\n.f-m-6 {\n  margin: 48px 48px !important;\n}\n\n.f-m-auto {\n  margin: auto auto !important;\n}\n\n.f-mx--2 {\n  margin-left: -16px !important;\n  margin-right: -16px !important;\n}\n\n.f-ml--2 {\n  margin-left: -16px !important;\n}\n\n.f-mr--2 {\n  margin-right: -16px !important;\n}\n\n.f-mx--1 {\n  margin-left: -8px !important;\n  margin-right: -8px !important;\n}\n\n.f-ml--1 {\n  margin-left: -8px !important;\n}\n\n.f-mr--1 {\n  margin-right: -8px !important;\n}\n\n.f-mx-0 {\n  margin-left: 0 !important;\n  margin-right: 0 !important;\n}\n\n.f-ml-0 {\n  margin-left: 0 !important;\n}\n\n.f-mr-0 {\n  margin-right: 0 !important;\n}\n\n.f-mx-1 {\n  margin-left: 8px !important;\n  margin-right: 8px !important;\n}\n\n.f-ml-1 {\n  margin-left: 8px !important;\n}\n\n.f-mr-1 {\n  margin-right: 8px !important;\n}\n\n.f-mx-2 {\n  margin-left: 16px !important;\n  margin-right: 16px !important;\n}\n\n.f-ml-2 {\n  margin-left: 16px !important;\n}\n\n.f-mr-2 {\n  margin-right: 16px !important;\n}\n\n.f-mx-3 {\n  margin-left: 24px !important;\n  margin-right: 24px !important;\n}\n\n.f-ml-3 {\n  margin-left: 24px !important;\n}\n\n.f-mr-3 {\n  margin-right: 24px !important;\n}\n\n.f-mx-4 {\n  margin-left: 32px !important;\n  margin-right: 32px !important;\n}\n\n.f-ml-4 {\n  margin-left: 32px !important;\n}\n\n.f-mr-4 {\n  margin-right: 32px !important;\n}\n\n.f-mx-5 {\n  margin-left: 40px !important;\n  margin-right: 40px !important;\n}\n\n.f-ml-5 {\n  margin-left: 40px !important;\n}\n\n.f-mr-5 {\n  margin-right: 40px !important;\n}\n\n.f-mx-6 {\n  margin-left: 48px !important;\n  margin-right: 48px !important;\n}\n\n.f-ml-6 {\n  margin-left: 48px !important;\n}\n\n.f-mr-6 {\n  margin-right: 48px !important;\n}\n\n.f-mx-auto {\n  margin-left: auto !important;\n  margin-right: auto !important;\n}\n\n.f-ml-auto {\n  margin-left: auto !important;\n}\n\n.f-mr-auto {\n  margin-right: auto !important;\n}\n\n.f-my--2 {\n  margin-top: -16px !important;\n  margin-bottom: -16px !important;\n}\n\n.f-mt--2 {\n  margin-top: -16px !important;\n}\n\n.f-mb--2 {\n  margin-bottom: -16px !important;\n}\n\n.f-my--1 {\n  margin-top: -8px !important;\n  margin-bottom: -8px !important;\n}\n\n.f-mt--1 {\n  margin-top: -8px !important;\n}\n\n.f-mb--1 {\n  margin-bottom: -8px !important;\n}\n\n.f-my-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n}\n\n.f-mt-0 {\n  margin-top: 0 !important;\n}\n\n.f-mb-0 {\n  margin-bottom: 0 !important;\n}\n\n.f-my-1 {\n  margin-top: 8px !important;\n  margin-bottom: 8px !important;\n}\n\n.f-mt-1 {\n  margin-top: 8px !important;\n}\n\n.f-mb-1, .m-row.f-header, .a-text.f-title.f-table, .f-title.f-table.m-box.f-panel, .f-table.m-banner.f-panel {\n  margin-bottom: 8px !important;\n}\n\n.f-my-2 {\n  margin-top: 16px !important;\n  margin-bottom: 16px !important;\n}\n\n.f-mt-2 {\n  margin-top: 16px !important;\n}\n\n.f-mb-2 {\n  margin-bottom: 16px !important;\n}\n\n.f-my-3 {\n  margin-top: 24px !important;\n  margin-bottom: 24px !important;\n}\n\n.f-mt-3, .m-area.f-button.f-fill {\n  margin-top: 24px !important;\n}\n\n.f-mb-3 {\n  margin-bottom: 24px !important;\n}\n\n.f-my-4 {\n  margin-top: 32px !important;\n  margin-bottom: 32px !important;\n}\n\n.f-mt-4 {\n  margin-top: 32px !important;\n}\n\n.f-mb-4, .m-area.f-button.f-fill {\n  margin-bottom: 32px !important;\n}\n\n.f-my-5 {\n  margin-top: 40px !important;\n  margin-bottom: 40px !important;\n}\n\n.f-mt-5 {\n  margin-top: 40px !important;\n}\n\n.f-mb-5 {\n  margin-bottom: 40px !important;\n}\n\n.f-my-6 {\n  margin-top: 48px !important;\n  margin-bottom: 48px !important;\n}\n\n.f-mt-6 {\n  margin-top: 48px !important;\n}\n\n.f-mb-6 {\n  margin-bottom: 48px !important;\n}\n\n.f-my-auto {\n  margin-top: auto !important;\n  margin-bottom: auto !important;\n}\n\n.f-mt-auto {\n  margin-top: auto !important;\n}\n\n.f-mb-auto {\n  margin-bottom: auto !important;\n}\n\n.f-scroll-default {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.f-p--2 {\n  padding: -16px -16px;\n}\n\n.f-p--1 {\n  padding: -8px -8px;\n}\n\n.f-p-0, .t-page.f-start {\n  padding: 0 0;\n}\n\n.f-p-1 {\n  padding: 8px 8px;\n}\n\n.f-p-2, .m-slide {\n  padding: 16px 16px;\n}\n\n.f-p-3 {\n  padding: 24px 24px;\n}\n\n.f-p-4 {\n  padding: 32px 32px;\n}\n\n.f-p-5 {\n  padding: 40px 40px;\n}\n\n.f-p-6 {\n  padding: 48px 48px;\n}\n\n.f-p-auto {\n  padding: auto auto;\n}\n\n.f-px--2 {\n  padding-left: -16px;\n  padding-right: -16px;\n}\n\n.f-pl--2 {\n  padding-left: -16px;\n}\n\n.f-pr--2 {\n  padding-right: -16px;\n}\n\n.f-px--1 {\n  padding-left: -8px;\n  padding-right: -8px;\n}\n\n.f-pl--1 {\n  padding-left: -8px;\n}\n\n.f-pr--1 {\n  padding-right: -8px;\n}\n\n.f-px-0 {\n  padding-left: 0;\n  padding-right: 0;\n}\n\n.f-pl-0 {\n  padding-left: 0;\n}\n\n.f-pr-0 {\n  padding-right: 0;\n}\n\n.f-px-1 {\n  padding-left: 8px;\n  padding-right: 8px;\n}\n\n.f-pl-1 {\n  padding-left: 8px;\n}\n\n.f-pr-1 {\n  padding-right: 8px;\n}\n\n.f-px-2 {\n  padding-left: 16px;\n  padding-right: 16px;\n}\n\n.f-pl-2, .a-list-tile {\n  padding-left: 16px;\n}\n\n.f-pr-2 {\n  padding-right: 16px;\n}\n\n.f-px-3 {\n  padding-left: 24px;\n  padding-right: 24px;\n}\n\n.f-pl-3 {\n  padding-left: 24px;\n}\n\n.f-pr-3 {\n  padding-right: 24px;\n}\n\n.f-px-4 {\n  padding-left: 32px;\n  padding-right: 32px;\n}\n\n.f-pl-4 {\n  padding-left: 32px;\n}\n\n.f-pr-4 {\n  padding-right: 32px;\n}\n\n.f-px-5 {\n  padding-left: 40px;\n  padding-right: 40px;\n}\n\n.f-pl-5 {\n  padding-left: 40px;\n}\n\n.f-pr-5 {\n  padding-right: 40px;\n}\n\n.f-px-6 {\n  padding-left: 48px;\n  padding-right: 48px;\n}\n\n.f-pl-6 {\n  padding-left: 48px;\n}\n\n.f-pr-6 {\n  padding-right: 48px;\n}\n\n.f-px-auto {\n  padding-left: auto;\n  padding-right: auto;\n}\n\n.f-pl-auto {\n  padding-left: auto;\n}\n\n.f-pr-auto {\n  padding-right: auto;\n}\n\n.f-py--2 {\n  padding-top: -16px;\n  padding-bottom: -16px;\n}\n\n.f-pt--2 {\n  padding-top: -16px;\n}\n\n.f-pb--2 {\n  padding-bottom: -16px;\n}\n\n.f-py--1 {\n  padding-top: -8px;\n  padding-bottom: -8px;\n}\n\n.f-pt--1 {\n  padding-top: -8px;\n}\n\n.f-pb--1 {\n  padding-bottom: -8px;\n}\n\n.f-py-0 {\n  padding-top: 0;\n  padding-bottom: 0;\n}\n\n.f-pt-0 {\n  padding-top: 0;\n}\n\n.f-pb-0 {\n  padding-bottom: 0;\n}\n\n.f-py-1 {\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n\n.f-pt-1 {\n  padding-top: 8px;\n}\n\n.f-pb-1 {\n  padding-bottom: 8px;\n}\n\n.f-py-2, .m-grid.f-temporary-points, .f-temporary-points.m-row.f-header {\n  padding-top: 16px;\n  padding-bottom: 16px;\n}\n\n.f-pt-2 {\n  padding-top: 16px;\n}\n\n.f-pb-2 {\n  padding-bottom: 16px;\n}\n\n.f-py-3 {\n  padding-top: 24px;\n  padding-bottom: 24px;\n}\n\n.f-pt-3, .a-message.f-table {\n  padding-top: 24px;\n}\n\n.f-pb-3 {\n  padding-bottom: 24px;\n}\n\n.f-py-4 {\n  padding-top: 32px;\n  padding-bottom: 32px;\n}\n\n.f-pt-4 {\n  padding-top: 32px;\n}\n\n.f-pb-4 {\n  padding-bottom: 32px;\n}\n\n.f-py-5 {\n  padding-top: 40px;\n  padding-bottom: 40px;\n}\n\n.f-pt-5 {\n  padding-top: 40px;\n}\n\n.f-pb-5 {\n  padding-bottom: 40px;\n}\n\n.f-py-6 {\n  padding-top: 48px;\n  padding-bottom: 48px;\n}\n\n.f-pt-6 {\n  padding-top: 48px;\n}\n\n.f-pb-6 {\n  padding-bottom: 48px;\n}\n\n.f-py-auto {\n  padding-top: auto;\n  padding-bottom: auto;\n}\n\n.f-pt-auto {\n  padding-top: auto;\n}\n\n.f-pb-auto {\n  padding-bottom: auto;\n}\n\n.f-fill-abs {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.f-fill-rel {\n  position: relative;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.f-fill-fix {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.f-relative {\n  position: relative;\n}\n\n.f-absolute {\n  position: absolute;\n}\n\n.f-z-index-6 {\n  z-index: 6;\n}\n\n.f-text-bold, .a-text.f-title.f-table, .f-title.f-table.m-box.f-panel, .f-table.m-banner.f-panel, .a-text.f-strong, .m-box.f-panel, .f-strong.m-banner.f-panel {\n  font-weight: bold;\n}\n\n.f-text-normal {\n  font-weight: normal;\n}\n\n.f-text-uppercase {\n  text-transform: uppercase;\n}\n\n.f-text-italic {\n  font-style: italic;\n}\n\n.f-text-underline {\n  text-decoration: underline;\n}\n\n.f-text-center, .t-page.f-start, .a-subtitle, .a-logo, .a-chip, .a-button {\n  text-align: center;\n}\n\n.f-text-right {\n  text-align: right;\n}\n\n.f-text-left, .a-assist {\n  text-align: left;\n}\n\n.f-text-justify {\n  text-align: justify;\n}\n\n.f-text-info {\n  color: #0F9EED;\n}\n\n.f-text-warning {\n  color: #F1AB68;\n}\n\n.f-text-danger {\n  color: #ee1c25;\n}\n\n.f-text-white {\n  color: #fafafa;\n}\n\n.f-text-gray {\n  color: rgba(76, 76, 76, 0.7);\n}\n\n.f-text-subtext, .a-version {\n  color: rgba(76, 76, 76, 0.7);\n}\n\n.f-text-standard {\n  color: #4c4c4c;\n}\n\n.f-text-primary {\n  color: #07632C;\n}\n\n.f-text-primary-contrast {\n  color: #07632C;\n}\n\n.f-text-primary-hover {\n  color: #07632C;\n  opacity: 0.7;\n}\n\n.f-text-secondary {\n  color: #582187;\n}\n\n.f-line-18 {\n  line-height: 18px;\n}\n\n.f-line-20 {\n  line-height: 20px;\n}\n\n.f-line-24 {\n  line-height: 24px;\n}\n\n.f-line-32 {\n  line-height: 32px;\n}\n\n.f-text-48 {\n  font-size: 48px;\n}\n\n.f-text-32 {\n  font-size: 32px;\n}\n\n.f-text-28, .a-title.f-size-28 {\n  font-size: 28px;\n}\n\n.f-text-24, .a-title {\n  font-size: 24px;\n}\n\n.f-text-22, .a-text.f-title.f-menu, .f-title.f-menu.m-box.f-panel, .f-menu.m-banner.f-panel, .a-text.f-title.f-big, .f-title.f-big.m-box.f-panel, .a-text.f-title.m-banner.f-panel, .f-title.m-banner.f-panel.m-box, .f-big.m-banner.f-panel, .m-banner.f-panel, .a-logo.f-big {\n  font-size: 22px;\n}\n\n.f-text-20, .a-link.f-menu {\n  font-size: 20px;\n}\n\n.f-text-18, .a-text.f-title.f-table, .f-title.f-table.m-box.f-panel, .f-table.m-banner.f-panel, .a-subtitle {\n  font-size: 18px;\n}\n\n.f-text-16, .m-slide, .m-list-element.f-popup, .a-text.f-subtitle.f-start, .f-subtitle.f-start.m-box.f-panel, .f-subtitle.f-start.m-banner.f-panel, .a-text.f-subtitle.f-menu, .f-subtitle.f-menu.m-box.f-panel, .f-subtitle.f-menu.m-banner.f-panel, .a-text.f-strong, .m-box.f-panel, .f-strong.m-banner.f-panel, .a-select, .a-message.f-table, .a-input, .a-field, body {\n  font-size: 16px;\n}\n\n.f-text-14, .m-snackbar, .a-logo, .a-button {\n  font-size: 14px;\n}\n\n.f-text-12, .a-assist, .a-label.f-button-icon-footer, .a-chip {\n  font-size: 12px;\n}\n\n.f-min-100 {\n  min-width: 100%;\n}\n\n.f-100 {\n  width: 100% !important;\n}\n\n.f-40 {\n  width: 40% !important;\n}\n\n.f-90 {\n  width: 90% !important;\n}\n\n.f-w-auto {\n  width: auto !important;\n}\n\n#app {\n  position: relative;\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n.a-assist.f-error, .a-assist.a-message.f-table.f-error {\n  color: #ee1c25;\n}\n\n.a-button {\n  min-width: 184px;\n  height: 36px;\n  border: 1px solid #07632C;\n  border-radius: 20px;\n  font-weight: 500;\n  line-height: 16px;\n  letter-spacing: 0.75px;\n  text-transform: uppercase;\n  color: #4c4c4c;\n  margin: 0;\n  padding: 0 20px;\n  align-self: center;\n  outline: none;\n}\n.a-button:focus {\n  opacity: 0.5;\n}\n@media (hover: hover) and (pointer: fine) {\n  .a-button:hover {\n    opacity: 0.5;\n  }\n}\n.a-button:disabled {\n  opacity: 0.3;\n}\n\n.a-button.f-fill {\n  display: block;\n  min-width: 100%;\n  height: 56px;\n  border-radius: 28px;\n}\n\n.a-button.f-icon {\n  min-width: auto;\n  min-height: auto;\n  width: auto;\n  height: 40px;\n  line-height: 40px;\n  padding: 5px;\n  background-color: transparent;\n  color: inherit;\n  border: none;\n  border-radius: 0;\n  text-transform: none;\n  letter-spacing: normal;\n}\n.a-button.f-icon:focus, .a-button.f-icon:hover, .a-button.f-icon:active {\n  background-color: rgba(0, 0, 0, 0.15);\n}\n\n.a-button.f-icon.f-arrow-back {\n  width: 48px;\n  height: 48px;\n  margin: 0;\n  margin-right: 4px;\n  padding: 8px;\n  padding-left: 0;\n}\n\n.a-button.f-icon.f-footer {\n  flex: 1;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  background-color: #07632C;\n}\n.a-button.f-icon.f-footer:hover, .a-button.f-icon.f-footer:focus {\n  opacity: 1;\n}\n.a-button.f-icon.f-footer.f-selected {\n  background-color: #054520;\n}\n\n.a-button.f-icon.f-footer.f-big, .a-button.f-icon.f-footer.m-banner.f-panel {\n  position: relative;\n  padding-bottom: 10px;\n  overflow: visible;\n}\n.a-button.f-icon.f-footer.f-big.f-selected span, .a-button.f-icon.f-footer.f-selected.m-banner.f-panel span {\n  -webkit-animation: rotate-center 0.6s ease-in-out both;\n  animation: rotate-center 0.6s ease-in-out both;\n}\n\n@-webkit-keyframes rotate-center {\n  0% {\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@keyframes rotate-center {\n  0% {\n    -webkit-transform: rotate(0);\n    transform: rotate(0);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n.f-icon-inside {\n  display: flex;\n  align-items: center;\n}\n\n.a-button.f-icon.f-minimal {\n  padding-left: 0;\n}\n\n.a-button.f-icon.f-size-36 {\n  height: 46px;\n  line-height: normal;\n}\n\n.a-button.f-loading.f-primary, .a-button.f-loading.f-primary:disabled {\n  opacity: 1;\n  background-color: rgba(7, 99, 44, 0.5);\n}\n.a-button.f-loading.f-secondary, .a-button.f-loading.f-secondary:disabled {\n  opacity: 1;\n  border-color: rgba(7, 99, 44, 0.5);\n}\n\n.a-button.f-menu {\n  width: auto;\n  height: 42px;\n  padding: 10px 15px;\n  text-transform: uppercase;\n  background-color: #fafafa;\n  color: inherit;\n  border: none;\n}\n.a-button.f-menu:hover {\n  background-color: #fafafa;\n  color: inherit;\n  border: none;\n}\n\n.a-button.f-primary {\n  background-color: #07632C;\n  border: none;\n  font-weight: 600;\n  color: #fafafa;\n}\n.a-button.f-primary:focus {\n  background: #054520;\n}\n\n.a-button.f-secondary {\n  font-weight: 700;\n  color: #07632C;\n  background-color: transparent;\n}\n.a-button.f-secondary:focus {\n  opacity: 0.76;\n}\n\n.a-button-transparent {\n  width: 150px;\n  font-weight: normal;\n  height: 32px;\n  background-color: transparent;\n  color: #4c4c4c;\n  font-size: 14px;\n  padding: 2px 2px;\n  border: solid transparent 1px;\n  margin: 5px;\n}\n.a-button-transparent:hover {\n  border: solid #4c4c4c 1px;\n}\n.a-button-transparent:disabled {\n  color: rgba(76, 76, 76, 0.38);\n  border: solid 1px transparent;\n  cursor: not-allowed;\n}\n\n.a-checkbox {\n  display: inline-block;\n}\n\n.a-chip {\n  width: 28px;\n  height: 17px;\n  background: #582187;\n  color: #fafafa;\n  border-radius: 10px;\n  font-weight: 700;\n  line-height: 14px;\n  letter-spacing: 0.15px;\n}\n\n.a-cover.f-menu.f-show {\n  visibility: visible;\n  background-color: rgba(0, 0, 0, 0.3);\n}\n\n.a-cover.f-menu {\n  position: fixed;\n  visibility: hidden;\n  z-index: 39;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: transparent;\n  transition: 0.5s visibility, 0.5s background-color;\n}\n\n.a-field {\n  width: auto;\n  height: 56px;\n  line-height: 24px;\n  border: 1px solid rgba(76, 76, 76, 0.5);\n  border-radius: 2px;\n  outline: none;\n  padding: 15px;\n  padding-top: 16px;\n  padding-bottom: 14px;\n  margin: 0;\n  background-color: transparent;\n  color: inherit;\n}\n.a-field:disabled {\n  opacity: 0.5;\n}\n.a-field:focus, .a-field:focus-within, .a-field.f-correct, .a-field.f-error, .a-field.a-message.f-table.f-error {\n  padding: 14px;\n  padding-top: 15px;\n  padding-bottom: 13px;\n  border-width: 2px;\n}\n.a-field:focus, .a-field:focus-within {\n  border-color: #07632C;\n}\n.a-field.f-error, .a-field.a-message.f-table.f-error, .a-field.f-correct {\n  padding-right: 52px;\n}\n.a-field.f-correct {\n  border-color: #07632C;\n}\n.a-field[type=date]::-webkit-calendar-picker-indicator, .a-field[type=datetime-local]::-webkit-calendar-picker-indicator {\n  filter: invert(0);\n}\n\n.a-field.f-error, .a-field.a-message.f-table.f-error {\n  padding: 14px;\n  padding-top: 15px;\n  padding-bottom: 13px;\n  border-width: 2px;\n  border-color: #ee1c25;\n}\n\n.a-field.f-select {\n  padding: 0;\n}\n\n.a-field.f-textarea {\n  min-height: 80px;\n  resize: none;\n}\n\n.a-icon {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  width: 24px;\n  height: 24px;\n  font-size: 24px;\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n  /* Support for IE. */\n  font-feature-settings: \"liga\";\n}\n\n.a-icon.f-active-point {\n  color: #07632C;\n}\n\n.f-clock {\n  position: relative;\n  top: 2px;\n  margin-right: 8px;\n}\n\n.a-icon.f-close-popup.f-map {\n  top: 4px;\n  right: 4px;\n}\n\n.a-icon.f-close-popup {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  z-index: 10;\n}\n\n.a-icon.f-disabled-point {\n  opacity: 0.5;\n}\n\n.a-icon.f-first-category {\n  color: #ee1c25;\n}\n\n.a-icon.f-footer {\n  display: block;\n  width: 100%;\n  margin: 0 auto;\n  line-height: 24px;\n}\n\n.a-icon.f-footer.f-big, .a-icon.f-footer.m-banner.f-panel {\n  position: relative;\n  width: 60px;\n  height: 60px;\n  font-size: 48px;\n  line-height: 46px;\n  padding-top: 6px;\n  margin-top: -28px;\n  margin-bottom: -1px;\n  border-radius: 40px;\n  background-color: #582187;\n}\n\n.a-icon.f-future-point {\n  color: #07632C;\n}\n\n.a-icon.f-header {\n  margin-left: 5px;\n}\n\n.a-icon.f-input {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  width: 52px;\n  height: 52px;\n  padding: 13px;\n  font-size: 26px;\n}\n\n.a-icon.f-input.f-correct {\n  color: #07632C;\n}\n\n.a-icon.f-input.f-error {\n  color: #ee1c25;\n}\n\n.a-icon.f-list {\n  margin: 6px;\n  margin-top: 4px;\n}\n\n.a-icon.f-menu {\n  width: 40px;\n  height: 56px;\n  background-color: transparent;\n  transition: background-color ease-in-out 0.5s;\n  text-align: center;\n  line-height: 56px;\n  font-size: 26px;\n  margin-left: 8px;\n}\n.a-icon.f-menu.f-selected {\n  background-color: #582187;\n}\n\n.a-icon.f-second-category {\n  color: #0F9EED;\n}\n\n.a-icon.f-snackbar {\n  margin: 12px;\n}\n\n.a-icon.f-third-category {\n  color: #F1AB68;\n}\n\n.a-img.f-loader {\n  display: inline-block;\n  width: 32px;\n  height: 32px;\n  animation: animation-loader 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;\n}\n\n@keyframes animation-loader {\n  0%, 100% {\n    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);\n  }\n  0% {\n    transform: rotateY(0deg);\n  }\n  50% {\n    transform: rotateY(1800deg);\n    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);\n  }\n  100% {\n    transform: rotateY(3600deg);\n  }\n}\n.a-img.f-loader.f-big, .a-img.f-loader.m-banner.f-panel {\n  width: 86px;\n  height: 86px;\n}\n\n.a-img.f-loader.f-fill {\n  width: 52px;\n  height: 52px;\n}\n\n.a-img.f-map-round {\n  display: block;\n  width: 180px;\n  height: 180px;\n  margin: 24px auto;\n  border-radius: 50%;\n  background-image: url(\"/img/Harc_mapa.png\");\n  background-position: -315px -70px;\n  background-repeat: no-repeat;\n}\n\n.a-img.f-panel {\n  position: relative;\n  display: block;\n  width: 100%;\n  height: 250px;\n  margin: 0;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: auto 100%;\n}\n\n.a-input {\n  outline: none;\n  background-color: transparent;\n  color: inherit;\n}\n\n.a-field.f-icon {\n  padding-right: 53px;\n}\n.a-field.f-icon:focus, .a-field.f-icon.f-filled {\n  padding-right: 52px;\n}\n\n.a-input.f-select {\n  width: 100%;\n  border: none;\n  line-height: 24px;\n  padding: 15px;\n  padding-top: 16px;\n  padding-bottom: 14px;\n}\n.a-input.f-select:focus, .a-input.f-select.f-correct, .a-input.f-select.f-error {\n  opacity: 1;\n  padding: 14px;\n  padding-top: 15px;\n  padding-bottom: 13px;\n}\n\n.a-label.f-button-icon-footer {\n  margin: 0 auto;\n  line-height: 16px;\n}\n\n.a-label.f-field {\n  position: absolute;\n  top: 17px;\n  left: 12px;\n  padding: 0 4px;\n  line-height: 24px;\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n  transition-duration: 200ms;\n  background-color: #fafafa;\n  color: rgba(76, 76, 76, 0.7);\n}\n\n.a-field:focus ~ .a-label.f-field, .a-field:focus-within ~ .a-label.f-field, .a-field.f-filled ~ .a-label.f-field {\n  top: -7px;\n  left: 13px;\n  font-size: 12px;\n  line-height: 16px;\n}\n.a-field:focus ~ .a-label.f-field, .a-field:focus-within ~ .a-label.f-field {\n  color: rgba(76, 76, 76, 0.7);\n}\n.a-field:focus ~ .a-label.f-field.f-correct {\n  color: #07632C;\n}\n.a-field.f-correct ~ .a-label.f-field.f-correct {\n  color: #07632C;\n}\n\n.a-field:focus ~ .a-label.f-field.f-error, .a-field.f-error ~ .a-label.f-field.f-error {\n  color: #ee1c25;\n}\n\n.a-label.f-select {\n  margin: 15px;\n  line-height: 24px;\n}\n\n.a-link {\n  color: #4c4c4c;\n  font-weight: bold;\n  text-decoration: underline;\n}\n\n.a-link.f-menu.f-selected {\n  display: block;\n  color: #582187;\n  background-color: rgba(88, 33, 135, 0.2);\n}\n\n.a-link.f-menu {\n  display: block;\n  color: rgba(76, 76, 76, 0.7);\n  text-decoration: none;\n  line-height: 58px;\n  height: 56px;\n  font-size: 16px;\n}\n\n.a-list-tile {\n  line-height: 24px;\n  text-align: start;\n  font-family: Roboto, sans-serif;\n}\n\n.a-loader {\n  display: inline-block;\n  transform: translateZ(1px);\n}\n\n.a-logo {\n  line-height: 24px;\n  padding-bottom: 2px;\n}\n\n.a-logo.f-big, .a-logo.m-banner.f-panel {\n  padding-bottom: 14px;\n}\n\n.a-message.f-error, .a-message.f-table.f-error {\n  color: #ee1c25;\n}\n\n.a-message.f-table {\n  color: rgba(76, 76, 76, 0.7);\n  font-weight: bold;\n}\n\n.a-option {\n  padding: 16px;\n  line-height: 16px;\n}\n\n.a-option.f-pointed {\n  background-color: rgba(7, 99, 44, 0.2);\n  font-weight: bold;\n}\n\n.a-option.f-selected {\n  background-color: rgba(7, 99, 44, 0.2);\n}\n\n.a-radio {\n  display: inline-block;\n  padding: 3px 5px;\n}\n.a-radio input {\n  position: relative;\n  top: 2px;\n  cursor: pointer;\n  margin-right: 5px;\n}\n\n.a-select {\n  position: relative;\n  border: none;\n  border-bottom: 1px solid rgba(76, 76, 76, 0.5);\n  background-color: transparent;\n  border-radius: unset;\n  width: 300px;\n  height: 40px;\n  color: #4c4c4c;\n  -webkit-appearance: none;\n  box-shadow: unset;\n  font-family: Roboto, serif;\n  align-items: unset;\n  padding-top: 15px;\n  padding-left: 8px;\n  outline: none;\n  z-index: 10;\n  cursor: pointer;\n}\n\n.a-select:focus {\n  outline: none;\n}\n\n.a-select:disabled {\n  opacity: 0.5;\n}\n\n.a-assist {\n  height: 32px;\n  padding: 4px 0;\n  padding-left: 16px;\n  overflow: hidden;\n  white-space: normal;\n}\n\n.a-text.f-strong, .m-box.f-panel, .f-strong.m-banner.f-panel {\n  line-height: 24px;\n  letter-spacing: 0.25px;\n}\n\n.a-subtitle {\n  line-height: 28px;\n  letter-spacing: 0.5px;\n  color: #fafafa;\n}\n\n.a-text.f-subtitle.f-menu, .f-subtitle.f-menu.m-box.f-panel, .f-subtitle.f-menu.m-banner.f-panel {\n  font-weight: bold;\n  line-height: 14px;\n  padding: 8px;\n  padding-left: 16px;\n  padding-bottom: 24px;\n  color: rgba(76, 76, 76, 0.7);\n}\n\n.a-text.f-subtitle.f-start, .f-subtitle.f-start.m-box.f-panel, .f-subtitle.f-start.m-banner.f-panel {\n  font-weight: bold;\n  line-height: 20px;\n  color: rgba(250, 250, 250, 0.6);\n}\n\n.a-title {\n  font-weight: bold;\n  padding: 16px 0;\n}\n\n.a-text.f-title.f-big, .f-title.f-big.m-box.f-panel, .a-text.f-title.m-banner.f-panel, .f-title.m-banner.f-panel.m-box, .f-big.m-banner.f-panel, .m-banner.f-panel {\n  font-weight: 700;\n  line-height: 28px;\n  letter-spacing: 0.5px;\n  color: #fafafa;\n  text-transform: uppercase;\n  padding: 14px 16px;\n}\n\n.a-text.f-title.f-menu, .f-title.f-menu.m-box.f-panel, .f-menu.m-banner.f-panel {\n  font-weight: bold;\n  line-height: 22px;\n  padding: 0;\n  padding-left: 16px;\n  padding-top: 16px;\n}\n\n.a-version {\n  position: fixed;\n  right: 8px;\n  bottom: 60px;\n  font-size: 12px;\n}\n\n.m-area.f-button.f-fill {\n  display: block;\n  padding: 0;\n}\n\n.m-area.f-button {\n  display: inline-block;\n  padding: 6px;\n  margin: 0 auto;\n  margin-top: 16px;\n}\n\n.m-banner-map {\n  position: absolute;\n  z-index: 10;\n  display: flex;\n  width: 100%;\n  min-width: 92px;\n  height: 80px;\n  padding: 16px;\n  background: rgba(250, 250, 250, 0.7);\n  color: #4c4c4c;\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 700;\n  line-height: 24px;\n  text-align: center;\n}\n\n.m-banner-timer {\n  position: absolute;\n  z-index: 10;\n  left: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  padding: 4px 8px;\n  background: rgba(250, 250, 250, 0.7);\n  color: #4c4c4c;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: 700;\n  line-height: 20px;\n  text-align: center;\n}\n\n.m-banner-map.f-message-success {\n  height: 56px;\n  background: rgba(7, 99, 44, 0.5);\n  color: #fafafa;\n}\n\n.m-banner.f-panel {\n  background-color: rgba(88, 33, 135, 0.3);\n}\n\n.m-box.f-panel {\n  height: 56px;\n  padding: 16px;\n  background-color: #582187;\n  color: rgba(250, 250, 250, 0.7);\n}\n\n.m-clock {\n  border-bottom: 1px solid rgba(76, 76, 76, 0.2);\n}\n\n.m-collection.f-button {\n  text-align: center;\n}\n\n.m-countdown-timer-warning {\n  color: red;\n}\n\n.m-countdown-timer {\n  color: #4c4c4c;\n}\n\n.m-cover {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 90;\n}\n\n.m-cover.f-popup {\n  background: rgba(0, 0, 0, 0.3);\n  overflow-y: auto;\n}\n\n.m-grid, .m-row.f-header {\n  display: grid;\n}\n\n.m-grid.f-category-sum, .f-category-sum.m-row.f-header {\n  grid-template-columns: 80px 128px 120px;\n}\n\n.m-grid.f-collected-points, .f-collected-points.m-row.f-header {\n  justify-items: center;\n  align-items: center;\n  border-top: 1px solid rgba(76, 76, 76, 0.2);\n}\n.m-grid.f-collected-points:last-child, .f-collected-points.m-row.f-header:last-child {\n  border-bottom: 1px solid rgba(76, 76, 76, 0.2);\n}\n\n.m-grid.f-point, .f-point.m-row.f-header {\n  grid-template-columns: 30px 60px 88px 80px 70px;\n}\n\n.m-grid.f-score, .f-score.m-row.f-header {\n  grid-template-columns: 170px 88px 70px;\n}\n\n.m-grid.f-search-point, .f-search-point.m-row.f-header {\n  grid-template-columns: 30px 50px 216px 40px;\n  border-top: 1px solid rgba(76, 76, 76, 0.2);\n}\n.m-grid.f-search-point:nth-child(1), .f-search-point.m-row.f-header:nth-child(1) {\n  border-top: none;\n}\n\n.m-grid.f-split-2, .f-split-2.m-row.f-header {\n  grid-template-columns: repeat(2, 50%);\n}\n\n.m-grid.f-split-3, .f-split-3.m-row.f-header {\n  grid-template-columns: repeat(3, 33.3333333333%);\n}\n\n.m-grid.f-temporary-points, .f-temporary-points.m-row.f-header {\n  grid-template-columns: 40px 1fr 40px;\n  justify-items: left;\n  align-items: center;\n  border-bottom: 1px solid rgba(76, 76, 76, 0.2);\n  line-height: 24px;\n  font-size: 18px;\n  font-style: italic;\n  letter-spacing: 0.5px;\n  font-family: Roboto, sans-serif;\n}\n\n.m-input {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  padding: 0;\n  margin: 0;\n  margin-bottom: 8px;\n}\n\n.m-list-element.f-popup {\n  min-height: 32px;\n  padding: 0 8px;\n  line-height: 16px;\n  color: #4c4c4c;\n  text-align: left;\n  font-weight: normal;\n  cursor: pointer;\n}\n.m-list-element.f-popup:hover {\n  background-color: rgba(88, 33, 135, 0.2);\n}\n\n.m-pointer {\n  position: relative;\n  top: calc(50vh - 16px / 2);\n  left: calc(50% - 16px / 2);\n  width: 16px;\n  height: 16px;\n  background-color: transparent;\n  border: 2px solid black;\n  border-radius: 50%;\n}\n.m-pointer:before {\n  content: \"\";\n  position: absolute;\n  top: calc((16px - 4px - 2px) / 2);\n  left: calc(-50vw + (12px) / 2);\n  z-index: -1;\n  display: block;\n  width: 100vw;\n  height: 2px;\n  background: rgba(0, 0, 0, 0.6);\n}\n.m-pointer:after {\n  content: \"\";\n  position: absolute;\n  left: calc((16px - 4px - 2px) / 2);\n  top: calc(-50vh + 4px + 2px);\n  z-index: -1;\n  display: block;\n  width: 2px;\n  height: 100vh;\n  background: rgba(0, 0, 0, 0.6);\n}\n\n.m-options {\n  position: absolute;\n  left: 0;\n  top: calc(100% + 1px - 32px);\n  right: 0;\n  background-color: #fafafa;\n  color: #4c4c4c;\n  border-radius: 4px;\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n  overflow: hidden;\n  z-index: 100;\n}\n\n.m-options.f-top {\n  top: auto;\n  bottom: calc(100% + 6px);\n}\n\n.m-panel.f-header.f-side {\n  width: 33px;\n}\n\n.m-panel.f-start {\n  background-color: #2d1145;\n}\n\n.m-row.f-header {\n  color: rgba(76, 76, 76, 0.7);\n  border-bottom: 1px solid rgba(76, 76, 76, 0.2);\n}\n\n.m-slide {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100vw;\n  height: 100vh;\n  white-space: normal;\n  text-align: left;\n  color: #4c4c4c;\n}\n\n.m-snackbar {\n  position: absolute;\n  left: 8px;\n  top: 64px;\n  right: 8px;\n  z-index: 49;\n  display: flex;\n  line-height: 16px;\n  font-weight: bold;\n  background-color: #0F9EED;\n  color: #fafafa;\n  border-radius: 4px;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n}\n\n.m-snackbar.f-error, .m-snackbar.a-message.f-table.f-error {\n  background-color: #ee1c25;\n}\n\n.m-snackbar.f-success {\n  background-color: #07632C;\n}\n\n.o-float-container {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 150;\n  background-color: #fafafa;\n}\n\n.o-footer {\n  position: relative;\n  z-index: 50;\n  display: flex;\n  height: 56px;\n  overflow: visible;\n  background-color: #054520;\n  border-top: 2px solid #054520;\n  color: #fafafa;\n}\n\n.o-header {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  height: 56px;\n  overflow: hidden;\n  color: #fafafa;\n  background: #07632C;\n  border-bottom: 2px solid #054520;\n  padding-left: 16px;\n  padding-right: 16px;\n}\n\n.o-loading {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  top: 56px;\n  padding-top: 36vh;\n  z-index: 100;\n  text-align: center;\n  background-color: #07632C;\n}\n\n.o-map {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.o-menu {\n  position: absolute;\n  z-index: 40;\n  top: 0;\n  left: 100%;\n  bottom: 56px;\n  width: 90%;\n  padding: 10px 0;\n  padding-top: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  background-color: #fafafa;\n  color: #4c4c4c;\n  transition: 0.5s left;\n  border-left: rgba(76, 76, 76, 0.2) 1px solid;\n  box-shadow: none;\n}\n\n.o-menu.f-open {\n  left: 10%;\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n\n.o-nav {\n  height: 60px;\n}\n\n.o-popup {\n  width: 280px;\n  background: #07632C;\n  box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 3px 1px;\n  margin: 32vh auto 0 auto;\n  padding: 56px 32px 48px 32px;\n  text-align: center;\n  color: #fafafa;\n  font-weight: bold;\n  font-size: 20px;\n}\n\n.o-popup.f-map {\n  position: absolute;\n  width: 240px;\n  height: auto;\n  margin: 0;\n  padding: 8px 0;\n  background-color: #fafafa;\n  color: #4c4c4c;\n  border-radius: 4px;\n  border: solid 1px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 1px 6px rgba(60, 64, 67, 0.28);\n}\n\n.o-popup.f-score {\n  position: absolute;\n  left: 8px;\n  top: calc(56px + 8px);\n  right: 8px;\n  width: auto;\n  min-height: 200px;\n  padding: 8px;\n  margin: 0;\n  background: #fafafa;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  text-align: center;\n  color: #4c4c4c;\n  font-weight: bold;\n  font-size: 20px;\n}\n\n.t-base {\n  display: flex;\n  flex-direction: column;\n  background-color: #fafafa;\n}\n\n.t-page {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: #fafafa;\n  overflow: hidden;\n  overflow-y: auto;\n  padding: 16px 16px;\n}\n\n.t-page.f-map {\n  padding: 0;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.dark-map-layer {\n  filter: invert(100%) sepia(100%) saturate(0%) brightness(100%) contrast(100%);\n}\n\n.ol-zoom {\n  left: unset !important;\n  right: 8px;\n  top: unset !important;\n  bottom: 50px;\n}\n\n.ol-control {\n  border-radius: 0 !important;\n  padding: 1px !important;\n}\n\n.ol-control button {\n  background-color: rgba(88, 33, 135, 0.5) !important;\n  border: none !important;\n  border-radius: 0 !important;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=template&id=6c0a0fc1&":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/app.vue?vue&type=template&id=6c0a0fc1& ***!
  \*********************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [
      _c("o-header"),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "f-relative f-flex-1" },
        [_c("router-view", { key: _vm.routerId })],
        1
      ),
      _vm._v(" "),
      _c("o-footer", {
        directives: [
          {
            name: "touch",
            rawName: "v-touch:swipe.left",
            value: _vm.openMenuIfLogin,
            expression: "openMenuIfLogin",
            arg: "swipe",
            modifiers: { left: true }
          },
          {
            name: "touch",
            rawName: "v-touch:swipe.right",
            value: _vm.closeMenu,
            expression: "closeMenu",
            arg: "swipe",
            modifiers: { right: true }
          }
        ]
      }),
      _vm._v(" "),
      _c("o-menu"),
      _vm._v(" "),
      _c("div", {
        directives: [
          {
            name: "touch",
            rawName: "v-touch:swipe.right",
            value: _vm.closeMenu,
            expression: "closeMenu",
            arg: "swipe",
            modifiers: { right: true }
          }
        ],
        staticClass: "a-cover f-menu",
        class: _vm.isOpen ? "f-show" : "",
        on: { click: _vm.closeMenu }
      }),
      _vm._v(" "),
      _c("m-snackbar"),
      _vm._v(" "),
      _c(
        "transition",
        { attrs: { name: "fade" } },
        [
          _c("o-loading", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.isLoading,
                expression: "isLoading"
              }
            ]
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/button.vue?vue&type=template&id=16ba112f&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/atoms/button.vue?vue&type=template&id=16ba112f& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "m-area f-button",
      on: {
        click: function($event) {
          return _vm.emitClick($event)
        }
      }
    },
    [
      _c(
        "button",
        {
          ref: "button",
          staticClass: "a-button",
          class: _vm.getClass,
          attrs: { type: _vm.type, disabled: _vm.disabled }
        },
        [
          _vm.loading === false ? _vm._t("default") : _vm._e(),
          _vm._v(" "),
          _vm.loading
            ? _c("a-loader", {
                attrs: { "add-class": _vm.addClass, img: _vm.loadingImg }
              })
            : _vm._e()
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/button/primary.vue?vue&type=template&id=e2cdb8bc&":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/atoms/button/primary.vue?vue&type=template&id=e2cdb8bc& ***!
  \**************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a-button",
    {
      attrs: {
        "add-class": ["f-primary", _vm.addClass],
        loading: _vm.loading,
        disabled: _vm.disabled,
        type: _vm.type,
        "loading-img": "/img/zhp-52.png"
      },
      on: {
        click: function($event) {
          return _vm.$emit("click")
        }
      }
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/button/secondary.vue?vue&type=template&id=77409c14&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/atoms/button/secondary.vue?vue&type=template&id=77409c14& ***!
  \****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a-button",
    {
      attrs: {
        "add-class": ["f-secondary", _vm.addClass],
        loading: _vm.loading,
        "loading-img": _vm.loadingImg,
        disabled: _vm.disabled
      },
      on: {
        click: function($event) {
          return _vm.$emit("click", $event)
        }
      }
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/link-menu.vue?vue&type=template&id=4de1f665&":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/atoms/link-menu.vue?vue&type=template&id=4de1f665& ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a",
    {
      staticClass: "a-link f-menu",
      on: {
        click: function($event) {
          return _vm.$emit("click")
        }
      }
    },
    [
      _c("a-icon", { staticClass: "f-menu", attrs: { name: _vm.icon } }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "f-flex-1 f-pl-3" },
        [_vm._t("default"), _vm._v("\n    " + _vm._s(_vm.text) + "\n  ")],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/loader.vue?vue&type=template&id=130bc190&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/atoms/loader.vue?vue&type=template&id=130bc190& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("span", { staticClass: "a-loader" }, [
    _c("img", {
      staticClass: "a-img f-loader",
      class: _vm.addClass,
      attrs: { src: _vm.img, alt: "logo" }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/molecules/snackbar.vue?vue&type=template&id=215850b7&":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/molecules/snackbar.vue?vue&type=template&id=215850b7& ***!
  \************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "fade" } }, [
    _vm.isOpen
      ? _c("div", { staticClass: "m-snackbar", class: _vm.colorClasses }, [
          _c("div", { staticClass: "f-flex-1 f-p-2" }, [
            _vm._v("\n      " + _vm._s(_vm.message) + "\n    ")
          ]),
          _vm._v(" "),
          _c(
            "div",
            { on: { click: _vm.close } },
            [
              _c("a-icon", {
                staticClass: "a-icon f-snackbar",
                attrs: { name: _vm.ICONS.close }
              })
            ],
            1
          )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/footer.vue?vue&type=template&id=6e983519&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/organisms/footer.vue?vue&type=template&id=6e983519& ***!
  \**********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "o-footer" }, [_vm._v("\n  o-footer\n")])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/header.vue?vue&type=template&id=e06acdea&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/organisms/header.vue?vue&type=template&id=e06acdea& ***!
  \**********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "o-header" }, [
    _c(
      "div",
      {
        staticClass: "m-panel f-header f-side",
        class: { "f-hidden": _vm.isMainPage }
      },
      [
        _c("a-icon", {
          attrs: { name: _vm.ICONS.arrow_back, size: 28 },
          on: {
            click: function($event) {
              return _vm.$router.push(_vm.pathBackButton)
            }
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "m-panel f-header f-center" },
      [
        _vm.pageTitle !== ""
          ? [
              _c("div", { staticClass: "a-subtitle" }, [
                _vm._v("\n        " + _vm._s(_vm.pageTitle) + "\n      ")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "a-logo" }, [
                _vm._v("\n        Rehapp\n      ")
              ])
            ]
          : _c("div", { staticClass: "a-logo f-big" }, [
              _vm._v("\n      Rehapp\n    ")
            ])
      ],
      2
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "m-panel f-header f-side f-right" },
      [
        _c("a-icon", {
          staticClass: "f-header",
          attrs: { name: _vm.ROUTES.about.icon, size: 28 },
          on: { click: _vm.redirectToCollectedPointsOrScoreboard }
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/loading.vue?vue&type=template&id=17c1d02e&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/organisms/loading.vue?vue&type=template&id=17c1d02e& ***!
  \***********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "o-loading" },
    [
      _c("a-loader", {
        attrs: { "add-class": "f-big", img: "/img/zhp-86.png" }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/menu.vue?vue&type=template&id=7ebc745d&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/organisms/menu.vue?vue&type=template&id=7ebc745d& ***!
  \********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "touch",
          rawName: "v-touch:swipe.right",
          value: _vm.close,
          expression: "close",
          arg: "swipe",
          modifiers: { right: true }
        }
      ],
      staticClass: "o-menu",
      class: _vm.isOpen ? "f-open" : ""
    },
    [
      _c("div", { staticClass: "a-text f-title f-menu" }, [
        _vm._v(
          _vm._s(_vm.$t("general.hello")) +
            ", " +
            _vm._s(_vm.$store.getters["user/userTeam"])
        )
      ]),
      _vm._v(" "),
      _vm.checkIsCommon()
        ? _c("div", { staticClass: "a-text f-subtitle f-menu" }, [
            _vm._v(
              "\n    " +
                _vm._s(_vm.$t("general.alreadyCollectedShort")) +
                "\n    "
            ),
            _c("span", { staticClass: "f-text-primary-contrast" }, [
              _vm._v(
                "\n      " +
                  _vm._s(_vm.$store.getters["user/sumOfCollectedPoints"]) +
                  " " +
                  _vm._s(_vm.$t("general.pointUnit")) +
                  "\n    "
              )
            ])
          ])
        : _c("div", { staticClass: "a-text f-subtitle f-menu" }, [
            _vm._v(
              "\n    " +
                _vm._s(
                  _vm.checkIsNotLimited()
                    ? _vm.$t("general.fullAdmin")
                    : _vm.$t("general.limitedAdmin")
                ) +
                "\n  "
            )
          ]),
      _vm._v(" "),
      _vm._l(_vm.links, function(route, key) {
        return _c(
          "router-link",
          {
            key: key,
            staticClass: "a-link f-menu",
            class: { "f-selected": _vm.isActualPath(route) },
            attrs: { to: route.path },
            nativeOn: {
              click: function($event) {
                return _vm.close()
              }
            }
          },
          [
            _c("a-icon", {
              staticClass: "f-menu",
              attrs: { name: route.icon }
            }),
            _vm._v(" "),
            _c("div", { staticClass: "f-flex-1 f-pl-3" }, [
              _vm._v(_vm._s(route.label))
            ])
          ],
          1
        )
      }),
      _vm._v(" "),
      _vm.checkIsCommon()
        ? _c("a-link-menu", {
            attrs: {
              icon: _vm.ICONS.help,
              text: _vm.$t("features.guide.howAppWorks")
            },
            on: {
              click: function($event) {
                return _vm.openGuide()
              }
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _c("a-link-menu", {
        attrs: {
          icon: _vm.ICONS.brightness_4,
          text:
            _vm.themeName === _vm.THEMES.light
              ? _vm.$t("general.darkTheme")
              : _vm.$t("general.lightTheme")
        },
        on: {
          click: function($event) {
            return _vm.toggleTheme()
          }
        }
      }),
      _vm._v(" "),
      _c("a-link-menu", {
        attrs: { icon: _vm.ICONS.logout, text: _vm.$t("general.logout") },
        on: {
          click: function($event) {
            return _vm.signOut()
          }
        }
      }),
      _vm._v(" "),
      _vm.isOpen
        ? _c("div", { staticClass: "a-version" }, [
            _vm._v("\n    v" + _vm._s(_vm.VERSION) + "\n  ")
          ])
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/pages/error.vue?vue&type=template&id=3b4238c6&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/pages/error.vue?vue&type=template&id=3b4238c6& ***!
  \*****************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("t-page", { staticClass: "f-start" }, [
    _c("div", [
      _c("div", [
        _c("span", { staticClass: "a-text f-title f-big" }, [
          _vm._v("\n        " + _vm._s(_vm.$t("page.error.title")) + "\n      ")
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "m-collection f-button f-px-2" }, [
      _c("div", {
        staticClass: "f-pt-3 f-text-bold",
        domProps: { innerHTML: _vm._s(_vm.$t("page.error.content")) }
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "f-pt-1" },
        [
          _c("a-button-primary", { on: { click: _vm.redirectToMainPage } }, [
            _vm._v(
              "\n        " + _vm._s(_vm.$t("general.backToStart")) + "\n      "
            )
          ])
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/pages/welcome.vue?vue&type=template&id=4a24a4b7&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/pages/welcome.vue?vue&type=template&id=4a24a4b7& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("t-page", { attrs: { title: "" } }, [
    _c("div", { staticClass: "a-img f-map-round" }),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "m-collection f-button" },
      [
        _c(
          "a-button-primary",
          {
            on: {
              click: function($event) {
                return _vm.$router.push(_vm.ROUTES.signIn.path)
              }
            }
          },
          [_vm._v("\n      " + _vm._s(_vm.ROUTES.signIn.label) + "\n    ")]
        ),
        _vm._v(" "),
        _c(
          "a-button-secondary",
          {
            on: {
              click: function($event) {
                return _vm.$router.push(_vm.ROUTES.signUp.path)
              }
            }
          },
          [_vm._v("\n      " + _vm._s(_vm.ROUTES.signUp.label) + "\n    ")]
        ),
        _vm._v(" "),
        _c(
          "a-button-secondary",
          {
            on: {
              click: function($event) {
                return _vm.$router.push(_vm.ROUTES.about.path)
              }
            }
          },
          [_vm._v("\n      " + _vm._s(_vm.ROUTES.about.label) + "\n    ")]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/templates/page.vue?vue&type=template&id=4a2b8335&":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/templates/page.vue?vue&type=template&id=4a2b8335& ***!
  \********************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "touch",
          rawName: "v-touch:swipe.left",
          value: _vm.openMenu,
          expression: "openMenu",
          arg: "swipe",
          modifiers: { left: true }
        }
      ],
      staticClass: "t-page"
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/components/app.vue":
/*!********************************!*\
  !*** ./src/components/app.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.vue?vue&type=template&id=6c0a0fc1& */ "./src/components/app.vue?vue&type=template&id=6c0a0fc1&");
/* harmony import */ var _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.vue?vue&type=script&lang=js& */ "./src/components/app.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/app.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/app.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./src/components/app.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--5!../../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/app.vue?vue&type=template&id=6c0a0fc1&":
/*!***************************************************************!*\
  !*** ./src/components/app.vue?vue&type=template&id=6c0a0fc1& ***!
  \***************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=template&id=6c0a0fc1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=template&id=6c0a0fc1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/atoms/button.vue":
/*!*****************************************!*\
  !*** ./src/components/atoms/button.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _button_vue_vue_type_template_id_16ba112f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button.vue?vue&type=template&id=16ba112f& */ "./src/components/atoms/button.vue?vue&type=template&id=16ba112f&");
/* harmony import */ var _button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./button.vue?vue&type=script&lang=js& */ "./src/components/atoms/button.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _button_vue_vue_type_template_id_16ba112f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _button_vue_vue_type_template_id_16ba112f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/atoms/button.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/atoms/button.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./src/components/atoms/button.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--5!../../../node_modules/vue-loader/lib??vue-loader-options!./button.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/button.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/atoms/button.vue?vue&type=template&id=16ba112f&":
/*!************************************************************************!*\
  !*** ./src/components/atoms/button.vue?vue&type=template&id=16ba112f& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_template_id_16ba112f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./button.vue?vue&type=template&id=16ba112f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/button.vue?vue&type=template&id=16ba112f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_template_id_16ba112f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_template_id_16ba112f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/atoms/button/primary.vue":
/*!*************************************************!*\
  !*** ./src/components/atoms/button/primary.vue ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _primary_vue_vue_type_template_id_e2cdb8bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./primary.vue?vue&type=template&id=e2cdb8bc& */ "./src/components/atoms/button/primary.vue?vue&type=template&id=e2cdb8bc&");
/* harmony import */ var _primary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./primary.vue?vue&type=script&lang=js& */ "./src/components/atoms/button/primary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _primary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _primary_vue_vue_type_template_id_e2cdb8bc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _primary_vue_vue_type_template_id_e2cdb8bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/atoms/button/primary.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/atoms/button/primary.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./src/components/atoms/button/primary.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_primary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--5!../../../../node_modules/vue-loader/lib??vue-loader-options!./primary.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/button/primary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_primary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/atoms/button/primary.vue?vue&type=template&id=e2cdb8bc&":
/*!********************************************************************************!*\
  !*** ./src/components/atoms/button/primary.vue?vue&type=template&id=e2cdb8bc& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_primary_vue_vue_type_template_id_e2cdb8bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./primary.vue?vue&type=template&id=e2cdb8bc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/button/primary.vue?vue&type=template&id=e2cdb8bc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_primary_vue_vue_type_template_id_e2cdb8bc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_primary_vue_vue_type_template_id_e2cdb8bc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/atoms/button/secondary.vue":
/*!***************************************************!*\
  !*** ./src/components/atoms/button/secondary.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _secondary_vue_vue_type_template_id_77409c14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./secondary.vue?vue&type=template&id=77409c14& */ "./src/components/atoms/button/secondary.vue?vue&type=template&id=77409c14&");
/* harmony import */ var _secondary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./secondary.vue?vue&type=script&lang=js& */ "./src/components/atoms/button/secondary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _secondary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _secondary_vue_vue_type_template_id_77409c14___WEBPACK_IMPORTED_MODULE_0__["render"],
  _secondary_vue_vue_type_template_id_77409c14___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/atoms/button/secondary.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/atoms/button/secondary.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./src/components/atoms/button/secondary.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_secondary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--5!../../../../node_modules/vue-loader/lib??vue-loader-options!./secondary.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/button/secondary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_secondary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/atoms/button/secondary.vue?vue&type=template&id=77409c14&":
/*!**********************************************************************************!*\
  !*** ./src/components/atoms/button/secondary.vue?vue&type=template&id=77409c14& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_secondary_vue_vue_type_template_id_77409c14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./secondary.vue?vue&type=template&id=77409c14& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/button/secondary.vue?vue&type=template&id=77409c14&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_secondary_vue_vue_type_template_id_77409c14___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_secondary_vue_vue_type_template_id_77409c14___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/atoms/link-menu.vue":
/*!********************************************!*\
  !*** ./src/components/atoms/link-menu.vue ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _link_menu_vue_vue_type_template_id_4de1f665___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./link-menu.vue?vue&type=template&id=4de1f665& */ "./src/components/atoms/link-menu.vue?vue&type=template&id=4de1f665&");
/* harmony import */ var _link_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./link-menu.vue?vue&type=script&lang=js& */ "./src/components/atoms/link-menu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _link_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _link_menu_vue_vue_type_template_id_4de1f665___WEBPACK_IMPORTED_MODULE_0__["render"],
  _link_menu_vue_vue_type_template_id_4de1f665___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/atoms/link-menu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/atoms/link-menu.vue?vue&type=script&lang=js&":
/*!*********************************************************************!*\
  !*** ./src/components/atoms/link-menu.vue?vue&type=script&lang=js& ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_link_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--5!../../../node_modules/vue-loader/lib??vue-loader-options!./link-menu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/link-menu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_link_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/atoms/link-menu.vue?vue&type=template&id=4de1f665&":
/*!***************************************************************************!*\
  !*** ./src/components/atoms/link-menu.vue?vue&type=template&id=4de1f665& ***!
  \***************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_link_menu_vue_vue_type_template_id_4de1f665___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./link-menu.vue?vue&type=template&id=4de1f665& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/link-menu.vue?vue&type=template&id=4de1f665&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_link_menu_vue_vue_type_template_id_4de1f665___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_link_menu_vue_vue_type_template_id_4de1f665___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/atoms/loader.vue":
/*!*****************************************!*\
  !*** ./src/components/atoms/loader.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loader_vue_vue_type_template_id_130bc190___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader.vue?vue&type=template&id=130bc190& */ "./src/components/atoms/loader.vue?vue&type=template&id=130bc190&");
/* harmony import */ var _loader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader.vue?vue&type=script&lang=js& */ "./src/components/atoms/loader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _loader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _loader_vue_vue_type_template_id_130bc190___WEBPACK_IMPORTED_MODULE_0__["render"],
  _loader_vue_vue_type_template_id_130bc190___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/atoms/loader.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/atoms/loader.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./src/components/atoms/loader.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_loader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--5!../../../node_modules/vue-loader/lib??vue-loader-options!./loader.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/loader.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_loader_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/atoms/loader.vue?vue&type=template&id=130bc190&":
/*!************************************************************************!*\
  !*** ./src/components/atoms/loader.vue?vue&type=template&id=130bc190& ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_loader_vue_vue_type_template_id_130bc190___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./loader.vue?vue&type=template&id=130bc190& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/atoms/loader.vue?vue&type=template&id=130bc190&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_loader_vue_vue_type_template_id_130bc190___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_loader_vue_vue_type_template_id_130bc190___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/molecules/snackbar.vue":
/*!***********************************************!*\
  !*** ./src/components/molecules/snackbar.vue ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _snackbar_vue_vue_type_template_id_215850b7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snackbar.vue?vue&type=template&id=215850b7& */ "./src/components/molecules/snackbar.vue?vue&type=template&id=215850b7&");
/* harmony import */ var _snackbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snackbar.vue?vue&type=script&lang=js& */ "./src/components/molecules/snackbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _snackbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _snackbar_vue_vue_type_template_id_215850b7___WEBPACK_IMPORTED_MODULE_0__["render"],
  _snackbar_vue_vue_type_template_id_215850b7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/molecules/snackbar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/molecules/snackbar.vue?vue&type=script&lang=js&":
/*!************************************************************************!*\
  !*** ./src/components/molecules/snackbar.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_snackbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--5!../../../node_modules/vue-loader/lib??vue-loader-options!./snackbar.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/molecules/snackbar.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_snackbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/molecules/snackbar.vue?vue&type=template&id=215850b7&":
/*!******************************************************************************!*\
  !*** ./src/components/molecules/snackbar.vue?vue&type=template&id=215850b7& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_snackbar_vue_vue_type_template_id_215850b7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./snackbar.vue?vue&type=template&id=215850b7& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/molecules/snackbar.vue?vue&type=template&id=215850b7&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_snackbar_vue_vue_type_template_id_215850b7___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_snackbar_vue_vue_type_template_id_215850b7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/organisms/footer.vue":
/*!*********************************************!*\
  !*** ./src/components/organisms/footer.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _footer_vue_vue_type_template_id_6e983519___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./footer.vue?vue&type=template&id=6e983519& */ "./src/components/organisms/footer.vue?vue&type=template&id=6e983519&");
/* harmony import */ var _footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./footer.vue?vue&type=script&lang=js& */ "./src/components/organisms/footer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _footer_vue_vue_type_template_id_6e983519___WEBPACK_IMPORTED_MODULE_0__["render"],
  _footer_vue_vue_type_template_id_6e983519___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/organisms/footer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/organisms/footer.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./src/components/organisms/footer.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--5!../../../node_modules/vue-loader/lib??vue-loader-options!./footer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/footer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/organisms/footer.vue?vue&type=template&id=6e983519&":
/*!****************************************************************************!*\
  !*** ./src/components/organisms/footer.vue?vue&type=template&id=6e983519& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_template_id_6e983519___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./footer.vue?vue&type=template&id=6e983519& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/footer.vue?vue&type=template&id=6e983519&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_template_id_6e983519___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_footer_vue_vue_type_template_id_6e983519___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/organisms/header.vue":
/*!*********************************************!*\
  !*** ./src/components/organisms/header.vue ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _header_vue_vue_type_template_id_e06acdea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.vue?vue&type=template&id=e06acdea& */ "./src/components/organisms/header.vue?vue&type=template&id=e06acdea&");
/* harmony import */ var _header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header.vue?vue&type=script&lang=js& */ "./src/components/organisms/header.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _header_vue_vue_type_template_id_e06acdea___WEBPACK_IMPORTED_MODULE_0__["render"],
  _header_vue_vue_type_template_id_e06acdea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/organisms/header.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/organisms/header.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** ./src/components/organisms/header.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--5!../../../node_modules/vue-loader/lib??vue-loader-options!./header.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/header.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/organisms/header.vue?vue&type=template&id=e06acdea&":
/*!****************************************************************************!*\
  !*** ./src/components/organisms/header.vue?vue&type=template&id=e06acdea& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_template_id_e06acdea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./header.vue?vue&type=template&id=e06acdea& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/header.vue?vue&type=template&id=e06acdea&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_template_id_e06acdea___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_header_vue_vue_type_template_id_e06acdea___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/organisms/loading.vue":
/*!**********************************************!*\
  !*** ./src/components/organisms/loading.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _loading_vue_vue_type_template_id_17c1d02e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loading.vue?vue&type=template&id=17c1d02e& */ "./src/components/organisms/loading.vue?vue&type=template&id=17c1d02e&");
/* harmony import */ var _loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loading.vue?vue&type=script&lang=js& */ "./src/components/organisms/loading.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _loading_vue_vue_type_template_id_17c1d02e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _loading_vue_vue_type_template_id_17c1d02e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/organisms/loading.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/organisms/loading.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./src/components/organisms/loading.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--5!../../../node_modules/vue-loader/lib??vue-loader-options!./loading.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/loading.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/organisms/loading.vue?vue&type=template&id=17c1d02e&":
/*!*****************************************************************************!*\
  !*** ./src/components/organisms/loading.vue?vue&type=template&id=17c1d02e& ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_template_id_17c1d02e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./loading.vue?vue&type=template&id=17c1d02e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/loading.vue?vue&type=template&id=17c1d02e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_template_id_17c1d02e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_loading_vue_vue_type_template_id_17c1d02e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/organisms/menu.vue":
/*!*******************************************!*\
  !*** ./src/components/organisms/menu.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _menu_vue_vue_type_template_id_7ebc745d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.vue?vue&type=template&id=7ebc745d& */ "./src/components/organisms/menu.vue?vue&type=template&id=7ebc745d&");
/* harmony import */ var _menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.vue?vue&type=script&lang=js& */ "./src/components/organisms/menu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _menu_vue_vue_type_template_id_7ebc745d___WEBPACK_IMPORTED_MODULE_0__["render"],
  _menu_vue_vue_type_template_id_7ebc745d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/organisms/menu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/organisms/menu.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./src/components/organisms/menu.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--5!../../../node_modules/vue-loader/lib??vue-loader-options!./menu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/menu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/organisms/menu.vue?vue&type=template&id=7ebc745d&":
/*!**************************************************************************!*\
  !*** ./src/components/organisms/menu.vue?vue&type=template&id=7ebc745d& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_template_id_7ebc745d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./menu.vue?vue&type=template&id=7ebc745d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/organisms/menu.vue?vue&type=template&id=7ebc745d&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_template_id_7ebc745d___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_menu_vue_vue_type_template_id_7ebc745d___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/pages/error.vue":
/*!****************************************!*\
  !*** ./src/components/pages/error.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _error_vue_vue_type_template_id_3b4238c6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./error.vue?vue&type=template&id=3b4238c6& */ "./src/components/pages/error.vue?vue&type=template&id=3b4238c6&");
/* harmony import */ var _error_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error.vue?vue&type=script&lang=js& */ "./src/components/pages/error.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _error_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _error_vue_vue_type_template_id_3b4238c6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _error_vue_vue_type_template_id_3b4238c6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/pages/error.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/pages/error.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./src/components/pages/error.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_error_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--5!../../../node_modules/vue-loader/lib??vue-loader-options!./error.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/pages/error.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_error_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/pages/error.vue?vue&type=template&id=3b4238c6&":
/*!***********************************************************************!*\
  !*** ./src/components/pages/error.vue?vue&type=template&id=3b4238c6& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_error_vue_vue_type_template_id_3b4238c6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./error.vue?vue&type=template&id=3b4238c6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/pages/error.vue?vue&type=template&id=3b4238c6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_error_vue_vue_type_template_id_3b4238c6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_error_vue_vue_type_template_id_3b4238c6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/pages/welcome.vue":
/*!******************************************!*\
  !*** ./src/components/pages/welcome.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _welcome_vue_vue_type_template_id_4a24a4b7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./welcome.vue?vue&type=template&id=4a24a4b7& */ "./src/components/pages/welcome.vue?vue&type=template&id=4a24a4b7&");
/* harmony import */ var _welcome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./welcome.vue?vue&type=script&lang=js& */ "./src/components/pages/welcome.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _welcome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _welcome_vue_vue_type_template_id_4a24a4b7___WEBPACK_IMPORTED_MODULE_0__["render"],
  _welcome_vue_vue_type_template_id_4a24a4b7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/pages/welcome.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/pages/welcome.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./src/components/pages/welcome.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_welcome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--5!../../../node_modules/vue-loader/lib??vue-loader-options!./welcome.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/pages/welcome.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_welcome_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/pages/welcome.vue?vue&type=template&id=4a24a4b7&":
/*!*************************************************************************!*\
  !*** ./src/components/pages/welcome.vue?vue&type=template&id=4a24a4b7& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_welcome_vue_vue_type_template_id_4a24a4b7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./welcome.vue?vue&type=template&id=4a24a4b7& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/pages/welcome.vue?vue&type=template&id=4a24a4b7&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_welcome_vue_vue_type_template_id_4a24a4b7___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_welcome_vue_vue_type_template_id_4a24a4b7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/components/templates/page.vue":
/*!*******************************************!*\
  !*** ./src/components/templates/page.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _page_vue_vue_type_template_id_4a2b8335___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page.vue?vue&type=template&id=4a2b8335& */ "./src/components/templates/page.vue?vue&type=template&id=4a2b8335&");
/* harmony import */ var _page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page.vue?vue&type=script&lang=js& */ "./src/components/templates/page.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _page_vue_vue_type_template_id_4a2b8335___WEBPACK_IMPORTED_MODULE_0__["render"],
  _page_vue_vue_type_template_id_4a2b8335___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/templates/page.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/templates/page.vue?vue&type=script&lang=js&":
/*!********************************************************************!*\
  !*** ./src/components/templates/page.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--5!../../../node_modules/vue-loader/lib??vue-loader-options!./page.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/templates/page.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/templates/page.vue?vue&type=template&id=4a2b8335&":
/*!**************************************************************************!*\
  !*** ./src/components/templates/page.vue?vue&type=template&id=4a2b8335& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_template_id_4a2b8335___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./page.vue?vue&type=template&id=4a2b8335& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/templates/page.vue?vue&type=template&id=4a2b8335&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_template_id_4a2b8335___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_page_vue_vue_type_template_id_4a2b8335___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/dictionary/index.js":
/*!*********************************!*\
  !*** ./src/dictionary/index.js ***!
  \*********************************/
/*! exports provided: translator, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translator", function() { return translator; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-i18n */ "./node_modules/vue-i18n/dist/vue-i18n.esm.js");
/* harmony import */ var src_dictionary_language_pl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/dictionary/language/pl */ "./src/dictionary/language/pl.js");



vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_i18n__WEBPACK_IMPORTED_MODULE_1__["default"]);
const i18n = new vue_i18n__WEBPACK_IMPORTED_MODULE_1__["default"]({
  locale: 'pl',
  messages: {
    pl: src_dictionary_language_pl__WEBPACK_IMPORTED_MODULE_2__["pl"]
  }
});
const translator = i18n;
/* harmony default export */ __webpack_exports__["default"] = (i18n);

/***/ }),

/***/ "./src/dictionary/language/pl.js":
/*!***************************************!*\
  !*** ./src/dictionary/language/pl.js ***!
  \***************************************/
/*! exports provided: pl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pl", function() { return pl; });
const pl = {
  title: {
    error: 'Błąd 404',
    welcome: 'Strona powitalna',
    about: 'O nas',
    short: {
      error: 'Błąd'
    }
  },
  general: {
    showMore: 'pokaż&nbsp;więcej...',
    pointUnit: 'pkt',
    pointCategoryLevel: 'poziom',
    pointTemporary: 'Czasowy',
    pointPermanent: 'Do zebrania',
    backToStart: 'Przejdź do startowej',
    backToWelcome: 'Przejdź do początkowej',
    alreadyCollectedShort: 'Zdobyliście',
    fullAdmin: 'Uprawnienia administratora',
    limitedAdmin: 'Uprawnienia obserwatora',
    hide: 'Ukryj',
    edit: 'Edytuj',
    logout: 'Wyloguj',
    remove: 'Usuń',
    copied: 'Skopiowano do schowka',
    hello: 'Cześć',
    saved: 'Zapisano!',
    lightTheme: 'Jasny tryb',
    darkTheme: 'Ciemny tryb'
  },
  form: {
    field: {
      email: 'E-mail',
      password: 'Hasło',
      rePassword: 'Powtórz hasło',
      newPassword: 'Nowe hasło',
      reNewPassword: 'Powtórz nowe hasło',
      userTeam: 'Nazwa patrolu',
      eventName: 'Nazwa wydarzenia',
      eventId: 'Kod wydarzenia',
      pointId: 'Kod punktu',
      pointName: 'Nazwa punktu',
      pointType: 'Typ punktu',
      pointDateAndAppearanceTime: 'Data i czas pojawienia się punktu',
      pointDateAndExpirationTime: 'Data i czas wygaśnięcia punktu',
      pointCategory: 'Kategoria punktu',
      mapRefreshTime: 'Odświeżanie punktów na mapie co',
      eventStartDate: 'Data i czas rozpoczęcia wydarzenia',
      eventEndDate: 'Data i czas zakończenia wydarzenia'
    },
    assist: {
      pointId: 'Kod punktu jest generowany automatycznie',
      eventId: 'Kod wydarzenia jest generowany automatycznie',
      fieldNotRequired: 'Pole jest nieobowiązkowe',
      userTeam: 'Nazwa patrolu musi być unikatowa'
    },
    validation: {
      required: 'Pole jest wymagane.',
      email: 'Musisz podać poprawny adres email.',
      min: 'Pole musi składać się z co najmniej {length} znaków.',
      max: 'Pole musi składać się z co najmniej {length} znaków.',
      confirmed: 'Pole nie zgadza się z polem potwierdzającym {target}.',
      length: 'Pole musi mieć długość {length}.',
      hasNumber: 'Pole powinno zawierać co najmniej jedną cyfrę.',
      hasCapitalize: 'Pole powinno zawierać co najmniej jedną wielką literę.'
    },
    button: {
      save: 'Zapisz',
      choose: 'wybierz',
      next: 'Dalej',
      goToLogin: 'Przejdź do logowania',
      setDefaultMapPositionAndZoom: 'Ustaw pozycję mapy',
      setPointMapPosition: 'Ustaw lokalizację punktu'
    }
  },
  page: {
    about: {
      appInfo: `to aplikacja przeznaczona do przeprowadzania gier terenowych dla harcerzy i nie tylko. Pomysłodawcą
        projektu jest drużynowy z Hufca ZHP Gdynia`,
      more: `Dominik Betka, który jest z zawodu programistą. Zebrał on zespół osób z branży,
        które chciały pomóc w formie wolontariatu. Poniżej możecie poznać ludzi, którzy poświęcili swój 
        czas na stworzenie tak ciekawego projektu. Dziękuję tym osobą za tą ciężką pracę.`,
      authors: 'O twórcach',
      leader: 'Team leader',
      frontDev: 'Front-end Developer',
      fullstack: 'Full-stack Developer',
      backDev: 'Back-end Developer',
      uxDesigner: 'UX Designer'
    },
    error: {
      title: 'Błąd 404',
      content: `Cześć! <br>
        Wygląda na to, że znajdujesz się nie tam gdzie trzeba... <br>
        <br>
        Poszukaj innej drogi! :)`
    }
  },
  error: {
    incompatibleAppVersion: 'Serwer jest niekompatybilny z aplikacją. Skontaktuj się z twórcą aplikacji',
    eventIdIsRequired: 'Kod wydarzenia jest wymagany',
    elementIdIsRequiredForMap: 'Kod wydarzenia jest wymagany, by uruchomić mapę',
    fakeErrorInMockApi: 'Fałszywy błąd mockApi',
    dataAfterSignIn: 'Logowanie nie powiodło się ze względu na problem z pobraniem danych dotyczących konta. Spróbuj ponownie.'
  },
  apiWarn: {
    undefined: 'Wystąpiło niezdefiniowane ostrzeżenie. Skontaktuj się z twórcą aplikacji.',
    firstWarnFromCrossdeviceVisit: 'Nie loguj się tak często na różnych urządzeniach. W innym wypadku na taką możliwość zostanie nałożona czasowa blokada.',
    lastWarnFromCrossdeviceVisit: 'Zbyt często logujesz się na różnych urządzeniach. Możesz to zrobić ostatni raz potem zablokujemy Ci taką możliwość na 1 godzinę.',
    lastCrossdevice_visit: 'Zbyt często logujesz się na różnych urządzeniach. Od teraz przez 1 godzinę nie możesz zalogować się na innym urządzeniu.'
  },
  apiError: {
    undefined: 'Wystąpił niezdefiniowany błąd. Skontaktuj się z twórcą aplikacji.',
    unauthorizedAccess: 'Brak uprawnień! Zostałeś automatycznie wylogowany.',
    notOnline: 'Utrata połączenia z serwerem. Za chwilę nastąpi ponowna próba połączenia.',
    toManyCrossdeviceVisits: 'Na te konto nałożona jest czasowa blokada na możliwość logowania się na różnych urządzeniach. Zaloguj się na ostatnio zalogowanym urządzeniu.',
    getEventById: 'Pobieranie danych wydarzenia się nie powiodło.',
    getPointsByEventId: 'Pobieranie punktów dla wybranego wydarzenia się nie powiodło.',
    getCategoriesByEventId: 'Pobieranie kategorii dla wybranego wydarzenia się nie powiodło.',
    updateEvent: 'Edycja danych dla wybranego wydarzenia się nie powiodła.',
    eventStartDateIsEmpty: 'Data i czas rozpoczęcia wydarzenia musi być uzupełniona.',
    eventEndDateIsEmpty: 'Data i czas zakończenia wydarzenia musi być uzupełniona.',
    eventIsOutOfDate: 'Punkt nie został zebrany, ponieważ wydarzenie zostało zakończone.',
    eventBeforeStart: 'Punkt nie został zebrany, ponieważ wydarzenie nie zostało rozpoczęte.',
    collectPoint: 'Zebranie punktu nie powiodło się przez błąd serwera.',
    pointCollectedEarlier: 'Punkt o podanym kodzie został zebrany wcześniej.',
    pointNoExist: 'Punkt o podanym kodzie nie istnieje.',
    addPoint: 'Dodanie punktu nie powiodło się.',
    editPoint: 'Edycja punktu nie powiodła się.',
    removePoint: 'Usuwanie punktu nie powiodło się przez błąd serwera.',
    pointIdOrEventIdNotExist: 'Kod punktu lub wydarzenia jest niepoprawny.',
    all: 'Pobranie listy użytkowników nie powiodło się ze względu na błąd serwera.',
    signIn: 'Logowanie nie powiodło się ze względu na błąd serwera.',
    signInData: 'Logowanie nie powiodło się z powodu błędnego e-mail lub hasła.',
    signInOnOtherDevice: 'Nie możesz się zalogować — jesteś zalogowany na innym urządzeniu.',
    inactiveAccount: 'Konto jest nieaktywne - sprawdź e-mail i zaktywuj konto.',
    checkYourLoginSession: 'Twoja sesja jest pusta — nie jesteś zalogowany.',
    signUp: 'Rejestracja nie powiodła się ze względu na błąd serwera.',
    eventIdNotExist: 'Podany kod wydarzenia jest niepoprawny.',
    userExist: 'Użytkownik o podanym e-mail lub nazwie patrolu już istnieje.',
    remindPassword: 'Wysyłanie przypomnienia hasła nie powiodło się ze względu na błąd serwera.',
    signOut: 'Wylogowanie po stronie serwera nie powiodło. Zostałeś wylogowany lokalnie.',
    changePassword: 'Zmiana hasła się nie powiodła ze względu na błąd serwera.'
  },
  communicate: {
    changePassword: {
      success: 'Twoje hasło zostało zmienione!'
    }
  },
  features: {}
};

/***/ }),

/***/ "./src/directives.js":
/*!***************************!*\
  !*** ./src/directives.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");

vue__WEBPACK_IMPORTED_MODULE_0__["default"].directive('click-outside', {
  priority: 700,

  bind(el, data, vm) {
    data.def.event = () => {
      vm.context[data.expression]();
    };

    el.addEventListener('click', data.def.stopProp);
    document.body.addEventListener('click', data.def.event);
  },

  unbind(el, data) {
    el.removeEventListener('click', data.def.stopProp);
    document.body.removeEventListener('click', data.def.event);
  },

  stopProp(event) {
    event.stopPropagation();
  }

});

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var _dictionary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dictionary */ "./src/dictionary/index.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./router */ "./src/router/index.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! store */ "./src/store/index.js");
/* harmony import */ var utils_style_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! utils/style-manager */ "./src/utils/style-manager.js");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./directives */ "./src/directives.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./validation */ "./src/validation.js");
/* harmony import */ var utils_macros_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! utils/macros/routes */ "./src/utils/macros/routes.js");
/* harmony import */ var _components_app_vue__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/app.vue */ "./src/components/app.vue");
/* harmony import */ var vue_ellipse_progress__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vue-ellipse-progress */ "./node_modules/vue-ellipse-progress/dist/vue-ellipse-progress.umd.min.js");
/* harmony import */ var vue_ellipse_progress__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(vue_ellipse_progress__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var vue2_touch_events__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vue2-touch-events */ "./node_modules/vue2-touch-events/index.js");
/* harmony import */ var vue2_touch_events__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(vue2_touch_events__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _dbetka_vue_material_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @dbetka/vue-material-icons */ "./node_modules/@dbetka/vue-material-icons/dist/index.js");
/* harmony import */ var _dbetka_vue_material_icons__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_dbetka_vue_material_icons__WEBPACK_IMPORTED_MODULE_11__);












utils_style_manager__WEBPACK_IMPORTED_MODULE_4__["styleManager"].init();
vue__WEBPACK_IMPORTED_MODULE_0__["default"].config.productionTip = false;

if (true) {
  console.log("HarcMap" + ' v' + "0.1.0" + ' in development mode');
}

vue__WEBPACK_IMPORTED_MODULE_0__["default"].mixin({
  computed: {
    ROUTES: () => utils_macros_routes__WEBPACK_IMPORTED_MODULE_7__["ROUTES"]
  }
});
vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue2_touch_events__WEBPACK_IMPORTED_MODULE_10___default.a);
vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_ellipse_progress__WEBPACK_IMPORTED_MODULE_9___default.a);
vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(_dbetka_vue_material_icons__WEBPACK_IMPORTED_MODULE_11___default.a);
new vue__WEBPACK_IMPORTED_MODULE_0__["default"]({
  router: _router__WEBPACK_IMPORTED_MODULE_2__["default"],
  store: store__WEBPACK_IMPORTED_MODULE_3__["store"],
  i18n: _dictionary__WEBPACK_IMPORTED_MODULE_1__["default"],
  render: h => h(_components_app_vue__WEBPACK_IMPORTED_MODULE_8__["default"])
}).$mount('#app');

/***/ }),

/***/ "./src/router/index.js":
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! store */ "./src/store/index.js");
/* harmony import */ var utils_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! utils/promise */ "./src/utils/promise.js");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./routes */ "./src/router/routes.js");
/* harmony import */ var utils_error_message__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! utils/error-message */ "./src/utils/error-message.js");





 // import { ROUTES } from 'utils/macros/routes';
// import { api } from 'api';
// import { versionCompatibility } from 'utils/version-compatibility';
// import { session } from 'utils/session';

let firstRun = true;
vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]);
const router = new vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: _routes__WEBPACK_IMPORTED_MODULE_4__["routes"]
});
router.beforeEach((to, from, next) => {
  let promise;

  if (firstRun) {
    firstRun = false;
    promise = makeFirstRun();
  } else {
    promise = Promise.resolve();
  }

  promise.catch(error => {
    if (error instanceof utils_error_message__WEBPACK_IMPORTED_MODULE_5__["ErrorMessage"]) error.showMessage();else console.error(e);
  }).finally(() => {
    redirectIfNotAuth(to, from, next);
    store__WEBPACK_IMPORTED_MODULE_2__["store"].commit('menu/close');
  });
});

router.hardReload = function () {
  store__WEBPACK_IMPORTED_MODULE_2__["store"].commit('increaseRouterId');
};

/* harmony default export */ __webpack_exports__["default"] = (router);

function makeFirstRun() {
  return new Promise((resolve, reject) => {
    // api.information()
    //   .then(versionCompatibility.check)
    //   .then(session.tryLogin)
    Promise.resolve().then(resolve).catch(reject).finally(() => utils_promise__WEBPACK_IMPORTED_MODULE_3__["promise"].timeout(1000)).finally(() => store__WEBPACK_IMPORTED_MODULE_2__["store"].commit('setIsLoading', false));
  });
}

function redirectIfNotAuth(to, from, next) {
  // const isLogin = store.getters['user/isLogin'] === true;
  // const adminRequired = to.meta.adminOnly === true;
  // const unlimitedOnly = to.meta.unlimitedOnly === true;
  // const isAdmin = permissions.checkIsAdmin();
  // const isLimitedUser = permissions.checkIsLimited();
  //
  // if (to === from) {
  //   next(false);
  // }
  // if (adminRequired && isAdmin === false) {
  //   if (isLogin) {
  //     next(ROUTES.start.path);
  //   } else {
  //     next(ROUTES.welcome.path);
  //   }
  //   return;
  // }
  // if (unlimitedOnly && isLimitedUser) {
  //   if (isLogin) {
  //     next(ROUTES.start.path);
  //   } else {
  //     next(ROUTES.welcome.path);
  //   }
  //   return;
  // }
  // if (isLogin) {
  //   if (to.meta.onlyBeforeLogin) {
  //     next(ROUTES.start.path);
  //     return;
  //   }
  // } else {
  //   if (to.meta.requiredAuth === true) {
  //     next(ROUTES.welcome.path);
  //     return;
  //   }
  // }
  next();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/router/routes.js":
/*!******************************!*\
  !*** ./src/router/routes.js ***!
  \******************************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony import */ var utils_macros_routes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/macros/routes */ "./src/utils/macros/routes.js");
/* harmony import */ var pages_welcome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pages/welcome */ "./src/components/pages/welcome.vue");
/* harmony import */ var pages_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! pages/error */ "./src/components/pages/error.vue");



const routes = [[utils_macros_routes__WEBPACK_IMPORTED_MODULE_0__["ROUTES"].error, pages_error__WEBPACK_IMPORTED_MODULE_3__["default"]], [utils_macros_routes__WEBPACK_IMPORTED_MODULE_0__["ROUTES"].welcome, pages_welcome__WEBPACK_IMPORTED_MODULE_1__["default"]], [utils_macros_routes__WEBPACK_IMPORTED_MODULE_0__["ROUTES"].about, () => __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! pages/about.vue */ "./src/components/pages/about.vue"))]].map(([route, component]) => ({ ...Object(utils_macros_routes__WEBPACK_IMPORTED_MODULE_0__["getDataForRouter"])(route),
  component
}));

/***/ }),

/***/ "./src/store/header.js":
/*!*****************************!*\
  !*** ./src/store/header.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  namespaced: true,
  state: {
    pageTitle: '',
    backRouteName: ''
  },
  getters: {
    pageTitle: state => state.pageTitle,
    backRouteName: state => state.backRouteName
  },
  mutations: {
    setPageTitle: (state, payload = '') => state.pageTitle = payload,
    setBackRouteName: (state, payload = '') => state.backRouteName = payload
  },
  actions: {}
});

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu */ "./src/store/menu.js");
/* harmony import */ var _theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./theme */ "./src/store/theme.js");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header */ "./src/store/header.js");
/* harmony import */ var _snackbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./snackbar */ "./src/store/snackbar.js");






vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);
const store = new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({
  modules: {
    menu: _menu__WEBPACK_IMPORTED_MODULE_2__["default"],
    theme: _theme__WEBPACK_IMPORTED_MODULE_3__["default"],
    header: _header__WEBPACK_IMPORTED_MODULE_4__["default"],
    snackbar: _snackbar__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  state: {
    isLoading: true,
    routerId: 0
  },
  getters: {
    isLoading: state => state.isLoading,
    routerId: state => state.routerId
  },
  mutations: {
    setIsLoading: (state, payload) => state.isLoading = payload,
    increaseRouterId: state => state.routerId++
  },
  actions: {}
});

/***/ }),

/***/ "./src/store/menu.js":
/*!***************************!*\
  !*** ./src/store/menu.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  namespaced: true,
  state: {
    isOpen: false,
    pageTitle: ''
  },
  getters: {
    isOpen: state => state.isOpen,
    pageTitle: state => state.pageTitle
  },
  mutations: {
    toggle: state => state.isOpen = !state.isOpen,
    open: state => state.isOpen = true,
    close: state => state.isOpen = false,
    setPageTitle: (state, payload) => state.pageTitle = payload
  },
  actions: {}
});

/***/ }),

/***/ "./src/store/snackbar.js":
/*!*******************************!*\
  !*** ./src/store/snackbar.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dbetka_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dbetka/utils */ "./node_modules/@dbetka/utils/dist/index.js");
/* harmony import */ var _dbetka_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dbetka_utils__WEBPACK_IMPORTED_MODULE_0__);

const defaultTime = 2000;

const getDefaultState = () => ({
  isOpen: false,
  message: '',
  icon: undefined,
  error: false,
  success: false
});

/* harmony default export */ __webpack_exports__["default"] = ({
  namespaced: true,
  state: getDefaultState(),
  getters: {
    isOpen: state => state.isOpen,
    message: state => state.message,
    icon: state => state.icon,
    error: state => state.error,
    success: state => state.success
  },
  mutations: {
    open: state => state.isOpen = true,
    close: state => state.isOpen = false,
    toggle: state => state.isOpen = state.isOpen === false,
    setMessage: (state, payload) => state.message = payload,
    setIcon: (state, payload) => state.icon = payload,
    setError: (state, payload) => state.error = payload,
    setSuccess: (state, payload) => state.success = payload,
    resetState: state => Object.assign(state, getDefaultState())
  },
  actions: {
    open(context, {
      message,
      icon,
      error,
      success
    }) {
      context.commit('setMessage', message);
      context.commit('setIcon', icon);
      context.commit('setError', error);
      context.commit('setSuccess', success);
      context.commit('open');
    },

    openTemporary(context, {
      message,
      icon,
      time = defaultTime,
      error,
      success
    }) {
      return new Promise(resolve => {
        context.dispatch('open', {
          message,
          icon,
          error,
          success
        });
        _dbetka_utils__WEBPACK_IMPORTED_MODULE_0__["uPromise"].timeout(time).then(() => context.commit('resetState')).then(resolve);
      });
    }

  }
});

/***/ }),

/***/ "./src/store/theme.js":
/*!****************************!*\
  !*** ./src/store/theme.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var utils_style_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/style-manager */ "./src/utils/style-manager.js");
/* harmony import */ var utils_macros_styles_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/macros/styles-colors */ "./src/utils/macros/styles-colors.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  namespaced: true,
  state: {
    name: utils_style_manager__WEBPACK_IMPORTED_MODULE_0__["styleManager"].defaultSheet
  },
  getters: {
    name: state => state.name,
    colors: state => utils_macros_styles_colors__WEBPACK_IMPORTED_MODULE_1__["THEMES_COLORS"][state.name],
    categoryColorById: (state, getters, rootState, rootGetters) => categoryId => {
      const pointShape = rootGetters['event/getCategoryById'](categoryId).pointShape;

      switch (pointShape) {
        case 0:
          return '#ffffff';

        case 1:
          return getters.colors.info;

        case 2:
          return getters.colors.warning;

        case 3:
          return getters.colors.danger;

        default:
          return '';
      }
    },
    categoryStyleById: (state, getters, rootState, rootGetters) => categoryId => {
      const pointShape = rootGetters['event/getCategoryById'](categoryId).pointShape;

      switch (pointShape) {
        case 0:
          return 'f-text-subtext';

        case 1:
          return 'f-text-info';

        case 2:
          return 'f-text-warning';

        case 3:
          return 'f-text-danger';

        default:
          return '';
      }
    }
  },
  mutations: {
    toggle: state => {
      if (state.name === utils_style_manager__WEBPACK_IMPORTED_MODULE_0__["THEMES"].light) {
        state.name = utils_style_manager__WEBPACK_IMPORTED_MODULE_0__["THEMES"].dark;
        utils_style_manager__WEBPACK_IMPORTED_MODULE_0__["styleManager"].switchTo.dark();
      } else {
        state.name = utils_style_manager__WEBPACK_IMPORTED_MODULE_0__["THEMES"].light;
        utils_style_manager__WEBPACK_IMPORTED_MODULE_0__["styleManager"].switchTo.light();
      }
    }
  },
  actions: {}
});

/***/ }),

/***/ "./src/style/dark.sass":
/*!*****************************!*\
  !*** ./src/style/dark.sass ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/import-glob-loader!./dark.sass */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/import-glob-loader/index.js!./src/style/dark.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/style/export-for-js/dark.scss":
/*!*******************************************!*\
  !*** ./src/style/export-for-js/dark.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/import-glob-loader!./dark.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/import-glob-loader/index.js!./src/style/export-for-js/dark.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/style/export-for-js/light.scss":
/*!********************************************!*\
  !*** ./src/style/export-for-js/light.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!../../../node_modules/import-glob-loader!./light.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/import-glob-loader/index.js!./src/style/export-for-js/light.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/style/light.sass":
/*!******************************!*\
  !*** ./src/style/light.sass ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/import-glob-loader!./light.sass */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/import-glob-loader/index.js!./src/style/light.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./src/utils/communicates.js":
/*!***********************************!*\
  !*** ./src/utils/communicates.js ***!
  \***********************************/
/*! exports provided: communicates */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "communicates", function() { return communicates; });
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! store */ "./src/store/index.js");


function open(...params) {
  store__WEBPACK_IMPORTED_MODULE_0__["store"].dispatch('snackbar/open', ...params);
}

function openTemporary(...params) {
  store__WEBPACK_IMPORTED_MODULE_0__["store"].dispatch('snackbar/openTemporary', ...params);
}

const communicates = {
  showMessage(message) {
    open({
      message
    });
  },

  showSuccess(message) {
    open({
      message,
      success: true
    });
  },

  showError(message) {
    open({
      message,
      error: true
    });
  },

  showMessageTemporary(message) {
    openTemporary({
      message
    });
  },

  showSuccessTemporary(message) {
    openTemporary({
      message,
      success: true
    });
  },

  showErrorTemporary(message) {
    openTemporary({
      message,
      error: true
    });
  }

};

/***/ }),

/***/ "./src/utils/error-message.js":
/*!************************************!*\
  !*** ./src/utils/error-message.js ***!
  \************************************/
/*! exports provided: ErrorMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorMessage", function() { return ErrorMessage; });
/* harmony import */ var utils_communicates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/communicates */ "./src/utils/communicates.js");
function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}


class ErrorMessage extends _extendableBuiltin(Error) {
  constructor(message, details = {
    code: undefined,
    hard: false
  }) {
    super(message);
    this.humanMessage = '';
    this.hard = details.hard;
    this.code = details.code;
  }

  showMessage(humanMessage = this.message) {
    this.humanMessage = humanMessage;
    utils_communicates__WEBPACK_IMPORTED_MODULE_0__["communicates"].showError(humanMessage);
  }

  showMessageTemporary(humanMessage = this.message) {
    this.humanMessage = humanMessage;
    if (this.hard) utils_communicates__WEBPACK_IMPORTED_MODULE_0__["communicates"].showError(humanMessage);else utils_communicates__WEBPACK_IMPORTED_MODULE_0__["communicates"].showErrorTemporary(humanMessage);
  }

}

/***/ }),

/***/ "./src/utils/macros/routes.js":
/*!************************************!*\
  !*** ./src/utils/macros/routes.js ***!
  \************************************/
/*! exports provided: getDataForRouter, ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataForRouter", function() { return getDataForRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var src_dictionary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/dictionary */ "./src/dictionary/index.js");
/* harmony import */ var _dbetka_vue_material_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dbetka/vue-material-icons */ "./node_modules/@dbetka/vue-material-icons/dist/index.js");
/* harmony import */ var _dbetka_vue_material_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_dbetka_vue_material_icons__WEBPACK_IMPORTED_MODULE_1__);


function getDataForRouter(route) {
  return {
    path: route.path,
    name: route.name,
    meta: route.meta
  };
}
const ROUTES = {
  error: {
    path: '*',
    name: 'error',
    label: src_dictionary__WEBPACK_IMPORTED_MODULE_0__["translator"].t('title.error'),
    shortLabel: src_dictionary__WEBPACK_IMPORTED_MODULE_0__["translator"].t('title.short.error'),
    meta: {
      onlyBeforeLogin: false,
      requiredAuth: false
    }
  },
  welcome: {
    path: '/',
    name: 'welcome',
    label: '',
    shortLabel: '',
    icon: _dbetka_vue_material_icons__WEBPACK_IMPORTED_MODULE_1__["ICONS"].sensor_door,
    meta: {
      onlyBeforeLogin: true,
      requiredAuth: false
    }
  },
  about: {
    path: '/about',
    name: 'about',
    label: src_dictionary__WEBPACK_IMPORTED_MODULE_0__["translator"].t('title.about'),
    shortLabel: src_dictionary__WEBPACK_IMPORTED_MODULE_0__["translator"].t('title.about'),
    icon: _dbetka_vue_material_icons__WEBPACK_IMPORTED_MODULE_1__["ICONS"].emoji_objects,
    meta: {
      onlyBeforeLogin: false,
      requiredAuth: false
    }
  }
};

/***/ }),

/***/ "./src/utils/macros/styles-colors.js":
/*!*******************************************!*\
  !*** ./src/utils/macros/styles-colors.js ***!
  \*******************************************/
/*! exports provided: THEMES_COLORS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "THEMES_COLORS", function() { return THEMES_COLORS; });
/* harmony import */ var src_style_export_for_js_light_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/style/export-for-js/light.scss */ "./src/style/export-for-js/light.scss");
/* harmony import */ var src_style_export_for_js_light_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(src_style_export_for_js_light_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_style_export_for_js_dark_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/style/export-for-js/dark.scss */ "./src/style/export-for-js/dark.scss");
/* harmony import */ var src_style_export_for_js_dark_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(src_style_export_for_js_dark_scss__WEBPACK_IMPORTED_MODULE_1__);


const THEMES_COLORS = {
  dark: (src_style_export_for_js_dark_scss__WEBPACK_IMPORTED_MODULE_1___default()),
  light: (src_style_export_for_js_light_scss__WEBPACK_IMPORTED_MODULE_0___default())
};

/***/ }),

/***/ "./src/utils/promise.js":
/*!******************************!*\
  !*** ./src/utils/promise.js ***!
  \******************************/
/*! exports provided: promise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "promise", function() { return promise; });
const promise = {
  timeout(timeout) {
    return new Promise(resolve => {
      setTimeout(() => resolve(), timeout);
    });
  }

};

/***/ }),

/***/ "./src/utils/style-manager.js":
/*!************************************!*\
  !*** ./src/utils/style-manager.js ***!
  \************************************/
/*! exports provided: THEMES, styleManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "THEMES", function() { return THEMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styleManager", function() { return styleManager; });
/* harmony import */ var src_style_light__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/style/light */ "./src/style/light.sass");
/* harmony import */ var src_style_light__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(src_style_light__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_style_dark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/style/dark */ "./src/style/dark.sass");
/* harmony import */ var src_style_dark__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(src_style_dark__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_2__);



const lastSheetId = document.styleSheets.length - 1;
const lightSheet = document.styleSheets[lastSheetId - 1];
const darkSheet = document.styleSheets[lastSheetId];
const THEMES = {
  light: 'light',
  dark: 'dark'
};

function getDefaultTheme() {
  const cookieTheme = js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.get('theme');
  return cookieTheme || THEMES.light;
}

const styleManager = {
  defaultSheet: getDefaultTheme(),
  sheets: {
    light: lightSheet,
    dark: darkSheet
  },

  init() {
    styleManager.switch(styleManager.defaultSheet);
  },

  switch(name) {
    js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.remove('theme');
    js_cookie__WEBPACK_IMPORTED_MODULE_2___default.a.set('theme', name, {
      expires: 7
    });
    const sheets = styleManager.sheets;
    const sheetsKeys = Object.keys(sheets);

    if (sheetsKeys.includes(name)) {
      sheetsKeys.forEach(sheetName => {
        sheets[sheetName].disabled = name !== sheetName;
      });
    } else {
      throw new ErrorMessage('This styleSheet does not exist');
    }
  },

  switchTo: {
    dark() {
      styleManager.switch(THEMES.dark);
    },

    light() {
      styleManager.switch(THEMES.light);
    }

  }
};

/***/ }),

/***/ "./src/validation.js":
/*!***************************!*\
  !*** ./src/validation.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm.js");
/* harmony import */ var vee_validate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vee-validate */ "./node_modules/vee-validate/dist/vee-validate.esm.js");
/* harmony import */ var vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vee-validate/dist/rules */ "./node_modules/vee-validate/dist/rules.js");
/* harmony import */ var vee_validate_dist_locale_pl_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vee-validate/dist/locale/pl.json */ "./node_modules/vee-validate/dist/locale/pl.json");
var vee_validate_dist_locale_pl_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! vee-validate/dist/locale/pl.json */ "./node_modules/vee-validate/dist/locale/pl.json", 1);
/* harmony import */ var vendors_validate_tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vendors/validate-tools */ "./vendors/validate-tools.js");
/* harmony import */ var vendors_validate_tools__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vendors_validate_tools__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var src_dictionary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/dictionary */ "./src/dictionary/index.js");





 // Register it globally

vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('validation-provider', vee_validate__WEBPACK_IMPORTED_MODULE_1__["ValidationProvider"]);
vue__WEBPACK_IMPORTED_MODULE_0__["default"].component('validation-observer', vee_validate__WEBPACK_IMPORTED_MODULE_1__["ValidationObserver"]);
vee_validate_dist_locale_pl_json__WEBPACK_IMPORTED_MODULE_3__["messages"].required = src_dictionary__WEBPACK_IMPORTED_MODULE_5__["translator"].t('form.validation.required');
vee_validate_dist_locale_pl_json__WEBPACK_IMPORTED_MODULE_3__["messages"].email = src_dictionary__WEBPACK_IMPORTED_MODULE_5__["translator"].t('form.validation.email');
vee_validate_dist_locale_pl_json__WEBPACK_IMPORTED_MODULE_3__["messages"].min = src_dictionary__WEBPACK_IMPORTED_MODULE_5__["translator"].t('form.validation.min');
vee_validate_dist_locale_pl_json__WEBPACK_IMPORTED_MODULE_3__["messages"].max = src_dictionary__WEBPACK_IMPORTED_MODULE_5__["translator"].t('form.validation.max');
vee_validate_dist_locale_pl_json__WEBPACK_IMPORTED_MODULE_3__["messages"].confirmed = src_dictionary__WEBPACK_IMPORTED_MODULE_5__["translator"].t('form.validation.confirmed');
vee_validate_dist_locale_pl_json__WEBPACK_IMPORTED_MODULE_3__["messages"].length = src_dictionary__WEBPACK_IMPORTED_MODULE_5__["translator"].t('form.validation.length'); // Register all rules

Object.keys(vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_2__).forEach(rule => {
  Object(vee_validate__WEBPACK_IMPORTED_MODULE_1__["extend"])(rule, { ...vee_validate_dist_rules__WEBPACK_IMPORTED_MODULE_2__[rule],
    // copies rule configuration
    message: vee_validate_dist_locale_pl_json__WEBPACK_IMPORTED_MODULE_3__["messages"][rule] // assign message

  });
});
Object(vee_validate__WEBPACK_IMPORTED_MODULE_1__["extend"])('hasNumber', {
  validate(value) {
    return vendors_validate_tools__WEBPACK_IMPORTED_MODULE_4___default.a.hasNumber(value);
  },

  message: src_dictionary__WEBPACK_IMPORTED_MODULE_5__["translator"].t('form.validation.hasNumber')
});
Object(vee_validate__WEBPACK_IMPORTED_MODULE_1__["extend"])('hasCapitalize', {
  validate(value) {
    return /[A-Z]/.test(value);
  },

  message: src_dictionary__WEBPACK_IMPORTED_MODULE_5__["translator"].t('form.validation.hasCapitalize')
});

/***/ }),

/***/ "./vendors/random.js":
/*!***************************!*\
  !*** ./vendors/random.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

const allCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const regexForUnreadableChars = /[O0Il]/g;
const readableCharacters = allCharacters.replace(regexForUnreadableChars, '');
/**
 * @description Generate random string based on given length and own
 * set of characters if you want
 * @param length {number}
 * @param ownCharacters {string}
 * @return {string}
 */

function generateRandomString(length, ownCharacters = undefined) {
  let result = '';
  const characters = ownCharacters || allCharacters;
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
/**
 * @description Generate random easy to read string based on given length
 * @param length {number}
 * @return {string}
 */


function generateRandomStringWithoutSimilarChars(length) {
  return generateRandomString(length, readableCharacters);
}
/**
 * @description Check if string is easy to read
 * @param text {string}
 * @return {boolean}
 */


function checkIfStringIsReadable(text) {
  return text.match(regexForUnreadableChars) === null;
}

module.exports = {
  generateRandomString,
  generateRandomStringWithoutSimilarChars,
  checkIfStringIsReadable
};

/***/ }),

/***/ "./vendors/validate-tools.js":
/*!***********************************!*\
  !*** ./vendors/validate-tools.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const random = __webpack_require__(/*! ../vendors/random */ "./vendors/random.js");

class ValidateTools {
  hasNumber(data) {
    return /\d/.test(data);
  }

  hasNotNumber(data) {
    return !this.hasNumber(data);
  }

  isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  isNotEmail(email) {
    return !this.isEmail(email);
  }

  isLonger(data, length) {
    return data.length > length;
  }

  isShorter(data, length) {
    return data && data.length ? data.length < length : true;
  }

  isNullOrEmpty(data) {
    return ['', undefined, null].includes(data);
  }

  isEasyToRead(data) {
    return random.checkIfStringIsReadable(data);
  }

  isUndefined(data) {
    return data === undefined;
  }

  inRange(value, start, end) {
    return value >= start && value <= end;
  }

  inNotRange(value, start, end) {
    return !this.inRange(value, start, end);
  }

  contain(value, array) {
    return array.includes(value);
  }

  notContain(value, array) {
    return !this.contain(value, array);
  }

  isBoolean(value) {
    return typeof value === 'boolean';
  }

  isNotBoolean(value) {
    return !this.isBoolean(value);
  }

} // export


module.exports = new ValidateTools();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL2FwcC52dWUiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL2F0b21zL2J1dHRvbi52dWUiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL2F0b21zL2J1dHRvbi9wcmltYXJ5LnZ1ZSIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvYXRvbXMvYnV0dG9uL3NlY29uZGFyeS52dWUiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL2F0b21zL2xpbmstbWVudS52dWUiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL2F0b21zL2xvYWRlci52dWUiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL21vbGVjdWxlcy9zbmFja2Jhci52dWUiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL29yZ2FuaXNtcy9mb290ZXIudnVlIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9vcmdhbmlzbXMvaGVhZGVyLnZ1ZSIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvb3JnYW5pc21zL2xvYWRpbmcudnVlIiwid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9vcmdhbmlzbXMvbWVudS52dWUiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL3BhZ2VzL2Vycm9yLnZ1ZSIsIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvcGFnZXMvd2VsY29tZS52dWUiLCJ3ZWJwYWNrOi8vL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9wYWdlLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvZGFyay5zYXNzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9leHBvcnQtZm9yLWpzL2Rhcmsuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvZXhwb3J0LWZvci1qcy9saWdodC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9saWdodC5zYXNzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FwcC52dWU/MWIzMCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hdG9tcy9idXR0b24udnVlPzk3YmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYXRvbXMvYnV0dG9uL3ByaW1hcnkudnVlP2Y1YjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYXRvbXMvYnV0dG9uL3NlY29uZGFyeS52dWU/ODFiMiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hdG9tcy9saW5rLW1lbnUudnVlPzQ1MjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYXRvbXMvbG9hZGVyLnZ1ZT9hMDE1Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21vbGVjdWxlcy9zbmFja2Jhci52dWU/YzIyMSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9vcmdhbmlzbXMvZm9vdGVyLnZ1ZT8xODc1Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL29yZ2FuaXNtcy9oZWFkZXIudnVlPzBmMGQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnYW5pc21zL2xvYWRpbmcudnVlP2NmOWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnYW5pc21zL21lbnUudnVlPzc1ZmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGFnZXMvZXJyb3IudnVlPzUyMGEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvcGFnZXMvd2VsY29tZS52dWU/NTdlMCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvcGFnZS52dWU/YWYzZCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hcHAudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FwcC52dWU/MDBlYiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hcHAudnVlPzE2NTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYXRvbXMvYnV0dG9uLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hdG9tcy9idXR0b24udnVlPzFiMGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYXRvbXMvYnV0dG9uLnZ1ZT9iNzZjIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2F0b21zL2J1dHRvbi9wcmltYXJ5LnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hdG9tcy9idXR0b24vcHJpbWFyeS52dWU/MzA4NiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hdG9tcy9idXR0b24vcHJpbWFyeS52dWU/OGRmOSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hdG9tcy9idXR0b24vc2Vjb25kYXJ5LnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hdG9tcy9idXR0b24vc2Vjb25kYXJ5LnZ1ZT9hZDk0Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2F0b21zL2J1dHRvbi9zZWNvbmRhcnkudnVlP2U3Y2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYXRvbXMvbGluay1tZW51LnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hdG9tcy9saW5rLW1lbnUudnVlP2ExMGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYXRvbXMvbGluay1tZW51LnZ1ZT9lNzFiIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2F0b21zL2xvYWRlci52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYXRvbXMvbG9hZGVyLnZ1ZT85ZWZmIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2F0b21zL2xvYWRlci52dWU/YmU5MCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9tb2xlY3VsZXMvc25hY2tiYXIudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21vbGVjdWxlcy9zbmFja2Jhci52dWU/NTcyNCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9tb2xlY3VsZXMvc25hY2tiYXIudnVlPzE2OWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnYW5pc21zL2Zvb3Rlci52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnYW5pc21zL2Zvb3Rlci52dWU/YjQwNSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9vcmdhbmlzbXMvZm9vdGVyLnZ1ZT8zYzQ5Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL29yZ2FuaXNtcy9oZWFkZXIudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL29yZ2FuaXNtcy9oZWFkZXIudnVlPzNjMmMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnYW5pc21zL2hlYWRlci52dWU/MzkwMyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9vcmdhbmlzbXMvbG9hZGluZy52dWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnYW5pc21zL2xvYWRpbmcudnVlP2UzZDUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnYW5pc21zL2xvYWRpbmcudnVlP2Q3OGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvb3JnYW5pc21zL21lbnUudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL29yZ2FuaXNtcy9tZW51LnZ1ZT81MmU2Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL29yZ2FuaXNtcy9tZW51LnZ1ZT84MDBkIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhZ2VzL2Vycm9yLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wYWdlcy9lcnJvci52dWU/Y2Y2ZCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wYWdlcy9lcnJvci52dWU/MWIxZiIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wYWdlcy93ZWxjb21lLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wYWdlcy93ZWxjb21lLnZ1ZT85MmIzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhZ2VzL3dlbGNvbWUudnVlPzE2MWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvdGVtcGxhdGVzL3BhZ2UudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9wYWdlLnZ1ZT9kN2IxIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3RlbXBsYXRlcy9wYWdlLnZ1ZT8yNDUzIiwid2VicGFjazovLy8uL3NyYy9kaWN0aW9uYXJ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9kaWN0aW9uYXJ5L2xhbmd1YWdlL3BsLmpzIiwid2VicGFjazovLy8uL3NyYy9kaXJlY3RpdmVzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXIvcm91dGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9tZW51LmpzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9zbmFja2Jhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvdGhlbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL2Rhcmsuc2Fzcz85OTEyIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9leHBvcnQtZm9yLWpzL2Rhcmsuc2Nzcz9kMmU2Iiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9leHBvcnQtZm9yLWpzL2xpZ2h0LnNjc3M/NzRmNyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvbGlnaHQuc2Fzcz8zZTZjIiwid2VicGFjazovLy8uL3NyYy91dGlscy9jb21tdW5pY2F0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2Vycm9yLW1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL21hY3Jvcy9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL21hY3Jvcy9zdHlsZXMtY29sb3JzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9wcm9taXNlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9zdHlsZS1tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy92YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL3ZlbmRvcnMvcmFuZG9tLmpzIiwid2VicGFjazovLy8uL3ZlbmRvcnMvdmFsaWRhdGUtdG9vbHMuanMiXSwibmFtZXMiOlsiVnVlIiwidXNlIiwiVnVlSTE4biIsImkxOG4iLCJsb2NhbGUiLCJtZXNzYWdlcyIsInBsIiwidHJhbnNsYXRvciIsInRpdGxlIiwiZXJyb3IiLCJ3ZWxjb21lIiwiYWJvdXQiLCJzaG9ydCIsImdlbmVyYWwiLCJzaG93TW9yZSIsInBvaW50VW5pdCIsInBvaW50Q2F0ZWdvcnlMZXZlbCIsInBvaW50VGVtcG9yYXJ5IiwicG9pbnRQZXJtYW5lbnQiLCJiYWNrVG9TdGFydCIsImJhY2tUb1dlbGNvbWUiLCJhbHJlYWR5Q29sbGVjdGVkU2hvcnQiLCJmdWxsQWRtaW4iLCJsaW1pdGVkQWRtaW4iLCJoaWRlIiwiZWRpdCIsImxvZ291dCIsInJlbW92ZSIsImNvcGllZCIsImhlbGxvIiwic2F2ZWQiLCJsaWdodFRoZW1lIiwiZGFya1RoZW1lIiwiZm9ybSIsImZpZWxkIiwiZW1haWwiLCJwYXNzd29yZCIsInJlUGFzc3dvcmQiLCJuZXdQYXNzd29yZCIsInJlTmV3UGFzc3dvcmQiLCJ1c2VyVGVhbSIsImV2ZW50TmFtZSIsImV2ZW50SWQiLCJwb2ludElkIiwicG9pbnROYW1lIiwicG9pbnRUeXBlIiwicG9pbnREYXRlQW5kQXBwZWFyYW5jZVRpbWUiLCJwb2ludERhdGVBbmRFeHBpcmF0aW9uVGltZSIsInBvaW50Q2F0ZWdvcnkiLCJtYXBSZWZyZXNoVGltZSIsImV2ZW50U3RhcnREYXRlIiwiZXZlbnRFbmREYXRlIiwiYXNzaXN0IiwiZmllbGROb3RSZXF1aXJlZCIsInZhbGlkYXRpb24iLCJyZXF1aXJlZCIsIm1pbiIsIm1heCIsImNvbmZpcm1lZCIsImxlbmd0aCIsImhhc051bWJlciIsImhhc0NhcGl0YWxpemUiLCJidXR0b24iLCJzYXZlIiwiY2hvb3NlIiwibmV4dCIsImdvVG9Mb2dpbiIsInNldERlZmF1bHRNYXBQb3NpdGlvbkFuZFpvb20iLCJzZXRQb2ludE1hcFBvc2l0aW9uIiwicGFnZSIsImFwcEluZm8iLCJtb3JlIiwiYXV0aG9ycyIsImxlYWRlciIsImZyb250RGV2IiwiZnVsbHN0YWNrIiwiYmFja0RldiIsInV4RGVzaWduZXIiLCJjb250ZW50IiwiaW5jb21wYXRpYmxlQXBwVmVyc2lvbiIsImV2ZW50SWRJc1JlcXVpcmVkIiwiZWxlbWVudElkSXNSZXF1aXJlZEZvck1hcCIsImZha2VFcnJvckluTW9ja0FwaSIsImRhdGFBZnRlclNpZ25JbiIsImFwaVdhcm4iLCJ1bmRlZmluZWQiLCJmaXJzdFdhcm5Gcm9tQ3Jvc3NkZXZpY2VWaXNpdCIsImxhc3RXYXJuRnJvbUNyb3NzZGV2aWNlVmlzaXQiLCJsYXN0Q3Jvc3NkZXZpY2VfdmlzaXQiLCJhcGlFcnJvciIsInVuYXV0aG9yaXplZEFjY2VzcyIsIm5vdE9ubGluZSIsInRvTWFueUNyb3NzZGV2aWNlVmlzaXRzIiwiZ2V0RXZlbnRCeUlkIiwiZ2V0UG9pbnRzQnlFdmVudElkIiwiZ2V0Q2F0ZWdvcmllc0J5RXZlbnRJZCIsInVwZGF0ZUV2ZW50IiwiZXZlbnRTdGFydERhdGVJc0VtcHR5IiwiZXZlbnRFbmREYXRlSXNFbXB0eSIsImV2ZW50SXNPdXRPZkRhdGUiLCJldmVudEJlZm9yZVN0YXJ0IiwiY29sbGVjdFBvaW50IiwicG9pbnRDb2xsZWN0ZWRFYXJsaWVyIiwicG9pbnROb0V4aXN0IiwiYWRkUG9pbnQiLCJlZGl0UG9pbnQiLCJyZW1vdmVQb2ludCIsInBvaW50SWRPckV2ZW50SWROb3RFeGlzdCIsImFsbCIsInNpZ25JbiIsInNpZ25JbkRhdGEiLCJzaWduSW5Pbk90aGVyRGV2aWNlIiwiaW5hY3RpdmVBY2NvdW50IiwiY2hlY2tZb3VyTG9naW5TZXNzaW9uIiwic2lnblVwIiwiZXZlbnRJZE5vdEV4aXN0IiwidXNlckV4aXN0IiwicmVtaW5kUGFzc3dvcmQiLCJzaWduT3V0IiwiY2hhbmdlUGFzc3dvcmQiLCJjb21tdW5pY2F0ZSIsInN1Y2Nlc3MiLCJmZWF0dXJlcyIsImRpcmVjdGl2ZSIsInByaW9yaXR5IiwiYmluZCIsImVsIiwiZGF0YSIsInZtIiwiZGVmIiwiZXZlbnQiLCJjb250ZXh0IiwiZXhwcmVzc2lvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdG9wUHJvcCIsImRvY3VtZW50IiwiYm9keSIsInVuYmluZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzdG9wUHJvcGFnYXRpb24iLCJzdHlsZU1hbmFnZXIiLCJpbml0IiwiY29uZmlnIiwicHJvZHVjdGlvblRpcCIsIlBST0RVQ1RJT04iLCJjb25zb2xlIiwibG9nIiwiQVBQX05BTUUiLCJWRVJTSU9OIiwibWl4aW4iLCJjb21wdXRlZCIsIlJPVVRFUyIsIlZ1ZTJUb3VjaEV2ZW50cyIsIlZ1ZUVsbGlwc2VQcm9ncmVzcyIsIlZ1ZU1hdGVyaWFsSWNvbnMiLCJyb3V0ZXIiLCJzdG9yZSIsInJlbmRlciIsImgiLCJBcHAiLCIkbW91bnQiLCJmaXJzdFJ1biIsIlJvdXRlciIsIm1vZGUiLCJiYXNlIiwicHJvY2VzcyIsImVudiIsIkJBU0VfVVJMIiwicm91dGVzIiwiYmVmb3JlRWFjaCIsInRvIiwiZnJvbSIsInByb21pc2UiLCJtYWtlRmlyc3RSdW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsImNhdGNoIiwiRXJyb3JNZXNzYWdlIiwic2hvd01lc3NhZ2UiLCJlIiwiZmluYWxseSIsInJlZGlyZWN0SWZOb3RBdXRoIiwiY29tbWl0IiwiaGFyZFJlbG9hZCIsInJlamVjdCIsInRoZW4iLCJ0aW1lb3V0IiwiUEVycm9yIiwiUFdlbGNvbWUiLCJtYXAiLCJyb3V0ZSIsImNvbXBvbmVudCIsImdldERhdGFGb3JSb3V0ZXIiLCJuYW1lc3BhY2VkIiwic3RhdGUiLCJwYWdlVGl0bGUiLCJiYWNrUm91dGVOYW1lIiwiZ2V0dGVycyIsIm11dGF0aW9ucyIsInNldFBhZ2VUaXRsZSIsInBheWxvYWQiLCJzZXRCYWNrUm91dGVOYW1lIiwiYWN0aW9ucyIsIlZ1ZXgiLCJTdG9yZSIsIm1vZHVsZXMiLCJtZW51IiwidGhlbWUiLCJoZWFkZXIiLCJzbmFja2JhciIsImlzTG9hZGluZyIsInJvdXRlcklkIiwic2V0SXNMb2FkaW5nIiwiaW5jcmVhc2VSb3V0ZXJJZCIsImlzT3BlbiIsInRvZ2dsZSIsIm9wZW4iLCJjbG9zZSIsImRlZmF1bHRUaW1lIiwiZ2V0RGVmYXVsdFN0YXRlIiwibWVzc2FnZSIsImljb24iLCJzZXRNZXNzYWdlIiwic2V0SWNvbiIsInNldEVycm9yIiwic2V0U3VjY2VzcyIsInJlc2V0U3RhdGUiLCJPYmplY3QiLCJhc3NpZ24iLCJvcGVuVGVtcG9yYXJ5IiwidGltZSIsImRpc3BhdGNoIiwidVByb21pc2UiLCJuYW1lIiwiZGVmYXVsdFNoZWV0IiwiY29sb3JzIiwiVEhFTUVTX0NPTE9SUyIsImNhdGVnb3J5Q29sb3JCeUlkIiwicm9vdFN0YXRlIiwicm9vdEdldHRlcnMiLCJjYXRlZ29yeUlkIiwicG9pbnRTaGFwZSIsImluZm8iLCJ3YXJuaW5nIiwiZGFuZ2VyIiwiY2F0ZWdvcnlTdHlsZUJ5SWQiLCJUSEVNRVMiLCJsaWdodCIsImRhcmsiLCJzd2l0Y2hUbyIsInBhcmFtcyIsImNvbW11bmljYXRlcyIsInNob3dTdWNjZXNzIiwic2hvd0Vycm9yIiwic2hvd01lc3NhZ2VUZW1wb3JhcnkiLCJzaG93U3VjY2Vzc1RlbXBvcmFyeSIsInNob3dFcnJvclRlbXBvcmFyeSIsIkVycm9yIiwiY29uc3RydWN0b3IiLCJkZXRhaWxzIiwiY29kZSIsImhhcmQiLCJodW1hbk1lc3NhZ2UiLCJwYXRoIiwibWV0YSIsImxhYmVsIiwidCIsInNob3J0TGFiZWwiLCJvbmx5QmVmb3JlTG9naW4iLCJyZXF1aXJlZEF1dGgiLCJJQ09OUyIsInNlbnNvcl9kb29yIiwiZW1vamlfb2JqZWN0cyIsInNldFRpbWVvdXQiLCJsYXN0U2hlZXRJZCIsInN0eWxlU2hlZXRzIiwibGlnaHRTaGVldCIsImRhcmtTaGVldCIsImdldERlZmF1bHRUaGVtZSIsImNvb2tpZVRoZW1lIiwiQ29va2llcyIsImdldCIsInNoZWV0cyIsInN3aXRjaCIsInNldCIsImV4cGlyZXMiLCJzaGVldHNLZXlzIiwia2V5cyIsImluY2x1ZGVzIiwiZm9yRWFjaCIsInNoZWV0TmFtZSIsImRpc2FibGVkIiwiVmFsaWRhdGlvblByb3ZpZGVyIiwiVmFsaWRhdGlvbk9ic2VydmVyIiwicnVsZXMiLCJydWxlIiwidmVlRXh0ZW5kIiwidmFsaWRhdGUiLCJ2YWx1ZSIsInZhbGlkYXRlVG9vbHMiLCJ0ZXN0IiwiYWxsQ2hhcmFjdGVycyIsInJlZ2V4Rm9yVW5yZWFkYWJsZUNoYXJzIiwicmVhZGFibGVDaGFyYWN0ZXJzIiwicmVwbGFjZSIsImdlbmVyYXRlUmFuZG9tU3RyaW5nIiwib3duQ2hhcmFjdGVycyIsInJlc3VsdCIsImNoYXJhY3RlcnMiLCJjaGFyYWN0ZXJzTGVuZ3RoIiwiaSIsImNoYXJBdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlUmFuZG9tU3RyaW5nV2l0aG91dFNpbWlsYXJDaGFycyIsImNoZWNrSWZTdHJpbmdJc1JlYWRhYmxlIiwidGV4dCIsIm1hdGNoIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJWYWxpZGF0ZVRvb2xzIiwiaGFzTm90TnVtYmVyIiwiaXNFbWFpbCIsInJlIiwiU3RyaW5nIiwidG9Mb3dlckNhc2UiLCJpc05vdEVtYWlsIiwiaXNMb25nZXIiLCJpc1Nob3J0ZXIiLCJpc051bGxPckVtcHR5IiwiaXNFYXN5VG9SZWFkIiwiaXNVbmRlZmluZWQiLCJpblJhbmdlIiwic3RhcnQiLCJlbmQiLCJpbk5vdFJhbmdlIiwiY29udGFpbiIsImFycmF5Iiwibm90Q29udGFpbiIsImlzQm9vbGVhbiIsImlzTm90Qm9vbGVhbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsUUFBUSxvQkFBb0I7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxpQkFBaUIsNEJBQTRCO1FBQzdDO1FBQ0E7UUFDQSxrQkFBa0IsMkJBQTJCO1FBQzdDO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBOztRQUVBO1FBQ0EsaUNBQWlDOztRQUVqQztRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTtRQUNBO1FBQ0EsTUFBTTtRQUNOOztRQUVBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0Esd0JBQXdCLGtDQUFrQztRQUMxRCxNQUFNO1FBQ047UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdD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TyxDQUFDLEtBQUsyQyxTQUFMLENBQWUzQyxLQUFmLENBQVI7QUFDRDs7QUE1RGlCLEMsQ0ErRHBCOzs7QUFDQXFCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixJQUFJRSxhQUFKLEVBQWpCLEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG4gXHRcdHZhciBleGVjdXRlTW9kdWxlcyA9IGRhdGFbMl07XG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdFx0Ly8gYWRkIGVudHJ5IG1vZHVsZXMgZnJvbSBsb2FkZWQgY2h1bmsgdG8gZGVmZXJyZWQgbGlzdFxuIFx0XHRkZWZlcnJlZE1vZHVsZXMucHVzaC5hcHBseShkZWZlcnJlZE1vZHVsZXMsIGV4ZWN1dGVNb2R1bGVzIHx8IFtdKTtcblxuIFx0XHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIGFsbCBjaHVua3MgcmVhZHlcbiBcdFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4gXHR9O1xuIFx0ZnVuY3Rpb24gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKSB7XG4gXHRcdHZhciByZXN1bHQ7XG4gXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgZGVmZXJyZWRNb2R1bGUgPSBkZWZlcnJlZE1vZHVsZXNbaV07XG4gXHRcdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG4gXHRcdFx0Zm9yKHZhciBqID0gMTsgaiA8IGRlZmVycmVkTW9kdWxlLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgZGVwSWQgPSBkZWZlcnJlZE1vZHVsZVtqXTtcbiBcdFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tkZXBJZF0gIT09IDApIGZ1bGZpbGxlZCA9IGZhbHNlO1xuIFx0XHRcdH1cbiBcdFx0XHRpZihmdWxmaWxsZWQpIHtcbiBcdFx0XHRcdGRlZmVycmVkTW9kdWxlcy5zcGxpY2UoaS0tLCAxKTtcbiBcdFx0XHRcdHJlc3VsdCA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gZGVmZXJyZWRNb2R1bGVbMF0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm1haW5cIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5hcHAuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goW1wiLi9zcmMvaW5kZXguanNcIixcInZlbmRvcnN+bWFpblwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBpZD1cImFwcFwiPlxuICAgIDxvLWhlYWRlci8+XG4gICAgPGRpdiBjbGFzcz1cImYtcmVsYXRpdmUgZi1mbGV4LTFcIj5cbiAgICAgIDxyb3V0ZXItdmlldyA6a2V5PVwicm91dGVySWRcIi8+XG4gICAgPC9kaXY+XG4gICAgPG8tZm9vdGVyXG4gICAgICB2LXRvdWNoOnN3aXBlLmxlZnQ9XCJvcGVuTWVudUlmTG9naW5cIlxuICAgICAgdi10b3VjaDpzd2lwZS5yaWdodD1cImNsb3NlTWVudVwiXG4gICAgLz5cbiAgICA8by1tZW51Lz5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cImEtY292ZXIgZi1tZW51XCJcbiAgICAgIDpjbGFzcz1cImlzT3BlbiA/ICdmLXNob3cnIDogJydcIlxuICAgICAgQGNsaWNrPVwiY2xvc2VNZW51XCJcbiAgICAgIHYtdG91Y2g6c3dpcGUucmlnaHQ9XCJjbG9zZU1lbnVcIlxuICAgIC8+XG4gICAgPG0tc25hY2tiYXIvPlxuICAgIDx0cmFuc2l0aW9uIG5hbWU9XCJmYWRlXCI+XG4gICAgICA8by1sb2FkaW5nIHYtc2hvdz1cImlzTG9hZGluZ1wiLz5cbiAgICA8L3RyYW5zaXRpb24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBPSGVhZGVyIGZyb20gJ29yZ2FuaXNtcy9oZWFkZXInO1xuaW1wb3J0IE9NZW51IGZyb20gJ29yZ2FuaXNtcy9tZW51JztcbmltcG9ydCBPRm9vdGVyIGZyb20gJ29yZ2FuaXNtcy9mb290ZXInO1xuaW1wb3J0IE9Mb2FkaW5nIGZyb20gJ29yZ2FuaXNtcy9sb2FkaW5nJztcbmltcG9ydCB7IG1hcEdldHRlcnMsIG1hcE11dGF0aW9ucyB9IGZyb20gJ3Z1ZXgnO1xuaW1wb3J0IE1TbmFja2JhciBmcm9tICdtb2xlY3VsZXMvc25hY2tiYXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNvbXBvbmVudHM6IHtcbiAgICBNU25hY2tiYXIsXG4gICAgT0hlYWRlcixcbiAgICBPTWVudSxcbiAgICBPRm9vdGVyLFxuICAgIE9Mb2FkaW5nLFxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIC4uLm1hcEdldHRlcnMoW1xuICAgICAgJ2lzTG9hZGluZycsXG4gICAgICAncm91dGVySWQnLFxuICAgIF0pLFxuICAgIC4uLm1hcEdldHRlcnMoJ21lbnUnLCBbXG4gICAgICAnaXNPcGVuJyxcbiAgICBdKSxcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIC4uLm1hcE11dGF0aW9ucygnbWVudScsIHtcbiAgICAgIG9wZW5NZW51OiAnb3BlbicsXG4gICAgICBjbG9zZU1lbnU6ICdjbG9zZScsXG4gICAgfSksXG4gICAgb3Blbk1lbnVJZkxvZ2luICgpIHtcbiAgICAgIC8qIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3VzZXIvaXNMb2dpbiddICYmICovdGhpcy5vcGVuTWVudSgpO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJtLWFyZWEgZi1idXR0b25cIiBAY2xpY2s9XCJlbWl0Q2xpY2soJGV2ZW50KVwiPlxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzPVwiYS1idXR0b25cIlxuICAgICAgOmNsYXNzPVwiZ2V0Q2xhc3NcIlxuICAgICAgcmVmPVwiYnV0dG9uXCJcbiAgICAgIDp0eXBlPVwidHlwZVwiXG4gICAgICA6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiXG4gICAgPlxuICAgICAgPHNsb3Qgdi1pZj1cImxvYWRpbmcgPT09IGZhbHNlXCIvPlxuICAgICAgPGEtbG9hZGVyIHYtaWY9XCJsb2FkaW5nXCIgOmFkZC1jbGFzcz1cImFkZENsYXNzXCIgOmltZz1cImxvYWRpbmdJbWdcIi8+XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBBTG9hZGVyIGZyb20gJ2F0b21zL2xvYWRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2EtYnV0dG9uJyxcbiAgY29tcG9uZW50czogeyBBTG9hZGVyIH0sXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG4gIHByb3BzOiB7XG4gICAgZGlzYWJsZWQ6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICAgIGxvYWRpbmc6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZSxcbiAgICB9LFxuICAgIGFkZENsYXNzOiB7XG4gICAgICB0eXBlOiBbQXJyYXksIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAnJyxcbiAgICB9LFxuICAgIGxvYWRpbmdJbWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcnLFxuICAgIH0sXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2J1dHRvbicsXG4gICAgfSxcbiAgfSxcbiAgY29tcHV0ZWQ6IHtcbiAgICBnZXRDbGFzcyAoKSB7XG4gICAgICBjb25zdCBjbGFzc2VzID0gW3RoaXMuYWRkQ2xhc3NdO1xuXG4gICAgICBpZiAodGhpcy5sb2FkaW5nKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaCgnZi1sb2FkaW5nJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjbGFzc2VzO1xuICAgIH0sXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBlbWl0Q2xpY2sgKGV2ZW50KSB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snLCBldmVudCk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGEtYnV0dG9uXG4gICAgQGNsaWNrPVwiJGVtaXQoJ2NsaWNrJylcIlxuICAgIDphZGQtY2xhc3M9XCJbJ2YtcHJpbWFyeScsIGFkZENsYXNzXVwiXG4gICAgOmxvYWRpbmc9XCJsb2FkaW5nXCJcbiAgICA6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiXG4gICAgOnR5cGU9XCJ0eXBlXCJcbiAgICBsb2FkaW5nLWltZz1cIi9pbWcvemhwLTUyLnBuZ1wiXG4gID5cbiAgICA8c2xvdC8+XG4gIDwvYS1idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEFCdXR0b24gZnJvbSAnYXRvbXMvYnV0dG9uJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYS1idXR0b24tcHJpbWFyeScsXG4gIGNvbXBvbmVudHM6IHsgQUJ1dHRvbiB9LFxuICBwcm9wczoge1xuICAgIGRpc2FibGVkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgfSxcbiAgICBsb2FkaW5nOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogZmFsc2UsXG4gICAgfSxcbiAgICBhZGRDbGFzczoge1xuICAgICAgdHlwZTogW0FycmF5LCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogJycsXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnYnV0dG9uJyxcbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8YS1idXR0b25cbiAgICBAY2xpY2s9XCIkZW1pdCgnY2xpY2snLCAkZXZlbnQpXCJcbiAgICA6YWRkLWNsYXNzPVwiWydmLXNlY29uZGFyeScsIGFkZENsYXNzXVwiXG4gICAgOmxvYWRpbmc9XCJsb2FkaW5nXCJcbiAgICA6bG9hZGluZy1pbWc9XCJsb2FkaW5nSW1nXCJcbiAgICA6ZGlzYWJsZWQ9XCJkaXNhYmxlZFwiXG4gID5cbiAgICA8c2xvdC8+XG4gIDwvYS1idXR0b24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IEFCdXR0b24gZnJvbSAnYXRvbXMvYnV0dG9uJztcbmltcG9ydCB7IFRIRU1FUyB9IGZyb20gJ3V0aWxzL3N0eWxlLW1hbmFnZXInO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdhLWJ1dHRvbi1zZWNvbmRhcnknLFxuICBjb21wb25lbnRzOiB7IEFCdXR0b24gfSxcbiAgcHJvcHM6IHtcbiAgICBkaXNhYmxlZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIH0sXG4gICAgbG9hZGluZzoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgIH0sXG4gICAgYWRkQ2xhc3M6IHtcbiAgICAgIHR5cGU6IFtBcnJheSwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6ICcnLFxuICAgIH0sXG4gIH0sXG4gIGNvbXB1dGVkOiB7XG4gICAgbG9hZGluZ0ltZyAoKSB7XG4gICAgICBpZiAodGhpcy4kc3RvcmUuZ2V0dGVyc1sndGhlbWUvbmFtZSddID09PSBUSEVNRVMuZGFyaykge1xuICAgICAgICByZXR1cm4gJy9pbWcvemhwLTUyLnBuZyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJy9pbWcvemhwLWdyZWVuLTUyLnBuZyc7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGEgY2xhc3M9XCJhLWxpbmsgZi1tZW51XCIgQGNsaWNrPVwiJGVtaXQoJ2NsaWNrJylcIj5cbiAgICA8YS1pY29uXG4gICAgICA6bmFtZT1cImljb25cIlxuICAgICAgY2xhc3M9XCJmLW1lbnVcIlxuICAgIC8+XG4gICAgPGRpdiBjbGFzcz1cImYtZmxleC0xIGYtcGwtM1wiPlxuICAgICAgPHNsb3QvPlxuICAgICAge3sgdGV4dCB9fVxuICAgIDwvZGl2PlxuICA8L2E+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYS1saW5rLW1lbnUnLFxuICBwcm9wczoge1xuICAgIHRleHQ6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnJyB9LFxuICAgIGljb246IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiAnJyB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8c3BhbiBjbGFzcz1cImEtbG9hZGVyXCI+XG4gICAgPGltZ1xuICAgICAgY2xhc3M9XCJhLWltZyBmLWxvYWRlclwiXG4gICAgICA6Y2xhc3M9XCJhZGRDbGFzc1wiXG4gICAgICA6c3JjPVwiaW1nXCJcbiAgICAgIGFsdD1cImxvZ29cIlxuICAgIC8+XG4gIDwvc3Bhbj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2EtbG9hZGVyJyxcbiAgcHJvcHM6IHtcbiAgICBhZGRDbGFzczoge1xuICAgICAgdHlwZTogW0FycmF5LCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogJycsXG4gICAgfSxcbiAgICBpbWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcvaW1nL3pocC01Mi5wbmcnLFxuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDx0cmFuc2l0aW9uIG5hbWU9XCJmYWRlXCI+XG4gICAgPGRpdiB2LWlmPVwiaXNPcGVuXCIgY2xhc3M9XCJtLXNuYWNrYmFyXCIgOmNsYXNzPVwiY29sb3JDbGFzc2VzXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZi1mbGV4LTEgZi1wLTJcIj5cbiAgICAgICAge3sgbWVzc2FnZSB9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IEBjbGljaz1cImNsb3NlXCI+XG4gICAgICAgIDxhLWljb25cbiAgICAgICAgICBjbGFzcz1cImEtaWNvbiBmLXNuYWNrYmFyXCJcbiAgICAgICAgICA6bmFtZT1cIklDT05TLmNsb3NlXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L3RyYW5zaXRpb24+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgbWFwR2V0dGVycywgbWFwTXV0YXRpb25zIH0gZnJvbSAndnVleCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ20tc25hY2tiYXInLFxuICBjb21wdXRlZDoge1xuICAgIC4uLm1hcEdldHRlcnMoJ3NuYWNrYmFyJywgW1xuICAgICAgJ2lzT3BlbicsXG4gICAgICAnbWVzc2FnZScsXG4gICAgICAnZXJyb3InLFxuICAgICAgJ3N1Y2Nlc3MnLFxuICAgIF0pLFxuICAgIGNvbG9yQ2xhc3NlcyAoKSB7XG4gICAgICBpZiAodGhpcy5lcnJvcikgcmV0dXJuICdmLWVycm9yJztcbiAgICAgIGlmICh0aGlzLnN1Y2Nlc3MpIHJldHVybiAnZi1zdWNjZXNzJztcbiAgICAgIGVsc2UgcmV0dXJuICcnO1xuICAgIH0sXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICAuLi5tYXBNdXRhdGlvbnMoJ3NuYWNrYmFyJywgW1xuICAgICAgJ2Nsb3NlJyxcbiAgICBdKSxcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdlxuICAgIGNsYXNzPVwiby1mb290ZXJcIlxuICA+XG4gICAgby1mb290ZXJcbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgbWFwTXV0YXRpb25zIH0gZnJvbSAndnVleCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ28tZm9vdGVyJyxcbiAgbWV0aG9kczoge1xuICAgIC4uLm1hcE11dGF0aW9ucygnbWVudScsIFtcbiAgICAgICd0b2dnbGUnLFxuICAgIF0pLFxuICAgIGlzQWN0dWFsUGF0aCAoeyBwYXRoID0gJycgfSkge1xuICAgICAgaWYgKHRoaXMuJHN0b3JlLmdldHRlcnNbJ21lbnUvaXNPcGVuJ10pIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT09ICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJvdXRlLnBhdGggPT09IHBhdGg7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cIm8taGVhZGVyXCI+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJtLXBhbmVsIGYtaGVhZGVyIGYtc2lkZVwiXG4gICAgICA6Y2xhc3M9XCJ7ICdmLWhpZGRlbic6IGlzTWFpblBhZ2UgfVwiXG4gICAgPlxuICAgICAgPGEtaWNvblxuICAgICAgICA6bmFtZT1cIklDT05TLmFycm93X2JhY2tcIlxuICAgICAgICA6c2l6ZT1cIjI4XCJcbiAgICAgICAgQGNsaWNrPVwiJHJvdXRlci5wdXNoKHBhdGhCYWNrQnV0dG9uKVwiXG4gICAgICAvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtLXBhbmVsIGYtaGVhZGVyIGYtY2VudGVyXCI+XG4gICAgICA8dGVtcGxhdGUgdi1pZj1cInBhZ2VUaXRsZSAhPT0gJydcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImEtc3VidGl0bGVcIj5cbiAgICAgICAgICB7eyBwYWdlVGl0bGUgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhLWxvZ29cIj5cbiAgICAgICAgICBSZWhhcHBcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPGRpdiB2LWVsc2UgY2xhc3M9XCJhLWxvZ28gZi1iaWdcIj5cbiAgICAgICAgUmVoYXBwXG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cIm0tcGFuZWwgZi1oZWFkZXIgZi1zaWRlIGYtcmlnaHRcIlxuICAgID5cbiAgICAgIDxhLWljb25cbiAgICAgICAgOm5hbWU9XCJST1VURVMuYWJvdXQuaWNvblwiXG4gICAgICAgIDpzaXplPVwiMjhcIlxuICAgICAgICBjbGFzcz1cImYtaGVhZGVyXCJcbiAgICAgICAgQGNsaWNrPVwicmVkaXJlY3RUb0NvbGxlY3RlZFBvaW50c09yU2NvcmVib2FyZFwiXG4gICAgICAvPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQgeyBtYXBHZXR0ZXJzIH0gZnJvbSAndnVleCc7XG5pbXBvcnQgeyBST1VURVMgfSBmcm9tICd1dGlscy9tYWNyb3Mvcm91dGVzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnby1oZWFkZXInLFxuICBjb21wdXRlZDoge1xuICAgIC4uLm1hcEdldHRlcnMoJ2hlYWRlcicsIFtcbiAgICAgICdwYWdlVGl0bGUnLFxuICAgICAgJ2JhY2tSb3V0ZU5hbWUnLFxuICAgIF0pLFxuICAgIGlzTWFpblBhZ2UgKCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgUk9VVEVTLndlbGNvbWUubmFtZSxcbiAgICAgIF0uaW5jbHVkZXModGhpcy4kcm91dGUubmFtZSk7XG4gICAgfSxcbiAgICBwYXRoQmFja0J1dHRvbiAoKSB7XG4gICAgICByZXR1cm4gUk9VVEVTLndlbGNvbWUucGF0aDtcbiAgICB9LFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgcmVkaXJlY3RUb0NvbGxlY3RlZFBvaW50c09yU2NvcmVib2FyZCAoKSB7XG4gICAgICB0aGlzLiRyb3V0ZXIucHVzaChST1VURVMuYWJvdXQpO1xuICAgIH0sXG4gIH0sXG59O1xuPC9zY3JpcHQ+XG4iLCI8dGVtcGxhdGU+XG4gIDxkaXYgY2xhc3M9XCJvLWxvYWRpbmdcIj5cbiAgICA8YS1sb2FkZXIgYWRkLWNsYXNzPVwiZi1iaWdcIiBpbWc9XCIvaW1nL3pocC04Ni5wbmdcIi8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBBTG9hZGVyIGZyb20gJ2F0b21zL2xvYWRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ28tbG9hZGluZycsXG4gIGNvbXBvbmVudHM6IHsgQUxvYWRlciB9LFxufTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2XG4gICAgY2xhc3M9XCJvLW1lbnVcIlxuICAgIDpjbGFzcz1cImlzT3BlbiA/ICdmLW9wZW4nIDogJydcIlxuICAgIHYtdG91Y2g6c3dpcGUucmlnaHQ9XCJjbG9zZVwiXG4gID5cbiAgICA8ZGl2IGNsYXNzPVwiYS10ZXh0IGYtdGl0bGUgZi1tZW51XCI+e3sgJHQoJ2dlbmVyYWwuaGVsbG8nKSB9fSwge3sgJHN0b3JlLmdldHRlcnNbJ3VzZXIvdXNlclRlYW0nXSB9fTwvZGl2PlxuXG4gICAgPGRpdiB2LWlmPVwiY2hlY2tJc0NvbW1vbigpXCIgY2xhc3M9XCJhLXRleHQgZi1zdWJ0aXRsZSBmLW1lbnVcIj5cbiAgICAgIHt7ICR0KCdnZW5lcmFsLmFscmVhZHlDb2xsZWN0ZWRTaG9ydCcpIH19XG4gICAgICA8c3BhbiBjbGFzcz1cImYtdGV4dC1wcmltYXJ5LWNvbnRyYXN0XCI+XG4gICAgICAgIHt7ICRzdG9yZS5nZXR0ZXJzWyd1c2VyL3N1bU9mQ29sbGVjdGVkUG9pbnRzJ10gfX0ge3sgJHQoJ2dlbmVyYWwucG9pbnRVbml0JykgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IHYtZWxzZSBjbGFzcz1cImEtdGV4dCBmLXN1YnRpdGxlIGYtbWVudVwiPlxuICAgICAge3sgY2hlY2tJc05vdExpbWl0ZWQoKSA/ICR0KCdnZW5lcmFsLmZ1bGxBZG1pbicpIDogJHQoJ2dlbmVyYWwubGltaXRlZEFkbWluJykgfX1cbiAgICA8L2Rpdj5cblxuICAgIDxyb3V0ZXItbGlua1xuICAgICAgdi1mb3I9XCIocm91dGUsIGtleSkgaW4gbGlua3NcIlxuICAgICAgOmtleT1cImtleVwiXG4gICAgICA6dG89XCJyb3V0ZS5wYXRoXCJcbiAgICAgIEBjbGljay5uYXRpdmU9XCJjbG9zZSgpXCJcbiAgICAgIGNsYXNzPVwiYS1saW5rIGYtbWVudVwiXG4gICAgICA6Y2xhc3M9XCJ7ICdmLXNlbGVjdGVkJzogaXNBY3R1YWxQYXRoKHJvdXRlKSB9XCJcbiAgICA+XG4gICAgICA8YS1pY29uXG4gICAgICAgIDpuYW1lPVwicm91dGUuaWNvblwiXG4gICAgICAgIGNsYXNzPVwiZi1tZW51XCJcbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzPVwiZi1mbGV4LTEgZi1wbC0zXCI+e3sgcm91dGUubGFiZWwgfX08L2Rpdj5cbiAgICA8L3JvdXRlci1saW5rPlxuXG4gICAgPGEtbGluay1tZW51XG4gICAgICB2LWlmPVwiY2hlY2tJc0NvbW1vbigpXCJcbiAgICAgIEBjbGljaz1cIm9wZW5HdWlkZSgpXCJcbiAgICAgIDppY29uPVwiSUNPTlMuaGVscFwiXG4gICAgICA6dGV4dD1cIiR0KCdmZWF0dXJlcy5ndWlkZS5ob3dBcHBXb3JrcycpXCJcbiAgICAvPlxuXG4gICAgPGEtbGluay1tZW51XG4gICAgICBAY2xpY2s9XCJ0b2dnbGVUaGVtZSgpXCJcbiAgICAgIDppY29uPVwiSUNPTlMuYnJpZ2h0bmVzc180XCJcbiAgICAgIDp0ZXh0PVwidGhlbWVOYW1lID09PSBUSEVNRVMubGlnaHQgPyAkdCgnZ2VuZXJhbC5kYXJrVGhlbWUnKSA6ICR0KCdnZW5lcmFsLmxpZ2h0VGhlbWUnKVwiXG4gICAgLz5cblxuICAgIDxhLWxpbmstbWVudVxuICAgICAgQGNsaWNrPVwic2lnbk91dCgpXCJcbiAgICAgIDppY29uPVwiSUNPTlMubG9nb3V0XCJcbiAgICAgIDp0ZXh0PVwiJHQoJ2dlbmVyYWwubG9nb3V0JylcIlxuICAgIC8+XG5cbiAgICA8ZGl2IHYtaWY9XCJpc09wZW5cIiBjbGFzcz1cImEtdmVyc2lvblwiPlxuICAgICAgdnt7IFZFUlNJT04gfX1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IHsgbWFwR2V0dGVycywgbWFwTXV0YXRpb25zIH0gZnJvbSAndnVleCc7XG5pbXBvcnQgeyBUSEVNRVMgfSBmcm9tICd1dGlscy9zdHlsZS1tYW5hZ2VyJztcbmltcG9ydCB7IFJPVVRFUyB9IGZyb20gJ3V0aWxzL21hY3Jvcy9yb3V0ZXMnO1xuaW1wb3J0IHJvdXRlciBmcm9tICdzcmMvcm91dGVyJztcbmltcG9ydCB7IHVDaGVjayB9IGZyb20gJ0BkYmV0a2EvdXRpbHMnO1xuaW1wb3J0IEFMaW5rTWVudSBmcm9tICdhdG9tcy9saW5rLW1lbnUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdvLW1lbnUnLFxuICBjb21wb25lbnRzOiB7IEFMaW5rTWVudSB9LFxuICBkYXRhOiAoKSA9PiAoe1xuICAgIFRIRU1FUyxcbiAgICBWRVJTSU9OOiBWRVJTSU9OLFxuICAgIGNhblRvZ2dsZVRoZW1lOiB0cnVlLFxuICB9KSxcbiAgY29tcHV0ZWQ6IHtcbiAgICAuLi5tYXBHZXR0ZXJzKCdtZW51JywgW1xuICAgICAgJ2lzT3BlbicsXG4gICAgXSksXG4gICAgbGlua3MgKCkge1xuICAgICAgY29uc3QgaXNBZG1pbiA9IHRoaXMuY2hlY2tJc0FkbWluKCk7XG4gICAgICBjb25zdCBpc1VubGltaXRlZCA9IGlzQWRtaW4gJiYgdGhpcy5jaGVja0lzTm90TGltaXRlZCgpO1xuICAgICAgY29uc3QgaXNDb21tb24gPSB0aGlzLmNoZWNrSXNDb21tb24oKTtcbiAgICAgIGNvbnN0IGxpbmtzID0gW1xuICAgICAgICBST1VURVMuc3RhcnQsXG4gICAgICAgIFJPVVRFUy50ZW1wb3JhcnlQb2ludHMsXG4gICAgICAgIGlzQ29tbW9uID8gUk9VVEVTLmNvbGxlY3RQb2ludCA6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNBZG1pbiA/IFJPVVRFUy5zY29yZWJvYXJkIDogUk9VVEVTLmNvbGxlY3RlZFBvaW50cyxcbiAgICAgICAgaXNVbmxpbWl0ZWQgPyBST1VURVMuZWRpdEV2ZW50IDogdW5kZWZpbmVkLFxuICAgICAgICBpc1VubGltaXRlZCA/IFJPVVRFUy5uZXdQb2ludCA6IHVuZGVmaW5lZCxcbiAgICAgICAgUk9VVEVTLm1hcCxcbiAgICAgICAgaXNDb21tb24gPyBST1VURVMuYWJvdXQgOiB1bmRlZmluZWQsXG4gICAgICBdO1xuICAgICAgcmV0dXJuIGxpbmtzLmZpbHRlcihyb3V0ZSA9PiB1Q2hlY2suaXNVbmRlZmluZWQocm91dGUpID09PSBmYWxzZSk7XG4gICAgfSxcbiAgICB0aGVtZU5hbWUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ3RoZW1lL25hbWUnXTtcbiAgICB9LFxuICB9LFxuICBtZXRob2RzOiB7XG4gICAgLi4ubWFwTXV0YXRpb25zKCdtZW51JywgW1xuICAgICAgJ3RvZ2dsZScsXG4gICAgICAnY2xvc2UnLFxuICAgIF0pLFxuICAgIG9wZW5HdWlkZSAoKSB7XG4gICAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2d1aWRlL29wZW4nKTtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICB9LFxuICAgIGlzQWN0dWFsUGF0aCAoeyBwYXRoID0gJycgfSkge1xuICAgICAgcmV0dXJuIHRoaXMuJHJvdXRlLnBhdGggPT09IHBhdGg7XG4gICAgfSxcbiAgICB0b2dnbGVUaGVtZSAoKSB7XG4gICAgICBpZiAodGhpcy5jYW5Ub2dnbGVUaGVtZSkge1xuICAgICAgICB0aGlzLmNhblRvZ2dsZVRoZW1lID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgndGhlbWUvdG9nZ2xlJyk7XG4gICAgICAgIHJvdXRlci5oYXJkUmVsb2FkKCk7XG4gICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jYW5Ub2dnbGVUaGVtZSA9IHRydWU7XG4gICAgICAgIH0sIDUwMCk7XG5cbiAgICAgIH1cblxuICAgIH0sXG4gICAgc2lnbk91dCAoKSB7XG4gICAgICB0aGlzLiRzdG9yZS5kaXNwYXRjaCgndXNlci9zaWduT3V0JylcbiAgICAgICAgLmZpbmFsbHkoKCkgPT4gdGhpcy5vblNpZ25PdXQoKSk7XG4gICAgfSxcbiAgICBvblNpZ25PdXQgKCkge1xuICAgICAgdGhpcy4kcm91dGVyLnB1c2goUk9VVEVTLndlbGNvbWUucGF0aCk7XG4gICAgfSxcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHQtcGFnZSBjbGFzcz1cImYtc3RhcnRcIj5cbiAgICA8ZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhLXRleHQgZi10aXRsZSBmLWJpZ1wiPlxuICAgICAgICAgIHt7ICR0KCdwYWdlLmVycm9yLnRpdGxlJykgfX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwibS1jb2xsZWN0aW9uIGYtYnV0dG9uIGYtcHgtMlwiPlxuICAgICAgPGRpdiBjbGFzcz1cImYtcHQtMyBmLXRleHQtYm9sZFwiIHYtaHRtbD1cIiR0KCdwYWdlLmVycm9yLmNvbnRlbnQnKVwiLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJmLXB0LTFcIj5cbiAgICAgICAgPGEtYnV0dG9uLXByaW1hcnkgQGNsaWNrPVwicmVkaXJlY3RUb01haW5QYWdlXCI+XG4gICAgICAgICAge3sgJHQoJ2dlbmVyYWwuYmFja1RvU3RhcnQnKSB9fVxuICAgICAgICA8L2EtYnV0dG9uLXByaW1hcnk+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC90LXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IFRQYWdlIGZyb20gJ3RlbXBsYXRlcy9wYWdlJztcbmltcG9ydCBBQnV0dG9uUHJpbWFyeSBmcm9tICdhdG9tcy9idXR0b24vcHJpbWFyeSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3AtZXJyb3InLFxuICBjb21wb25lbnRzOiB7XG4gICAgQUJ1dHRvblByaW1hcnksXG4gICAgVFBhZ2UsXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICByZWRpcmVjdFRvTWFpblBhZ2UgKCkge1xuICAgICAgY29uc3QgaXNMb2dpbiA9IHRoaXMuJHN0b3JlLmdldHRlcnNbJ3VzZXIvaXNMb2dpbiddO1xuICAgICAgY29uc3Qgcm91dGUgPSBpc0xvZ2luID8gdGhpcy5ST1VURVMuc3RhcnQgOiB0aGlzLlJPVVRFUy53ZWxjb21lO1xuICAgICAgdGhpcy4kcm91dGVyLnB1c2gocm91dGUucGF0aCk7XG4gICAgfSxcbiAgfSxcbn07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHQtcGFnZSB0aXRsZT1cIlwiPlxuICAgIDxkaXYgY2xhc3M9XCJhLWltZyBmLW1hcC1yb3VuZFwiLz5cbiAgICA8ZGl2IGNsYXNzPVwibS1jb2xsZWN0aW9uIGYtYnV0dG9uXCI+XG4gICAgICA8YS1idXR0b24tcHJpbWFyeSBAY2xpY2s9XCIkcm91dGVyLnB1c2goUk9VVEVTLnNpZ25Jbi5wYXRoKVwiPlxuICAgICAgICB7eyBST1VURVMuc2lnbkluLmxhYmVsIH19XG4gICAgICA8L2EtYnV0dG9uLXByaW1hcnk+XG4gICAgICA8YS1idXR0b24tc2Vjb25kYXJ5IEBjbGljaz1cIiRyb3V0ZXIucHVzaChST1VURVMuc2lnblVwLnBhdGgpXCI+XG4gICAgICAgIHt7IFJPVVRFUy5zaWduVXAubGFiZWwgfX1cbiAgICAgIDwvYS1idXR0b24tc2Vjb25kYXJ5PlxuICAgICAgPGEtYnV0dG9uLXNlY29uZGFyeSBAY2xpY2s9XCIkcm91dGVyLnB1c2goUk9VVEVTLmFib3V0LnBhdGgpXCI+XG4gICAgICAgIHt7IFJPVVRFUy5hYm91dC5sYWJlbCB9fVxuICAgICAgPC9hLWJ1dHRvbi1zZWNvbmRhcnk+XG4gICAgPC9kaXY+XG4gIDwvdC1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBUUGFnZSBmcm9tICd0ZW1wbGF0ZXMvcGFnZSc7XG5pbXBvcnQgQUJ1dHRvblByaW1hcnkgZnJvbSAnYXRvbXMvYnV0dG9uL3ByaW1hcnknO1xuaW1wb3J0IEFCdXR0b25TZWNvbmRhcnkgZnJvbSAnYXRvbXMvYnV0dG9uL3NlY29uZGFyeSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3Atd2VsY29tZScsXG4gIGNvbXBvbmVudHM6IHtcbiAgICBBQnV0dG9uU2Vjb25kYXJ5LFxuICAgIEFCdXR0b25QcmltYXJ5LFxuICAgIFRQYWdlLFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuICA8ZGl2IGNsYXNzPVwidC1wYWdlXCIgdi10b3VjaDpzd2lwZS5sZWZ0PVwib3Blbk1lbnVcIj5cbiAgICA8c2xvdC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCB7IFJPVVRFUyB9IGZyb20gJ3V0aWxzL21hY3Jvcy9yb3V0ZXMnO1xuaW1wb3J0IHsgbWFwR2V0dGVycywgbWFwTXV0YXRpb25zIH0gZnJvbSAndnVleCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3QtcGFnZScsXG4gIHByb3BzOiB7XG4gICAgYmFja1JvdXRlOiB7XG4gICAgICB0eXBlOiBPYmplY3QsXG4gICAgICBkZWZhdWx0OiAoKSA9PiAoeyBuYW1lOiAnJyB9KSxcbiAgICB9LFxuICAgIGxldFN3aXBlTWVudToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIGRlZmF1bHQ6IHRydWUsXG4gICAgfSxcbiAgfSxcbiAgbW91bnRlZCAoKSB7XG4gICAgY29uc3Qgcm91dGUgPSBST1VURVNbdGhpcy4kcm91dGVyLmN1cnJlbnRSb3V0ZS5uYW1lXSB8fCB7fTtcbiAgICBjb25zdCB0aXRsZSA9IHJvdXRlLmxhYmVsO1xuICAgIHRoaXMuJHN0b3JlLmNvbW1pdCgnaGVhZGVyL3NldFBhZ2VUaXRsZScsIHRpdGxlKTtcbiAgICB0aGlzLiRzdG9yZS5jb21taXQoJ2hlYWRlci9zZXRCYWNrUm91dGVOYW1lJywgdGhpcy5iYWNrUm91dGUpO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgZG9jdW1lbnQudGl0bGUgPSBgJHt0aXRsZX0gLSAke0FQUF9OQU1FfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LnRpdGxlID0gQVBQX05BTUU7XG4gICAgfVxuICB9LFxuICBjb21wdXRlZDoge1xuICAgIC4uLm1hcEdldHRlcnMoJ3VzZXInLCBbJ2lzTG9naW4nXSksXG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICAuLi5tYXBNdXRhdGlvbnMoJ21lbnUnLCBbJ29wZW4nXSksXG4gICAgb3Blbk1lbnUgKCkge1xuICAgICAgaWYgKHRoaXMubGV0U3dpcGVNZW51ICYmIHRoaXMuaXNMb2dpbikge1xuICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9LFxuICB9LFxufTtcbjwvc2NyaXB0PlxuIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5mYWRlLWVudGVyLWFjdGl2ZSwgLmZhZGUtbGVhdmUtYWN0aXZlIHtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcztcXG59XFxuXFxuLmZhZGUtZW50ZXIsIC5mYWRlLWxlYXZlLXRvIHtcXG4gIG9wYWNpdHk6IDA7XFxufVxcblxcbi5zbGlkZXItcGFnaW5hdGlvbi1idWxsZXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYSAhaW1wb3J0YW50O1xcbiAgb3BhY2l0eTogMC4zICFpbXBvcnRhbnQ7XFxufVxcblxcbi5zd2lwZXItY29udGFpbmVyLWhvcml6b250YWwgLnNsaWRlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUsIC5zd2lwZXItY29udGFpbmVyLXZlcnRpY2FsIC5zbGlkZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmEgIWltcG9ydGFudDtcXG4gIG9wYWNpdHk6IDEgIWltcG9ydGFudDtcXG59XFxuXFxuLmEtaW5wdXQuZi1zZWxlY3QsIC5hLWZpZWxkIHtcXG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IGFsbDtcXG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDIwMG1zO1xcbn1cXG5cXG4udC1iYXNlLCBib2R5IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG59XFxuXFxuaHRtbCB7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTIxMjEyO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxuICBmb250LWZhbWlseTogUm9ib3RvLCBzYW5zLXNlcmlmO1xcbiAgY29sb3I6ICNmYWZhZmE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTIxMjEyO1xcbn1cXG5cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi5mLWJvbGQge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5mLWRpc3BsYXktbm9uZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uZi1oaWRkZW4ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4uZi12aXNpYmxlIHtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblxcbi5mLWRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLmYtbGlzdC1kaXNjIHtcXG4gIGxpc3Qtc3R5bGU6IGRpc2M7XFxufVxcblxcbi5mLWN1cnNvci1wb2ludGVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmYtY3Vyc29yLWRlZmF1bHQge1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uZi1ibG9jayB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLmYtaW5saW5lLWJsb2NrIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuXFxuLmYtZmxleCwgLm0tcGFuZWwuZi1zdGFydCwgLm0tcGFuZWwuZi1oZWFkZXIsIC5tLWxpc3QtZWxlbWVudC5mLXBvcHVwLCAubS1jbG9jaywgLmEtbGlzdC10aWxlLCAuYS1saW5rLmYtbWVudSB7XFxuICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLWZsZXgtMSwgLmEtbGlzdC10aWxlIHtcXG4gIGZsZXg6IDE7XFxufVxcblxcbi5mLWZsZXgtMCB7XFxuICBmbGV4OiAwO1xcbn1cXG5cXG4uZi1mbGV4LWNvbCwgLm0tcGFuZWwuZi1zdGFydCwgLm0tcGFuZWwuZi1oZWFkZXIuZi1jZW50ZXIsIC5hLWxpc3QtdGlsZSB7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uZi1mbGV4LXJvdywgLm0tcGFuZWwuZi1oZWFkZXIuZi1zaWRlIHtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxufVxcblxcbi5mLWZsZXgtYWwtY2VudGVyLCAubS1wYW5lbC5mLXN0YXJ0LCAubS1wYW5lbC5mLWhlYWRlci5mLXNpZGUge1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmYtZmxleC1qdXN0LWNlbnRlciwgLm0tY2xvY2sge1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5mLWZsZXgtYWwtZW5kIHtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcXG59XFxuXFxuLmYtZmxleC1qdXN0LWVuZCwgLm0tcGFuZWwuZi1oZWFkZXIuZi1jZW50ZXIge1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG59XFxuXFxuLmYtZmxleC1hbC1zdGFydCB7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLmYtZmxleC1qdXN0LXN0YXJ0LCAuYS1saXN0LXRpbGUge1xcbiAganVzdGlmeS1jb250ZW50OiBzdGFydDtcXG59XFxuXFxuLmYtZmxleC1qdXN0LXNwYWNlLWJldHdlZW4ge1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uZi1mbGV4LWp1c3Qtc3BhY2UtYXJvdW5kIHtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbn1cXG5cXG4uZi1oZWlnaHQtMTAwIHtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLmYtbS0tMiB7XFxuICBtYXJnaW46IC0xNnB4IC0xNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW0tLTEge1xcbiAgbWFyZ2luOiAtOHB4IC04cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbS0wIHtcXG4gIG1hcmdpbjogMCAwICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW0tMSB7XFxuICBtYXJnaW46IDhweCA4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbS0yIHtcXG4gIG1hcmdpbjogMTZweCAxNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW0tMyB7XFxuICBtYXJnaW46IDI0cHggMjRweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tLTQge1xcbiAgbWFyZ2luOiAzMnB4IDMycHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbS01IHtcXG4gIG1hcmdpbjogNDBweCA0MHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW0tNiB7XFxuICBtYXJnaW46IDQ4cHggNDhweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tLWF1dG8ge1xcbiAgbWFyZ2luOiBhdXRvIGF1dG8gIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtLTIge1xcbiAgbWFyZ2luLWxlZnQ6IC0xNnB4ICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tcmlnaHQ6IC0xNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLS0yIHtcXG4gIG1hcmdpbi1sZWZ0OiAtMTZweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tci0tMiB7XFxuICBtYXJnaW4tcmlnaHQ6IC0xNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW14LS0xIHtcXG4gIG1hcmdpbi1sZWZ0OiAtOHB4ICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tcmlnaHQ6IC04cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWwtLTEge1xcbiAgbWFyZ2luLWxlZnQ6IC04cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItLTEge1xcbiAgbWFyZ2luLXJpZ2h0OiAtOHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW14LTAge1xcbiAgbWFyZ2luLWxlZnQ6IDAgIWltcG9ydGFudDtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tbC0wIHtcXG4gIG1hcmdpbi1sZWZ0OiAwICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1yLTAge1xcbiAgbWFyZ2luLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW14LTEge1xcbiAgbWFyZ2luLWxlZnQ6IDhweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiA4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWwtMSB7XFxuICBtYXJnaW4tbGVmdDogOHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1yLTEge1xcbiAgbWFyZ2luLXJpZ2h0OiA4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtMiB7XFxuICBtYXJnaW4tbGVmdDogMTZweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiAxNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLTIge1xcbiAgbWFyZ2luLWxlZnQ6IDE2cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItMiB7XFxuICBtYXJnaW4tcmlnaHQ6IDE2cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtMyB7XFxuICBtYXJnaW4tbGVmdDogMjRweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiAyNHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLTMge1xcbiAgbWFyZ2luLWxlZnQ6IDI0cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItMyB7XFxuICBtYXJnaW4tcmlnaHQ6IDI0cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtNCB7XFxuICBtYXJnaW4tbGVmdDogMzJweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiAzMnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLTQge1xcbiAgbWFyZ2luLWxlZnQ6IDMycHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItNCB7XFxuICBtYXJnaW4tcmlnaHQ6IDMycHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtNSB7XFxuICBtYXJnaW4tbGVmdDogNDBweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiA0MHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLTUge1xcbiAgbWFyZ2luLWxlZnQ6IDQwcHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItNSB7XFxuICBtYXJnaW4tcmlnaHQ6IDQwcHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtNiB7XFxuICBtYXJnaW4tbGVmdDogNDhweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiA0OHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLTYge1xcbiAgbWFyZ2luLWxlZnQ6IDQ4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItNiB7XFxuICBtYXJnaW4tcmlnaHQ6IDQ4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtYXV0byB7XFxuICBtYXJnaW4tbGVmdDogYXV0byAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLWF1dG8ge1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG8gIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItYXV0byB7XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG8gIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXktLTIge1xcbiAgbWFyZ2luLXRvcDogLTE2cHggIWltcG9ydGFudDtcXG4gIG1hcmdpbi1ib3R0b206IC0xNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW10LS0yIHtcXG4gIG1hcmdpbi10b3A6IC0xNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1iLS0yIHtcXG4gIG1hcmdpbi1ib3R0b206IC0xNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW15LS0xIHtcXG4gIG1hcmdpbi10b3A6IC04cHggIWltcG9ydGFudDtcXG4gIG1hcmdpbi1ib3R0b206IC04cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXQtLTEge1xcbiAgbWFyZ2luLXRvcDogLThweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tYi0tMSB7XFxuICBtYXJnaW4tYm90dG9tOiAtOHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW15LTAge1xcbiAgbWFyZ2luLXRvcDogMCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLWJvdHRvbTogMCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tdC0wIHtcXG4gIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWItMCB7XFxuICBtYXJnaW4tYm90dG9tOiAwICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW15LTEge1xcbiAgbWFyZ2luLXRvcDogOHB4ICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tYm90dG9tOiA4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXQtMSB7XFxuICBtYXJnaW4tdG9wOiA4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWItMSwgLm0tcm93LmYtaGVhZGVyLCAuYS10ZXh0LmYtdGl0bGUuZi10YWJsZSwgLmYtdGl0bGUuZi10YWJsZS5tLWJveC5mLXBhbmVsLCAuZi10YWJsZS5tLWJhbm5lci5mLXBhbmVsIHtcXG4gIG1hcmdpbi1ib3R0b206IDhweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1teS0yIHtcXG4gIG1hcmdpbi10b3A6IDE2cHggIWltcG9ydGFudDtcXG4gIG1hcmdpbi1ib3R0b206IDE2cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXQtMiB7XFxuICBtYXJnaW4tdG9wOiAxNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1iLTIge1xcbiAgbWFyZ2luLWJvdHRvbTogMTZweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1teS0zIHtcXG4gIG1hcmdpbi10b3A6IDI0cHggIWltcG9ydGFudDtcXG4gIG1hcmdpbi1ib3R0b206IDI0cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXQtMywgLm0tYXJlYS5mLWJ1dHRvbi5mLWZpbGwge1xcbiAgbWFyZ2luLXRvcDogMjRweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tYi0zIHtcXG4gIG1hcmdpbi1ib3R0b206IDI0cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXktNCB7XFxuICBtYXJnaW4tdG9wOiAzMnB4ICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tYm90dG9tOiAzMnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW10LTQge1xcbiAgbWFyZ2luLXRvcDogMzJweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tYi00LCAubS1hcmVhLmYtYnV0dG9uLmYtZmlsbCB7XFxuICBtYXJnaW4tYm90dG9tOiAzMnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW15LTUge1xcbiAgbWFyZ2luLXRvcDogNDBweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLWJvdHRvbTogNDBweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tdC01IHtcXG4gIG1hcmdpbi10b3A6IDQwcHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWItNSB7XFxuICBtYXJnaW4tYm90dG9tOiA0MHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW15LTYge1xcbiAgbWFyZ2luLXRvcDogNDhweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLWJvdHRvbTogNDhweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tdC02IHtcXG4gIG1hcmdpbi10b3A6IDQ4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWItNiB7XFxuICBtYXJnaW4tYm90dG9tOiA0OHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW15LWF1dG8ge1xcbiAgbWFyZ2luLXRvcDogYXV0byAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLWJvdHRvbTogYXV0byAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tdC1hdXRvIHtcXG4gIG1hcmdpbi10b3A6IGF1dG8gIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWItYXV0byB7XFxuICBtYXJnaW4tYm90dG9tOiBhdXRvICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLXNjcm9sbC1kZWZhdWx0IHtcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxufVxcblxcbi5mLXAtLTIge1xcbiAgcGFkZGluZzogLTE2cHggLTE2cHg7XFxufVxcblxcbi5mLXAtLTEge1xcbiAgcGFkZGluZzogLThweCAtOHB4O1xcbn1cXG5cXG4uZi1wLTAsIC50LXBhZ2UuZi1zdGFydCB7XFxuICBwYWRkaW5nOiAwIDA7XFxufVxcblxcbi5mLXAtMSB7XFxuICBwYWRkaW5nOiA4cHggOHB4O1xcbn1cXG5cXG4uZi1wLTIsIC5tLXNsaWRlIHtcXG4gIHBhZGRpbmc6IDE2cHggMTZweDtcXG59XFxuXFxuLmYtcC0zIHtcXG4gIHBhZGRpbmc6IDI0cHggMjRweDtcXG59XFxuXFxuLmYtcC00IHtcXG4gIHBhZGRpbmc6IDMycHggMzJweDtcXG59XFxuXFxuLmYtcC01IHtcXG4gIHBhZGRpbmc6IDQwcHggNDBweDtcXG59XFxuXFxuLmYtcC02IHtcXG4gIHBhZGRpbmc6IDQ4cHggNDhweDtcXG59XFxuXFxuLmYtcC1hdXRvIHtcXG4gIHBhZGRpbmc6IGF1dG8gYXV0bztcXG59XFxuXFxuLmYtcHgtLTIge1xcbiAgcGFkZGluZy1sZWZ0OiAtMTZweDtcXG4gIHBhZGRpbmctcmlnaHQ6IC0xNnB4O1xcbn1cXG5cXG4uZi1wbC0tMiB7XFxuICBwYWRkaW5nLWxlZnQ6IC0xNnB4O1xcbn1cXG5cXG4uZi1wci0tMiB7XFxuICBwYWRkaW5nLXJpZ2h0OiAtMTZweDtcXG59XFxuXFxuLmYtcHgtLTEge1xcbiAgcGFkZGluZy1sZWZ0OiAtOHB4O1xcbiAgcGFkZGluZy1yaWdodDogLThweDtcXG59XFxuXFxuLmYtcGwtLTEge1xcbiAgcGFkZGluZy1sZWZ0OiAtOHB4O1xcbn1cXG5cXG4uZi1wci0tMSB7XFxuICBwYWRkaW5nLXJpZ2h0OiAtOHB4O1xcbn1cXG5cXG4uZi1weC0wIHtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIHBhZGRpbmctcmlnaHQ6IDA7XFxufVxcblxcbi5mLXBsLTAge1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbn1cXG5cXG4uZi1wci0wIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDA7XFxufVxcblxcbi5mLXB4LTEge1xcbiAgcGFkZGluZy1sZWZ0OiA4cHg7XFxuICBwYWRkaW5nLXJpZ2h0OiA4cHg7XFxufVxcblxcbi5mLXBsLTEge1xcbiAgcGFkZGluZy1sZWZ0OiA4cHg7XFxufVxcblxcbi5mLXByLTEge1xcbiAgcGFkZGluZy1yaWdodDogOHB4O1xcbn1cXG5cXG4uZi1weC0yIHtcXG4gIHBhZGRpbmctbGVmdDogMTZweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDE2cHg7XFxufVxcblxcbi5mLXBsLTIsIC5hLWxpc3QtdGlsZSB7XFxuICBwYWRkaW5nLWxlZnQ6IDE2cHg7XFxufVxcblxcbi5mLXByLTIge1xcbiAgcGFkZGluZy1yaWdodDogMTZweDtcXG59XFxuXFxuLmYtcHgtMyB7XFxuICBwYWRkaW5nLWxlZnQ6IDI0cHg7XFxuICBwYWRkaW5nLXJpZ2h0OiAyNHB4O1xcbn1cXG5cXG4uZi1wbC0zIHtcXG4gIHBhZGRpbmctbGVmdDogMjRweDtcXG59XFxuXFxuLmYtcHItMyB7XFxuICBwYWRkaW5nLXJpZ2h0OiAyNHB4O1xcbn1cXG5cXG4uZi1weC00IHtcXG4gIHBhZGRpbmctbGVmdDogMzJweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDMycHg7XFxufVxcblxcbi5mLXBsLTQge1xcbiAgcGFkZGluZy1sZWZ0OiAzMnB4O1xcbn1cXG5cXG4uZi1wci00IHtcXG4gIHBhZGRpbmctcmlnaHQ6IDMycHg7XFxufVxcblxcbi5mLXB4LTUge1xcbiAgcGFkZGluZy1sZWZ0OiA0MHB4O1xcbiAgcGFkZGluZy1yaWdodDogNDBweDtcXG59XFxuXFxuLmYtcGwtNSB7XFxuICBwYWRkaW5nLWxlZnQ6IDQwcHg7XFxufVxcblxcbi5mLXByLTUge1xcbiAgcGFkZGluZy1yaWdodDogNDBweDtcXG59XFxuXFxuLmYtcHgtNiB7XFxuICBwYWRkaW5nLWxlZnQ6IDQ4cHg7XFxuICBwYWRkaW5nLXJpZ2h0OiA0OHB4O1xcbn1cXG5cXG4uZi1wbC02IHtcXG4gIHBhZGRpbmctbGVmdDogNDhweDtcXG59XFxuXFxuLmYtcHItNiB7XFxuICBwYWRkaW5nLXJpZ2h0OiA0OHB4O1xcbn1cXG5cXG4uZi1weC1hdXRvIHtcXG4gIHBhZGRpbmctbGVmdDogYXV0bztcXG4gIHBhZGRpbmctcmlnaHQ6IGF1dG87XFxufVxcblxcbi5mLXBsLWF1dG8ge1xcbiAgcGFkZGluZy1sZWZ0OiBhdXRvO1xcbn1cXG5cXG4uZi1wci1hdXRvIHtcXG4gIHBhZGRpbmctcmlnaHQ6IGF1dG87XFxufVxcblxcbi5mLXB5LS0yIHtcXG4gIHBhZGRpbmctdG9wOiAtMTZweDtcXG4gIHBhZGRpbmctYm90dG9tOiAtMTZweDtcXG59XFxuXFxuLmYtcHQtLTIge1xcbiAgcGFkZGluZy10b3A6IC0xNnB4O1xcbn1cXG5cXG4uZi1wYi0tMiB7XFxuICBwYWRkaW5nLWJvdHRvbTogLTE2cHg7XFxufVxcblxcbi5mLXB5LS0xIHtcXG4gIHBhZGRpbmctdG9wOiAtOHB4O1xcbiAgcGFkZGluZy1ib3R0b206IC04cHg7XFxufVxcblxcbi5mLXB0LS0xIHtcXG4gIHBhZGRpbmctdG9wOiAtOHB4O1xcbn1cXG5cXG4uZi1wYi0tMSB7XFxuICBwYWRkaW5nLWJvdHRvbTogLThweDtcXG59XFxuXFxuLmYtcHktMCB7XFxuICBwYWRkaW5nLXRvcDogMDtcXG4gIHBhZGRpbmctYm90dG9tOiAwO1xcbn1cXG5cXG4uZi1wdC0wIHtcXG4gIHBhZGRpbmctdG9wOiAwO1xcbn1cXG5cXG4uZi1wYi0wIHtcXG4gIHBhZGRpbmctYm90dG9tOiAwO1xcbn1cXG5cXG4uZi1weS0xIHtcXG4gIHBhZGRpbmctdG9wOiA4cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xcbn1cXG5cXG4uZi1wdC0xIHtcXG4gIHBhZGRpbmctdG9wOiA4cHg7XFxufVxcblxcbi5mLXBiLTEge1xcbiAgcGFkZGluZy1ib3R0b206IDhweDtcXG59XFxuXFxuLmYtcHktMiwgLm0tZ3JpZC5mLXRlbXBvcmFyeS1wb2ludHMsIC5mLXRlbXBvcmFyeS1wb2ludHMubS1yb3cuZi1oZWFkZXIge1xcbiAgcGFkZGluZy10b3A6IDE2cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMTZweDtcXG59XFxuXFxuLmYtcHQtMiB7XFxuICBwYWRkaW5nLXRvcDogMTZweDtcXG59XFxuXFxuLmYtcGItMiB7XFxuICBwYWRkaW5nLWJvdHRvbTogMTZweDtcXG59XFxuXFxuLmYtcHktMyB7XFxuICBwYWRkaW5nLXRvcDogMjRweDtcXG4gIHBhZGRpbmctYm90dG9tOiAyNHB4O1xcbn1cXG5cXG4uZi1wdC0zLCAuYS1tZXNzYWdlLmYtdGFibGUge1xcbiAgcGFkZGluZy10b3A6IDI0cHg7XFxufVxcblxcbi5mLXBiLTMge1xcbiAgcGFkZGluZy1ib3R0b206IDI0cHg7XFxufVxcblxcbi5mLXB5LTQge1xcbiAgcGFkZGluZy10b3A6IDMycHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMzJweDtcXG59XFxuXFxuLmYtcHQtNCB7XFxuICBwYWRkaW5nLXRvcDogMzJweDtcXG59XFxuXFxuLmYtcGItNCB7XFxuICBwYWRkaW5nLWJvdHRvbTogMzJweDtcXG59XFxuXFxuLmYtcHktNSB7XFxuICBwYWRkaW5nLXRvcDogNDBweDtcXG4gIHBhZGRpbmctYm90dG9tOiA0MHB4O1xcbn1cXG5cXG4uZi1wdC01IHtcXG4gIHBhZGRpbmctdG9wOiA0MHB4O1xcbn1cXG5cXG4uZi1wYi01IHtcXG4gIHBhZGRpbmctYm90dG9tOiA0MHB4O1xcbn1cXG5cXG4uZi1weS02IHtcXG4gIHBhZGRpbmctdG9wOiA0OHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDQ4cHg7XFxufVxcblxcbi5mLXB0LTYge1xcbiAgcGFkZGluZy10b3A6IDQ4cHg7XFxufVxcblxcbi5mLXBiLTYge1xcbiAgcGFkZGluZy1ib3R0b206IDQ4cHg7XFxufVxcblxcbi5mLXB5LWF1dG8ge1xcbiAgcGFkZGluZy10b3A6IGF1dG87XFxuICBwYWRkaW5nLWJvdHRvbTogYXV0bztcXG59XFxuXFxuLmYtcHQtYXV0byB7XFxuICBwYWRkaW5nLXRvcDogYXV0bztcXG59XFxuXFxuLmYtcGItYXV0byB7XFxuICBwYWRkaW5nLWJvdHRvbTogYXV0bztcXG59XFxuXFxuLmYtZmlsbC1hYnMge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4uZi1maWxsLXJlbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxufVxcblxcbi5mLWZpbGwtZml4IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG59XFxuXFxuLmYtcmVsYXRpdmUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uZi1hYnNvbHV0ZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxufVxcblxcbi5mLXotaW5kZXgtNiB7XFxuICB6LWluZGV4OiA2O1xcbn1cXG5cXG4uZi10ZXh0LWJvbGQsIC5hLXRleHQuZi10aXRsZS5mLXRhYmxlLCAuZi10aXRsZS5mLXRhYmxlLm0tYm94LmYtcGFuZWwsIC5mLXRhYmxlLm0tYmFubmVyLmYtcGFuZWwsIC5hLXRleHQuZi1zdHJvbmcsIC5tLWJveC5mLXBhbmVsLCAuZi1zdHJvbmcubS1iYW5uZXIuZi1wYW5lbCB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLmYtdGV4dC1ub3JtYWwge1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG59XFxuXFxuLmYtdGV4dC11cHBlcmNhc2Uge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuLmYtdGV4dC1pdGFsaWMge1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG4uZi10ZXh0LXVuZGVybGluZSB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLmYtdGV4dC1jZW50ZXIsIC50LXBhZ2UuZi1zdGFydCwgLmEtc3VidGl0bGUsIC5hLWxvZ28sIC5hLWNoaXAsIC5hLWJ1dHRvbiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5mLXRleHQtcmlnaHQge1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcblxcbi5mLXRleHQtbGVmdCwgLmEtYXNzaXN0IHtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblxcbi5mLXRleHQtanVzdGlmeSB7XFxuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcbn1cXG5cXG4uZi10ZXh0LWluZm8ge1xcbiAgY29sb3I6ICMwRjlFRUQ7XFxufVxcblxcbi5mLXRleHQtd2FybmluZyB7XFxuICBjb2xvcjogI0YxQUI2ODtcXG59XFxuXFxuLmYtdGV4dC1kYW5nZXIge1xcbiAgY29sb3I6ICNlZTFjMjU7XFxufVxcblxcbi5mLXRleHQtd2hpdGUge1xcbiAgY29sb3I6ICNmYWZhZmE7XFxufVxcblxcbi5mLXRleHQtZ3JheSB7XFxuICBjb2xvcjogcmdiYSgyNTAsIDI1MCwgMjUwLCAwLjcpO1xcbn1cXG5cXG4uZi10ZXh0LXN1YnRleHQsIC5hLXZlcnNpb24ge1xcbiAgY29sb3I6IHJnYmEoMjUwLCAyNTAsIDI1MCwgMC43KTtcXG59XFxuXFxuLmYtdGV4dC1zdGFuZGFyZCB7XFxuICBjb2xvcjogI2ZhZmFmYTtcXG59XFxuXFxuLmYtdGV4dC1wcmltYXJ5IHtcXG4gIGNvbG9yOiAjMDc2MzJDO1xcbn1cXG5cXG4uZi10ZXh0LXByaW1hcnktY29udHJhc3Qge1xcbiAgY29sb3I6ICNmYWZhZmE7XFxufVxcblxcbi5mLXRleHQtcHJpbWFyeS1ob3ZlciB7XFxuICBjb2xvcjogIzA3NjMyQztcXG4gIG9wYWNpdHk6IDAuNztcXG59XFxuXFxuLmYtdGV4dC1zZWNvbmRhcnkge1xcbiAgY29sb3I6ICM1ODIxODc7XFxufVxcblxcbi5mLWxpbmUtMTgge1xcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XFxufVxcblxcbi5mLWxpbmUtMjAge1xcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XFxufVxcblxcbi5mLWxpbmUtMjQge1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxufVxcblxcbi5mLWxpbmUtMzIge1xcbiAgbGluZS1oZWlnaHQ6IDMycHg7XFxufVxcblxcbi5mLXRleHQtNDgge1xcbiAgZm9udC1zaXplOiA0OHB4O1xcbn1cXG5cXG4uZi10ZXh0LTMyIHtcXG4gIGZvbnQtc2l6ZTogMzJweDtcXG59XFxuXFxuLmYtdGV4dC0yOCwgLmEtdGl0bGUuZi1zaXplLTI4IHtcXG4gIGZvbnQtc2l6ZTogMjhweDtcXG59XFxuXFxuLmYtdGV4dC0yNCwgLmEtdGl0bGUge1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbn1cXG5cXG4uZi10ZXh0LTIyLCAuYS10ZXh0LmYtdGl0bGUuZi1tZW51LCAuZi10aXRsZS5mLW1lbnUubS1ib3guZi1wYW5lbCwgLmYtbWVudS5tLWJhbm5lci5mLXBhbmVsLCAuYS10ZXh0LmYtdGl0bGUuZi1iaWcsIC5mLXRpdGxlLmYtYmlnLm0tYm94LmYtcGFuZWwsIC5hLXRleHQuZi10aXRsZS5tLWJhbm5lci5mLXBhbmVsLCAuZi10aXRsZS5tLWJhbm5lci5mLXBhbmVsLm0tYm94LCAuZi1iaWcubS1iYW5uZXIuZi1wYW5lbCwgLm0tYmFubmVyLmYtcGFuZWwsIC5hLWxvZ28uZi1iaWcge1xcbiAgZm9udC1zaXplOiAyMnB4O1xcbn1cXG5cXG4uZi10ZXh0LTIwLCAuYS1saW5rLmYtbWVudSB7XFxuICBmb250LXNpemU6IDIwcHg7XFxufVxcblxcbi5mLXRleHQtMTgsIC5hLXRleHQuZi10aXRsZS5mLXRhYmxlLCAuZi10aXRsZS5mLXRhYmxlLm0tYm94LmYtcGFuZWwsIC5mLXRhYmxlLm0tYmFubmVyLmYtcGFuZWwsIC5hLXN1YnRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG59XFxuXFxuLmYtdGV4dC0xNiwgLm0tc2xpZGUsIC5tLWxpc3QtZWxlbWVudC5mLXBvcHVwLCAuYS10ZXh0LmYtc3VidGl0bGUuZi1zdGFydCwgLmYtc3VidGl0bGUuZi1zdGFydC5tLWJveC5mLXBhbmVsLCAuZi1zdWJ0aXRsZS5mLXN0YXJ0Lm0tYmFubmVyLmYtcGFuZWwsIC5hLXRleHQuZi1zdWJ0aXRsZS5mLW1lbnUsIC5mLXN1YnRpdGxlLmYtbWVudS5tLWJveC5mLXBhbmVsLCAuZi1zdWJ0aXRsZS5mLW1lbnUubS1iYW5uZXIuZi1wYW5lbCwgLmEtdGV4dC5mLXN0cm9uZywgLm0tYm94LmYtcGFuZWwsIC5mLXN0cm9uZy5tLWJhbm5lci5mLXBhbmVsLCAuYS1zZWxlY3QsIC5hLW1lc3NhZ2UuZi10YWJsZSwgLmEtaW5wdXQsIC5hLWZpZWxkLCBib2R5IHtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG59XFxuXFxuLmYtdGV4dC0xNCwgLm0tc25hY2tiYXIsIC5hLWxvZ28sIC5hLWJ1dHRvbiB7XFxuICBmb250LXNpemU6IDE0cHg7XFxufVxcblxcbi5mLXRleHQtMTIsIC5hLWFzc2lzdCwgLmEtbGFiZWwuZi1idXR0b24taWNvbi1mb290ZXIsIC5hLWNoaXAge1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbn1cXG5cXG4uZi1taW4tMTAwIHtcXG4gIG1pbi13aWR0aDogMTAwJTtcXG59XFxuXFxuLmYtMTAwIHtcXG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLTQwIHtcXG4gIHdpZHRoOiA0MCUgIWltcG9ydGFudDtcXG59XFxuXFxuLmYtOTAge1xcbiAgd2lkdGg6IDkwJSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi13LWF1dG8ge1xcbiAgd2lkdGg6IGF1dG8gIWltcG9ydGFudDtcXG59XFxuXFxuI2FwcCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5hLWFzc2lzdC5mLWVycm9yLCAuYS1hc3Npc3QuYS1tZXNzYWdlLmYtdGFibGUuZi1lcnJvciB7XFxuICBjb2xvcjogI2VlMWMyNTtcXG59XFxuXFxuLmEtYnV0dG9uIHtcXG4gIG1pbi13aWR0aDogMTg0cHg7XFxuICBoZWlnaHQ6IDM2cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMDc2MzJDO1xcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogMTZweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjc1cHg7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgY29sb3I6ICNmYWZhZmE7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwIDIwcHg7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG4uYS1idXR0b246Zm9jdXMge1xcbiAgb3BhY2l0eTogMC41O1xcbn1cXG5AbWVkaWEgKGhvdmVyOiBob3ZlcikgYW5kIChwb2ludGVyOiBmaW5lKSB7XFxuICAuYS1idXR0b246aG92ZXIge1xcbiAgICBvcGFjaXR5OiAwLjU7XFxuICB9XFxufVxcbi5hLWJ1dHRvbjpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwLjM7XFxufVxcblxcbi5hLWJ1dHRvbi5mLWZpbGwge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtaW4td2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDU2cHg7XFxuICBib3JkZXItcmFkaXVzOiAyOHB4O1xcbn1cXG5cXG4uYS1idXR0b24uZi1pY29uIHtcXG4gIG1pbi13aWR0aDogYXV0bztcXG4gIG1pbi1oZWlnaHQ6IGF1dG87XFxuICB3aWR0aDogYXV0bztcXG4gIGhlaWdodDogNDBweDtcXG4gIGxpbmUtaGVpZ2h0OiA0MHB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDA7XFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XFxufVxcbi5hLWJ1dHRvbi5mLWljb246Zm9jdXMsIC5hLWJ1dHRvbi5mLWljb246aG92ZXIsIC5hLWJ1dHRvbi5mLWljb246YWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xNSk7XFxufVxcblxcbi5hLWJ1dHRvbi5mLWljb24uZi1hcnJvdy1iYWNrIHtcXG4gIHdpZHRoOiA0OHB4O1xcbiAgaGVpZ2h0OiA0OHB4O1xcbiAgbWFyZ2luOiAwO1xcbiAgbWFyZ2luLXJpZ2h0OiA0cHg7XFxuICBwYWRkaW5nOiA4cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDA7XFxufVxcblxcbi5hLWJ1dHRvbi5mLWljb24uZi1mb290ZXIge1xcbiAgZmxleDogMTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDc2MzJDO1xcbn1cXG4uYS1idXR0b24uZi1pY29uLmYtZm9vdGVyOmhvdmVyLCAuYS1idXR0b24uZi1pY29uLmYtZm9vdGVyOmZvY3VzIHtcXG4gIG9wYWNpdHk6IDE7XFxufVxcbi5hLWJ1dHRvbi5mLWljb24uZi1mb290ZXIuZi1zZWxlY3RlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDU0NTIwO1xcbn1cXG5cXG4uYS1idXR0b24uZi1pY29uLmYtZm9vdGVyLmYtYmlnLCAuYS1idXR0b24uZi1pY29uLmYtZm9vdGVyLm0tYmFubmVyLmYtcGFuZWwge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuLmEtYnV0dG9uLmYtaWNvbi5mLWZvb3Rlci5mLWJpZy5mLXNlbGVjdGVkIHNwYW4sIC5hLWJ1dHRvbi5mLWljb24uZi1mb290ZXIuZi1zZWxlY3RlZC5tLWJhbm5lci5mLXBhbmVsIHNwYW4ge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHJvdGF0ZS1jZW50ZXIgMC42cyBlYXNlLWluLW91dCBib3RoO1xcbiAgYW5pbWF0aW9uOiByb3RhdGUtY2VudGVyIDAuNnMgZWFzZS1pbi1vdXQgYm90aDtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHJvdGF0ZS1jZW50ZXIge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDApO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgcm90YXRlLWNlbnRlciB7XFxuICAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMCk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gIH1cXG59XFxuLmYtaWNvbi1pbnNpZGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5hLWJ1dHRvbi5mLWljb24uZi1taW5pbWFsIHtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG59XFxuXFxuLmEtYnV0dG9uLmYtaWNvbi5mLXNpemUtMzYge1xcbiAgaGVpZ2h0OiA0NnB4O1xcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG59XFxuXFxuLmEtYnV0dG9uLmYtbG9hZGluZy5mLXByaW1hcnksIC5hLWJ1dHRvbi5mLWxvYWRpbmcuZi1wcmltYXJ5OmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDcsIDk5LCA0NCwgMC41KTtcXG59XFxuLmEtYnV0dG9uLmYtbG9hZGluZy5mLXNlY29uZGFyeSwgLmEtYnV0dG9uLmYtbG9hZGluZy5mLXNlY29uZGFyeTpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDcsIDk5LCA0NCwgMC41KTtcXG59XFxuXFxuLmEtYnV0dG9uLmYtbWVudSB7XFxuICB3aWR0aDogYXV0bztcXG4gIGhlaWdodDogNDJweDtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTIxMjEyO1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcbi5hLWJ1dHRvbi5mLW1lbnU6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEyMTIxMjtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG4uYS1idXR0b24uZi1wcmltYXJ5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwNzYzMkM7XFxuICBib3JkZXI6IG5vbmU7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgY29sb3I6ICNmYWZhZmE7XFxufVxcbi5hLWJ1dHRvbi5mLXByaW1hcnk6Zm9jdXMge1xcbiAgYmFja2dyb3VuZDogIzA1NDUyMDtcXG59XFxuXFxuLmEtYnV0dG9uLmYtc2Vjb25kYXJ5IHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBjb2xvcjogI2ZhZmFmYTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4uYS1idXR0b24uZi1zZWNvbmRhcnk6Zm9jdXMge1xcbiAgb3BhY2l0eTogMC43NjtcXG59XFxuXFxuLmEtYnV0dG9uLXRyYW5zcGFyZW50IHtcXG4gIHdpZHRoOiAxNTBweDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBoZWlnaHQ6IDMycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjZmFmYWZhO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogMnB4IDJweDtcXG4gIGJvcmRlcjogc29saWQgdHJhbnNwYXJlbnQgMXB4O1xcbiAgbWFyZ2luOiA1cHg7XFxufVxcbi5hLWJ1dHRvbi10cmFuc3BhcmVudDpob3ZlciB7XFxuICBib3JkZXI6IHNvbGlkICNmYWZhZmEgMXB4O1xcbn1cXG4uYS1idXR0b24tdHJhbnNwYXJlbnQ6ZGlzYWJsZWQge1xcbiAgY29sb3I6IHJnYmEoMjUwLCAyNTAsIDI1MCwgMC4zOCk7XFxuICBib3JkZXI6IHNvbGlkIDFweCB0cmFuc3BhcmVudDtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcblxcbi5hLWNoZWNrYm94IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuXFxuLmEtY2hpcCB7XFxuICB3aWR0aDogMjhweDtcXG4gIGhlaWdodDogMTdweDtcXG4gIGJhY2tncm91bmQ6ICM1ODIxODc7XFxuICBjb2xvcjogI2ZhZmFmYTtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbGluZS1oZWlnaHQ6IDE0cHg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4xNXB4O1xcbn1cXG5cXG4uYS1jb3Zlci5mLW1lbnUuZi1zaG93IHtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNSk7XFxufVxcblxcbi5hLWNvdmVyLmYtbWVudSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICB6LWluZGV4OiAzOTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgdHJhbnNpdGlvbjogMC41cyB2aXNpYmlsaXR5LCAwLjVzIGJhY2tncm91bmQtY29sb3I7XFxufVxcblxcbi5hLWZpZWxkIHtcXG4gIHdpZHRoOiBhdXRvO1xcbiAgaGVpZ2h0OiA1NnB4O1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1MCwgMjUwLCAyNTAsIDAuNSk7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgcGFkZGluZzogMTVweDtcXG4gIHBhZGRpbmctdG9wOiAxNnB4O1xcbiAgcGFkZGluZy1ib3R0b206IDE0cHg7XFxuICBtYXJnaW46IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG4uYS1maWVsZDpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcbi5hLWZpZWxkOmZvY3VzLCAuYS1maWVsZDpmb2N1cy13aXRoaW4sIC5hLWZpZWxkLmYtY29ycmVjdCwgLmEtZmllbGQuZi1lcnJvciwgLmEtZmllbGQuYS1tZXNzYWdlLmYtdGFibGUuZi1lcnJvciB7XFxuICBwYWRkaW5nOiAxNHB4O1xcbiAgcGFkZGluZy10b3A6IDE1cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMTNweDtcXG4gIGJvcmRlci13aWR0aDogMnB4O1xcbn1cXG4uYS1maWVsZDpmb2N1cywgLmEtZmllbGQ6Zm9jdXMtd2l0aGluIHtcXG4gIGJvcmRlci1jb2xvcjogIzA3NjMyQztcXG59XFxuLmEtZmllbGQuZi1lcnJvciwgLmEtZmllbGQuYS1tZXNzYWdlLmYtdGFibGUuZi1lcnJvciwgLmEtZmllbGQuZi1jb3JyZWN0IHtcXG4gIHBhZGRpbmctcmlnaHQ6IDUycHg7XFxufVxcbi5hLWZpZWxkLmYtY29ycmVjdCB7XFxuICBib3JkZXItY29sb3I6ICMwNzYzMkM7XFxufVxcbi5hLWZpZWxkW3R5cGU9ZGF0ZV06Oi13ZWJraXQtY2FsZW5kYXItcGlja2VyLWluZGljYXRvciwgLmEtZmllbGRbdHlwZT1kYXRldGltZS1sb2NhbF06Oi13ZWJraXQtY2FsZW5kYXItcGlja2VyLWluZGljYXRvciB7XFxuICBmaWx0ZXI6IGludmVydCgxKTtcXG59XFxuXFxuLmEtZmllbGQuZi1lcnJvciwgLmEtZmllbGQuYS1tZXNzYWdlLmYtdGFibGUuZi1lcnJvciB7XFxuICBwYWRkaW5nOiAxNHB4O1xcbiAgcGFkZGluZy10b3A6IDE1cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMTNweDtcXG4gIGJvcmRlci13aWR0aDogMnB4O1xcbiAgYm9yZGVyLWNvbG9yOiAjZWUxYzI1O1xcbn1cXG5cXG4uYS1maWVsZC5mLXNlbGVjdCB7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4uYS1maWVsZC5mLXRleHRhcmVhIHtcXG4gIG1pbi1oZWlnaHQ6IDgwcHg7XFxuICByZXNpemU6IG5vbmU7XFxufVxcblxcbi5hLWljb24ge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29uc1xcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgd2lkdGg6IDI0cHg7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcXG4gIHdvcmQtd3JhcDogbm9ybWFsO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIGRpcmVjdGlvbjogbHRyO1xcbiAgLyogU3VwcG9ydCBmb3IgYWxsIFdlYktpdCBicm93c2Vycy4gKi9cXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgLyogU3VwcG9ydCBmb3IgU2FmYXJpIGFuZCBDaHJvbWUuICovXFxuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcbiAgLyogU3VwcG9ydCBmb3IgRmlyZWZveC4gKi9cXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICAvKiBTdXBwb3J0IGZvciBJRS4gKi9cXG4gIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogXFxcImxpZ2FcXFwiO1xcbn1cXG5cXG4uYS1pY29uLmYtYWN0aXZlLXBvaW50IHtcXG4gIGNvbG9yOiAjMDc2MzJDO1xcbn1cXG5cXG4uZi1jbG9jayB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IDJweDtcXG4gIG1hcmdpbi1yaWdodDogOHB4O1xcbn1cXG5cXG4uYS1pY29uLmYtY2xvc2UtcG9wdXAuZi1tYXAge1xcbiAgdG9wOiA0cHg7XFxuICByaWdodDogNHB4O1xcbn1cXG5cXG4uYS1pY29uLmYtY2xvc2UtcG9wdXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA4cHg7XFxuICByaWdodDogOHB4O1xcbiAgei1pbmRleDogMTA7XFxufVxcblxcbi5hLWljb24uZi1kaXNhYmxlZC1wb2ludCB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi5hLWljb24uZi1maXJzdC1jYXRlZ29yeSB7XFxuICBjb2xvcjogI2VlMWMyNTtcXG59XFxuXFxuLmEtaWNvbi5mLWZvb3RlciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG59XFxuXFxuLmEtaWNvbi5mLWZvb3Rlci5mLWJpZywgLmEtaWNvbi5mLWZvb3Rlci5tLWJhbm5lci5mLXBhbmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiA2MHB4O1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgZm9udC1zaXplOiA0OHB4O1xcbiAgbGluZS1oZWlnaHQ6IDQ2cHg7XFxuICBwYWRkaW5nLXRvcDogNnB4O1xcbiAgbWFyZ2luLXRvcDogLTI4cHg7XFxuICBtYXJnaW4tYm90dG9tOiAtMXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1ODIxODc7XFxufVxcblxcbi5hLWljb24uZi1mdXR1cmUtcG9pbnQge1xcbiAgY29sb3I6ICMwNzYzMkM7XFxufVxcblxcbi5hLWljb24uZi1oZWFkZXIge1xcbiAgbWFyZ2luLWxlZnQ6IDVweDtcXG59XFxuXFxuLmEtaWNvbi5mLWlucHV0IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMnB4O1xcbiAgcmlnaHQ6IDJweDtcXG4gIHdpZHRoOiA1MnB4O1xcbiAgaGVpZ2h0OiA1MnB4O1xcbiAgcGFkZGluZzogMTNweDtcXG4gIGZvbnQtc2l6ZTogMjZweDtcXG59XFxuXFxuLmEtaWNvbi5mLWlucHV0LmYtY29ycmVjdCB7XFxuICBjb2xvcjogIzA3NjMyQztcXG59XFxuXFxuLmEtaWNvbi5mLWlucHV0LmYtZXJyb3Ige1xcbiAgY29sb3I6ICNlZTFjMjU7XFxufVxcblxcbi5hLWljb24uZi1saXN0IHtcXG4gIG1hcmdpbjogNnB4O1xcbiAgbWFyZ2luLXRvcDogNHB4O1xcbn1cXG5cXG4uYS1pY29uLmYtbWVudSB7XFxuICB3aWR0aDogNDBweDtcXG4gIGhlaWdodDogNTZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciBlYXNlLWluLW91dCAwLjVzO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbGluZS1oZWlnaHQ6IDU2cHg7XFxuICBmb250LXNpemU6IDI2cHg7XFxuICBtYXJnaW4tbGVmdDogOHB4O1xcbn1cXG4uYS1pY29uLmYtbWVudS5mLXNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1ODIxODc7XFxufVxcblxcbi5hLWljb24uZi1zZWNvbmQtY2F0ZWdvcnkge1xcbiAgY29sb3I6ICMwRjlFRUQ7XFxufVxcblxcbi5hLWljb24uZi1zbmFja2JhciB7XFxuICBtYXJnaW46IDEycHg7XFxufVxcblxcbi5hLWljb24uZi10aGlyZC1jYXRlZ29yeSB7XFxuICBjb2xvcjogI0YxQUI2ODtcXG59XFxuXFxuLmEtaW1nLmYtbG9hZGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAzMnB4O1xcbiAgaGVpZ2h0OiAzMnB4O1xcbiAgYW5pbWF0aW9uOiBhbmltYXRpb24tbG9hZGVyIDIuNHMgY3ViaWMtYmV6aWVyKDAsIDAuMiwgMC44LCAxKSBpbmZpbml0ZTtcXG59XFxuXFxuQGtleWZyYW1lcyBhbmltYXRpb24tbG9hZGVyIHtcXG4gIDAlLCAxMDAlIHtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNSwgMCwgMSwgMC41KTtcXG4gIH1cXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpO1xcbiAgfVxcbiAgNTAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKDE4MDBkZWcpO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMCwgMC41LCAwLjUsIDEpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWSgzNjAwZGVnKTtcXG4gIH1cXG59XFxuLmEtaW1nLmYtbG9hZGVyLmYtYmlnLCAuYS1pbWcuZi1sb2FkZXIubS1iYW5uZXIuZi1wYW5lbCB7XFxuICB3aWR0aDogODZweDtcXG4gIGhlaWdodDogODZweDtcXG59XFxuXFxuLmEtaW1nLmYtbG9hZGVyLmYtZmlsbCB7XFxuICB3aWR0aDogNTJweDtcXG4gIGhlaWdodDogNTJweDtcXG59XFxuXFxuLmEtaW1nLmYtbWFwLXJvdW5kIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDE4MHB4O1xcbiAgaGVpZ2h0OiAxODBweDtcXG4gIG1hcmdpbjogMjRweCBhdXRvO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIvaW1nL0hhcmNfbWFwYS5wbmdcXFwiKTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IC0zMTVweCAtNzBweDtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxufVxcblxcbi5hLWltZy5mLXBhbmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDI1MHB4O1xcbiAgbWFyZ2luOiAwO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogYXV0byAxMDAlO1xcbn1cXG5cXG4uYS1pbnB1dCB7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuXFxuLmEtZmllbGQuZi1pY29uIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDUzcHg7XFxufVxcbi5hLWZpZWxkLmYtaWNvbjpmb2N1cywgLmEtZmllbGQuZi1pY29uLmYtZmlsbGVkIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDUycHg7XFxufVxcblxcbi5hLWlucHV0LmYtc2VsZWN0IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgcGFkZGluZy10b3A6IDE2cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMTRweDtcXG59XFxuLmEtaW5wdXQuZi1zZWxlY3Q6Zm9jdXMsIC5hLWlucHV0LmYtc2VsZWN0LmYtY29ycmVjdCwgLmEtaW5wdXQuZi1zZWxlY3QuZi1lcnJvciB7XFxuICBvcGFjaXR5OiAxO1xcbiAgcGFkZGluZzogMTRweDtcXG4gIHBhZGRpbmctdG9wOiAxNXB4O1xcbiAgcGFkZGluZy1ib3R0b206IDEzcHg7XFxufVxcblxcbi5hLWxhYmVsLmYtYnV0dG9uLWljb24tZm9vdGVyIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XFxufVxcblxcbi5hLWxhYmVsLmYtZmllbGQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxN3B4O1xcbiAgbGVmdDogMTJweDtcXG4gIHBhZGRpbmc6IDAgNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICB0cmFuc2l0aW9uLXByb3BlcnR5OiBhbGw7XFxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAyMDBtcztcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMjEyMTI7XFxuICBjb2xvcjogcmdiYSgyNTAsIDI1MCwgMjUwLCAwLjcpO1xcbn1cXG5cXG4uYS1maWVsZDpmb2N1cyB+IC5hLWxhYmVsLmYtZmllbGQsIC5hLWZpZWxkOmZvY3VzLXdpdGhpbiB+IC5hLWxhYmVsLmYtZmllbGQsIC5hLWZpZWxkLmYtZmlsbGVkIH4gLmEtbGFiZWwuZi1maWVsZCB7XFxuICB0b3A6IC03cHg7XFxuICBsZWZ0OiAxM3B4O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XFxufVxcbi5hLWZpZWxkOmZvY3VzIH4gLmEtbGFiZWwuZi1maWVsZCwgLmEtZmllbGQ6Zm9jdXMtd2l0aGluIH4gLmEtbGFiZWwuZi1maWVsZCB7XFxuICBjb2xvcjogcmdiYSgyNTAsIDI1MCwgMjUwLCAwLjcpO1xcbn1cXG4uYS1maWVsZDpmb2N1cyB+IC5hLWxhYmVsLmYtZmllbGQuZi1jb3JyZWN0IHtcXG4gIGNvbG9yOiAjMDc2MzJDO1xcbn1cXG4uYS1maWVsZC5mLWNvcnJlY3QgfiAuYS1sYWJlbC5mLWZpZWxkLmYtY29ycmVjdCB7XFxuICBjb2xvcjogIzA3NjMyQztcXG59XFxuXFxuLmEtZmllbGQ6Zm9jdXMgfiAuYS1sYWJlbC5mLWZpZWxkLmYtZXJyb3IsIC5hLWZpZWxkLmYtZXJyb3IgfiAuYS1sYWJlbC5mLWZpZWxkLmYtZXJyb3Ige1xcbiAgY29sb3I6ICNlZTFjMjU7XFxufVxcblxcbi5hLWxhYmVsLmYtc2VsZWN0IHtcXG4gIG1hcmdpbjogMTVweDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbn1cXG5cXG4uYS1saW5rIHtcXG4gIGNvbG9yOiAjZmFmYWZhO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLmEtbGluay5mLW1lbnUuZi1zZWxlY3RlZCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGNvbG9yOiAjZmFmYWZhO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg4OCwgMzMsIDEzNSwgMC4zKTtcXG59XFxuXFxuLmEtbGluay5mLW1lbnUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBjb2xvcjogcmdiYSgyNTAsIDI1MCwgMjUwLCAwLjcpO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgbGluZS1oZWlnaHQ6IDU4cHg7XFxuICBoZWlnaHQ6IDU2cHg7XFxuICBmb250LXNpemU6IDE2cHg7XFxufVxcblxcbi5hLWxpc3QtdGlsZSB7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIHRleHQtYWxpZ246IHN0YXJ0O1xcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLmEtbG9hZGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWigxcHgpO1xcbn1cXG5cXG4uYS1sb2dvIHtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDJweDtcXG59XFxuXFxuLmEtbG9nby5mLWJpZywgLmEtbG9nby5tLWJhbm5lci5mLXBhbmVsIHtcXG4gIHBhZGRpbmctYm90dG9tOiAxNHB4O1xcbn1cXG5cXG4uYS1tZXNzYWdlLmYtZXJyb3IsIC5hLW1lc3NhZ2UuZi10YWJsZS5mLWVycm9yIHtcXG4gIGNvbG9yOiAjZWUxYzI1O1xcbn1cXG5cXG4uYS1tZXNzYWdlLmYtdGFibGUge1xcbiAgY29sb3I6IHJnYmEoMjUwLCAyNTAsIDI1MCwgMC43KTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4uYS1vcHRpb24ge1xcbiAgcGFkZGluZzogMTZweDtcXG4gIGxpbmUtaGVpZ2h0OiAxNnB4O1xcbn1cXG5cXG4uYS1vcHRpb24uZi1wb2ludGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNywgOTksIDQ0LCAwLjIpO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5hLW9wdGlvbi5mLXNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNywgOTksIDQ0LCAwLjIpO1xcbn1cXG5cXG4uYS1yYWRpbyB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwYWRkaW5nOiAzcHggNXB4O1xcbn1cXG4uYS1yYWRpbyBpbnB1dCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IDJweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcbn1cXG5cXG4uYS1zZWxlY3Qge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjUwLCAyNTAsIDI1MCwgMC41KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXJhZGl1czogdW5zZXQ7XFxuICB3aWR0aDogMzAwcHg7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBjb2xvcjogI2ZhZmFmYTtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJveC1zaGFkb3c6IHVuc2V0O1xcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc2VyaWY7XFxuICBhbGlnbi1pdGVtczogdW5zZXQ7XFxuICBwYWRkaW5nLXRvcDogMTVweDtcXG4gIHBhZGRpbmctbGVmdDogOHB4O1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIHotaW5kZXg6IDEwO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYS1zZWxlY3Q6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLmEtc2VsZWN0OmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLmEtYXNzaXN0IHtcXG4gIGhlaWdodDogMzJweDtcXG4gIHBhZGRpbmc6IDRweCAwO1xcbiAgcGFkZGluZy1sZWZ0OiAxNnB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XFxufVxcblxcbi5hLXRleHQuZi1zdHJvbmcsIC5tLWJveC5mLXBhbmVsLCAuZi1zdHJvbmcubS1iYW5uZXIuZi1wYW5lbCB7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjI1cHg7XFxufVxcblxcbi5hLXN1YnRpdGxlIHtcXG4gIGxpbmUtaGVpZ2h0OiAyOHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xcbiAgY29sb3I6ICNmYWZhZmE7XFxufVxcblxcbi5hLXRleHQuZi1zdWJ0aXRsZS5mLW1lbnUsIC5mLXN1YnRpdGxlLmYtbWVudS5tLWJveC5mLXBhbmVsLCAuZi1zdWJ0aXRsZS5mLW1lbnUubS1iYW5uZXIuZi1wYW5lbCB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xcbiAgcGFkZGluZzogOHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxNnB4O1xcbiAgcGFkZGluZy1ib3R0b206IDI0cHg7XFxuICBjb2xvcjogcmdiYSgyNTAsIDI1MCwgMjUwLCAwLjcpO1xcbn1cXG5cXG4uYS10ZXh0LmYtc3VidGl0bGUuZi1zdGFydCwgLmYtc3VidGl0bGUuZi1zdGFydC5tLWJveC5mLXBhbmVsLCAuZi1zdWJ0aXRsZS5mLXN0YXJ0Lm0tYmFubmVyLmYtcGFuZWwge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBsaW5lLWhlaWdodDogMjBweDtcXG4gIGNvbG9yOiByZ2JhKDI1MCwgMjUwLCAyNTAsIDAuNik7XFxufVxcblxcbi5hLXRpdGxlIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgcGFkZGluZzogMTZweCAwO1xcbn1cXG5cXG4uYS10ZXh0LmYtdGl0bGUuZi1iaWcsIC5mLXRpdGxlLmYtYmlnLm0tYm94LmYtcGFuZWwsIC5hLXRleHQuZi10aXRsZS5tLWJhbm5lci5mLXBhbmVsLCAuZi10aXRsZS5tLWJhbm5lci5mLXBhbmVsLm0tYm94LCAuZi1iaWcubS1iYW5uZXIuZi1wYW5lbCwgLm0tYmFubmVyLmYtcGFuZWwge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyOHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xcbiAgY29sb3I6ICNmYWZhZmE7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgcGFkZGluZzogMTRweCAxNnB4O1xcbn1cXG5cXG4uYS10ZXh0LmYtdGl0bGUuZi1tZW51LCAuZi10aXRsZS5mLW1lbnUubS1ib3guZi1wYW5lbCwgLmYtbWVudS5tLWJhbm5lci5mLXBhbmVsIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgbGluZS1oZWlnaHQ6IDIycHg7XFxuICBwYWRkaW5nOiAwO1xcbiAgcGFkZGluZy1sZWZ0OiAxNnB4O1xcbiAgcGFkZGluZy10b3A6IDE2cHg7XFxufVxcblxcbi5hLXZlcnNpb24ge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgcmlnaHQ6IDhweDtcXG4gIGJvdHRvbTogNjBweDtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG59XFxuXFxuLm0tYXJlYS5mLWJ1dHRvbi5mLWZpbGwge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4ubS1hcmVhLmYtYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBhZGRpbmc6IDZweDtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgbWFyZ2luLXRvcDogMTZweDtcXG59XFxuXFxuLm0tYmFubmVyLW1hcCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiAxMDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1pbi13aWR0aDogOTJweDtcXG4gIGhlaWdodDogODBweDtcXG4gIHBhZGRpbmc6IDE2cHg7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNik7XFxuICBjb2xvcjogI2ZhZmFmYTtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLm0tYmFubmVyLXRpbWVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDEwO1xcbiAgbGVmdDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcGFkZGluZzogNHB4IDhweDtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG4gIGNvbG9yOiAjZmFmYWZhO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4ubS1iYW5uZXItbWFwLmYtbWVzc2FnZS1zdWNjZXNzIHtcXG4gIGhlaWdodDogNTZweDtcXG4gIGJhY2tncm91bmQ6IHJnYmEoNywgOTksIDQ0LCAwLjUpO1xcbiAgY29sb3I6ICNmYWZhZmE7XFxufVxcblxcbi5tLWJhbm5lci5mLXBhbmVsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoODgsIDMzLCAxMzUsIDAuMyk7XFxufVxcblxcbi5tLWJveC5mLXBhbmVsIHtcXG4gIGhlaWdodDogNTZweDtcXG4gIHBhZGRpbmc6IDE2cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTgyMTg3O1xcbiAgY29sb3I6IHJnYmEoMjUwLCAyNTAsIDI1MCwgMC43KTtcXG59XFxuXFxuLm0tY2xvY2sge1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjUwLCAyNTAsIDI1MCwgMC4yKTtcXG59XFxuXFxuLm0tY29sbGVjdGlvbi5mLWJ1dHRvbiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5tLWNvdW50ZG93bi10aW1lci13YXJuaW5nIHtcXG4gIGNvbG9yOiByZWQ7XFxufVxcblxcbi5tLWNvdW50ZG93bi10aW1lciB7XFxuICBjb2xvcjogI2ZhZmFmYTtcXG59XFxuXFxuLm0tY292ZXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogOTA7XFxufVxcblxcbi5tLWNvdmVyLmYtcG9wdXAge1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgb3ZlcmZsb3cteTogYXV0bztcXG59XFxuXFxuLm0tZ3JpZCwgLm0tcm93LmYtaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbi5tLWdyaWQuZi1jYXRlZ29yeS1zdW0sIC5mLWNhdGVnb3J5LXN1bS5tLXJvdy5mLWhlYWRlciB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDgwcHggMTI4cHggMTIwcHg7XFxufVxcblxcbi5tLWdyaWQuZi1jb2xsZWN0ZWQtcG9pbnRzLCAuZi1jb2xsZWN0ZWQtcG9pbnRzLm0tcm93LmYtaGVhZGVyIHtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgyNTAsIDI1MCwgMjUwLCAwLjIpO1xcbn1cXG4ubS1ncmlkLmYtY29sbGVjdGVkLXBvaW50czpsYXN0LWNoaWxkLCAuZi1jb2xsZWN0ZWQtcG9pbnRzLm0tcm93LmYtaGVhZGVyOmxhc3QtY2hpbGQge1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjUwLCAyNTAsIDI1MCwgMC4yKTtcXG59XFxuXFxuLm0tZ3JpZC5mLXBvaW50LCAuZi1wb2ludC5tLXJvdy5mLWhlYWRlciB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHggNjBweCA4OHB4IDgwcHggNzBweDtcXG59XFxuXFxuLm0tZ3JpZC5mLXNjb3JlLCAuZi1zY29yZS5tLXJvdy5mLWhlYWRlciB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDE3MHB4IDg4cHggNzBweDtcXG59XFxuXFxuLm0tZ3JpZC5mLXNlYXJjaC1wb2ludCwgLmYtc2VhcmNoLXBvaW50Lm0tcm93LmYtaGVhZGVyIHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCA1MHB4IDIxNnB4IDQwcHg7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgyNTAsIDI1MCwgMjUwLCAwLjIpO1xcbn1cXG4ubS1ncmlkLmYtc2VhcmNoLXBvaW50Om50aC1jaGlsZCgxKSwgLmYtc2VhcmNoLXBvaW50Lm0tcm93LmYtaGVhZGVyOm50aC1jaGlsZCgxKSB7XFxuICBib3JkZXItdG9wOiBub25lO1xcbn1cXG5cXG4ubS1ncmlkLmYtc3BsaXQtMiwgLmYtc3BsaXQtMi5tLXJvdy5mLWhlYWRlciB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCA1MCUpO1xcbn1cXG5cXG4ubS1ncmlkLmYtc3BsaXQtMywgLmYtc3BsaXQtMy5tLXJvdy5mLWhlYWRlciB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAzMy4zMzMzMzMzMzMzJSk7XFxufVxcblxcbi5tLWdyaWQuZi10ZW1wb3JhcnktcG9pbnRzLCAuZi10ZW1wb3JhcnktcG9pbnRzLm0tcm93LmYtaGVhZGVyIHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNDBweCAxZnIgNDBweDtcXG4gIGp1c3RpZnktaXRlbXM6IGxlZnQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMjUwLCAyNTAsIDI1MCwgMC4yKTtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLm0taW5wdXQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xcbn1cXG5cXG4ubS1saXN0LWVsZW1lbnQuZi1wb3B1cCB7XFxuICBtaW4taGVpZ2h0OiAzMnB4O1xcbiAgcGFkZGluZzogMCA4cHg7XFxuICBsaW5lLWhlaWdodDogMTZweDtcXG4gIGNvbG9yOiAjZmFmYWZhO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5tLWxpc3QtZWxlbWVudC5mLXBvcHVwOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoODgsIDMzLCAxMzUsIDAuMyk7XFxufVxcblxcbi5tLXBvaW50ZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdG9wOiBjYWxjKDUwdmggLSAxNnB4IC8gMik7XFxuICBsZWZ0OiBjYWxjKDUwJSAtIDE2cHggLyAyKTtcXG4gIHdpZHRoOiAxNnB4O1xcbiAgaGVpZ2h0OiAxNnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLm0tcG9pbnRlcjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IGNhbGMoKDE2cHggLSA0cHggLSAycHgpIC8gMik7XFxuICBsZWZ0OiBjYWxjKC01MHZ3ICsgKDEycHgpIC8gMik7XFxuICB6LWluZGV4OiAtMTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAycHg7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNik7XFxufVxcbi5tLXBvaW50ZXI6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiBjYWxjKCgxNnB4IC0gNHB4IC0gMnB4KSAvIDIpO1xcbiAgdG9wOiBjYWxjKC01MHZoICsgNHB4ICsgMnB4KTtcXG4gIHotaW5kZXg6IC0xO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMnB4O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG59XFxuXFxuLm0tb3B0aW9ucyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiBjYWxjKDEwMCUgKyAxcHggLSAzMnB4KTtcXG4gIHJpZ2h0OiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEyMTIxMjtcXG4gIGNvbG9yOiAjZmFmYWZhO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYm94LXNoYWRvdzogMCA1cHggNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDhweCAxMHB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwIDNweCAxNHB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHotaW5kZXg6IDEwMDtcXG59XFxuXFxuLm0tb3B0aW9ucy5mLXRvcCB7XFxuICB0b3A6IGF1dG87XFxuICBib3R0b206IGNhbGMoMTAwJSArIDZweCk7XFxufVxcblxcbi5tLXBhbmVsLmYtaGVhZGVyLmYtc2lkZSB7XFxuICB3aWR0aDogMzNweDtcXG59XFxuXFxuLm0tcGFuZWwuZi1zdGFydCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmQxMTQ1O1xcbn1cXG5cXG4ubS1yb3cuZi1oZWFkZXIge1xcbiAgY29sb3I6IHJnYmEoMjUwLCAyNTAsIDI1MCwgMC43KTtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDI1MCwgMjUwLCAyNTAsIDAuMik7XFxufVxcblxcbi5tLXNsaWRlIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgY29sb3I6ICNmYWZhZmE7XFxufVxcblxcbi5tLXNuYWNrYmFyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDhweDtcXG4gIHRvcDogNjRweDtcXG4gIHJpZ2h0OiA4cHg7XFxuICB6LWluZGV4OiA0OTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBsaW5lLWhlaWdodDogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBGOUVFRDtcXG4gIGNvbG9yOiAjZmFmYWZhO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xcbn1cXG5cXG4ubS1zbmFja2Jhci5mLWVycm9yLCAubS1zbmFja2Jhci5hLW1lc3NhZ2UuZi10YWJsZS5mLWVycm9yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZTFjMjU7XFxufVxcblxcbi5tLXNuYWNrYmFyLmYtc3VjY2VzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDc2MzJDO1xcbn1cXG5cXG4uby1mbG9hdC1jb250YWluZXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogMTUwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEyMTIxMjtcXG59XFxuXFxuLm8tZm9vdGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHotaW5kZXg6IDUwO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogNTZweDtcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzA1NDUyMDtcXG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCAjMDU0NTIwO1xcbiAgY29sb3I6ICNmYWZhZmE7XFxufVxcblxcbi5vLWhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGhlaWdodDogNTZweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBjb2xvcjogI2ZhZmFmYTtcXG4gIGJhY2tncm91bmQ6ICMwNzYzMkM7XFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzA1NDUyMDtcXG4gIHBhZGRpbmctbGVmdDogMTZweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDE2cHg7XFxufVxcblxcbi5vLWxvYWRpbmcge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiA1NnB4O1xcbiAgcGFkZGluZy10b3A6IDM2dmg7XFxuICB6LWluZGV4OiAxMDA7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDc2MzJDO1xcbn1cXG5cXG4uby1tYXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4uby1tZW51IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDQwO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMTAwJTtcXG4gIGJvdHRvbTogNTZweDtcXG4gIHdpZHRoOiA5MCU7XFxuICBwYWRkaW5nOiAxMHB4IDA7XFxuICBwYWRkaW5nLXRvcDogMDtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTIxMjEyO1xcbiAgY29sb3I6ICNmYWZhZmE7XFxuICB0cmFuc2l0aW9uOiAwLjVzIGxlZnQ7XFxuICBib3JkZXItbGVmdDogcmdiYSgyNTAsIDI1MCwgMjUwLCAwLjIpIDFweCBzb2xpZDtcXG4gIGJveC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbi5vLW1lbnUuZi1vcGVuIHtcXG4gIGxlZnQ6IDEwJTtcXG4gIGJveC1zaGFkb3c6IDAgNXB4IDVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCA4cHggMTBweCAxcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMCAzcHggMTRweCAycHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG59XFxuXFxuLm8tbmF2IHtcXG4gIGhlaWdodDogNjBweDtcXG59XFxuXFxuLm8tcG9wdXAge1xcbiAgd2lkdGg6IDI4MHB4O1xcbiAgYmFja2dyb3VuZDogIzA3NjMyQztcXG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC41KSAxcHggMXB4IDNweCAxcHg7XFxuICBtYXJnaW46IDMydmggYXV0byAwIGF1dG87XFxuICBwYWRkaW5nOiA1NnB4IDMycHggNDhweCAzMnB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICNmYWZhZmE7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuXFxuLm8tcG9wdXAuZi1tYXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDI0MHB4O1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogOHB4IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTIxMjEyO1xcbiAgY29sb3I6ICNmYWZhZmE7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBib3JkZXI6IHNvbGlkIDFweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICBib3gtc2hhZG93OiAwIDFweCA2cHggcmdiYSg2MCwgNjQsIDY3LCAwLjI4KTtcXG59XFxuXFxuLm8tcG9wdXAuZi1zY29yZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA4cHg7XFxuICB0b3A6IGNhbGMoNTZweCArIDhweCk7XFxuICByaWdodDogOHB4O1xcbiAgd2lkdGg6IGF1dG87XFxuICBtaW4taGVpZ2h0OiAyMDBweDtcXG4gIHBhZGRpbmc6IDhweDtcXG4gIG1hcmdpbjogMDtcXG4gIGJhY2tncm91bmQ6ICMxMjEyMTI7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogI2ZhZmFmYTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbn1cXG5cXG4udC1iYXNlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEyMTIxMjtcXG59XFxuXFxuLnQtcGFnZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTIxMjEyO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxuICBwYWRkaW5nOiAxNnB4IDE2cHg7XFxufVxcblxcbi50LXBhZ2UuZi1tYXAge1xcbiAgcGFkZGluZzogMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG59XFxuXFxuLmRhcmstbWFwLWxheWVyIHtcXG4gIGZpbHRlcjogaW52ZXJ0KDEwMCUpIHNlcGlhKDEwMCUpIHNhdHVyYXRlKDAlKSBicmlnaHRuZXNzKDEwMCUpIGNvbnRyYXN0KDEwMCUpO1xcbn1cXG5cXG4ub2wtem9vbSB7XFxuICBsZWZ0OiB1bnNldCAhaW1wb3J0YW50O1xcbiAgcmlnaHQ6IDhweDtcXG4gIHRvcDogdW5zZXQgIWltcG9ydGFudDtcXG4gIGJvdHRvbTogNTBweDtcXG59XFxuXFxuLm9sLWNvbnRyb2wge1xcbiAgYm9yZGVyLXJhZGl1czogMCAhaW1wb3J0YW50O1xcbiAgcGFkZGluZzogMXB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5vbC1jb250cm9sIGJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDg4LCAzMywgMTM1LCAwLjUpICFpbXBvcnRhbnQ7XFxuICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcXG4gIGJvcmRlci1yYWRpdXM6IDAgIWltcG9ydGFudDtcXG59XCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcbiIsIi8vIEltcG9ydHNcbnZhciBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKTtcbmV4cG9ydHMgPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIl0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwic3Ryb2tlXCI6IFwiIzAwMDAwMFwiLFxuXHRcImRhbmdlclwiOiBcIiNlZTFjMjVcIixcblx0XCJ3YXJuaW5nXCI6IFwiI0YxQUI2OFwiLFxuXHRcImluZm9cIjogXCIjMEY5RUVEXCJcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4iLCIvLyBJbXBvcnRzXG52YXIgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIik7XG5leHBvcnRzID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbmV4cG9ydHMubG9jYWxzID0ge1xuXHRcInN0cm9rZVwiOiBcIiMwMDAwMDBcIixcblx0XCJkYW5nZXJcIjogXCIjZWUxYzI1XCIsXG5cdFwid2FybmluZ1wiOiBcIiNGMUFCNjhcIixcblx0XCJpbmZvXCI6IFwiIzBGOUVFRFwiXG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuIiwiLy8gSW1wb3J0c1xudmFyIF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpO1xuZXhwb3J0cyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5mYWRlLWVudGVyLWFjdGl2ZSwgLmZhZGUtbGVhdmUtYWN0aXZlIHtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcztcXG59XFxuXFxuLmZhZGUtZW50ZXIsIC5mYWRlLWxlYXZlLXRvIHtcXG4gIG9wYWNpdHk6IDA7XFxufVxcblxcbi5zbGlkZXItcGFnaW5hdGlvbi1idWxsZXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjNGM0YyAhaW1wb3J0YW50O1xcbiAgb3BhY2l0eTogMC4zICFpbXBvcnRhbnQ7XFxufVxcblxcbi5zd2lwZXItY29udGFpbmVyLWhvcml6b250YWwgLnNsaWRlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUsIC5zd2lwZXItY29udGFpbmVyLXZlcnRpY2FsIC5zbGlkZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0YzRjNGMgIWltcG9ydGFudDtcXG4gIG9wYWNpdHk6IDEgIWltcG9ydGFudDtcXG59XFxuXFxuLmEtaW5wdXQuZi1zZWxlY3QsIC5hLWZpZWxkIHtcXG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IGFsbDtcXG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDIwMG1zO1xcbn1cXG5cXG4udC1iYXNlLCBib2R5IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG59XFxuXFxuaHRtbCB7XFxuICBvdmVyZmxvdy15OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xcbn1cXG5cXG5ib2R5IHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxuICBmb250LWZhbWlseTogUm9ib3RvLCBzYW5zLXNlcmlmO1xcbiAgY29sb3I6ICM0YzRjNGM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xcbn1cXG5cXG4qIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbi5mLWJvbGQge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5mLWRpc3BsYXktbm9uZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uZi1oaWRkZW4ge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4uZi12aXNpYmxlIHtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblxcbi5mLWRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLmYtbGlzdC1kaXNjIHtcXG4gIGxpc3Qtc3R5bGU6IGRpc2M7XFxufVxcblxcbi5mLWN1cnNvci1wb2ludGVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLmYtY3Vyc29yLWRlZmF1bHQge1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uZi1ibG9jayB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLmYtaW5saW5lLWJsb2NrIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuXFxuLmYtZmxleCwgLm0tcGFuZWwuZi1zdGFydCwgLm0tcGFuZWwuZi1oZWFkZXIsIC5tLWxpc3QtZWxlbWVudC5mLXBvcHVwLCAubS1jbG9jaywgLmEtbGlzdC10aWxlLCAuYS1saW5rLmYtbWVudSB7XFxuICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLWZsZXgtMSwgLmEtbGlzdC10aWxlIHtcXG4gIGZsZXg6IDE7XFxufVxcblxcbi5mLWZsZXgtMCB7XFxuICBmbGV4OiAwO1xcbn1cXG5cXG4uZi1mbGV4LWNvbCwgLm0tcGFuZWwuZi1zdGFydCwgLm0tcGFuZWwuZi1oZWFkZXIuZi1jZW50ZXIsIC5hLWxpc3QtdGlsZSB7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uZi1mbGV4LXJvdywgLm0tcGFuZWwuZi1oZWFkZXIuZi1zaWRlIHtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxufVxcblxcbi5mLWZsZXgtYWwtY2VudGVyLCAubS1wYW5lbC5mLXN0YXJ0LCAubS1wYW5lbC5mLWhlYWRlci5mLXNpZGUge1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLmYtZmxleC1qdXN0LWNlbnRlciwgLm0tY2xvY2sge1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5mLWZsZXgtYWwtZW5kIHtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcXG59XFxuXFxuLmYtZmxleC1qdXN0LWVuZCwgLm0tcGFuZWwuZi1oZWFkZXIuZi1jZW50ZXIge1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG59XFxuXFxuLmYtZmxleC1hbC1zdGFydCB7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuXFxuLmYtZmxleC1qdXN0LXN0YXJ0LCAuYS1saXN0LXRpbGUge1xcbiAganVzdGlmeS1jb250ZW50OiBzdGFydDtcXG59XFxuXFxuLmYtZmxleC1qdXN0LXNwYWNlLWJldHdlZW4ge1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uZi1mbGV4LWp1c3Qtc3BhY2UtYXJvdW5kIHtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbn1cXG5cXG4uZi1oZWlnaHQtMTAwIHtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLmYtbS0tMiB7XFxuICBtYXJnaW46IC0xNnB4IC0xNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW0tLTEge1xcbiAgbWFyZ2luOiAtOHB4IC04cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbS0wIHtcXG4gIG1hcmdpbjogMCAwICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW0tMSB7XFxuICBtYXJnaW46IDhweCA4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbS0yIHtcXG4gIG1hcmdpbjogMTZweCAxNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW0tMyB7XFxuICBtYXJnaW46IDI0cHggMjRweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tLTQge1xcbiAgbWFyZ2luOiAzMnB4IDMycHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbS01IHtcXG4gIG1hcmdpbjogNDBweCA0MHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW0tNiB7XFxuICBtYXJnaW46IDQ4cHggNDhweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tLWF1dG8ge1xcbiAgbWFyZ2luOiBhdXRvIGF1dG8gIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtLTIge1xcbiAgbWFyZ2luLWxlZnQ6IC0xNnB4ICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tcmlnaHQ6IC0xNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLS0yIHtcXG4gIG1hcmdpbi1sZWZ0OiAtMTZweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tci0tMiB7XFxuICBtYXJnaW4tcmlnaHQ6IC0xNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW14LS0xIHtcXG4gIG1hcmdpbi1sZWZ0OiAtOHB4ICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tcmlnaHQ6IC04cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWwtLTEge1xcbiAgbWFyZ2luLWxlZnQ6IC04cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItLTEge1xcbiAgbWFyZ2luLXJpZ2h0OiAtOHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW14LTAge1xcbiAgbWFyZ2luLWxlZnQ6IDAgIWltcG9ydGFudDtcXG4gIG1hcmdpbi1yaWdodDogMCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tbC0wIHtcXG4gIG1hcmdpbi1sZWZ0OiAwICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1yLTAge1xcbiAgbWFyZ2luLXJpZ2h0OiAwICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW14LTEge1xcbiAgbWFyZ2luLWxlZnQ6IDhweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiA4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWwtMSB7XFxuICBtYXJnaW4tbGVmdDogOHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1yLTEge1xcbiAgbWFyZ2luLXJpZ2h0OiA4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtMiB7XFxuICBtYXJnaW4tbGVmdDogMTZweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiAxNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLTIge1xcbiAgbWFyZ2luLWxlZnQ6IDE2cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItMiB7XFxuICBtYXJnaW4tcmlnaHQ6IDE2cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtMyB7XFxuICBtYXJnaW4tbGVmdDogMjRweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiAyNHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLTMge1xcbiAgbWFyZ2luLWxlZnQ6IDI0cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItMyB7XFxuICBtYXJnaW4tcmlnaHQ6IDI0cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtNCB7XFxuICBtYXJnaW4tbGVmdDogMzJweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiAzMnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLTQge1xcbiAgbWFyZ2luLWxlZnQ6IDMycHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItNCB7XFxuICBtYXJnaW4tcmlnaHQ6IDMycHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtNSB7XFxuICBtYXJnaW4tbGVmdDogNDBweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiA0MHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLTUge1xcbiAgbWFyZ2luLWxlZnQ6IDQwcHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItNSB7XFxuICBtYXJnaW4tcmlnaHQ6IDQwcHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtNiB7XFxuICBtYXJnaW4tbGVmdDogNDhweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiA0OHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLTYge1xcbiAgbWFyZ2luLWxlZnQ6IDQ4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItNiB7XFxuICBtYXJnaW4tcmlnaHQ6IDQ4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXgtYXV0byB7XFxuICBtYXJnaW4tbGVmdDogYXV0byAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1sLWF1dG8ge1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG8gIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXItYXV0byB7XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG8gIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXktLTIge1xcbiAgbWFyZ2luLXRvcDogLTE2cHggIWltcG9ydGFudDtcXG4gIG1hcmdpbi1ib3R0b206IC0xNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW10LS0yIHtcXG4gIG1hcmdpbi10b3A6IC0xNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1iLS0yIHtcXG4gIG1hcmdpbi1ib3R0b206IC0xNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW15LS0xIHtcXG4gIG1hcmdpbi10b3A6IC04cHggIWltcG9ydGFudDtcXG4gIG1hcmdpbi1ib3R0b206IC04cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXQtLTEge1xcbiAgbWFyZ2luLXRvcDogLThweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tYi0tMSB7XFxuICBtYXJnaW4tYm90dG9tOiAtOHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW15LTAge1xcbiAgbWFyZ2luLXRvcDogMCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLWJvdHRvbTogMCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tdC0wIHtcXG4gIG1hcmdpbi10b3A6IDAgIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWItMCB7XFxuICBtYXJnaW4tYm90dG9tOiAwICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW15LTEge1xcbiAgbWFyZ2luLXRvcDogOHB4ICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tYm90dG9tOiA4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXQtMSB7XFxuICBtYXJnaW4tdG9wOiA4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWItMSwgLm0tcm93LmYtaGVhZGVyLCAuYS10ZXh0LmYtdGl0bGUuZi10YWJsZSwgLmYtdGl0bGUuZi10YWJsZS5tLWJveC5mLXBhbmVsLCAuZi10YWJsZS5tLWJhbm5lci5mLXBhbmVsIHtcXG4gIG1hcmdpbi1ib3R0b206IDhweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1teS0yIHtcXG4gIG1hcmdpbi10b3A6IDE2cHggIWltcG9ydGFudDtcXG4gIG1hcmdpbi1ib3R0b206IDE2cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXQtMiB7XFxuICBtYXJnaW4tdG9wOiAxNnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW1iLTIge1xcbiAgbWFyZ2luLWJvdHRvbTogMTZweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1teS0zIHtcXG4gIG1hcmdpbi10b3A6IDI0cHggIWltcG9ydGFudDtcXG4gIG1hcmdpbi1ib3R0b206IDI0cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXQtMywgLm0tYXJlYS5mLWJ1dHRvbi5mLWZpbGwge1xcbiAgbWFyZ2luLXRvcDogMjRweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tYi0zIHtcXG4gIG1hcmdpbi1ib3R0b206IDI0cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbXktNCB7XFxuICBtYXJnaW4tdG9wOiAzMnB4ICFpbXBvcnRhbnQ7XFxuICBtYXJnaW4tYm90dG9tOiAzMnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW10LTQge1xcbiAgbWFyZ2luLXRvcDogMzJweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tYi00LCAubS1hcmVhLmYtYnV0dG9uLmYtZmlsbCB7XFxuICBtYXJnaW4tYm90dG9tOiAzMnB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW15LTUge1xcbiAgbWFyZ2luLXRvcDogNDBweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLWJvdHRvbTogNDBweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tdC01IHtcXG4gIG1hcmdpbi10b3A6IDQwcHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWItNSB7XFxuICBtYXJnaW4tYm90dG9tOiA0MHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW15LTYge1xcbiAgbWFyZ2luLXRvcDogNDhweCAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLWJvdHRvbTogNDhweCAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tdC02IHtcXG4gIG1hcmdpbi10b3A6IDQ4cHggIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWItNiB7XFxuICBtYXJnaW4tYm90dG9tOiA0OHB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLW15LWF1dG8ge1xcbiAgbWFyZ2luLXRvcDogYXV0byAhaW1wb3J0YW50O1xcbiAgbWFyZ2luLWJvdHRvbTogYXV0byAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi1tdC1hdXRvIHtcXG4gIG1hcmdpbi10b3A6IGF1dG8gIWltcG9ydGFudDtcXG59XFxuXFxuLmYtbWItYXV0byB7XFxuICBtYXJnaW4tYm90dG9tOiBhdXRvICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLXNjcm9sbC1kZWZhdWx0IHtcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxufVxcblxcbi5mLXAtLTIge1xcbiAgcGFkZGluZzogLTE2cHggLTE2cHg7XFxufVxcblxcbi5mLXAtLTEge1xcbiAgcGFkZGluZzogLThweCAtOHB4O1xcbn1cXG5cXG4uZi1wLTAsIC50LXBhZ2UuZi1zdGFydCB7XFxuICBwYWRkaW5nOiAwIDA7XFxufVxcblxcbi5mLXAtMSB7XFxuICBwYWRkaW5nOiA4cHggOHB4O1xcbn1cXG5cXG4uZi1wLTIsIC5tLXNsaWRlIHtcXG4gIHBhZGRpbmc6IDE2cHggMTZweDtcXG59XFxuXFxuLmYtcC0zIHtcXG4gIHBhZGRpbmc6IDI0cHggMjRweDtcXG59XFxuXFxuLmYtcC00IHtcXG4gIHBhZGRpbmc6IDMycHggMzJweDtcXG59XFxuXFxuLmYtcC01IHtcXG4gIHBhZGRpbmc6IDQwcHggNDBweDtcXG59XFxuXFxuLmYtcC02IHtcXG4gIHBhZGRpbmc6IDQ4cHggNDhweDtcXG59XFxuXFxuLmYtcC1hdXRvIHtcXG4gIHBhZGRpbmc6IGF1dG8gYXV0bztcXG59XFxuXFxuLmYtcHgtLTIge1xcbiAgcGFkZGluZy1sZWZ0OiAtMTZweDtcXG4gIHBhZGRpbmctcmlnaHQ6IC0xNnB4O1xcbn1cXG5cXG4uZi1wbC0tMiB7XFxuICBwYWRkaW5nLWxlZnQ6IC0xNnB4O1xcbn1cXG5cXG4uZi1wci0tMiB7XFxuICBwYWRkaW5nLXJpZ2h0OiAtMTZweDtcXG59XFxuXFxuLmYtcHgtLTEge1xcbiAgcGFkZGluZy1sZWZ0OiAtOHB4O1xcbiAgcGFkZGluZy1yaWdodDogLThweDtcXG59XFxuXFxuLmYtcGwtLTEge1xcbiAgcGFkZGluZy1sZWZ0OiAtOHB4O1xcbn1cXG5cXG4uZi1wci0tMSB7XFxuICBwYWRkaW5nLXJpZ2h0OiAtOHB4O1xcbn1cXG5cXG4uZi1weC0wIHtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG4gIHBhZGRpbmctcmlnaHQ6IDA7XFxufVxcblxcbi5mLXBsLTAge1xcbiAgcGFkZGluZy1sZWZ0OiAwO1xcbn1cXG5cXG4uZi1wci0wIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDA7XFxufVxcblxcbi5mLXB4LTEge1xcbiAgcGFkZGluZy1sZWZ0OiA4cHg7XFxuICBwYWRkaW5nLXJpZ2h0OiA4cHg7XFxufVxcblxcbi5mLXBsLTEge1xcbiAgcGFkZGluZy1sZWZ0OiA4cHg7XFxufVxcblxcbi5mLXByLTEge1xcbiAgcGFkZGluZy1yaWdodDogOHB4O1xcbn1cXG5cXG4uZi1weC0yIHtcXG4gIHBhZGRpbmctbGVmdDogMTZweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDE2cHg7XFxufVxcblxcbi5mLXBsLTIsIC5hLWxpc3QtdGlsZSB7XFxuICBwYWRkaW5nLWxlZnQ6IDE2cHg7XFxufVxcblxcbi5mLXByLTIge1xcbiAgcGFkZGluZy1yaWdodDogMTZweDtcXG59XFxuXFxuLmYtcHgtMyB7XFxuICBwYWRkaW5nLWxlZnQ6IDI0cHg7XFxuICBwYWRkaW5nLXJpZ2h0OiAyNHB4O1xcbn1cXG5cXG4uZi1wbC0zIHtcXG4gIHBhZGRpbmctbGVmdDogMjRweDtcXG59XFxuXFxuLmYtcHItMyB7XFxuICBwYWRkaW5nLXJpZ2h0OiAyNHB4O1xcbn1cXG5cXG4uZi1weC00IHtcXG4gIHBhZGRpbmctbGVmdDogMzJweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDMycHg7XFxufVxcblxcbi5mLXBsLTQge1xcbiAgcGFkZGluZy1sZWZ0OiAzMnB4O1xcbn1cXG5cXG4uZi1wci00IHtcXG4gIHBhZGRpbmctcmlnaHQ6IDMycHg7XFxufVxcblxcbi5mLXB4LTUge1xcbiAgcGFkZGluZy1sZWZ0OiA0MHB4O1xcbiAgcGFkZGluZy1yaWdodDogNDBweDtcXG59XFxuXFxuLmYtcGwtNSB7XFxuICBwYWRkaW5nLWxlZnQ6IDQwcHg7XFxufVxcblxcbi5mLXByLTUge1xcbiAgcGFkZGluZy1yaWdodDogNDBweDtcXG59XFxuXFxuLmYtcHgtNiB7XFxuICBwYWRkaW5nLWxlZnQ6IDQ4cHg7XFxuICBwYWRkaW5nLXJpZ2h0OiA0OHB4O1xcbn1cXG5cXG4uZi1wbC02IHtcXG4gIHBhZGRpbmctbGVmdDogNDhweDtcXG59XFxuXFxuLmYtcHItNiB7XFxuICBwYWRkaW5nLXJpZ2h0OiA0OHB4O1xcbn1cXG5cXG4uZi1weC1hdXRvIHtcXG4gIHBhZGRpbmctbGVmdDogYXV0bztcXG4gIHBhZGRpbmctcmlnaHQ6IGF1dG87XFxufVxcblxcbi5mLXBsLWF1dG8ge1xcbiAgcGFkZGluZy1sZWZ0OiBhdXRvO1xcbn1cXG5cXG4uZi1wci1hdXRvIHtcXG4gIHBhZGRpbmctcmlnaHQ6IGF1dG87XFxufVxcblxcbi5mLXB5LS0yIHtcXG4gIHBhZGRpbmctdG9wOiAtMTZweDtcXG4gIHBhZGRpbmctYm90dG9tOiAtMTZweDtcXG59XFxuXFxuLmYtcHQtLTIge1xcbiAgcGFkZGluZy10b3A6IC0xNnB4O1xcbn1cXG5cXG4uZi1wYi0tMiB7XFxuICBwYWRkaW5nLWJvdHRvbTogLTE2cHg7XFxufVxcblxcbi5mLXB5LS0xIHtcXG4gIHBhZGRpbmctdG9wOiAtOHB4O1xcbiAgcGFkZGluZy1ib3R0b206IC04cHg7XFxufVxcblxcbi5mLXB0LS0xIHtcXG4gIHBhZGRpbmctdG9wOiAtOHB4O1xcbn1cXG5cXG4uZi1wYi0tMSB7XFxuICBwYWRkaW5nLWJvdHRvbTogLThweDtcXG59XFxuXFxuLmYtcHktMCB7XFxuICBwYWRkaW5nLXRvcDogMDtcXG4gIHBhZGRpbmctYm90dG9tOiAwO1xcbn1cXG5cXG4uZi1wdC0wIHtcXG4gIHBhZGRpbmctdG9wOiAwO1xcbn1cXG5cXG4uZi1wYi0wIHtcXG4gIHBhZGRpbmctYm90dG9tOiAwO1xcbn1cXG5cXG4uZi1weS0xIHtcXG4gIHBhZGRpbmctdG9wOiA4cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xcbn1cXG5cXG4uZi1wdC0xIHtcXG4gIHBhZGRpbmctdG9wOiA4cHg7XFxufVxcblxcbi5mLXBiLTEge1xcbiAgcGFkZGluZy1ib3R0b206IDhweDtcXG59XFxuXFxuLmYtcHktMiwgLm0tZ3JpZC5mLXRlbXBvcmFyeS1wb2ludHMsIC5mLXRlbXBvcmFyeS1wb2ludHMubS1yb3cuZi1oZWFkZXIge1xcbiAgcGFkZGluZy10b3A6IDE2cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMTZweDtcXG59XFxuXFxuLmYtcHQtMiB7XFxuICBwYWRkaW5nLXRvcDogMTZweDtcXG59XFxuXFxuLmYtcGItMiB7XFxuICBwYWRkaW5nLWJvdHRvbTogMTZweDtcXG59XFxuXFxuLmYtcHktMyB7XFxuICBwYWRkaW5nLXRvcDogMjRweDtcXG4gIHBhZGRpbmctYm90dG9tOiAyNHB4O1xcbn1cXG5cXG4uZi1wdC0zLCAuYS1tZXNzYWdlLmYtdGFibGUge1xcbiAgcGFkZGluZy10b3A6IDI0cHg7XFxufVxcblxcbi5mLXBiLTMge1xcbiAgcGFkZGluZy1ib3R0b206IDI0cHg7XFxufVxcblxcbi5mLXB5LTQge1xcbiAgcGFkZGluZy10b3A6IDMycHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMzJweDtcXG59XFxuXFxuLmYtcHQtNCB7XFxuICBwYWRkaW5nLXRvcDogMzJweDtcXG59XFxuXFxuLmYtcGItNCB7XFxuICBwYWRkaW5nLWJvdHRvbTogMzJweDtcXG59XFxuXFxuLmYtcHktNSB7XFxuICBwYWRkaW5nLXRvcDogNDBweDtcXG4gIHBhZGRpbmctYm90dG9tOiA0MHB4O1xcbn1cXG5cXG4uZi1wdC01IHtcXG4gIHBhZGRpbmctdG9wOiA0MHB4O1xcbn1cXG5cXG4uZi1wYi01IHtcXG4gIHBhZGRpbmctYm90dG9tOiA0MHB4O1xcbn1cXG5cXG4uZi1weS02IHtcXG4gIHBhZGRpbmctdG9wOiA0OHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDQ4cHg7XFxufVxcblxcbi5mLXB0LTYge1xcbiAgcGFkZGluZy10b3A6IDQ4cHg7XFxufVxcblxcbi5mLXBiLTYge1xcbiAgcGFkZGluZy1ib3R0b206IDQ4cHg7XFxufVxcblxcbi5mLXB5LWF1dG8ge1xcbiAgcGFkZGluZy10b3A6IGF1dG87XFxuICBwYWRkaW5nLWJvdHRvbTogYXV0bztcXG59XFxuXFxuLmYtcHQtYXV0byB7XFxuICBwYWRkaW5nLXRvcDogYXV0bztcXG59XFxuXFxuLmYtcGItYXV0byB7XFxuICBwYWRkaW5nLWJvdHRvbTogYXV0bztcXG59XFxuXFxuLmYtZmlsbC1hYnMge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4uZi1maWxsLXJlbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxufVxcblxcbi5mLWZpbGwtZml4IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG59XFxuXFxuLmYtcmVsYXRpdmUge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uZi1hYnNvbHV0ZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxufVxcblxcbi5mLXotaW5kZXgtNiB7XFxuICB6LWluZGV4OiA2O1xcbn1cXG5cXG4uZi10ZXh0LWJvbGQsIC5hLXRleHQuZi10aXRsZS5mLXRhYmxlLCAuZi10aXRsZS5mLXRhYmxlLm0tYm94LmYtcGFuZWwsIC5mLXRhYmxlLm0tYmFubmVyLmYtcGFuZWwsIC5hLXRleHQuZi1zdHJvbmcsIC5tLWJveC5mLXBhbmVsLCAuZi1zdHJvbmcubS1iYW5uZXIuZi1wYW5lbCB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLmYtdGV4dC1ub3JtYWwge1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG59XFxuXFxuLmYtdGV4dC11cHBlcmNhc2Uge1xcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG59XFxuXFxuLmYtdGV4dC1pdGFsaWMge1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbn1cXG5cXG4uZi10ZXh0LXVuZGVybGluZSB7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLmYtdGV4dC1jZW50ZXIsIC50LXBhZ2UuZi1zdGFydCwgLmEtc3VidGl0bGUsIC5hLWxvZ28sIC5hLWNoaXAsIC5hLWJ1dHRvbiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5mLXRleHQtcmlnaHQge1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxufVxcblxcbi5mLXRleHQtbGVmdCwgLmEtYXNzaXN0IHtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblxcbi5mLXRleHQtanVzdGlmeSB7XFxuICB0ZXh0LWFsaWduOiBqdXN0aWZ5O1xcbn1cXG5cXG4uZi10ZXh0LWluZm8ge1xcbiAgY29sb3I6ICMwRjlFRUQ7XFxufVxcblxcbi5mLXRleHQtd2FybmluZyB7XFxuICBjb2xvcjogI0YxQUI2ODtcXG59XFxuXFxuLmYtdGV4dC1kYW5nZXIge1xcbiAgY29sb3I6ICNlZTFjMjU7XFxufVxcblxcbi5mLXRleHQtd2hpdGUge1xcbiAgY29sb3I6ICNmYWZhZmE7XFxufVxcblxcbi5mLXRleHQtZ3JheSB7XFxuICBjb2xvcjogcmdiYSg3NiwgNzYsIDc2LCAwLjcpO1xcbn1cXG5cXG4uZi10ZXh0LXN1YnRleHQsIC5hLXZlcnNpb24ge1xcbiAgY29sb3I6IHJnYmEoNzYsIDc2LCA3NiwgMC43KTtcXG59XFxuXFxuLmYtdGV4dC1zdGFuZGFyZCB7XFxuICBjb2xvcjogIzRjNGM0YztcXG59XFxuXFxuLmYtdGV4dC1wcmltYXJ5IHtcXG4gIGNvbG9yOiAjMDc2MzJDO1xcbn1cXG5cXG4uZi10ZXh0LXByaW1hcnktY29udHJhc3Qge1xcbiAgY29sb3I6ICMwNzYzMkM7XFxufVxcblxcbi5mLXRleHQtcHJpbWFyeS1ob3ZlciB7XFxuICBjb2xvcjogIzA3NjMyQztcXG4gIG9wYWNpdHk6IDAuNztcXG59XFxuXFxuLmYtdGV4dC1zZWNvbmRhcnkge1xcbiAgY29sb3I6ICM1ODIxODc7XFxufVxcblxcbi5mLWxpbmUtMTgge1xcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XFxufVxcblxcbi5mLWxpbmUtMjAge1xcbiAgbGluZS1oZWlnaHQ6IDIwcHg7XFxufVxcblxcbi5mLWxpbmUtMjQge1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxufVxcblxcbi5mLWxpbmUtMzIge1xcbiAgbGluZS1oZWlnaHQ6IDMycHg7XFxufVxcblxcbi5mLXRleHQtNDgge1xcbiAgZm9udC1zaXplOiA0OHB4O1xcbn1cXG5cXG4uZi10ZXh0LTMyIHtcXG4gIGZvbnQtc2l6ZTogMzJweDtcXG59XFxuXFxuLmYtdGV4dC0yOCwgLmEtdGl0bGUuZi1zaXplLTI4IHtcXG4gIGZvbnQtc2l6ZTogMjhweDtcXG59XFxuXFxuLmYtdGV4dC0yNCwgLmEtdGl0bGUge1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbn1cXG5cXG4uZi10ZXh0LTIyLCAuYS10ZXh0LmYtdGl0bGUuZi1tZW51LCAuZi10aXRsZS5mLW1lbnUubS1ib3guZi1wYW5lbCwgLmYtbWVudS5tLWJhbm5lci5mLXBhbmVsLCAuYS10ZXh0LmYtdGl0bGUuZi1iaWcsIC5mLXRpdGxlLmYtYmlnLm0tYm94LmYtcGFuZWwsIC5hLXRleHQuZi10aXRsZS5tLWJhbm5lci5mLXBhbmVsLCAuZi10aXRsZS5tLWJhbm5lci5mLXBhbmVsLm0tYm94LCAuZi1iaWcubS1iYW5uZXIuZi1wYW5lbCwgLm0tYmFubmVyLmYtcGFuZWwsIC5hLWxvZ28uZi1iaWcge1xcbiAgZm9udC1zaXplOiAyMnB4O1xcbn1cXG5cXG4uZi10ZXh0LTIwLCAuYS1saW5rLmYtbWVudSB7XFxuICBmb250LXNpemU6IDIwcHg7XFxufVxcblxcbi5mLXRleHQtMTgsIC5hLXRleHQuZi10aXRsZS5mLXRhYmxlLCAuZi10aXRsZS5mLXRhYmxlLm0tYm94LmYtcGFuZWwsIC5mLXRhYmxlLm0tYmFubmVyLmYtcGFuZWwsIC5hLXN1YnRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG59XFxuXFxuLmYtdGV4dC0xNiwgLm0tc2xpZGUsIC5tLWxpc3QtZWxlbWVudC5mLXBvcHVwLCAuYS10ZXh0LmYtc3VidGl0bGUuZi1zdGFydCwgLmYtc3VidGl0bGUuZi1zdGFydC5tLWJveC5mLXBhbmVsLCAuZi1zdWJ0aXRsZS5mLXN0YXJ0Lm0tYmFubmVyLmYtcGFuZWwsIC5hLXRleHQuZi1zdWJ0aXRsZS5mLW1lbnUsIC5mLXN1YnRpdGxlLmYtbWVudS5tLWJveC5mLXBhbmVsLCAuZi1zdWJ0aXRsZS5mLW1lbnUubS1iYW5uZXIuZi1wYW5lbCwgLmEtdGV4dC5mLXN0cm9uZywgLm0tYm94LmYtcGFuZWwsIC5mLXN0cm9uZy5tLWJhbm5lci5mLXBhbmVsLCAuYS1zZWxlY3QsIC5hLW1lc3NhZ2UuZi10YWJsZSwgLmEtaW5wdXQsIC5hLWZpZWxkLCBib2R5IHtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG59XFxuXFxuLmYtdGV4dC0xNCwgLm0tc25hY2tiYXIsIC5hLWxvZ28sIC5hLWJ1dHRvbiB7XFxuICBmb250LXNpemU6IDE0cHg7XFxufVxcblxcbi5mLXRleHQtMTIsIC5hLWFzc2lzdCwgLmEtbGFiZWwuZi1idXR0b24taWNvbi1mb290ZXIsIC5hLWNoaXAge1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbn1cXG5cXG4uZi1taW4tMTAwIHtcXG4gIG1pbi13aWR0aDogMTAwJTtcXG59XFxuXFxuLmYtMTAwIHtcXG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XFxufVxcblxcbi5mLTQwIHtcXG4gIHdpZHRoOiA0MCUgIWltcG9ydGFudDtcXG59XFxuXFxuLmYtOTAge1xcbiAgd2lkdGg6IDkwJSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZi13LWF1dG8ge1xcbiAgd2lkdGg6IGF1dG8gIWltcG9ydGFudDtcXG59XFxuXFxuI2FwcCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5hLWFzc2lzdC5mLWVycm9yLCAuYS1hc3Npc3QuYS1tZXNzYWdlLmYtdGFibGUuZi1lcnJvciB7XFxuICBjb2xvcjogI2VlMWMyNTtcXG59XFxuXFxuLmEtYnV0dG9uIHtcXG4gIG1pbi13aWR0aDogMTg0cHg7XFxuICBoZWlnaHQ6IDM2cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMDc2MzJDO1xcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XFxuICBsaW5lLWhlaWdodDogMTZweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjc1cHg7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgY29sb3I6ICM0YzRjNGM7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwIDIwcHg7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBvdXRsaW5lOiBub25lO1xcbn1cXG4uYS1idXR0b246Zm9jdXMge1xcbiAgb3BhY2l0eTogMC41O1xcbn1cXG5AbWVkaWEgKGhvdmVyOiBob3ZlcikgYW5kIChwb2ludGVyOiBmaW5lKSB7XFxuICAuYS1idXR0b246aG92ZXIge1xcbiAgICBvcGFjaXR5OiAwLjU7XFxuICB9XFxufVxcbi5hLWJ1dHRvbjpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwLjM7XFxufVxcblxcbi5hLWJ1dHRvbi5mLWZpbGwge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtaW4td2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDU2cHg7XFxuICBib3JkZXItcmFkaXVzOiAyOHB4O1xcbn1cXG5cXG4uYS1idXR0b24uZi1pY29uIHtcXG4gIG1pbi13aWR0aDogYXV0bztcXG4gIG1pbi1oZWlnaHQ6IGF1dG87XFxuICB3aWR0aDogYXV0bztcXG4gIGhlaWdodDogNDBweDtcXG4gIGxpbmUtaGVpZ2h0OiA0MHB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogaW5oZXJpdDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDA7XFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XFxufVxcbi5hLWJ1dHRvbi5mLWljb246Zm9jdXMsIC5hLWJ1dHRvbi5mLWljb246aG92ZXIsIC5hLWJ1dHRvbi5mLWljb246YWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xNSk7XFxufVxcblxcbi5hLWJ1dHRvbi5mLWljb24uZi1hcnJvdy1iYWNrIHtcXG4gIHdpZHRoOiA0OHB4O1xcbiAgaGVpZ2h0OiA0OHB4O1xcbiAgbWFyZ2luOiAwO1xcbiAgbWFyZ2luLXJpZ2h0OiA0cHg7XFxuICBwYWRkaW5nOiA4cHg7XFxuICBwYWRkaW5nLWxlZnQ6IDA7XFxufVxcblxcbi5hLWJ1dHRvbi5mLWljb24uZi1mb290ZXIge1xcbiAgZmxleDogMTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDc2MzJDO1xcbn1cXG4uYS1idXR0b24uZi1pY29uLmYtZm9vdGVyOmhvdmVyLCAuYS1idXR0b24uZi1pY29uLmYtZm9vdGVyOmZvY3VzIHtcXG4gIG9wYWNpdHk6IDE7XFxufVxcbi5hLWJ1dHRvbi5mLWljb24uZi1mb290ZXIuZi1zZWxlY3RlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDU0NTIwO1xcbn1cXG5cXG4uYS1idXR0b24uZi1pY29uLmYtZm9vdGVyLmYtYmlnLCAuYS1idXR0b24uZi1pY29uLmYtZm9vdGVyLm0tYmFubmVyLmYtcGFuZWwge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XFxuICBvdmVyZmxvdzogdmlzaWJsZTtcXG59XFxuLmEtYnV0dG9uLmYtaWNvbi5mLWZvb3Rlci5mLWJpZy5mLXNlbGVjdGVkIHNwYW4sIC5hLWJ1dHRvbi5mLWljb24uZi1mb290ZXIuZi1zZWxlY3RlZC5tLWJhbm5lci5mLXBhbmVsIHNwYW4ge1xcbiAgLXdlYmtpdC1hbmltYXRpb246IHJvdGF0ZS1jZW50ZXIgMC42cyBlYXNlLWluLW91dCBib3RoO1xcbiAgYW5pbWF0aW9uOiByb3RhdGUtY2VudGVyIDAuNnMgZWFzZS1pbi1vdXQgYm90aDtcXG59XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHJvdGF0ZS1jZW50ZXIge1xcbiAgMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDApO1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxuICB9XFxufVxcbkBrZXlmcmFtZXMgcm90YXRlLWNlbnRlciB7XFxuICAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMCk7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDApO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcXG4gIH1cXG59XFxuLmYtaWNvbi1pbnNpZGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5hLWJ1dHRvbi5mLWljb24uZi1taW5pbWFsIHtcXG4gIHBhZGRpbmctbGVmdDogMDtcXG59XFxuXFxuLmEtYnV0dG9uLmYtaWNvbi5mLXNpemUtMzYge1xcbiAgaGVpZ2h0OiA0NnB4O1xcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcXG59XFxuXFxuLmEtYnV0dG9uLmYtbG9hZGluZy5mLXByaW1hcnksIC5hLWJ1dHRvbi5mLWxvYWRpbmcuZi1wcmltYXJ5OmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDcsIDk5LCA0NCwgMC41KTtcXG59XFxuLmEtYnV0dG9uLmYtbG9hZGluZy5mLXNlY29uZGFyeSwgLmEtYnV0dG9uLmYtbG9hZGluZy5mLXNlY29uZGFyeTpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAxO1xcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDcsIDk5LCA0NCwgMC41KTtcXG59XFxuXFxuLmEtYnV0dG9uLmYtbWVudSB7XFxuICB3aWR0aDogYXV0bztcXG4gIGhlaWdodDogNDJweDtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICBib3JkZXI6IG5vbmU7XFxufVxcbi5hLWJ1dHRvbi5mLW1lbnU6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG4uYS1idXR0b24uZi1wcmltYXJ5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwNzYzMkM7XFxuICBib3JkZXI6IG5vbmU7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgY29sb3I6ICNmYWZhZmE7XFxufVxcbi5hLWJ1dHRvbi5mLXByaW1hcnk6Zm9jdXMge1xcbiAgYmFja2dyb3VuZDogIzA1NDUyMDtcXG59XFxuXFxuLmEtYnV0dG9uLmYtc2Vjb25kYXJ5IHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBjb2xvcjogIzA3NjMyQztcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG4uYS1idXR0b24uZi1zZWNvbmRhcnk6Zm9jdXMge1xcbiAgb3BhY2l0eTogMC43NjtcXG59XFxuXFxuLmEtYnV0dG9uLXRyYW5zcGFyZW50IHtcXG4gIHdpZHRoOiAxNTBweDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBoZWlnaHQ6IDMycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjNGM0YzRjO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgcGFkZGluZzogMnB4IDJweDtcXG4gIGJvcmRlcjogc29saWQgdHJhbnNwYXJlbnQgMXB4O1xcbiAgbWFyZ2luOiA1cHg7XFxufVxcbi5hLWJ1dHRvbi10cmFuc3BhcmVudDpob3ZlciB7XFxuICBib3JkZXI6IHNvbGlkICM0YzRjNGMgMXB4O1xcbn1cXG4uYS1idXR0b24tdHJhbnNwYXJlbnQ6ZGlzYWJsZWQge1xcbiAgY29sb3I6IHJnYmEoNzYsIDc2LCA3NiwgMC4zOCk7XFxuICBib3JkZXI6IHNvbGlkIDFweCB0cmFuc3BhcmVudDtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcblxcbi5hLWNoZWNrYm94IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuXFxuLmEtY2hpcCB7XFxuICB3aWR0aDogMjhweDtcXG4gIGhlaWdodDogMTdweDtcXG4gIGJhY2tncm91bmQ6ICM1ODIxODc7XFxuICBjb2xvcjogI2ZhZmFmYTtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbGluZS1oZWlnaHQ6IDE0cHg7XFxuICBsZXR0ZXItc3BhY2luZzogMC4xNXB4O1xcbn1cXG5cXG4uYS1jb3Zlci5mLW1lbnUuZi1zaG93IHtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XFxufVxcblxcbi5hLWNvdmVyLmYtbWVudSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICB6LWluZGV4OiAzOTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgdHJhbnNpdGlvbjogMC41cyB2aXNpYmlsaXR5LCAwLjVzIGJhY2tncm91bmQtY29sb3I7XFxufVxcblxcbi5hLWZpZWxkIHtcXG4gIHdpZHRoOiBhdXRvO1xcbiAgaGVpZ2h0OiA1NnB4O1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDc2LCA3NiwgNzYsIDAuNSk7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgcGFkZGluZzogMTVweDtcXG4gIHBhZGRpbmctdG9wOiAxNnB4O1xcbiAgcGFkZGluZy1ib3R0b206IDE0cHg7XFxuICBtYXJnaW46IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG4uYS1maWVsZDpkaXNhYmxlZCB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcbi5hLWZpZWxkOmZvY3VzLCAuYS1maWVsZDpmb2N1cy13aXRoaW4sIC5hLWZpZWxkLmYtY29ycmVjdCwgLmEtZmllbGQuZi1lcnJvciwgLmEtZmllbGQuYS1tZXNzYWdlLmYtdGFibGUuZi1lcnJvciB7XFxuICBwYWRkaW5nOiAxNHB4O1xcbiAgcGFkZGluZy10b3A6IDE1cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMTNweDtcXG4gIGJvcmRlci13aWR0aDogMnB4O1xcbn1cXG4uYS1maWVsZDpmb2N1cywgLmEtZmllbGQ6Zm9jdXMtd2l0aGluIHtcXG4gIGJvcmRlci1jb2xvcjogIzA3NjMyQztcXG59XFxuLmEtZmllbGQuZi1lcnJvciwgLmEtZmllbGQuYS1tZXNzYWdlLmYtdGFibGUuZi1lcnJvciwgLmEtZmllbGQuZi1jb3JyZWN0IHtcXG4gIHBhZGRpbmctcmlnaHQ6IDUycHg7XFxufVxcbi5hLWZpZWxkLmYtY29ycmVjdCB7XFxuICBib3JkZXItY29sb3I6ICMwNzYzMkM7XFxufVxcbi5hLWZpZWxkW3R5cGU9ZGF0ZV06Oi13ZWJraXQtY2FsZW5kYXItcGlja2VyLWluZGljYXRvciwgLmEtZmllbGRbdHlwZT1kYXRldGltZS1sb2NhbF06Oi13ZWJraXQtY2FsZW5kYXItcGlja2VyLWluZGljYXRvciB7XFxuICBmaWx0ZXI6IGludmVydCgwKTtcXG59XFxuXFxuLmEtZmllbGQuZi1lcnJvciwgLmEtZmllbGQuYS1tZXNzYWdlLmYtdGFibGUuZi1lcnJvciB7XFxuICBwYWRkaW5nOiAxNHB4O1xcbiAgcGFkZGluZy10b3A6IDE1cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMTNweDtcXG4gIGJvcmRlci13aWR0aDogMnB4O1xcbiAgYm9yZGVyLWNvbG9yOiAjZWUxYzI1O1xcbn1cXG5cXG4uYS1maWVsZC5mLXNlbGVjdCB7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4uYS1maWVsZC5mLXRleHRhcmVhIHtcXG4gIG1pbi1oZWlnaHQ6IDgwcHg7XFxuICByZXNpemU6IG5vbmU7XFxufVxcblxcbi5hLWljb24ge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJNYXRlcmlhbCBJY29uc1xcXCI7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgd2lkdGg6IDI0cHg7XFxuICBoZWlnaHQ6IDI0cHg7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBsaW5lLWhlaWdodDogMTtcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcXG4gIHdvcmQtd3JhcDogbm9ybWFsO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIGRpcmVjdGlvbjogbHRyO1xcbiAgLyogU3VwcG9ydCBmb3IgYWxsIFdlYktpdCBicm93c2Vycy4gKi9cXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgLyogU3VwcG9ydCBmb3IgU2FmYXJpIGFuZCBDaHJvbWUuICovXFxuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcbiAgLyogU3VwcG9ydCBmb3IgRmlyZWZveC4gKi9cXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuICAvKiBTdXBwb3J0IGZvciBJRS4gKi9cXG4gIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogXFxcImxpZ2FcXFwiO1xcbn1cXG5cXG4uYS1pY29uLmYtYWN0aXZlLXBvaW50IHtcXG4gIGNvbG9yOiAjMDc2MzJDO1xcbn1cXG5cXG4uZi1jbG9jayB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IDJweDtcXG4gIG1hcmdpbi1yaWdodDogOHB4O1xcbn1cXG5cXG4uYS1pY29uLmYtY2xvc2UtcG9wdXAuZi1tYXAge1xcbiAgdG9wOiA0cHg7XFxuICByaWdodDogNHB4O1xcbn1cXG5cXG4uYS1pY29uLmYtY2xvc2UtcG9wdXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA4cHg7XFxuICByaWdodDogOHB4O1xcbiAgei1pbmRleDogMTA7XFxufVxcblxcbi5hLWljb24uZi1kaXNhYmxlZC1wb2ludCB7XFxuICBvcGFjaXR5OiAwLjU7XFxufVxcblxcbi5hLWljb24uZi1maXJzdC1jYXRlZ29yeSB7XFxuICBjb2xvcjogI2VlMWMyNTtcXG59XFxuXFxuLmEtaWNvbi5mLWZvb3RlciB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG59XFxuXFxuLmEtaWNvbi5mLWZvb3Rlci5mLWJpZywgLmEtaWNvbi5mLWZvb3Rlci5tLWJhbm5lci5mLXBhbmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHdpZHRoOiA2MHB4O1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgZm9udC1zaXplOiA0OHB4O1xcbiAgbGluZS1oZWlnaHQ6IDQ2cHg7XFxuICBwYWRkaW5nLXRvcDogNnB4O1xcbiAgbWFyZ2luLXRvcDogLTI4cHg7XFxuICBtYXJnaW4tYm90dG9tOiAtMXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNDBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1ODIxODc7XFxufVxcblxcbi5hLWljb24uZi1mdXR1cmUtcG9pbnQge1xcbiAgY29sb3I6ICMwNzYzMkM7XFxufVxcblxcbi5hLWljb24uZi1oZWFkZXIge1xcbiAgbWFyZ2luLWxlZnQ6IDVweDtcXG59XFxuXFxuLmEtaWNvbi5mLWlucHV0IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMnB4O1xcbiAgcmlnaHQ6IDJweDtcXG4gIHdpZHRoOiA1MnB4O1xcbiAgaGVpZ2h0OiA1MnB4O1xcbiAgcGFkZGluZzogMTNweDtcXG4gIGZvbnQtc2l6ZTogMjZweDtcXG59XFxuXFxuLmEtaWNvbi5mLWlucHV0LmYtY29ycmVjdCB7XFxuICBjb2xvcjogIzA3NjMyQztcXG59XFxuXFxuLmEtaWNvbi5mLWlucHV0LmYtZXJyb3Ige1xcbiAgY29sb3I6ICNlZTFjMjU7XFxufVxcblxcbi5hLWljb24uZi1saXN0IHtcXG4gIG1hcmdpbjogNnB4O1xcbiAgbWFyZ2luLXRvcDogNHB4O1xcbn1cXG5cXG4uYS1pY29uLmYtbWVudSB7XFxuICB3aWR0aDogNDBweDtcXG4gIGhlaWdodDogNTZweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciBlYXNlLWluLW91dCAwLjVzO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgbGluZS1oZWlnaHQ6IDU2cHg7XFxuICBmb250LXNpemU6IDI2cHg7XFxuICBtYXJnaW4tbGVmdDogOHB4O1xcbn1cXG4uYS1pY29uLmYtbWVudS5mLXNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1ODIxODc7XFxufVxcblxcbi5hLWljb24uZi1zZWNvbmQtY2F0ZWdvcnkge1xcbiAgY29sb3I6ICMwRjlFRUQ7XFxufVxcblxcbi5hLWljb24uZi1zbmFja2JhciB7XFxuICBtYXJnaW46IDEycHg7XFxufVxcblxcbi5hLWljb24uZi10aGlyZC1jYXRlZ29yeSB7XFxuICBjb2xvcjogI0YxQUI2ODtcXG59XFxuXFxuLmEtaW1nLmYtbG9hZGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiAzMnB4O1xcbiAgaGVpZ2h0OiAzMnB4O1xcbiAgYW5pbWF0aW9uOiBhbmltYXRpb24tbG9hZGVyIDIuNHMgY3ViaWMtYmV6aWVyKDAsIDAuMiwgMC44LCAxKSBpbmZpbml0ZTtcXG59XFxuXFxuQGtleWZyYW1lcyBhbmltYXRpb24tbG9hZGVyIHtcXG4gIDAlLCAxMDAlIHtcXG4gICAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNSwgMCwgMSwgMC41KTtcXG4gIH1cXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpO1xcbiAgfVxcbiAgNTAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKDE4MDBkZWcpO1xcbiAgICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMCwgMC41LCAwLjUsIDEpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWSgzNjAwZGVnKTtcXG4gIH1cXG59XFxuLmEtaW1nLmYtbG9hZGVyLmYtYmlnLCAuYS1pbWcuZi1sb2FkZXIubS1iYW5uZXIuZi1wYW5lbCB7XFxuICB3aWR0aDogODZweDtcXG4gIGhlaWdodDogODZweDtcXG59XFxuXFxuLmEtaW1nLmYtbG9hZGVyLmYtZmlsbCB7XFxuICB3aWR0aDogNTJweDtcXG4gIGhlaWdodDogNTJweDtcXG59XFxuXFxuLmEtaW1nLmYtbWFwLXJvdW5kIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDE4MHB4O1xcbiAgaGVpZ2h0OiAxODBweDtcXG4gIG1hcmdpbjogMjRweCBhdXRvO1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcXCIvaW1nL0hhcmNfbWFwYS5wbmdcXFwiKTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IC0zMTVweCAtNzBweDtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxufVxcblxcbi5hLWltZy5mLXBhbmVsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDI1MHB4O1xcbiAgbWFyZ2luOiAwO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogYXV0byAxMDAlO1xcbn1cXG5cXG4uYS1pbnB1dCB7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuXFxuLmEtZmllbGQuZi1pY29uIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDUzcHg7XFxufVxcbi5hLWZpZWxkLmYtaWNvbjpmb2N1cywgLmEtZmllbGQuZi1pY29uLmYtZmlsbGVkIHtcXG4gIHBhZGRpbmctcmlnaHQ6IDUycHg7XFxufVxcblxcbi5hLWlucHV0LmYtc2VsZWN0IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgcGFkZGluZy10b3A6IDE2cHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMTRweDtcXG59XFxuLmEtaW5wdXQuZi1zZWxlY3Q6Zm9jdXMsIC5hLWlucHV0LmYtc2VsZWN0LmYtY29ycmVjdCwgLmEtaW5wdXQuZi1zZWxlY3QuZi1lcnJvciB7XFxuICBvcGFjaXR5OiAxO1xcbiAgcGFkZGluZzogMTRweDtcXG4gIHBhZGRpbmctdG9wOiAxNXB4O1xcbiAgcGFkZGluZy1ib3R0b206IDEzcHg7XFxufVxcblxcbi5hLWxhYmVsLmYtYnV0dG9uLWljb24tZm9vdGVyIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XFxufVxcblxcbi5hLWxhYmVsLmYtZmllbGQge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxN3B4O1xcbiAgbGVmdDogMTJweDtcXG4gIHBhZGRpbmc6IDAgNHB4O1xcbiAgbGluZS1oZWlnaHQ6IDI0cHg7XFxuICB0cmFuc2l0aW9uLXByb3BlcnR5OiBhbGw7XFxuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSk7XFxuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAyMDBtcztcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWZhZmE7XFxuICBjb2xvcjogcmdiYSg3NiwgNzYsIDc2LCAwLjcpO1xcbn1cXG5cXG4uYS1maWVsZDpmb2N1cyB+IC5hLWxhYmVsLmYtZmllbGQsIC5hLWZpZWxkOmZvY3VzLXdpdGhpbiB+IC5hLWxhYmVsLmYtZmllbGQsIC5hLWZpZWxkLmYtZmlsbGVkIH4gLmEtbGFiZWwuZi1maWVsZCB7XFxuICB0b3A6IC03cHg7XFxuICBsZWZ0OiAxM3B4O1xcbiAgZm9udC1zaXplOiAxMnB4O1xcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XFxufVxcbi5hLWZpZWxkOmZvY3VzIH4gLmEtbGFiZWwuZi1maWVsZCwgLmEtZmllbGQ6Zm9jdXMtd2l0aGluIH4gLmEtbGFiZWwuZi1maWVsZCB7XFxuICBjb2xvcjogcmdiYSg3NiwgNzYsIDc2LCAwLjcpO1xcbn1cXG4uYS1maWVsZDpmb2N1cyB+IC5hLWxhYmVsLmYtZmllbGQuZi1jb3JyZWN0IHtcXG4gIGNvbG9yOiAjMDc2MzJDO1xcbn1cXG4uYS1maWVsZC5mLWNvcnJlY3QgfiAuYS1sYWJlbC5mLWZpZWxkLmYtY29ycmVjdCB7XFxuICBjb2xvcjogIzA3NjMyQztcXG59XFxuXFxuLmEtZmllbGQ6Zm9jdXMgfiAuYS1sYWJlbC5mLWZpZWxkLmYtZXJyb3IsIC5hLWZpZWxkLmYtZXJyb3IgfiAuYS1sYWJlbC5mLWZpZWxkLmYtZXJyb3Ige1xcbiAgY29sb3I6ICNlZTFjMjU7XFxufVxcblxcbi5hLWxhYmVsLmYtc2VsZWN0IHtcXG4gIG1hcmdpbjogMTVweDtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbn1cXG5cXG4uYS1saW5rIHtcXG4gIGNvbG9yOiAjNGM0YzRjO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcXG59XFxuXFxuLmEtbGluay5mLW1lbnUuZi1zZWxlY3RlZCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGNvbG9yOiAjNTgyMTg3O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg4OCwgMzMsIDEzNSwgMC4yKTtcXG59XFxuXFxuLmEtbGluay5mLW1lbnUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBjb2xvcjogcmdiYSg3NiwgNzYsIDc2LCAwLjcpO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgbGluZS1oZWlnaHQ6IDU4cHg7XFxuICBoZWlnaHQ6IDU2cHg7XFxuICBmb250LXNpemU6IDE2cHg7XFxufVxcblxcbi5hLWxpc3QtdGlsZSB7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIHRleHQtYWxpZ246IHN0YXJ0O1xcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLmEtbG9hZGVyIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWigxcHgpO1xcbn1cXG5cXG4uYS1sb2dvIHtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDJweDtcXG59XFxuXFxuLmEtbG9nby5mLWJpZywgLmEtbG9nby5tLWJhbm5lci5mLXBhbmVsIHtcXG4gIHBhZGRpbmctYm90dG9tOiAxNHB4O1xcbn1cXG5cXG4uYS1tZXNzYWdlLmYtZXJyb3IsIC5hLW1lc3NhZ2UuZi10YWJsZS5mLWVycm9yIHtcXG4gIGNvbG9yOiAjZWUxYzI1O1xcbn1cXG5cXG4uYS1tZXNzYWdlLmYtdGFibGUge1xcbiAgY29sb3I6IHJnYmEoNzYsIDc2LCA3NiwgMC43KTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4uYS1vcHRpb24ge1xcbiAgcGFkZGluZzogMTZweDtcXG4gIGxpbmUtaGVpZ2h0OiAxNnB4O1xcbn1cXG5cXG4uYS1vcHRpb24uZi1wb2ludGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNywgOTksIDQ0LCAwLjIpO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbi5hLW9wdGlvbi5mLXNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNywgOTksIDQ0LCAwLjIpO1xcbn1cXG5cXG4uYS1yYWRpbyB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwYWRkaW5nOiAzcHggNXB4O1xcbn1cXG4uYS1yYWRpbyBpbnB1dCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IDJweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIG1hcmdpbi1yaWdodDogNXB4O1xcbn1cXG5cXG4uYS1zZWxlY3Qge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoNzYsIDc2LCA3NiwgMC41KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyLXJhZGl1czogdW5zZXQ7XFxuICB3aWR0aDogMzAwcHg7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICBjb2xvcjogIzRjNGM0YztcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gIGJveC1zaGFkb3c6IHVuc2V0O1xcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc2VyaWY7XFxuICBhbGlnbi1pdGVtczogdW5zZXQ7XFxuICBwYWRkaW5nLXRvcDogMTVweDtcXG4gIHBhZGRpbmctbGVmdDogOHB4O1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIHotaW5kZXg6IDEwO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYS1zZWxlY3Q6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG59XFxuXFxuLmEtc2VsZWN0OmRpc2FibGVkIHtcXG4gIG9wYWNpdHk6IDAuNTtcXG59XFxuXFxuLmEtYXNzaXN0IHtcXG4gIGhlaWdodDogMzJweDtcXG4gIHBhZGRpbmc6IDRweCAwO1xcbiAgcGFkZGluZy1sZWZ0OiAxNnB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XFxufVxcblxcbi5hLXRleHQuZi1zdHJvbmcsIC5tLWJveC5mLXBhbmVsLCAuZi1zdHJvbmcubS1iYW5uZXIuZi1wYW5lbCB7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjI1cHg7XFxufVxcblxcbi5hLXN1YnRpdGxlIHtcXG4gIGxpbmUtaGVpZ2h0OiAyOHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xcbiAgY29sb3I6ICNmYWZhZmE7XFxufVxcblxcbi5hLXRleHQuZi1zdWJ0aXRsZS5mLW1lbnUsIC5mLXN1YnRpdGxlLmYtbWVudS5tLWJveC5mLXBhbmVsLCAuZi1zdWJ0aXRsZS5mLW1lbnUubS1iYW5uZXIuZi1wYW5lbCB7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xcbiAgcGFkZGluZzogOHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxNnB4O1xcbiAgcGFkZGluZy1ib3R0b206IDI0cHg7XFxuICBjb2xvcjogcmdiYSg3NiwgNzYsIDc2LCAwLjcpO1xcbn1cXG5cXG4uYS10ZXh0LmYtc3VidGl0bGUuZi1zdGFydCwgLmYtc3VidGl0bGUuZi1zdGFydC5tLWJveC5mLXBhbmVsLCAuZi1zdWJ0aXRsZS5mLXN0YXJ0Lm0tYmFubmVyLmYtcGFuZWwge1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBsaW5lLWhlaWdodDogMjBweDtcXG4gIGNvbG9yOiByZ2JhKDI1MCwgMjUwLCAyNTAsIDAuNik7XFxufVxcblxcbi5hLXRpdGxlIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgcGFkZGluZzogMTZweCAwO1xcbn1cXG5cXG4uYS10ZXh0LmYtdGl0bGUuZi1iaWcsIC5mLXRpdGxlLmYtYmlnLm0tYm94LmYtcGFuZWwsIC5hLXRleHQuZi10aXRsZS5tLWJhbm5lci5mLXBhbmVsLCAuZi10aXRsZS5tLWJhbm5lci5mLXBhbmVsLm0tYm94LCAuZi1iaWcubS1iYW5uZXIuZi1wYW5lbCwgLm0tYmFubmVyLmYtcGFuZWwge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyOHB4O1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xcbiAgY29sb3I6ICNmYWZhZmE7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgcGFkZGluZzogMTRweCAxNnB4O1xcbn1cXG5cXG4uYS10ZXh0LmYtdGl0bGUuZi1tZW51LCAuZi10aXRsZS5mLW1lbnUubS1ib3guZi1wYW5lbCwgLmYtbWVudS5tLWJhbm5lci5mLXBhbmVsIHtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgbGluZS1oZWlnaHQ6IDIycHg7XFxuICBwYWRkaW5nOiAwO1xcbiAgcGFkZGluZy1sZWZ0OiAxNnB4O1xcbiAgcGFkZGluZy10b3A6IDE2cHg7XFxufVxcblxcbi5hLXZlcnNpb24ge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgcmlnaHQ6IDhweDtcXG4gIGJvdHRvbTogNjBweDtcXG4gIGZvbnQtc2l6ZTogMTJweDtcXG59XFxuXFxuLm0tYXJlYS5mLWJ1dHRvbi5mLWZpbGwge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG4ubS1hcmVhLmYtYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBhZGRpbmc6IDZweDtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgbWFyZ2luLXRvcDogMTZweDtcXG59XFxuXFxuLm0tYmFubmVyLW1hcCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiAxMDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1pbi13aWR0aDogOTJweDtcXG4gIGhlaWdodDogODBweDtcXG4gIHBhZGRpbmc6IDE2cHg7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDI1MCwgMjUwLCAyNTAsIDAuNyk7XFxuICBjb2xvcjogIzRjNGM0YztcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBsaW5lLWhlaWdodDogMjRweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLm0tYmFubmVyLXRpbWVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDEwO1xcbiAgbGVmdDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcGFkZGluZzogNHB4IDhweDtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMjUwLCAyNTAsIDI1MCwgMC43KTtcXG4gIGNvbG9yOiAjNGM0YzRjO1xcbiAgZm9udC1zaXplOiAxNHB4O1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG4ubS1iYW5uZXItbWFwLmYtbWVzc2FnZS1zdWNjZXNzIHtcXG4gIGhlaWdodDogNTZweDtcXG4gIGJhY2tncm91bmQ6IHJnYmEoNywgOTksIDQ0LCAwLjUpO1xcbiAgY29sb3I6ICNmYWZhZmE7XFxufVxcblxcbi5tLWJhbm5lci5mLXBhbmVsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoODgsIDMzLCAxMzUsIDAuMyk7XFxufVxcblxcbi5tLWJveC5mLXBhbmVsIHtcXG4gIGhlaWdodDogNTZweDtcXG4gIHBhZGRpbmc6IDE2cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTgyMTg3O1xcbiAgY29sb3I6IHJnYmEoMjUwLCAyNTAsIDI1MCwgMC43KTtcXG59XFxuXFxuLm0tY2xvY2sge1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoNzYsIDc2LCA3NiwgMC4yKTtcXG59XFxuXFxuLm0tY29sbGVjdGlvbi5mLWJ1dHRvbiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5tLWNvdW50ZG93bi10aW1lci13YXJuaW5nIHtcXG4gIGNvbG9yOiByZWQ7XFxufVxcblxcbi5tLWNvdW50ZG93bi10aW1lciB7XFxuICBjb2xvcjogIzRjNGM0YztcXG59XFxuXFxuLm0tY292ZXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogOTA7XFxufVxcblxcbi5tLWNvdmVyLmYtcG9wdXAge1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgb3ZlcmZsb3cteTogYXV0bztcXG59XFxuXFxuLm0tZ3JpZCwgLm0tcm93LmYtaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxufVxcblxcbi5tLWdyaWQuZi1jYXRlZ29yeS1zdW0sIC5mLWNhdGVnb3J5LXN1bS5tLXJvdy5mLWhlYWRlciB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDgwcHggMTI4cHggMTIwcHg7XFxufVxcblxcbi5tLWdyaWQuZi1jb2xsZWN0ZWQtcG9pbnRzLCAuZi1jb2xsZWN0ZWQtcG9pbnRzLm0tcm93LmYtaGVhZGVyIHtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSg3NiwgNzYsIDc2LCAwLjIpO1xcbn1cXG4ubS1ncmlkLmYtY29sbGVjdGVkLXBvaW50czpsYXN0LWNoaWxkLCAuZi1jb2xsZWN0ZWQtcG9pbnRzLm0tcm93LmYtaGVhZGVyOmxhc3QtY2hpbGQge1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoNzYsIDc2LCA3NiwgMC4yKTtcXG59XFxuXFxuLm0tZ3JpZC5mLXBvaW50LCAuZi1wb2ludC5tLXJvdy5mLWhlYWRlciB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcHggNjBweCA4OHB4IDgwcHggNzBweDtcXG59XFxuXFxuLm0tZ3JpZC5mLXNjb3JlLCAuZi1zY29yZS5tLXJvdy5mLWhlYWRlciB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDE3MHB4IDg4cHggNzBweDtcXG59XFxuXFxuLm0tZ3JpZC5mLXNlYXJjaC1wb2ludCwgLmYtc2VhcmNoLXBvaW50Lm0tcm93LmYtaGVhZGVyIHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzBweCA1MHB4IDIxNnB4IDQwcHg7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSg3NiwgNzYsIDc2LCAwLjIpO1xcbn1cXG4ubS1ncmlkLmYtc2VhcmNoLXBvaW50Om50aC1jaGlsZCgxKSwgLmYtc2VhcmNoLXBvaW50Lm0tcm93LmYtaGVhZGVyOm50aC1jaGlsZCgxKSB7XFxuICBib3JkZXItdG9wOiBub25lO1xcbn1cXG5cXG4ubS1ncmlkLmYtc3BsaXQtMiwgLmYtc3BsaXQtMi5tLXJvdy5mLWhlYWRlciB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCA1MCUpO1xcbn1cXG5cXG4ubS1ncmlkLmYtc3BsaXQtMywgLmYtc3BsaXQtMy5tLXJvdy5mLWhlYWRlciB7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAzMy4zMzMzMzMzMzMzJSk7XFxufVxcblxcbi5tLWdyaWQuZi10ZW1wb3JhcnktcG9pbnRzLCAuZi10ZW1wb3JhcnktcG9pbnRzLm0tcm93LmYtaGVhZGVyIHtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNDBweCAxZnIgNDBweDtcXG4gIGp1c3RpZnktaXRlbXM6IGxlZnQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoNzYsIDc2LCA3NiwgMC4yKTtcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLm0taW5wdXQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xcbn1cXG5cXG4ubS1saXN0LWVsZW1lbnQuZi1wb3B1cCB7XFxuICBtaW4taGVpZ2h0OiAzMnB4O1xcbiAgcGFkZGluZzogMCA4cHg7XFxuICBsaW5lLWhlaWdodDogMTZweDtcXG4gIGNvbG9yOiAjNGM0YzRjO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5tLWxpc3QtZWxlbWVudC5mLXBvcHVwOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoODgsIDMzLCAxMzUsIDAuMik7XFxufVxcblxcbi5tLXBvaW50ZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdG9wOiBjYWxjKDUwdmggLSAxNnB4IC8gMik7XFxuICBsZWZ0OiBjYWxjKDUwJSAtIDE2cHggLyAyKTtcXG4gIHdpZHRoOiAxNnB4O1xcbiAgaGVpZ2h0OiAxNnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG59XFxuLm0tcG9pbnRlcjpiZWZvcmUge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IGNhbGMoKDE2cHggLSA0cHggLSAycHgpIC8gMik7XFxuICBsZWZ0OiBjYWxjKC01MHZ3ICsgKDEycHgpIC8gMik7XFxuICB6LWluZGV4OiAtMTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAycHg7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNik7XFxufVxcbi5tLXBvaW50ZXI6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiBjYWxjKCgxNnB4IC0gNHB4IC0gMnB4KSAvIDIpO1xcbiAgdG9wOiBjYWxjKC01MHZoICsgNHB4ICsgMnB4KTtcXG4gIHotaW5kZXg6IC0xO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMnB4O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC42KTtcXG59XFxuXFxuLm0tb3B0aW9ucyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiBjYWxjKDEwMCUgKyAxcHggLSAzMnB4KTtcXG4gIHJpZ2h0OiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcXG4gIGNvbG9yOiAjNGM0YzRjO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYm94LXNoYWRvdzogMCA1cHggNXB4IC0zcHggcmdiYSgwLCAwLCAwLCAwLjIpLCAwIDhweCAxMHB4IDFweCByZ2JhKDAsIDAsIDAsIDAuMTQpLCAwIDNweCAxNHB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIHotaW5kZXg6IDEwMDtcXG59XFxuXFxuLm0tb3B0aW9ucy5mLXRvcCB7XFxuICB0b3A6IGF1dG87XFxuICBib3R0b206IGNhbGMoMTAwJSArIDZweCk7XFxufVxcblxcbi5tLXBhbmVsLmYtaGVhZGVyLmYtc2lkZSB7XFxuICB3aWR0aDogMzNweDtcXG59XFxuXFxuLm0tcGFuZWwuZi1zdGFydCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmQxMTQ1O1xcbn1cXG5cXG4ubS1yb3cuZi1oZWFkZXIge1xcbiAgY29sb3I6IHJnYmEoNzYsIDc2LCA3NiwgMC43KTtcXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDc2LCA3NiwgNzYsIDAuMik7XFxufVxcblxcbi5tLXNsaWRlIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgY29sb3I6ICM0YzRjNGM7XFxufVxcblxcbi5tLXNuYWNrYmFyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDhweDtcXG4gIHRvcDogNjRweDtcXG4gIHJpZ2h0OiA4cHg7XFxuICB6LWluZGV4OiA0OTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBsaW5lLWhlaWdodDogMTZweDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBGOUVFRDtcXG4gIGNvbG9yOiAjZmFmYWZhO1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwLjIpO1xcbn1cXG5cXG4ubS1zbmFja2Jhci5mLWVycm9yLCAubS1zbmFja2Jhci5hLW1lc3NhZ2UuZi10YWJsZS5mLWVycm9yIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZTFjMjU7XFxufVxcblxcbi5tLXNuYWNrYmFyLmYtc3VjY2VzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDc2MzJDO1xcbn1cXG5cXG4uby1mbG9hdC1jb250YWluZXIge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgei1pbmRleDogMTUwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcXG59XFxuXFxuLm8tZm9vdGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHotaW5kZXg6IDUwO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogNTZweDtcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzA1NDUyMDtcXG4gIGJvcmRlci10b3A6IDJweCBzb2xpZCAjMDU0NTIwO1xcbiAgY29sb3I6ICNmYWZhZmE7XFxufVxcblxcbi5vLWhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGhlaWdodDogNTZweDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBjb2xvcjogI2ZhZmFmYTtcXG4gIGJhY2tncm91bmQ6ICMwNzYzMkM7XFxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzA1NDUyMDtcXG4gIHBhZGRpbmctbGVmdDogMTZweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDE2cHg7XFxufVxcblxcbi5vLWxvYWRpbmcge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiA1NnB4O1xcbiAgcGFkZGluZy10b3A6IDM2dmg7XFxuICB6LWluZGV4OiAxMDA7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDc2MzJDO1xcbn1cXG5cXG4uby1tYXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBsZWZ0OiAwO1xcbn1cXG5cXG4uby1tZW51IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDQwO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMTAwJTtcXG4gIGJvdHRvbTogNTZweDtcXG4gIHdpZHRoOiA5MCU7XFxuICBwYWRkaW5nOiAxMHB4IDA7XFxuICBwYWRkaW5nLXRvcDogMDtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxuICBvdmVyZmxvdy14OiBoaWRkZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xcbiAgY29sb3I6ICM0YzRjNGM7XFxuICB0cmFuc2l0aW9uOiAwLjVzIGxlZnQ7XFxuICBib3JkZXItbGVmdDogcmdiYSg3NiwgNzYsIDc2LCAwLjIpIDFweCBzb2xpZDtcXG4gIGJveC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbi5vLW1lbnUuZi1vcGVuIHtcXG4gIGxlZnQ6IDEwJTtcXG4gIGJveC1zaGFkb3c6IDAgNXB4IDVweCAtM3B4IHJnYmEoMCwgMCwgMCwgMC4yKSwgMCA4cHggMTBweCAxcHggcmdiYSgwLCAwLCAwLCAwLjE0KSwgMCAzcHggMTRweCAycHggcmdiYSgwLCAwLCAwLCAwLjEyKTtcXG59XFxuXFxuLm8tbmF2IHtcXG4gIGhlaWdodDogNjBweDtcXG59XFxuXFxuLm8tcG9wdXAge1xcbiAgd2lkdGg6IDI4MHB4O1xcbiAgYmFja2dyb3VuZDogIzA3NjMyQztcXG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4zKSAxcHggMXB4IDNweCAxcHg7XFxuICBtYXJnaW46IDMydmggYXV0byAwIGF1dG87XFxuICBwYWRkaW5nOiA1NnB4IDMycHggNDhweCAzMnB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICNmYWZhZmE7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuXFxuLm8tcG9wdXAuZi1tYXAge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDI0MHB4O1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogOHB4IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xcbiAgY29sb3I6ICM0YzRjNGM7XFxuICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICBib3JkZXI6IHNvbGlkIDFweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICBib3gtc2hhZG93OiAwIDFweCA2cHggcmdiYSg2MCwgNjQsIDY3LCAwLjI4KTtcXG59XFxuXFxuLm8tcG9wdXAuZi1zY29yZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA4cHg7XFxuICB0b3A6IGNhbGMoNTZweCArIDhweCk7XFxuICByaWdodDogOHB4O1xcbiAgd2lkdGg6IGF1dG87XFxuICBtaW4taGVpZ2h0OiAyMDBweDtcXG4gIHBhZGRpbmc6IDhweDtcXG4gIG1hcmdpbjogMDtcXG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzRjNGM0YztcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbn1cXG5cXG4udC1iYXNlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcXG59XFxuXFxuLnQtcGFnZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGxlZnQ6IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIG92ZXJmbG93LXk6IGF1dG87XFxuICBwYWRkaW5nOiAxNnB4IDE2cHg7XFxufVxcblxcbi50LXBhZ2UuZi1tYXAge1xcbiAgcGFkZGluZzogMDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG59XFxuXFxuLmRhcmstbWFwLWxheWVyIHtcXG4gIGZpbHRlcjogaW52ZXJ0KDEwMCUpIHNlcGlhKDEwMCUpIHNhdHVyYXRlKDAlKSBicmlnaHRuZXNzKDEwMCUpIGNvbnRyYXN0KDEwMCUpO1xcbn1cXG5cXG4ub2wtem9vbSB7XFxuICBsZWZ0OiB1bnNldCAhaW1wb3J0YW50O1xcbiAgcmlnaHQ6IDhweDtcXG4gIHRvcDogdW5zZXQgIWltcG9ydGFudDtcXG4gIGJvdHRvbTogNTBweDtcXG59XFxuXFxuLm9sLWNvbnRyb2wge1xcbiAgYm9yZGVyLXJhZGl1czogMCAhaW1wb3J0YW50O1xcbiAgcGFkZGluZzogMXB4ICFpbXBvcnRhbnQ7XFxufVxcblxcbi5vbC1jb250cm9sIGJ1dHRvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDg4LCAzMywgMTM1LCAwLjUpICFpbXBvcnRhbnQ7XFxuICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcXG4gIGJvcmRlci1yYWRpdXM6IDAgIWltcG9ydGFudDtcXG59XCIsIFwiXCJdKTtcbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IGF0dHJzOiB7IGlkOiBcImFwcFwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcIm8taGVhZGVyXCIpLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImYtcmVsYXRpdmUgZi1mbGV4LTFcIiB9LFxuICAgICAgICBbX2MoXCJyb3V0ZXItdmlld1wiLCB7IGtleTogX3ZtLnJvdXRlcklkIH0pXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcIm8tZm9vdGVyXCIsIHtcbiAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwidG91Y2hcIixcbiAgICAgICAgICAgIHJhd05hbWU6IFwidi10b3VjaDpzd2lwZS5sZWZ0XCIsXG4gICAgICAgICAgICB2YWx1ZTogX3ZtLm9wZW5NZW51SWZMb2dpbixcbiAgICAgICAgICAgIGV4cHJlc3Npb246IFwib3Blbk1lbnVJZkxvZ2luXCIsXG4gICAgICAgICAgICBhcmc6IFwic3dpcGVcIixcbiAgICAgICAgICAgIG1vZGlmaWVyczogeyBsZWZ0OiB0cnVlIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwidG91Y2hcIixcbiAgICAgICAgICAgIHJhd05hbWU6IFwidi10b3VjaDpzd2lwZS5yaWdodFwiLFxuICAgICAgICAgICAgdmFsdWU6IF92bS5jbG9zZU1lbnUsXG4gICAgICAgICAgICBleHByZXNzaW9uOiBcImNsb3NlTWVudVwiLFxuICAgICAgICAgICAgYXJnOiBcInN3aXBlXCIsXG4gICAgICAgICAgICBtb2RpZmllcnM6IHsgcmlnaHQ6IHRydWUgfVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJvLW1lbnVcIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJkaXZcIiwge1xuICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJ0b3VjaFwiLFxuICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXRvdWNoOnN3aXBlLnJpZ2h0XCIsXG4gICAgICAgICAgICB2YWx1ZTogX3ZtLmNsb3NlTWVudSxcbiAgICAgICAgICAgIGV4cHJlc3Npb246IFwiY2xvc2VNZW51XCIsXG4gICAgICAgICAgICBhcmc6IFwic3dpcGVcIixcbiAgICAgICAgICAgIG1vZGlmaWVyczogeyByaWdodDogdHJ1ZSB9XG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBzdGF0aWNDbGFzczogXCJhLWNvdmVyIGYtbWVudVwiLFxuICAgICAgICBjbGFzczogX3ZtLmlzT3BlbiA/IFwiZi1zaG93XCIgOiBcIlwiLFxuICAgICAgICBvbjogeyBjbGljazogX3ZtLmNsb3NlTWVudSB9XG4gICAgICB9KSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcIm0tc25hY2tiYXJcIiksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwidHJhbnNpdGlvblwiLFxuICAgICAgICB7IGF0dHJzOiB7IG5hbWU6IFwiZmFkZVwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiby1sb2FkaW5nXCIsIHtcbiAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1zaG93XCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IF92bS5pc0xvYWRpbmcsXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJpc0xvYWRpbmdcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHtcbiAgICAgIHN0YXRpY0NsYXNzOiBcIm0tYXJlYSBmLWJ1dHRvblwiLFxuICAgICAgb246IHtcbiAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgIHJldHVybiBfdm0uZW1pdENsaWNrKCRldmVudClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiYnV0dG9uXCIsXG4gICAgICAgIHtcbiAgICAgICAgICByZWY6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYS1idXR0b25cIixcbiAgICAgICAgICBjbGFzczogX3ZtLmdldENsYXNzLFxuICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IF92bS50eXBlLCBkaXNhYmxlZDogX3ZtLmRpc2FibGVkIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF92bS5sb2FkaW5nID09PSBmYWxzZSA/IF92bS5fdChcImRlZmF1bHRcIikgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF92bS5sb2FkaW5nXG4gICAgICAgICAgICA/IF9jKFwiYS1sb2FkZXJcIiwge1xuICAgICAgICAgICAgICAgIGF0dHJzOiB7IFwiYWRkLWNsYXNzXCI6IF92bS5hZGRDbGFzcywgaW1nOiBfdm0ubG9hZGluZ0ltZyB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgIF0sXG4gICAgICAgIDJcbiAgICAgIClcbiAgICBdXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiYS1idXR0b25cIixcbiAgICB7XG4gICAgICBhdHRyczoge1xuICAgICAgICBcImFkZC1jbGFzc1wiOiBbXCJmLXByaW1hcnlcIiwgX3ZtLmFkZENsYXNzXSxcbiAgICAgICAgbG9hZGluZzogX3ZtLmxvYWRpbmcsXG4gICAgICAgIGRpc2FibGVkOiBfdm0uZGlzYWJsZWQsXG4gICAgICAgIHR5cGU6IF92bS50eXBlLFxuICAgICAgICBcImxvYWRpbmctaW1nXCI6IFwiL2ltZy96aHAtNTIucG5nXCJcbiAgICAgIH0sXG4gICAgICBvbjoge1xuICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIF92bS4kZW1pdChcImNsaWNrXCIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtfdm0uX3QoXCJkZWZhdWx0XCIpXSxcbiAgICAyXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiYS1idXR0b25cIixcbiAgICB7XG4gICAgICBhdHRyczoge1xuICAgICAgICBcImFkZC1jbGFzc1wiOiBbXCJmLXNlY29uZGFyeVwiLCBfdm0uYWRkQ2xhc3NdLFxuICAgICAgICBsb2FkaW5nOiBfdm0ubG9hZGluZyxcbiAgICAgICAgXCJsb2FkaW5nLWltZ1wiOiBfdm0ubG9hZGluZ0ltZyxcbiAgICAgICAgZGlzYWJsZWQ6IF92bS5kaXNhYmxlZFxuICAgICAgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gX3ZtLiRlbWl0KFwiY2xpY2tcIiwgJGV2ZW50KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBbX3ZtLl90KFwiZGVmYXVsdFwiKV0sXG4gICAgMlxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImFcIixcbiAgICB7XG4gICAgICBzdGF0aWNDbGFzczogXCJhLWxpbmsgZi1tZW51XCIsXG4gICAgICBvbjoge1xuICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIF92bS4kZW1pdChcImNsaWNrXCIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF9jKFwiYS1pY29uXCIsIHsgc3RhdGljQ2xhc3M6IFwiZi1tZW51XCIsIGF0dHJzOiB7IG5hbWU6IF92bS5pY29uIH0gfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXG4gICAgICAgIFwiZGl2XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZi1mbGV4LTEgZi1wbC0zXCIgfSxcbiAgICAgICAgW192bS5fdChcImRlZmF1bHRcIiksIF92bS5fdihcIlxcbiAgICBcIiArIF92bS5fcyhfdm0udGV4dCkgKyBcIlxcbiAgXCIpXSxcbiAgICAgICAgMlxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJhLWxvYWRlclwiIH0sIFtcbiAgICBfYyhcImltZ1wiLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJhLWltZyBmLWxvYWRlclwiLFxuICAgICAgY2xhc3M6IF92bS5hZGRDbGFzcyxcbiAgICAgIGF0dHJzOiB7IHNyYzogX3ZtLmltZywgYWx0OiBcImxvZ29cIiB9XG4gICAgfSlcbiAgXSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwidHJhbnNpdGlvblwiLCB7IGF0dHJzOiB7IG5hbWU6IFwiZmFkZVwiIH0gfSwgW1xuICAgIF92bS5pc09wZW5cbiAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJtLXNuYWNrYmFyXCIsIGNsYXNzOiBfdm0uY29sb3JDbGFzc2VzIH0sIFtcbiAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImYtZmxleC0xIGYtcC0yXCIgfSwgW1xuICAgICAgICAgICAgX3ZtLl92KFwiXFxuICAgICAgXCIgKyBfdm0uX3MoX3ZtLm1lc3NhZ2UpICsgXCJcXG4gICAgXCIpXG4gICAgICAgICAgXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiZGl2XCIsXG4gICAgICAgICAgICB7IG9uOiB7IGNsaWNrOiBfdm0uY2xvc2UgfSB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcImEtaWNvblwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYS1pY29uIGYtc25hY2tiYXJcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyBuYW1lOiBfdm0uSUNPTlMuY2xvc2UgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0pXG4gICAgICA6IF92bS5fZSgpXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm8tZm9vdGVyXCIgfSwgW192bS5fdihcIlxcbiAgby1mb290ZXJcXG5cIildKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJvLWhlYWRlclwiIH0sIFtcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcIm0tcGFuZWwgZi1oZWFkZXIgZi1zaWRlXCIsXG4gICAgICAgIGNsYXNzOiB7IFwiZi1oaWRkZW5cIjogX3ZtLmlzTWFpblBhZ2UgfVxuICAgICAgfSxcbiAgICAgIFtcbiAgICAgICAgX2MoXCJhLWljb25cIiwge1xuICAgICAgICAgIGF0dHJzOiB7IG5hbWU6IF92bS5JQ09OUy5hcnJvd19iYWNrLCBzaXplOiAyOCB9LFxuICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdm0uJHJvdXRlci5wdXNoKF92bS5wYXRoQmFja0J1dHRvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICBdLFxuICAgICAgMVxuICAgICksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcIm0tcGFuZWwgZi1oZWFkZXIgZi1jZW50ZXJcIiB9LFxuICAgICAgW1xuICAgICAgICBfdm0ucGFnZVRpdGxlICE9PSBcIlwiXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYS1zdWJ0aXRsZVwiIH0sIFtcbiAgICAgICAgICAgICAgICBfdm0uX3YoXCJcXG4gICAgICAgIFwiICsgX3ZtLl9zKF92bS5wYWdlVGl0bGUpICsgXCJcXG4gICAgICBcIilcbiAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYS1sb2dvXCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihcIlxcbiAgICAgICAgUmVoYXBwXFxuICAgICAgXCIpXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICBdXG4gICAgICAgICAgOiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImEtbG9nbyBmLWJpZ1wiIH0sIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFwiXFxuICAgICAgUmVoYXBwXFxuICAgIFwiKVxuICAgICAgICAgICAgXSlcbiAgICAgIF0sXG4gICAgICAyXG4gICAgKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF9jKFxuICAgICAgXCJkaXZcIixcbiAgICAgIHsgc3RhdGljQ2xhc3M6IFwibS1wYW5lbCBmLWhlYWRlciBmLXNpZGUgZi1yaWdodFwiIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFwiYS1pY29uXCIsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogXCJmLWhlYWRlclwiLFxuICAgICAgICAgIGF0dHJzOiB7IG5hbWU6IF92bS5ST1VURVMuYWJvdXQuaWNvbiwgc2l6ZTogMjggfSxcbiAgICAgICAgICBvbjogeyBjbGljazogX3ZtLnJlZGlyZWN0VG9Db2xsZWN0ZWRQb2ludHNPclNjb3JlYm9hcmQgfVxuICAgICAgICB9KVxuICAgICAgXSxcbiAgICAgIDFcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHsgc3RhdGljQ2xhc3M6IFwiby1sb2FkaW5nXCIgfSxcbiAgICBbXG4gICAgICBfYyhcImEtbG9hZGVyXCIsIHtcbiAgICAgICAgYXR0cnM6IHsgXCJhZGQtY2xhc3NcIjogXCJmLWJpZ1wiLCBpbWc6IFwiL2ltZy96aHAtODYucG5nXCIgfVxuICAgICAgfSlcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7XG4gICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcInRvdWNoXCIsXG4gICAgICAgICAgcmF3TmFtZTogXCJ2LXRvdWNoOnN3aXBlLnJpZ2h0XCIsXG4gICAgICAgICAgdmFsdWU6IF92bS5jbG9zZSxcbiAgICAgICAgICBleHByZXNzaW9uOiBcImNsb3NlXCIsXG4gICAgICAgICAgYXJnOiBcInN3aXBlXCIsXG4gICAgICAgICAgbW9kaWZpZXJzOiB7IHJpZ2h0OiB0cnVlIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHN0YXRpY0NsYXNzOiBcIm8tbWVudVwiLFxuICAgICAgY2xhc3M6IF92bS5pc09wZW4gPyBcImYtb3BlblwiIDogXCJcIlxuICAgIH0sXG4gICAgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJhLXRleHQgZi10aXRsZSBmLW1lbnVcIiB9LCBbXG4gICAgICAgIF92bS5fdihcbiAgICAgICAgICBfdm0uX3MoX3ZtLiR0KFwiZ2VuZXJhbC5oZWxsb1wiKSkgK1xuICAgICAgICAgICAgXCIsIFwiICtcbiAgICAgICAgICAgIF92bS5fcyhfdm0uJHN0b3JlLmdldHRlcnNbXCJ1c2VyL3VzZXJUZWFtXCJdKVxuICAgICAgICApXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uY2hlY2tJc0NvbW1vbigpXG4gICAgICAgID8gX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJhLXRleHQgZi1zdWJ0aXRsZSBmLW1lbnVcIiB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgIFwiXFxuICAgIFwiICtcbiAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLiR0KFwiZ2VuZXJhbC5hbHJlYWR5Q29sbGVjdGVkU2hvcnRcIikpICtcbiAgICAgICAgICAgICAgICBcIlxcbiAgICBcIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIF9jKFwic3BhblwiLCB7IHN0YXRpY0NsYXNzOiBcImYtdGV4dC1wcmltYXJ5LWNvbnRyYXN0XCIgfSwgW1xuICAgICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgICAgXCJcXG4gICAgICBcIiArXG4gICAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLiRzdG9yZS5nZXR0ZXJzW1widXNlci9zdW1PZkNvbGxlY3RlZFBvaW50c1wiXSkgK1xuICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS4kdChcImdlbmVyYWwucG9pbnRVbml0XCIpKSArXG4gICAgICAgICAgICAgICAgICBcIlxcbiAgICBcIlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0pXG4gICAgICAgIDogX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJhLXRleHQgZi1zdWJ0aXRsZSBmLW1lbnVcIiB9LCBbXG4gICAgICAgICAgICBfdm0uX3YoXG4gICAgICAgICAgICAgIFwiXFxuICAgIFwiICtcbiAgICAgICAgICAgICAgICBfdm0uX3MoXG4gICAgICAgICAgICAgICAgICBfdm0uY2hlY2tJc05vdExpbWl0ZWQoKVxuICAgICAgICAgICAgICAgICAgICA/IF92bS4kdChcImdlbmVyYWwuZnVsbEFkbWluXCIpXG4gICAgICAgICAgICAgICAgICAgIDogX3ZtLiR0KFwiZ2VuZXJhbC5saW1pdGVkQWRtaW5cIilcbiAgICAgICAgICAgICAgICApICtcbiAgICAgICAgICAgICAgICBcIlxcbiAgXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfdm0uX2woX3ZtLmxpbmtzLCBmdW5jdGlvbihyb3V0ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICBcInJvdXRlci1saW5rXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJhLWxpbmsgZi1tZW51XCIsXG4gICAgICAgICAgICBjbGFzczogeyBcImYtc2VsZWN0ZWRcIjogX3ZtLmlzQWN0dWFsUGF0aChyb3V0ZSkgfSxcbiAgICAgICAgICAgIGF0dHJzOiB7IHRvOiByb3V0ZS5wYXRoIH0sXG4gICAgICAgICAgICBuYXRpdmVPbjoge1xuICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS5jbG9zZSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIF9jKFwiYS1pY29uXCIsIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiZi1tZW51XCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IG5hbWU6IHJvdXRlLmljb24gfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmLWZsZXgtMSBmLXBsLTNcIiB9LCBbXG4gICAgICAgICAgICAgIF92bS5fdihfdm0uX3Mocm91dGUubGFiZWwpKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdLFxuICAgICAgICAgIDFcbiAgICAgICAgKVxuICAgICAgfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmNoZWNrSXNDb21tb24oKVxuICAgICAgICA/IF9jKFwiYS1saW5rLW1lbnVcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgaWNvbjogX3ZtLklDT05TLmhlbHAsXG4gICAgICAgICAgICAgIHRleHQ6IF92bS4kdChcImZlYXR1cmVzLmd1aWRlLmhvd0FwcFdvcmtzXCIpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub3Blbkd1aWRlKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX2MoXCJhLWxpbmstbWVudVwiLCB7XG4gICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgaWNvbjogX3ZtLklDT05TLmJyaWdodG5lc3NfNCxcbiAgICAgICAgICB0ZXh0OlxuICAgICAgICAgICAgX3ZtLnRoZW1lTmFtZSA9PT0gX3ZtLlRIRU1FUy5saWdodFxuICAgICAgICAgICAgICA/IF92bS4kdChcImdlbmVyYWwuZGFya1RoZW1lXCIpXG4gICAgICAgICAgICAgIDogX3ZtLiR0KFwiZ2VuZXJhbC5saWdodFRoZW1lXCIpXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIF92bS50b2dnbGVUaGVtZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcImEtbGluay1tZW51XCIsIHtcbiAgICAgICAgYXR0cnM6IHsgaWNvbjogX3ZtLklDT05TLmxvZ291dCwgdGV4dDogX3ZtLiR0KFwiZ2VuZXJhbC5sb2dvdXRcIikgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gX3ZtLnNpZ25PdXQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLmlzT3BlblxuICAgICAgICA/IF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiYS12ZXJzaW9uXCIgfSwgW1xuICAgICAgICAgICAgX3ZtLl92KFwiXFxuICAgIHZcIiArIF92bS5fcyhfdm0uVkVSU0lPTikgKyBcIlxcbiAgXCIpXG4gICAgICAgICAgXSlcbiAgICAgICAgOiBfdm0uX2UoKVxuICAgIF0sXG4gICAgMlxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcInQtcGFnZVwiLCB7IHN0YXRpY0NsYXNzOiBcImYtc3RhcnRcIiB9LCBbXG4gICAgX2MoXCJkaXZcIiwgW1xuICAgICAgX2MoXCJkaXZcIiwgW1xuICAgICAgICBfYyhcInNwYW5cIiwgeyBzdGF0aWNDbGFzczogXCJhLXRleHQgZi10aXRsZSBmLWJpZ1wiIH0sIFtcbiAgICAgICAgICBfdm0uX3YoXCJcXG4gICAgICAgIFwiICsgX3ZtLl9zKF92bS4kdChcInBhZ2UuZXJyb3IudGl0bGVcIikpICsgXCJcXG4gICAgICBcIilcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgXSksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcIm0tY29sbGVjdGlvbiBmLWJ1dHRvbiBmLXB4LTJcIiB9LCBbXG4gICAgICBfYyhcImRpdlwiLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiBcImYtcHQtMyBmLXRleHQtYm9sZFwiLFxuICAgICAgICBkb21Qcm9wczogeyBpbm5lckhUTUw6IF92bS5fcyhfdm0uJHQoXCJwYWdlLmVycm9yLmNvbnRlbnRcIikpIH1cbiAgICAgIH0pLFxuICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgIF9jKFxuICAgICAgICBcImRpdlwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImYtcHQtMVwiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcImEtYnV0dG9uLXByaW1hcnlcIiwgeyBvbjogeyBjbGljazogX3ZtLnJlZGlyZWN0VG9NYWluUGFnZSB9IH0sIFtcbiAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgXCJcXG4gICAgICAgIFwiICsgX3ZtLl9zKF92bS4kdChcImdlbmVyYWwuYmFja1RvU3RhcnRcIikpICsgXCJcXG4gICAgICBcIlxuICAgICAgICAgICAgKVxuICAgICAgICAgIF0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdKVxuICBdKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJ0LXBhZ2VcIiwgeyBhdHRyczogeyB0aXRsZTogXCJcIiB9IH0sIFtcbiAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImEtaW1nIGYtbWFwLXJvdW5kXCIgfSksXG4gICAgX3ZtLl92KFwiIFwiKSxcbiAgICBfYyhcbiAgICAgIFwiZGl2XCIsXG4gICAgICB7IHN0YXRpY0NsYXNzOiBcIm0tY29sbGVjdGlvbiBmLWJ1dHRvblwiIH0sXG4gICAgICBbXG4gICAgICAgIF9jKFxuICAgICAgICAgIFwiYS1idXR0b24tcHJpbWFyeVwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLiRyb3V0ZXIucHVzaChfdm0uUk9VVEVTLnNpZ25Jbi5wYXRoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgXCIgKyBfdm0uX3MoX3ZtLlJPVVRFUy5zaWduSW4ubGFiZWwpICsgXCJcXG4gICAgXCIpXVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcImEtYnV0dG9uLXNlY29uZGFyeVwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLiRyb3V0ZXIucHVzaChfdm0uUk9VVEVTLnNpZ25VcC5wYXRoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgXCIgKyBfdm0uX3MoX3ZtLlJPVVRFUy5zaWduVXAubGFiZWwpICsgXCJcXG4gICAgXCIpXVxuICAgICAgICApLFxuICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICBfYyhcbiAgICAgICAgICBcImEtYnV0dG9uLXNlY29uZGFyeVwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLiRyb3V0ZXIucHVzaChfdm0uUk9VVEVTLmFib3V0LnBhdGgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIFtfdm0uX3YoXCJcXG4gICAgICBcIiArIF92bS5fcyhfdm0uUk9VVEVTLmFib3V0LmxhYmVsKSArIFwiXFxuICAgIFwiKV1cbiAgICAgICAgKVxuICAgICAgXSxcbiAgICAgIDFcbiAgICApXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcImRpdlwiLFxuICAgIHtcbiAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwidG91Y2hcIixcbiAgICAgICAgICByYXdOYW1lOiBcInYtdG91Y2g6c3dpcGUubGVmdFwiLFxuICAgICAgICAgIHZhbHVlOiBfdm0ub3Blbk1lbnUsXG4gICAgICAgICAgZXhwcmVzc2lvbjogXCJvcGVuTWVudVwiLFxuICAgICAgICAgIGFyZzogXCJzd2lwZVwiLFxuICAgICAgICAgIG1vZGlmaWVyczogeyBsZWZ0OiB0cnVlIH1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHN0YXRpY0NsYXNzOiBcInQtcGFnZVwiXG4gICAgfSxcbiAgICBbX3ZtLl90KFwiZGVmYXVsdFwiKV0sXG4gICAgMlxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9hcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTZjMGEwZmMxJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL2FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL2FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9ob21lL2RvbWluaWsvUHJvamVjdHMvcmVoYXBwL2Zyb250ZW5kL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzZjMGEwZmMxJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzZjMGEwZmMxJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzZjMGEwZmMxJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9hcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTZjMGEwZmMxJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzZjMGEwZmMxJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvY29tcG9uZW50cy9hcHAudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vYXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01IS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vYXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9hcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTZjMGEwZmMxJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9idXR0b24udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE2YmExMTJmJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL2J1dHRvbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL2J1dHRvbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9ob21lL2RvbWluaWsvUHJvamVjdHMvcmVoYXBwL2Zyb250ZW5kL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzE2YmExMTJmJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzE2YmExMTJmJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzE2YmExMTJmJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9idXR0b24udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE2YmExMTJmJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzE2YmExMTJmJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvY29tcG9uZW50cy9hdG9tcy9idXR0b24udnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vYnV0dG9uLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vYnV0dG9uLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9idXR0b24udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE2YmExMTJmJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9wcmltYXJ5LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lMmNkYjhiYyZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9wcmltYXJ5LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vcHJpbWFyeS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9ob21lL2RvbWluaWsvUHJvamVjdHMvcmVoYXBwL2Zyb250ZW5kL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJ2UyY2RiOGJjJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2UyY2RiOGJjJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2UyY2RiOGJjJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9wcmltYXJ5LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lMmNkYjhiYyZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCdlMmNkYjhiYycsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwic3JjL2NvbXBvbmVudHMvYXRvbXMvYnV0dG9uL3ByaW1hcnkudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01IS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcHJpbWFyeS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3ByaW1hcnkudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3ByaW1hcnkudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWUyY2RiOGJjJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9zZWNvbmRhcnkudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc3NDA5YzE0JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL3NlY29uZGFyeS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL3NlY29uZGFyeS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9ob21lL2RvbWluaWsvUHJvamVjdHMvcmVoYXBwL2Zyb250ZW5kL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzc3NDA5YzE0JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzc3NDA5YzE0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzc3NDA5YzE0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9zZWNvbmRhcnkudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTc3NDA5YzE0JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzc3NDA5YzE0Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvY29tcG9uZW50cy9hdG9tcy9idXR0b24vc2Vjb25kYXJ5LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3NlY29uZGFyeS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL3NlY29uZGFyeS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vc2Vjb25kYXJ5LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03NzQwOWMxNCZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vbGluay1tZW51LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00ZGUxZjY2NSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9saW5rLW1lbnUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9saW5rLW1lbnUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvaG9tZS9kb21pbmlrL1Byb2plY3RzL3JlaGFwcC9mcm9udGVuZC9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc0ZGUxZjY2NScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc0ZGUxZjY2NScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc0ZGUxZjY2NScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vbGluay1tZW51LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00ZGUxZjY2NSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc0ZGUxZjY2NScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwic3JjL2NvbXBvbmVudHMvYXRvbXMvbGluay1tZW51LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2xpbmstbWVudS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2xpbmstbWVudS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbGluay1tZW51LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00ZGUxZjY2NSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vbG9hZGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xMzBiYzE5MCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9sb2FkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9sb2FkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvaG9tZS9kb21pbmlrL1Byb2plY3RzL3JlaGFwcC9mcm9udGVuZC9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcxMzBiYzE5MCcpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcxMzBiYzE5MCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcxMzBiYzE5MCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vbG9hZGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xMzBiYzE5MCZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcxMzBiYzE5MCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwic3JjL2NvbXBvbmVudHMvYXRvbXMvbG9hZGVyLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2xvYWRlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2xvYWRlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbG9hZGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xMzBiYzE5MCZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vc25hY2tiYXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTIxNTg1MGI3JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL3NuYWNrYmFyLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vc25hY2tiYXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvaG9tZS9kb21pbmlrL1Byb2plY3RzL3JlaGFwcC9mcm9udGVuZC9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcyMTU4NTBiNycpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcyMTU4NTBiNycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcyMTU4NTBiNycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vc25hY2tiYXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTIxNTg1MGI3JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzIxNTg1MGI3Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvY29tcG9uZW50cy9tb2xlY3VsZXMvc25hY2tiYXIudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vc25hY2tiYXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTUhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9zbmFja2Jhci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vc25hY2tiYXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTIxNTg1MGI3JlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9mb290ZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTZlOTgzNTE5JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL2Zvb3Rlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL2Zvb3Rlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9ob21lL2RvbWluaWsvUHJvamVjdHMvcmVoYXBwL2Zyb250ZW5kL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzZlOTgzNTE5JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzZlOTgzNTE5JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzZlOTgzNTE5JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9mb290ZXIudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTZlOTgzNTE5JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzZlOTgzNTE5Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvY29tcG9uZW50cy9vcmdhbmlzbXMvZm9vdGVyLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2Zvb3Rlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2Zvb3Rlci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vZm9vdGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD02ZTk4MzUxOSZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vaGVhZGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lMDZhY2RlYSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9oZWFkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9oZWFkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvaG9tZS9kb21pbmlrL1Byb2plY3RzL3JlaGFwcC9mcm9udGVuZC9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCdlMDZhY2RlYScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCdlMDZhY2RlYScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCdlMDZhY2RlYScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vaGVhZGVyLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1lMDZhY2RlYSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCdlMDZhY2RlYScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwic3JjL2NvbXBvbmVudHMvb3JnYW5pc21zL2hlYWRlci52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTUhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9oZWFkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTUhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9oZWFkZXIudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2hlYWRlci52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9ZTA2YWNkZWEmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL2xvYWRpbmcudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE3YzFkMDJlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL2xvYWRpbmcudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9sb2FkaW5nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL2hvbWUvZG9taW5pay9Qcm9qZWN0cy9yZWhhcHAvZnJvbnRlbmQvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMTdjMWQwMmUnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMTdjMWQwMmUnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMTdjMWQwMmUnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL2xvYWRpbmcudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE3YzFkMDJlJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzE3YzFkMDJlJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvY29tcG9uZW50cy9vcmdhbmlzbXMvbG9hZGluZy52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTUhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9sb2FkaW5nLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbG9hZGluZy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbG9hZGluZy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MTdjMWQwMmUmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL21lbnUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdlYmM3NDVkJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL21lbnUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9tZW51LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL2hvbWUvZG9taW5pay9Qcm9qZWN0cy9yZWhhcHAvZnJvbnRlbmQvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnN2ViYzc0NWQnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnN2ViYzc0NWQnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnN2ViYzc0NWQnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL21lbnUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTdlYmM3NDVkJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzdlYmM3NDVkJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvY29tcG9uZW50cy9vcmdhbmlzbXMvbWVudS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTUhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9tZW51LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbWVudS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vbWVudS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2ViYzc0NWQmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL2Vycm9yLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zYjQyMzhjNiZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9lcnJvci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL2Vycm9yLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL2hvbWUvZG9taW5pay9Qcm9qZWN0cy9yZWhhcHAvZnJvbnRlbmQvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnM2I0MjM4YzYnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnM2I0MjM4YzYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnM2I0MjM4YzYnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL2Vycm9yLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0zYjQyMzhjNiZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCczYjQyMzhjNicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwic3JjL2NvbXBvbmVudHMvcGFnZXMvZXJyb3IudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vZXJyb3IudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTUhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9lcnJvci52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vZXJyb3IudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTNiNDIzOGM2JlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi93ZWxjb21lLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00YTI0YTRiNyZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi93ZWxjb21lLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vd2VsY29tZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9ob21lL2RvbWluaWsvUHJvamVjdHMvcmVoYXBwL2Zyb250ZW5kL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzRhMjRhNGI3JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzRhMjRhNGI3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzRhMjRhNGI3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi93ZWxjb21lLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00YTI0YTRiNyZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc0YTI0YTRiNycsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwic3JjL2NvbXBvbmVudHMvcGFnZXMvd2VsY29tZS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTUhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi93ZWxjb21lLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vd2VsY29tZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vd2VsY29tZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGEyNGE0YjcmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL3BhZ2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRhMmI4MzM1JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL3BhZ2UudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9wYWdlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL2hvbWUvZG9taW5pay9Qcm9qZWN0cy9yZWhhcHAvZnJvbnRlbmQvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNGEyYjgzMzUnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNGEyYjgzMzUnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNGEyYjgzMzUnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL3BhZ2UudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTRhMmI4MzM1JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzRhMmI4MzM1Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMvcGFnZS52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTUhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9wYWdlLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcGFnZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vcGFnZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NGEyYjgzMzUmXCIiLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgVnVlSTE4biBmcm9tICd2dWUtaTE4bic7XG5pbXBvcnQgeyBwbCB9IGZyb20gJ3NyYy9kaWN0aW9uYXJ5L2xhbmd1YWdlL3BsJztcblxuVnVlLnVzZShWdWVJMThuKTtcblxuY29uc3QgaTE4biA9IG5ldyBWdWVJMThuKHtcbiAgbG9jYWxlOiAncGwnLFxuICBtZXNzYWdlczoge1xuICAgIHBsLFxuICB9LFxufSk7XG5cbmV4cG9ydCBjb25zdCB0cmFuc2xhdG9yID0gaTE4bjtcbmV4cG9ydCBkZWZhdWx0IGkxOG47XG4iLCJleHBvcnQgY29uc3QgcGwgPSB7XG4gIHRpdGxlOiB7XG4gICAgZXJyb3I6ICdCxYLEhWQgNDA0JyxcbiAgICB3ZWxjb21lOiAnU3Ryb25hIHBvd2l0YWxuYScsXG4gICAgYWJvdXQ6ICdPIG5hcycsXG4gICAgc2hvcnQ6IHtcbiAgICAgIGVycm9yOiAnQsWCxIVkJyxcbiAgICB9LFxuICB9LFxuICBnZW5lcmFsOiB7XG4gICAgc2hvd01vcmU6ICdwb2thxbwmbmJzcDt3acSZY2VqLi4uJyxcbiAgICBwb2ludFVuaXQ6ICdwa3QnLFxuICAgIHBvaW50Q2F0ZWdvcnlMZXZlbDogJ3BvemlvbScsXG4gICAgcG9pbnRUZW1wb3Jhcnk6ICdDemFzb3d5JyxcbiAgICBwb2ludFBlcm1hbmVudDogJ0RvIHplYnJhbmlhJyxcbiAgICBiYWNrVG9TdGFydDogJ1ByemVqZMW6IGRvIHN0YXJ0b3dlaicsXG4gICAgYmFja1RvV2VsY29tZTogJ1ByemVqZMW6IGRvIHBvY3rEhXRrb3dlaicsXG4gICAgYWxyZWFkeUNvbGxlY3RlZFNob3J0OiAnWmRvYnlsacWbY2llJyxcbiAgICBmdWxsQWRtaW46ICdVcHJhd25pZW5pYSBhZG1pbmlzdHJhdG9yYScsXG4gICAgbGltaXRlZEFkbWluOiAnVXByYXduaWVuaWEgb2JzZXJ3YXRvcmEnLFxuICAgIGhpZGU6ICdVa3J5aicsXG4gICAgZWRpdDogJ0VkeXR1aicsXG4gICAgbG9nb3V0OiAnV3lsb2d1aicsXG4gICAgcmVtb3ZlOiAnVXN1xYQnLFxuICAgIGNvcGllZDogJ1Nrb3Bpb3dhbm8gZG8gc2Nob3drYScsXG4gICAgaGVsbG86ICdDemXFm8SHJyxcbiAgICBzYXZlZDogJ1phcGlzYW5vIScsXG4gICAgbGlnaHRUaGVtZTogJ0phc255IHRyeWInLFxuICAgIGRhcmtUaGVtZTogJ0NpZW1ueSB0cnliJyxcbiAgfSxcbiAgZm9ybToge1xuICAgIGZpZWxkOiB7XG4gICAgICBlbWFpbDogJ0UtbWFpbCcsXG4gICAgICBwYXNzd29yZDogJ0hhc8WCbycsXG4gICAgICByZVBhc3N3b3JkOiAnUG93dMOzcnogaGFzxYJvJyxcbiAgICAgIG5ld1Bhc3N3b3JkOiAnTm93ZSBoYXPFgm8nLFxuICAgICAgcmVOZXdQYXNzd29yZDogJ1Bvd3TDs3J6IG5vd2UgaGFzxYJvJyxcbiAgICAgIHVzZXJUZWFtOiAnTmF6d2EgcGF0cm9sdScsXG4gICAgICBldmVudE5hbWU6ICdOYXp3YSB3eWRhcnplbmlhJyxcbiAgICAgIGV2ZW50SWQ6ICdLb2Qgd3lkYXJ6ZW5pYScsXG4gICAgICBwb2ludElkOiAnS29kIHB1bmt0dScsXG4gICAgICBwb2ludE5hbWU6ICdOYXp3YSBwdW5rdHUnLFxuICAgICAgcG9pbnRUeXBlOiAnVHlwIHB1bmt0dScsXG4gICAgICBwb2ludERhdGVBbmRBcHBlYXJhbmNlVGltZTogJ0RhdGEgaSBjemFzIHBvamF3aWVuaWEgc2nEmSBwdW5rdHUnLFxuICAgICAgcG9pbnREYXRlQW5kRXhwaXJhdGlvblRpbWU6ICdEYXRhIGkgY3phcyB3eWdhxZtuacSZY2lhIHB1bmt0dScsXG4gICAgICBwb2ludENhdGVnb3J5OiAnS2F0ZWdvcmlhIHB1bmt0dScsXG4gICAgICBtYXBSZWZyZXNoVGltZTogJ09kxZt3aWXFvGFuaWUgcHVua3TDs3cgbmEgbWFwaWUgY28nLFxuICAgICAgZXZlbnRTdGFydERhdGU6ICdEYXRhIGkgY3phcyByb3pwb2N6xJljaWEgd3lkYXJ6ZW5pYScsXG4gICAgICBldmVudEVuZERhdGU6ICdEYXRhIGkgY3phcyB6YWtvxYRjemVuaWEgd3lkYXJ6ZW5pYScsXG4gICAgfSxcbiAgICBhc3Npc3Q6IHtcbiAgICAgIHBvaW50SWQ6ICdLb2QgcHVua3R1IGplc3QgZ2VuZXJvd2FueSBhdXRvbWF0eWN6bmllJyxcbiAgICAgIGV2ZW50SWQ6ICdLb2Qgd3lkYXJ6ZW5pYSBqZXN0IGdlbmVyb3dhbnkgYXV0b21hdHljem5pZScsXG4gICAgICBmaWVsZE5vdFJlcXVpcmVkOiAnUG9sZSBqZXN0IG5pZW9ib3dpxIV6a293ZScsXG4gICAgICB1c2VyVGVhbTogJ05hendhIHBhdHJvbHUgbXVzaSBiecSHIHVuaWthdG93YScsXG4gICAgfSxcbiAgICB2YWxpZGF0aW9uOiB7XG4gICAgICByZXF1aXJlZDogJ1BvbGUgamVzdCB3eW1hZ2FuZS4nLFxuICAgICAgZW1haWw6ICdNdXNpc3ogcG9kYcSHIHBvcHJhd255IGFkcmVzIGVtYWlsLicsXG4gICAgICBtaW46ICdQb2xlIG11c2kgc2vFgmFkYcSHIHNpxJkgeiBjbyBuYWptbmllaiB7bGVuZ3RofSB6bmFrw7N3LicsXG4gICAgICBtYXg6ICdQb2xlIG11c2kgc2vFgmFkYcSHIHNpxJkgeiBjbyBuYWptbmllaiB7bGVuZ3RofSB6bmFrw7N3LicsXG4gICAgICBjb25maXJtZWQ6ICdQb2xlIG5pZSB6Z2FkemEgc2nEmSB6IHBvbGVtIHBvdHdpZXJkemFqxIVjeW0ge3RhcmdldH0uJyxcbiAgICAgIGxlbmd0aDogJ1BvbGUgbXVzaSBtaWXEhyBkxYJ1Z2/Fm8SHIHtsZW5ndGh9LicsXG4gICAgICBoYXNOdW1iZXI6ICdQb2xlIHBvd2lubm8gemF3aWVyYcSHIGNvIG5ham1uaWVqIGplZG7EhSBjeWZyxJkuJyxcbiAgICAgIGhhc0NhcGl0YWxpemU6ICdQb2xlIHBvd2lubm8gemF3aWVyYcSHIGNvIG5ham1uaWVqIGplZG7EhSB3aWVsa8SFIGxpdGVyxJkuJyxcbiAgICB9LFxuICAgIGJ1dHRvbjoge1xuICAgICAgc2F2ZTogJ1phcGlzeicsXG4gICAgICBjaG9vc2U6ICd3eWJpZXJ6JyxcbiAgICAgIG5leHQ6ICdEYWxlaicsXG4gICAgICBnb1RvTG9naW46ICdQcnplamTFuiBkbyBsb2dvd2FuaWEnLFxuICAgICAgc2V0RGVmYXVsdE1hcFBvc2l0aW9uQW5kWm9vbTogJ1VzdGF3IHBvenljasSZIG1hcHknLFxuICAgICAgc2V0UG9pbnRNYXBQb3NpdGlvbjogJ1VzdGF3IGxva2FsaXphY2rEmSBwdW5rdHUnLFxuICAgIH0sXG4gIH0sXG4gIHBhZ2U6IHtcbiAgICBhYm91dDoge1xuICAgICAgYXBwSW5mbzogYHRvIGFwbGlrYWNqYSBwcnplem5hY3pvbmEgZG8gcHJ6ZXByb3dhZHphbmlhIGdpZXIgdGVyZW5vd3ljaCBkbGEgaGFyY2VyenkgaSBuaWUgdHlsa28uIFBvbXlzxYJvZGF3Y8SFXG4gICAgICAgIHByb2pla3R1IGplc3QgZHJ1xbx5bm93eSB6IEh1ZmNhIFpIUCBHZHluaWFgLFxuICAgICAgbW9yZTogYERvbWluaWsgQmV0a2EsIGt0w7NyeSBqZXN0IHogemF3b2R1IHByb2dyYW1pc3TEhS4gWmVicmHFgiBvbiB6ZXNww7PFgiBvc8OzYiB6IGJyYW7FvHksXG4gICAgICAgIGt0w7NyZSBjaGNpYcWCeSBwb23Ds2MgdyBmb3JtaWUgd29sb250YXJpYXR1LiBQb25pxbxlaiBtb8W8ZWNpZSBwb3puYcSHIGx1ZHppLCBrdMOzcnp5IHBvxZt3acSZY2lsaSBzd8OzaiBcbiAgICAgICAgY3phcyBuYSBzdHdvcnplbmllIHRhayBjaWVrYXdlZ28gcHJvamVrdHUuIER6acSZa3VqxJkgdHltIG9zb2LEhSB6YSB0xIUgY2nEmcW8a8SFIHByYWPEmS5gLFxuICAgICAgYXV0aG9yczogJ08gdHfDs3JjYWNoJyxcbiAgICAgIGxlYWRlcjogJ1RlYW0gbGVhZGVyJyxcbiAgICAgIGZyb250RGV2OiAnRnJvbnQtZW5kIERldmVsb3BlcicsXG4gICAgICBmdWxsc3RhY2s6ICdGdWxsLXN0YWNrIERldmVsb3BlcicsXG4gICAgICBiYWNrRGV2OiAnQmFjay1lbmQgRGV2ZWxvcGVyJyxcbiAgICAgIHV4RGVzaWduZXI6ICdVWCBEZXNpZ25lcicsXG4gICAgfSxcbiAgICBlcnJvcjoge1xuICAgICAgdGl0bGU6ICdCxYLEhWQgNDA0JyxcbiAgICAgIGNvbnRlbnQ6IGBDemXFm8SHISA8YnI+XG4gICAgICAgIFd5Z2zEhWRhIG5hIHRvLCDFvGUgem5hamR1amVzeiBzacSZIG5pZSB0YW0gZ2R6aWUgdHJ6ZWJhLi4uIDxicj5cbiAgICAgICAgPGJyPlxuICAgICAgICBQb3N6dWthaiBpbm5laiBkcm9naSEgOilgLFxuICAgIH0sXG4gIH0sXG4gIGVycm9yOiB7XG4gICAgaW5jb21wYXRpYmxlQXBwVmVyc2lvbjogJ1NlcndlciBqZXN0IG5pZWtvbXBhdHliaWxueSB6IGFwbGlrYWNqxIUuIFNrb250YWt0dWogc2nEmSB6IHR3w7NyY8SFIGFwbGlrYWNqaScsXG4gICAgZXZlbnRJZElzUmVxdWlyZWQ6ICdLb2Qgd3lkYXJ6ZW5pYSBqZXN0IHd5bWFnYW55JyxcbiAgICBlbGVtZW50SWRJc1JlcXVpcmVkRm9yTWFwOiAnS29kIHd5ZGFyemVuaWEgamVzdCB3eW1hZ2FueSwgYnkgdXJ1Y2hvbWnEhyBtYXDEmScsXG4gICAgZmFrZUVycm9ySW5Nb2NrQXBpOiAnRmHFgnN6eXd5IGLFgsSFZCBtb2NrQXBpJyxcbiAgICBkYXRhQWZ0ZXJTaWduSW46ICdMb2dvd2FuaWUgbmllIHBvd2lvZMWCbyBzacSZIHplIHd6Z2zEmWR1IG5hIHByb2JsZW0geiBwb2JyYW5pZW0gZGFueWNoIGRvdHljesSFY3ljaCBrb250YS4gU3Byw7NidWogcG9ub3duaWUuJyxcbiAgfSxcbiAgYXBpV2Fybjoge1xuICAgIHVuZGVmaW5lZDogJ1d5c3TEhXBpxYJvIG5pZXpkZWZpbmlvd2FuZSBvc3RyemXFvGVuaWUuIFNrb250YWt0dWogc2nEmSB6IHR3w7NyY8SFIGFwbGlrYWNqaS4nLFxuICAgIGZpcnN0V2FybkZyb21Dcm9zc2RldmljZVZpc2l0OiAnTmllIGxvZ3VqIHNpxJkgdGFrIGN6xJlzdG8gbmEgcsOzxbxueWNoIHVyesSFZHplbmlhY2guIFcgaW5ueW0gd3lwYWRrdSBuYSB0YWvEhSBtb8W8bGl3b8WbxIcgem9zdGFuaWUgbmHFgm/FvG9uYSBjemFzb3dhIGJsb2thZGEuJyxcbiAgICBsYXN0V2FybkZyb21Dcm9zc2RldmljZVZpc2l0OiAnWmJ5dCBjesSZc3RvIGxvZ3VqZXN6IHNpxJkgbmEgcsOzxbxueWNoIHVyesSFZHplbmlhY2guIE1vxbxlc3ogdG8genJvYmnEhyBvc3RhdG5pIHJheiBwb3RlbSB6YWJsb2t1amVteSBDaSB0YWvEhSBtb8W8bGl3b8WbxIcgbmEgMSBnb2R6aW7EmS4nLFxuICAgIGxhc3RDcm9zc2RldmljZV92aXNpdDogJ1pieXQgY3rEmXN0byBsb2d1amVzeiBzacSZIG5hIHLDs8W8bnljaCB1cnrEhWR6ZW5pYWNoLiBPZCB0ZXJheiBwcnpleiAxIGdvZHppbsSZIG5pZSBtb8W8ZXN6IHphbG9nb3dhxIcgc2nEmSBuYSBpbm55bSB1cnrEhWR6ZW5pdS4nLFxuICB9LFxuICBhcGlFcnJvcjoge1xuICAgIHVuZGVmaW5lZDogJ1d5c3TEhXBpxYIgbmllemRlZmluaW93YW55IGLFgsSFZC4gU2tvbnRha3R1aiBzacSZIHogdHfDs3JjxIUgYXBsaWthY2ppLicsXG4gICAgdW5hdXRob3JpemVkQWNjZXNzOiAnQnJhayB1cHJhd25pZcWEISBab3N0YcWCZcWbIGF1dG9tYXR5Y3puaWUgd3lsb2dvd2FueS4nLFxuICAgIG5vdE9ubGluZTogJ1V0cmF0YSBwb8WCxIVjemVuaWEgeiBzZXJ3ZXJlbS4gWmEgY2h3aWzEmSBuYXN0xIVwaSBwb25vd25hIHByw7NiYSBwb8WCxIVjemVuaWEuJyxcbiAgICB0b01hbnlDcm9zc2RldmljZVZpc2l0czogJ05hIHRlIGtvbnRvIG5hxYJvxbxvbmEgamVzdCBjemFzb3dhIGJsb2thZGEgbmEgbW/FvGxpd2/Fm8SHIGxvZ293YW5pYSBzacSZIG5hIHLDs8W8bnljaCB1cnrEhWR6ZW5pYWNoLiBaYWxvZ3VqIHNpxJkgbmEgb3N0YXRuaW8gemFsb2dvd2FueW0gdXJ6xIVkemVuaXUuJyxcblxuICAgIGdldEV2ZW50QnlJZDogJ1BvYmllcmFuaWUgZGFueWNoIHd5ZGFyemVuaWEgc2nEmSBuaWUgcG93aW9kxYJvLicsXG4gICAgZ2V0UG9pbnRzQnlFdmVudElkOiAnUG9iaWVyYW5pZSBwdW5rdMOzdyBkbGEgd3licmFuZWdvIHd5ZGFyemVuaWEgc2nEmSBuaWUgcG93aW9kxYJvLicsXG4gICAgZ2V0Q2F0ZWdvcmllc0J5RXZlbnRJZDogJ1BvYmllcmFuaWUga2F0ZWdvcmlpIGRsYSB3eWJyYW5lZ28gd3lkYXJ6ZW5pYSBzacSZIG5pZSBwb3dpb2TFgm8uJyxcbiAgICB1cGRhdGVFdmVudDogJ0VkeWNqYSBkYW55Y2ggZGxhIHd5YnJhbmVnbyB3eWRhcnplbmlhIHNpxJkgbmllIHBvd2lvZMWCYS4nLFxuICAgIGV2ZW50U3RhcnREYXRlSXNFbXB0eTogJ0RhdGEgaSBjemFzIHJvenBvY3rEmWNpYSB3eWRhcnplbmlhIG11c2kgYnnEhyB1enVwZcWCbmlvbmEuJyxcbiAgICBldmVudEVuZERhdGVJc0VtcHR5OiAnRGF0YSBpIGN6YXMgemFrb8WEY3plbmlhIHd5ZGFyemVuaWEgbXVzaSBiecSHIHV6dXBlxYJuaW9uYS4nLFxuICAgIGV2ZW50SXNPdXRPZkRhdGU6ICdQdW5rdCBuaWUgem9zdGHFgiB6ZWJyYW55LCBwb25pZXdhxbwgd3lkYXJ6ZW5pZSB6b3N0YcWCbyB6YWtvxYRjem9uZS4nLFxuICAgIGV2ZW50QmVmb3JlU3RhcnQ6ICdQdW5rdCBuaWUgem9zdGHFgiB6ZWJyYW55LCBwb25pZXdhxbwgd3lkYXJ6ZW5pZSBuaWUgem9zdGHFgm8gcm96cG9jesSZdGUuJyxcbiAgICBjb2xsZWN0UG9pbnQ6ICdaZWJyYW5pZSBwdW5rdHUgbmllIHBvd2lvZMWCbyBzacSZIHByemV6IGLFgsSFZCBzZXJ3ZXJhLicsXG4gICAgcG9pbnRDb2xsZWN0ZWRFYXJsaWVyOiAnUHVua3QgbyBwb2RhbnltIGtvZHppZSB6b3N0YcWCIHplYnJhbnkgd2N6ZcWbbmllai4nLFxuICAgIHBvaW50Tm9FeGlzdDogJ1B1bmt0IG8gcG9kYW55bSBrb2R6aWUgbmllIGlzdG5pZWplLicsXG4gICAgYWRkUG9pbnQ6ICdEb2RhbmllIHB1bmt0dSBuaWUgcG93aW9kxYJvIHNpxJkuJyxcbiAgICBlZGl0UG9pbnQ6ICdFZHljamEgcHVua3R1IG5pZSBwb3dpb2TFgmEgc2nEmS4nLFxuICAgIHJlbW92ZVBvaW50OiAnVXN1d2FuaWUgcHVua3R1IG5pZSBwb3dpb2TFgm8gc2nEmSBwcnpleiBixYLEhWQgc2Vyd2VyYS4nLFxuICAgIHBvaW50SWRPckV2ZW50SWROb3RFeGlzdDogJ0tvZCBwdW5rdHUgbHViIHd5ZGFyemVuaWEgamVzdCBuaWVwb3ByYXdueS4nLFxuXG4gICAgYWxsOiAnUG9icmFuaWUgbGlzdHkgdcW8eXRrb3duaWvDs3cgbmllIHBvd2lvZMWCbyBzacSZIHplIHd6Z2zEmWR1IG5hIGLFgsSFZCBzZXJ3ZXJhLicsXG4gICAgc2lnbkluOiAnTG9nb3dhbmllIG5pZSBwb3dpb2TFgm8gc2nEmSB6ZSB3emdsxJlkdSBuYSBixYLEhWQgc2Vyd2VyYS4nLFxuICAgIHNpZ25JbkRhdGE6ICdMb2dvd2FuaWUgbmllIHBvd2lvZMWCbyBzacSZIHogcG93b2R1IGLFgsSZZG5lZ28gZS1tYWlsIGx1YiBoYXPFgmEuJyxcbiAgICBzaWduSW5Pbk90aGVyRGV2aWNlOiAnTmllIG1vxbxlc3ogc2nEmSB6YWxvZ293YcSHIOKAlCBqZXN0ZcWbIHphbG9nb3dhbnkgbmEgaW5ueW0gdXJ6xIVkemVuaXUuJyxcbiAgICBpbmFjdGl2ZUFjY291bnQ6ICdLb250byBqZXN0IG5pZWFrdHl3bmUgLSBzcHJhd2TFuiBlLW1haWwgaSB6YWt0eXd1aiBrb250by4nLFxuICAgIGNoZWNrWW91ckxvZ2luU2Vzc2lvbjogJ1R3b2phIHNlc2phIGplc3QgcHVzdGEg4oCUIG5pZSBqZXN0ZcWbIHphbG9nb3dhbnkuJyxcbiAgICBzaWduVXA6ICdSZWplc3RyYWNqYSBuaWUgcG93aW9kxYJhIHNpxJkgemUgd3pnbMSZZHUgbmEgYsWCxIVkIHNlcndlcmEuJyxcbiAgICBldmVudElkTm90RXhpc3Q6ICdQb2Rhbnkga29kIHd5ZGFyemVuaWEgamVzdCBuaWVwb3ByYXdueS4nLFxuICAgIHVzZXJFeGlzdDogJ1XFvHl0a293bmlrIG8gcG9kYW55bSBlLW1haWwgbHViIG5hendpZSBwYXRyb2x1IGp1xbwgaXN0bmllamUuJyxcbiAgICByZW1pbmRQYXNzd29yZDogJ1d5c3nFgmFuaWUgcHJ6eXBvbW5pZW5pYSBoYXPFgmEgbmllIHBvd2lvZMWCbyBzacSZIHplIHd6Z2zEmWR1IG5hIGLFgsSFZCBzZXJ3ZXJhLicsXG4gICAgc2lnbk91dDogJ1d5bG9nb3dhbmllIHBvIHN0cm9uaWUgc2Vyd2VyYSBuaWUgcG93aW9kxYJvLiBab3N0YcWCZcWbIHd5bG9nb3dhbnkgbG9rYWxuaWUuJyxcbiAgICBjaGFuZ2VQYXNzd29yZDogJ1ptaWFuYSBoYXPFgmEgc2nEmSBuaWUgcG93aW9kxYJhIHplIHd6Z2zEmWR1IG5hIGLFgsSFZCBzZXJ3ZXJhLicsXG4gIH0sXG4gIGNvbW11bmljYXRlOiB7XG4gICAgY2hhbmdlUGFzc3dvcmQ6IHtcbiAgICAgIHN1Y2Nlc3M6ICdUd29qZSBoYXPFgm8gem9zdGHFgm8gem1pZW5pb25lIScsXG4gICAgfSxcbiAgfSxcbiAgZmVhdHVyZXM6IHt9LFxufTtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcblxuVnVlLmRpcmVjdGl2ZSgnY2xpY2stb3V0c2lkZScsIHtcbiAgcHJpb3JpdHk6IDcwMCxcbiAgYmluZCAoZWwsIGRhdGEsIHZtKSB7XG4gICAgZGF0YS5kZWYuZXZlbnQgPSAoKSA9PiB7XG4gICAgICB2bS5jb250ZXh0W2RhdGEuZXhwcmVzc2lvbl0oKTtcbiAgICB9O1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGF0YS5kZWYuc3RvcFByb3ApO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkYXRhLmRlZi5ldmVudCk7XG4gIH0sXG4gIHVuYmluZCAoZWwsIGRhdGEpIHtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGRhdGEuZGVmLnN0b3BQcm9wKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGF0YS5kZWYuZXZlbnQpO1xuICB9LFxuICBzdG9wUHJvcCAoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSxcbn0pO1xuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IGkxOG4gZnJvbSAnLi9kaWN0aW9uYXJ5JztcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9yb3V0ZXInO1xuaW1wb3J0IHsgc3RvcmUgfSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgeyBzdHlsZU1hbmFnZXIgfSBmcm9tICd1dGlscy9zdHlsZS1tYW5hZ2VyJztcbmltcG9ydCAnLi9kaXJlY3RpdmVzJztcbmltcG9ydCAnLi92YWxpZGF0aW9uJztcbmltcG9ydCB7IFJPVVRFUyB9IGZyb20gJ3V0aWxzL21hY3Jvcy9yb3V0ZXMnO1xuaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvYXBwLnZ1ZSc7XG5pbXBvcnQgVnVlRWxsaXBzZVByb2dyZXNzIGZyb20gJ3Z1ZS1lbGxpcHNlLXByb2dyZXNzJztcbmltcG9ydCBWdWUyVG91Y2hFdmVudHMgZnJvbSAndnVlMi10b3VjaC1ldmVudHMnO1xuaW1wb3J0IFZ1ZU1hdGVyaWFsSWNvbnMgZnJvbSAnQGRiZXRrYS92dWUtbWF0ZXJpYWwtaWNvbnMnO1xuXG5zdHlsZU1hbmFnZXIuaW5pdCgpO1xuXG5WdWUuY29uZmlnLnByb2R1Y3Rpb25UaXAgPSBmYWxzZTtcblxuaWYgKFBST0RVQ1RJT04gPT09IGZhbHNlKSB7XG4gIGNvbnNvbGUubG9nKEFQUF9OQU1FICsgJyB2JyArIFZFUlNJT04gKyAnIGluIGRldmVsb3BtZW50IG1vZGUnKTtcbn1cblxuVnVlLm1peGluKHtcbiAgY29tcHV0ZWQ6IHtcbiAgICBST1VURVM6ICgpID0+IFJPVVRFUyxcbiAgfSxcbn0pO1xuXG5WdWUudXNlKFZ1ZTJUb3VjaEV2ZW50cyk7XG5WdWUudXNlKFZ1ZUVsbGlwc2VQcm9ncmVzcyk7XG5WdWUudXNlKFZ1ZU1hdGVyaWFsSWNvbnMpO1xuXG5uZXcgVnVlKHtcbiAgcm91dGVyLFxuICBzdG9yZSxcbiAgaTE4bixcbiAgcmVuZGVyOiBoID0+IGgoQXBwKSxcbn0pLiRtb3VudCgnI2FwcCcpO1xuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IFJvdXRlciBmcm9tICd2dWUtcm91dGVyJztcbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAnc3RvcmUnO1xuaW1wb3J0IHsgcHJvbWlzZSB9IGZyb20gJ3V0aWxzL3Byb21pc2UnO1xuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi9yb3V0ZXMnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlIH0gZnJvbSAndXRpbHMvZXJyb3ItbWVzc2FnZSc7XG4vLyBpbXBvcnQgeyBST1VURVMgfSBmcm9tICd1dGlscy9tYWNyb3Mvcm91dGVzJztcbi8vIGltcG9ydCB7IGFwaSB9IGZyb20gJ2FwaSc7XG4vLyBpbXBvcnQgeyB2ZXJzaW9uQ29tcGF0aWJpbGl0eSB9IGZyb20gJ3V0aWxzL3ZlcnNpb24tY29tcGF0aWJpbGl0eSc7XG4vLyBpbXBvcnQgeyBzZXNzaW9uIH0gZnJvbSAndXRpbHMvc2Vzc2lvbic7XG5cbmxldCBmaXJzdFJ1biA9IHRydWU7XG5cblZ1ZS51c2UoUm91dGVyKTtcblxuY29uc3Qgcm91dGVyID0gbmV3IFJvdXRlcih7XG4gIG1vZGU6ICdoaXN0b3J5JyxcbiAgYmFzZTogcHJvY2Vzcy5lbnYuQkFTRV9VUkwsXG4gIHJvdXRlcyxcbn0pO1xuXG5yb3V0ZXIuYmVmb3JlRWFjaCgodG8sIGZyb20sIG5leHQpID0+IHtcbiAgbGV0IHByb21pc2U7XG4gIGlmIChmaXJzdFJ1bikge1xuICAgIGZpcnN0UnVuID0gZmFsc2U7XG4gICAgcHJvbWlzZSA9IG1ha2VGaXJzdFJ1bigpO1xuICB9IGVsc2Uge1xuICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIHByb21pc2VcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvck1lc3NhZ2UpIGVycm9yLnNob3dNZXNzYWdlKCk7XG4gICAgICBlbHNlIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgfSlcbiAgICAuZmluYWxseSgoKSA9PiB7XG4gICAgICByZWRpcmVjdElmTm90QXV0aCh0bywgZnJvbSwgbmV4dCk7XG4gICAgICBzdG9yZS5jb21taXQoJ21lbnUvY2xvc2UnKTtcbiAgICB9KTtcbn0pO1xuXG5yb3V0ZXIuaGFyZFJlbG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgc3RvcmUuY29tbWl0KCdpbmNyZWFzZVJvdXRlcklkJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG5cbmZ1bmN0aW9uIG1ha2VGaXJzdFJ1biAoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gYXBpLmluZm9ybWF0aW9uKClcbiAgICAvLyAgIC50aGVuKHZlcnNpb25Db21wYXRpYmlsaXR5LmNoZWNrKVxuICAgIC8vICAgLnRoZW4oc2Vzc2lvbi50cnlMb2dpbilcbiAgICBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgIC5jYXRjaChyZWplY3QpXG4gICAgICAuZmluYWxseSgoKSA9PiBwcm9taXNlLnRpbWVvdXQoMTAwMCkpXG4gICAgICAuZmluYWxseSgoKSA9PiBzdG9yZS5jb21taXQoJ3NldElzTG9hZGluZycsIGZhbHNlKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWRpcmVjdElmTm90QXV0aCAodG8sIGZyb20sIG5leHQpIHtcbiAgLy8gY29uc3QgaXNMb2dpbiA9IHN0b3JlLmdldHRlcnNbJ3VzZXIvaXNMb2dpbiddID09PSB0cnVlO1xuICAvLyBjb25zdCBhZG1pblJlcXVpcmVkID0gdG8ubWV0YS5hZG1pbk9ubHkgPT09IHRydWU7XG4gIC8vIGNvbnN0IHVubGltaXRlZE9ubHkgPSB0by5tZXRhLnVubGltaXRlZE9ubHkgPT09IHRydWU7XG4gIC8vIGNvbnN0IGlzQWRtaW4gPSBwZXJtaXNzaW9ucy5jaGVja0lzQWRtaW4oKTtcbiAgLy8gY29uc3QgaXNMaW1pdGVkVXNlciA9IHBlcm1pc3Npb25zLmNoZWNrSXNMaW1pdGVkKCk7XG4gIC8vXG4gIC8vIGlmICh0byA9PT0gZnJvbSkge1xuICAvLyAgIG5leHQoZmFsc2UpO1xuICAvLyB9XG4gIC8vIGlmIChhZG1pblJlcXVpcmVkICYmIGlzQWRtaW4gPT09IGZhbHNlKSB7XG4gIC8vICAgaWYgKGlzTG9naW4pIHtcbiAgLy8gICAgIG5leHQoUk9VVEVTLnN0YXJ0LnBhdGgpO1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vICAgICBuZXh0KFJPVVRFUy53ZWxjb21lLnBhdGgpO1xuICAvLyAgIH1cbiAgLy8gICByZXR1cm47XG4gIC8vIH1cbiAgLy8gaWYgKHVubGltaXRlZE9ubHkgJiYgaXNMaW1pdGVkVXNlcikge1xuICAvLyAgIGlmIChpc0xvZ2luKSB7XG4gIC8vICAgICBuZXh0KFJPVVRFUy5zdGFydC5wYXRoKTtcbiAgLy8gICB9IGVsc2Uge1xuICAvLyAgICAgbmV4dChST1VURVMud2VsY29tZS5wYXRoKTtcbiAgLy8gICB9XG4gIC8vICAgcmV0dXJuO1xuICAvLyB9XG4gIC8vIGlmIChpc0xvZ2luKSB7XG4gIC8vICAgaWYgKHRvLm1ldGEub25seUJlZm9yZUxvZ2luKSB7XG4gIC8vICAgICBuZXh0KFJPVVRFUy5zdGFydC5wYXRoKTtcbiAgLy8gICAgIHJldHVybjtcbiAgLy8gICB9XG4gIC8vIH0gZWxzZSB7XG4gIC8vICAgaWYgKHRvLm1ldGEucmVxdWlyZWRBdXRoID09PSB0cnVlKSB7XG4gIC8vICAgICBuZXh0KFJPVVRFUy53ZWxjb21lLnBhdGgpO1xuICAvLyAgICAgcmV0dXJuO1xuICAvLyAgIH1cbiAgLy8gfVxuICBuZXh0KCk7XG59XG4iLCJpbXBvcnQgeyBnZXREYXRhRm9yUm91dGVyLCBST1VURVMgfSBmcm9tICd1dGlscy9tYWNyb3Mvcm91dGVzJztcbmltcG9ydCBQV2VsY29tZSBmcm9tICdwYWdlcy93ZWxjb21lJztcbmltcG9ydCBQRXJyb3IgZnJvbSAncGFnZXMvZXJyb3InO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzID0gW1xuICBbUk9VVEVTLmVycm9yLCBQRXJyb3JdLFxuICBbUk9VVEVTLndlbGNvbWUsIFBXZWxjb21lXSxcbiAgW1JPVVRFUy5hYm91dCwgKCkgPT4gaW1wb3J0KCdwYWdlcy9hYm91dC52dWUnKV0sXG5dXG4gIC5tYXAoKFtyb3V0ZSwgY29tcG9uZW50XSkgPT4gKHtcbiAgICAuLi5nZXREYXRhRm9yUm91dGVyKHJvdXRlKSxcbiAgICBjb21wb25lbnQsXG4gIH0pKTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZXNwYWNlZDogdHJ1ZSxcbiAgc3RhdGU6IHtcbiAgICBwYWdlVGl0bGU6ICcnLFxuICAgIGJhY2tSb3V0ZU5hbWU6ICcnLFxuICB9LFxuICBnZXR0ZXJzOiB7XG4gICAgcGFnZVRpdGxlOiBzdGF0ZSA9PiBzdGF0ZS5wYWdlVGl0bGUsXG4gICAgYmFja1JvdXRlTmFtZTogc3RhdGUgPT4gc3RhdGUuYmFja1JvdXRlTmFtZSxcbiAgfSxcbiAgbXV0YXRpb25zOiB7XG4gICAgc2V0UGFnZVRpdGxlOiAoc3RhdGUsIHBheWxvYWQgPSAnJykgPT4gKHN0YXRlLnBhZ2VUaXRsZSA9IHBheWxvYWQpLFxuICAgIHNldEJhY2tSb3V0ZU5hbWU6IChzdGF0ZSwgcGF5bG9hZCA9ICcnKSA9PiAoc3RhdGUuYmFja1JvdXRlTmFtZSA9IHBheWxvYWQpLFxuICB9LFxuICBhY3Rpb25zOiB7fSxcbn07XG4iLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgVnVleCBmcm9tICd2dWV4JztcbmltcG9ydCBtZW51IGZyb20gJy4vbWVudSc7XG5pbXBvcnQgdGhlbWUgZnJvbSAnLi90aGVtZSc7XG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vaGVhZGVyJztcbmltcG9ydCBzbmFja2JhciBmcm9tICcuL3NuYWNrYmFyJztcblxuVnVlLnVzZShWdWV4KTtcblxuZXhwb3J0IGNvbnN0IHN0b3JlID0gbmV3IFZ1ZXguU3RvcmUoe1xuICBtb2R1bGVzOiB7XG4gICAgbWVudSxcbiAgICB0aGVtZSxcbiAgICBoZWFkZXIsXG4gICAgc25hY2tiYXIsXG4gIH0sXG4gIHN0YXRlOiB7XG4gICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgIHJvdXRlcklkOiAwLFxuICB9LFxuICBnZXR0ZXJzOiB7XG4gICAgaXNMb2FkaW5nOiBzdGF0ZSA9PiBzdGF0ZS5pc0xvYWRpbmcsXG4gICAgcm91dGVySWQ6IHN0YXRlID0+IHN0YXRlLnJvdXRlcklkLFxuICB9LFxuICBtdXRhdGlvbnM6IHtcbiAgICBzZXRJc0xvYWRpbmc6IChzdGF0ZSwgcGF5bG9hZCkgPT4gKHN0YXRlLmlzTG9hZGluZyA9IHBheWxvYWQpLFxuICAgIGluY3JlYXNlUm91dGVySWQ6IChzdGF0ZSkgPT4gc3RhdGUucm91dGVySWQrKyxcbiAgfSxcbiAgYWN0aW9uczoge30sXG59KTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZXNwYWNlZDogdHJ1ZSxcbiAgc3RhdGU6IHtcbiAgICBpc09wZW46IGZhbHNlLFxuICAgIHBhZ2VUaXRsZTogJycsXG4gIH0sXG4gIGdldHRlcnM6IHtcbiAgICBpc09wZW46IHN0YXRlID0+IHN0YXRlLmlzT3BlbixcbiAgICBwYWdlVGl0bGU6IHN0YXRlID0+IHN0YXRlLnBhZ2VUaXRsZSxcblxuICB9LFxuICBtdXRhdGlvbnM6IHtcbiAgICB0b2dnbGU6IHN0YXRlID0+IChzdGF0ZS5pc09wZW4gPSAhc3RhdGUuaXNPcGVuKSxcbiAgICBvcGVuOiBzdGF0ZSA9PiAoc3RhdGUuaXNPcGVuID0gdHJ1ZSksXG4gICAgY2xvc2U6IHN0YXRlID0+IChzdGF0ZS5pc09wZW4gPSBmYWxzZSksXG4gICAgc2V0UGFnZVRpdGxlOiAoc3RhdGUsIHBheWxvYWQpID0+IChzdGF0ZS5wYWdlVGl0bGUgPSBwYXlsb2FkKSxcbiAgfSxcbiAgYWN0aW9uczoge30sXG59O1xuIiwiaW1wb3J0IHsgdVByb21pc2UgfSBmcm9tICdAZGJldGthL3V0aWxzJztcblxuY29uc3QgZGVmYXVsdFRpbWUgPSAyMDAwO1xuY29uc3QgZ2V0RGVmYXVsdFN0YXRlID0gKCkgPT4gKHtcbiAgaXNPcGVuOiBmYWxzZSxcbiAgbWVzc2FnZTogJycsXG4gIGljb246IHVuZGVmaW5lZCxcbiAgZXJyb3I6IGZhbHNlLFxuICBzdWNjZXNzOiBmYWxzZSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWVzcGFjZWQ6IHRydWUsXG4gIHN0YXRlOiBnZXREZWZhdWx0U3RhdGUoKSxcbiAgZ2V0dGVyczoge1xuICAgIGlzT3Blbjogc3RhdGUgPT4gc3RhdGUuaXNPcGVuLFxuICAgIG1lc3NhZ2U6IHN0YXRlID0+IHN0YXRlLm1lc3NhZ2UsXG4gICAgaWNvbjogc3RhdGUgPT4gc3RhdGUuaWNvbixcbiAgICBlcnJvcjogc3RhdGUgPT4gc3RhdGUuZXJyb3IsXG4gICAgc3VjY2Vzczogc3RhdGUgPT4gc3RhdGUuc3VjY2VzcyxcbiAgfSxcbiAgbXV0YXRpb25zOiB7XG4gICAgb3BlbjogKHN0YXRlKSA9PiAoc3RhdGUuaXNPcGVuID0gdHJ1ZSksXG4gICAgY2xvc2U6IChzdGF0ZSkgPT4gKHN0YXRlLmlzT3BlbiA9IGZhbHNlKSxcbiAgICB0b2dnbGU6IChzdGF0ZSkgPT4gKHN0YXRlLmlzT3BlbiA9IHN0YXRlLmlzT3BlbiA9PT0gZmFsc2UpLFxuICAgIHNldE1lc3NhZ2U6IChzdGF0ZSwgcGF5bG9hZCkgPT4gKHN0YXRlLm1lc3NhZ2UgPSBwYXlsb2FkKSxcbiAgICBzZXRJY29uOiAoc3RhdGUsIHBheWxvYWQpID0+IChzdGF0ZS5pY29uID0gcGF5bG9hZCksXG4gICAgc2V0RXJyb3I6IChzdGF0ZSwgcGF5bG9hZCkgPT4gKHN0YXRlLmVycm9yID0gcGF5bG9hZCksXG4gICAgc2V0U3VjY2VzczogKHN0YXRlLCBwYXlsb2FkKSA9PiAoc3RhdGUuc3VjY2VzcyA9IHBheWxvYWQpLFxuICAgIHJlc2V0U3RhdGU6IChzdGF0ZSkgPT4gT2JqZWN0LmFzc2lnbihzdGF0ZSwgZ2V0RGVmYXVsdFN0YXRlKCkpLFxuICB9LFxuICBhY3Rpb25zOiB7XG4gICAgb3BlbiAoY29udGV4dCwgeyBtZXNzYWdlLCBpY29uLCBlcnJvciwgc3VjY2VzcyB9KSB7XG4gICAgICBjb250ZXh0LmNvbW1pdCgnc2V0TWVzc2FnZScsIG1lc3NhZ2UpO1xuICAgICAgY29udGV4dC5jb21taXQoJ3NldEljb24nLCBpY29uKTtcbiAgICAgIGNvbnRleHQuY29tbWl0KCdzZXRFcnJvcicsIGVycm9yKTtcbiAgICAgIGNvbnRleHQuY29tbWl0KCdzZXRTdWNjZXNzJywgc3VjY2Vzcyk7XG4gICAgICBjb250ZXh0LmNvbW1pdCgnb3BlbicpO1xuICAgIH0sXG4gICAgb3BlblRlbXBvcmFyeSAoY29udGV4dCwgeyBtZXNzYWdlLCBpY29uLCB0aW1lID0gZGVmYXVsdFRpbWUsIGVycm9yLCBzdWNjZXNzIH0pIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgY29udGV4dC5kaXNwYXRjaCgnb3BlbicsIHsgbWVzc2FnZSwgaWNvbiwgZXJyb3IsIHN1Y2Nlc3MgfSk7XG4gICAgICAgIHVQcm9taXNlXG4gICAgICAgICAgLnRpbWVvdXQodGltZSlcbiAgICAgICAgICAudGhlbigoKSA9PiBjb250ZXh0LmNvbW1pdCgncmVzZXRTdGF0ZScpKVxuICAgICAgICAgIC50aGVuKHJlc29sdmUpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBzdHlsZU1hbmFnZXIsIFRIRU1FUyB9IGZyb20gJ3V0aWxzL3N0eWxlLW1hbmFnZXInO1xuaW1wb3J0IHsgVEhFTUVTX0NPTE9SUyB9IGZyb20gJ3V0aWxzL21hY3Jvcy9zdHlsZXMtY29sb3JzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lc3BhY2VkOiB0cnVlLFxuICBzdGF0ZToge1xuICAgIG5hbWU6IHN0eWxlTWFuYWdlci5kZWZhdWx0U2hlZXQsXG4gIH0sXG4gIGdldHRlcnM6IHtcbiAgICBuYW1lOiBzdGF0ZSA9PiBzdGF0ZS5uYW1lLFxuICAgIGNvbG9yczogc3RhdGUgPT4gVEhFTUVTX0NPTE9SU1tzdGF0ZS5uYW1lXSxcbiAgICBjYXRlZ29yeUNvbG9yQnlJZDogKHN0YXRlLCBnZXR0ZXJzLCByb290U3RhdGUsIHJvb3RHZXR0ZXJzKSA9PiBjYXRlZ29yeUlkID0+IHtcbiAgICAgIGNvbnN0IHBvaW50U2hhcGUgPSByb290R2V0dGVyc1snZXZlbnQvZ2V0Q2F0ZWdvcnlCeUlkJ10oY2F0ZWdvcnlJZCkucG9pbnRTaGFwZTtcbiAgICAgIHN3aXRjaCAocG9pbnRTaGFwZSkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgcmV0dXJuICcjZmZmZmZmJztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHJldHVybiBnZXR0ZXJzLmNvbG9ycy5pbmZvO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgcmV0dXJuIGdldHRlcnMuY29sb3JzLndhcm5pbmc7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICByZXR1cm4gZ2V0dGVycy5jb2xvcnMuZGFuZ2VyO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhdGVnb3J5U3R5bGVCeUlkOiAoc3RhdGUsIGdldHRlcnMsIHJvb3RTdGF0ZSwgcm9vdEdldHRlcnMpID0+IGNhdGVnb3J5SWQgPT4ge1xuICAgICAgY29uc3QgcG9pbnRTaGFwZSA9IHJvb3RHZXR0ZXJzWydldmVudC9nZXRDYXRlZ29yeUJ5SWQnXShjYXRlZ29yeUlkKS5wb2ludFNoYXBlO1xuICAgICAgc3dpdGNoIChwb2ludFNoYXBlKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICByZXR1cm4gJ2YtdGV4dC1zdWJ0ZXh0JztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIHJldHVybiAnZi10ZXh0LWluZm8nO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgcmV0dXJuICdmLXRleHQtd2FybmluZyc7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICByZXR1cm4gJ2YtdGV4dC1kYW5nZXInO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9LFxuICB9LFxuICBtdXRhdGlvbnM6IHtcbiAgICB0b2dnbGU6IHN0YXRlID0+IHtcbiAgICAgIGlmIChzdGF0ZS5uYW1lID09PSBUSEVNRVMubGlnaHQpIHtcbiAgICAgICAgc3RhdGUubmFtZSA9IFRIRU1FUy5kYXJrO1xuICAgICAgICBzdHlsZU1hbmFnZXIuc3dpdGNoVG8uZGFyaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUubmFtZSA9IFRIRU1FUy5saWdodDtcbiAgICAgICAgc3R5bGVNYW5hZ2VyLnN3aXRjaFRvLmxpZ2h0KCk7XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbiAgYWN0aW9uczoge30sXG59O1xuIiwidmFyIGFwaSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCIpO1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2ltcG9ydC1nbG9iLWxvYWRlci9pbmRleC5qcyEuL2Rhcmsuc2Fzc1wiKTtcblxuICAgICAgICAgICAgY29udGVudCA9IGNvbnRlbnQuX19lc01vZHVsZSA/IGNvbnRlbnQuZGVmYXVsdCA6IGNvbnRlbnQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICAgICAgfVxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307IiwidmFyIGFwaSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCIpO1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ltcG9ydC1nbG9iLWxvYWRlci9pbmRleC5qcyEuL2Rhcmsuc2Nzc1wiKTtcblxuICAgICAgICAgICAgY29udGVudCA9IGNvbnRlbnQuX19lc01vZHVsZSA/IGNvbnRlbnQuZGVmYXVsdCA6IGNvbnRlbnQ7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuICAgICAgICAgICAgfVxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IGFwaShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbm1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHMgfHwge307IiwidmFyIGFwaSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCIpO1xuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ltcG9ydC1nbG9iLWxvYWRlci9pbmRleC5qcyEuL2xpZ2h0LnNjc3NcIik7XG5cbiAgICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50Ll9fZXNNb2R1bGUgPyBjb250ZW50LmRlZmF1bHQgOiBjb250ZW50O1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICAgICAgICAgIH1cblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5pbnNlcnQgPSBcImhlYWRcIjtcbm9wdGlvbnMuc2luZ2xldG9uID0gZmFsc2U7XG5cbnZhciB1cGRhdGUgPSBhcGkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9OyIsInZhciBhcGkgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiKTtcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9pbXBvcnQtZ2xvYi1sb2FkZXIvaW5kZXguanMhLi9saWdodC5zYXNzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTsiLCJpbXBvcnQgeyBzdG9yZSB9IGZyb20gJ3N0b3JlJztcblxuZnVuY3Rpb24gb3BlbiAoLi4ucGFyYW1zKSB7XG4gIHN0b3JlLmRpc3BhdGNoKCdzbmFja2Jhci9vcGVuJywgLi4ucGFyYW1zKTtcbn1cblxuZnVuY3Rpb24gb3BlblRlbXBvcmFyeSAoLi4ucGFyYW1zKSB7XG4gIHN0b3JlLmRpc3BhdGNoKCdzbmFja2Jhci9vcGVuVGVtcG9yYXJ5JywgLi4ucGFyYW1zKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbW11bmljYXRlcyA9IHtcbiAgc2hvd01lc3NhZ2UgKG1lc3NhZ2UpIHtcbiAgICBvcGVuKHsgbWVzc2FnZSB9KTtcbiAgfSxcbiAgc2hvd1N1Y2Nlc3MgKG1lc3NhZ2UpIHtcbiAgICBvcGVuKHsgbWVzc2FnZSwgc3VjY2VzczogdHJ1ZSB9KTtcbiAgfSxcbiAgc2hvd0Vycm9yIChtZXNzYWdlKSB7XG4gICAgb3Blbih7IG1lc3NhZ2UsIGVycm9yOiB0cnVlIH0pO1xuICB9LFxuICBzaG93TWVzc2FnZVRlbXBvcmFyeSAobWVzc2FnZSkge1xuICAgIG9wZW5UZW1wb3JhcnkoeyBtZXNzYWdlIH0pO1xuICB9LFxuICBzaG93U3VjY2Vzc1RlbXBvcmFyeSAobWVzc2FnZSkge1xuICAgIG9wZW5UZW1wb3JhcnkoeyBtZXNzYWdlLCBzdWNjZXNzOiB0cnVlIH0pO1xuICB9LFxuICBzaG93RXJyb3JUZW1wb3JhcnkgKG1lc3NhZ2UpIHtcbiAgICBvcGVuVGVtcG9yYXJ5KHsgbWVzc2FnZSwgZXJyb3I6IHRydWUgfSk7XG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgY29tbXVuaWNhdGVzIH0gZnJvbSAndXRpbHMvY29tbXVuaWNhdGVzJztcblxuZXhwb3J0IGNsYXNzIEVycm9yTWVzc2FnZSBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IgKG1lc3NhZ2UsIGRldGFpbHMgPSB7IGNvZGU6IHVuZGVmaW5lZCwgaGFyZDogZmFsc2UgfSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMuaHVtYW5NZXNzYWdlID0gJyc7XG4gICAgdGhpcy5oYXJkID0gZGV0YWlscy5oYXJkO1xuICAgIHRoaXMuY29kZSA9IGRldGFpbHMuY29kZTtcbiAgfVxuXG4gIHNob3dNZXNzYWdlIChodW1hbk1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2UpIHtcbiAgICB0aGlzLmh1bWFuTWVzc2FnZSA9IGh1bWFuTWVzc2FnZTtcbiAgICBjb21tdW5pY2F0ZXMuc2hvd0Vycm9yKGh1bWFuTWVzc2FnZSk7XG4gIH1cblxuICBzaG93TWVzc2FnZVRlbXBvcmFyeSAoaHVtYW5NZXNzYWdlID0gdGhpcy5tZXNzYWdlKSB7XG4gICAgdGhpcy5odW1hbk1lc3NhZ2UgPSBodW1hbk1lc3NhZ2U7XG4gICAgaWYgKHRoaXMuaGFyZCkgY29tbXVuaWNhdGVzLnNob3dFcnJvcihodW1hbk1lc3NhZ2UpO1xuICAgIGVsc2UgY29tbXVuaWNhdGVzLnNob3dFcnJvclRlbXBvcmFyeShodW1hbk1lc3NhZ2UpO1xuICB9XG59XG4iLCJpbXBvcnQgeyB0cmFuc2xhdG9yIH0gZnJvbSAnc3JjL2RpY3Rpb25hcnknO1xuaW1wb3J0IHsgSUNPTlMgfSBmcm9tICdAZGJldGthL3Z1ZS1tYXRlcmlhbC1pY29ucyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhRm9yUm91dGVyIChyb3V0ZSkge1xuICByZXR1cm4ge1xuICAgIHBhdGg6IHJvdXRlLnBhdGgsXG4gICAgbmFtZTogcm91dGUubmFtZSxcbiAgICBtZXRhOiByb3V0ZS5tZXRhLFxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgUk9VVEVTID0ge1xuICBlcnJvcjoge1xuICAgIHBhdGg6ICcqJyxcbiAgICBuYW1lOiAnZXJyb3InLFxuICAgIGxhYmVsOiB0cmFuc2xhdG9yLnQoJ3RpdGxlLmVycm9yJyksXG4gICAgc2hvcnRMYWJlbDogdHJhbnNsYXRvci50KCd0aXRsZS5zaG9ydC5lcnJvcicpLFxuICAgIG1ldGE6IHtcbiAgICAgIG9ubHlCZWZvcmVMb2dpbjogZmFsc2UsXG4gICAgICByZXF1aXJlZEF1dGg6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIHdlbGNvbWU6IHtcbiAgICBwYXRoOiAnLycsXG4gICAgbmFtZTogJ3dlbGNvbWUnLFxuICAgIGxhYmVsOiAnJyxcbiAgICBzaG9ydExhYmVsOiAnJyxcbiAgICBpY29uOiBJQ09OUy5zZW5zb3JfZG9vcixcbiAgICBtZXRhOiB7XG4gICAgICBvbmx5QmVmb3JlTG9naW46IHRydWUsXG4gICAgICByZXF1aXJlZEF1dGg6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIGFib3V0OiB7XG4gICAgcGF0aDogJy9hYm91dCcsXG4gICAgbmFtZTogJ2Fib3V0JyxcbiAgICBsYWJlbDogdHJhbnNsYXRvci50KCd0aXRsZS5hYm91dCcpLFxuICAgIHNob3J0TGFiZWw6IHRyYW5zbGF0b3IudCgndGl0bGUuYWJvdXQnKSxcbiAgICBpY29uOiBJQ09OUy5lbW9qaV9vYmplY3RzLFxuICAgIG1ldGE6IHtcbiAgICAgIG9ubHlCZWZvcmVMb2dpbjogZmFsc2UsXG4gICAgICByZXF1aXJlZEF1dGg6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0IGxpZ2h0IGZyb20gJ3NyYy9zdHlsZS9leHBvcnQtZm9yLWpzL2xpZ2h0LnNjc3MnO1xuaW1wb3J0IGRhcmsgZnJvbSAnc3JjL3N0eWxlL2V4cG9ydC1mb3ItanMvZGFyay5zY3NzJztcblxuZXhwb3J0IGNvbnN0IFRIRU1FU19DT0xPUlMgPSB7XG4gIGRhcmssXG4gIGxpZ2h0LFxufTtcbiIsImV4cG9ydCBjb25zdCBwcm9taXNlID0ge1xuICB0aW1lb3V0ICh0aW1lb3V0KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoKSwgdGltZW91dCk7XG4gICAgfSk7XG4gIH0sXG59O1xuIiwiaW1wb3J0ICdzcmMvc3R5bGUvbGlnaHQnO1xuaW1wb3J0ICdzcmMvc3R5bGUvZGFyayc7XG5pbXBvcnQgQ29va2llcyBmcm9tICdqcy1jb29raWUnO1xuXG5jb25zdCBsYXN0U2hlZXRJZCA9IGRvY3VtZW50LnN0eWxlU2hlZXRzLmxlbmd0aCAtIDE7XG5jb25zdCBsaWdodFNoZWV0ID0gZG9jdW1lbnQuc3R5bGVTaGVldHNbbGFzdFNoZWV0SWQgLSAxXTtcbmNvbnN0IGRhcmtTaGVldCA9IGRvY3VtZW50LnN0eWxlU2hlZXRzW2xhc3RTaGVldElkXTtcblxuZXhwb3J0IGNvbnN0IFRIRU1FUyA9IHtcbiAgbGlnaHQ6ICdsaWdodCcsXG4gIGRhcms6ICdkYXJrJyxcbn07XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRUaGVtZSAoKSB7XG4gIGNvbnN0IGNvb2tpZVRoZW1lID0gQ29va2llcy5nZXQoJ3RoZW1lJyk7XG4gIHJldHVybiBjb29raWVUaGVtZSB8fCBUSEVNRVMubGlnaHQ7XG59XG5cbmV4cG9ydCBjb25zdCBzdHlsZU1hbmFnZXIgPSB7XG4gIGRlZmF1bHRTaGVldDogZ2V0RGVmYXVsdFRoZW1lKCksXG4gIHNoZWV0czoge1xuICAgIGxpZ2h0OiBsaWdodFNoZWV0LFxuICAgIGRhcms6IGRhcmtTaGVldCxcbiAgfSxcbiAgaW5pdCAoKSB7XG4gICAgc3R5bGVNYW5hZ2VyLnN3aXRjaChzdHlsZU1hbmFnZXIuZGVmYXVsdFNoZWV0KTtcbiAgfSxcbiAgc3dpdGNoIChuYW1lKSB7XG4gICAgQ29va2llcy5yZW1vdmUoJ3RoZW1lJyk7XG4gICAgQ29va2llcy5zZXQoJ3RoZW1lJywgbmFtZSwgeyBleHBpcmVzOiA3IH0pO1xuICAgIGNvbnN0IHNoZWV0cyA9IHN0eWxlTWFuYWdlci5zaGVldHM7XG4gICAgY29uc3Qgc2hlZXRzS2V5cyA9IE9iamVjdC5rZXlzKHNoZWV0cyk7XG4gICAgaWYgKHNoZWV0c0tleXMuaW5jbHVkZXMobmFtZSkpIHtcbiAgICAgIHNoZWV0c0tleXMuZm9yRWFjaChzaGVldE5hbWUgPT4ge1xuICAgICAgICBzaGVldHNbc2hlZXROYW1lXS5kaXNhYmxlZCA9IG5hbWUgIT09IHNoZWV0TmFtZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3JNZXNzYWdlKCdUaGlzIHN0eWxlU2hlZXQgZG9lcyBub3QgZXhpc3QnKTtcbiAgICB9XG4gIH0sXG4gIHN3aXRjaFRvOiB7XG4gICAgZGFyayAoKSB7XG4gICAgICBzdHlsZU1hbmFnZXIuc3dpdGNoKFRIRU1FUy5kYXJrKTtcbiAgICB9LFxuICAgIGxpZ2h0ICgpIHtcbiAgICAgIHN0eWxlTWFuYWdlci5zd2l0Y2goVEhFTUVTLmxpZ2h0KTtcbiAgICB9LFxuICB9LFxufTtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCB7XG4gIGV4dGVuZCBhcyB2ZWVFeHRlbmQsXG4gIFZhbGlkYXRpb25PYnNlcnZlcixcbiAgVmFsaWRhdGlvblByb3ZpZGVyLFxufSBmcm9tICd2ZWUtdmFsaWRhdGUnO1xuaW1wb3J0ICogYXMgcnVsZXMgZnJvbSAndmVlLXZhbGlkYXRlL2Rpc3QvcnVsZXMnO1xuaW1wb3J0IHsgbWVzc2FnZXMgfSBmcm9tICd2ZWUtdmFsaWRhdGUvZGlzdC9sb2NhbGUvcGwuanNvbic7XG5pbXBvcnQgdmFsaWRhdGVUb29scyBmcm9tICd2ZW5kb3JzL3ZhbGlkYXRlLXRvb2xzJztcbmltcG9ydCB7IHRyYW5zbGF0b3IgfSBmcm9tICdzcmMvZGljdGlvbmFyeSc7XG5cbi8vIFJlZ2lzdGVyIGl0IGdsb2JhbGx5XG5WdWUuY29tcG9uZW50KCd2YWxpZGF0aW9uLXByb3ZpZGVyJywgVmFsaWRhdGlvblByb3ZpZGVyKTtcblZ1ZS5jb21wb25lbnQoJ3ZhbGlkYXRpb24tb2JzZXJ2ZXInLCBWYWxpZGF0aW9uT2JzZXJ2ZXIpO1xuXG5tZXNzYWdlcy5yZXF1aXJlZCA9IHRyYW5zbGF0b3IudCgnZm9ybS52YWxpZGF0aW9uLnJlcXVpcmVkJyk7XG5tZXNzYWdlcy5lbWFpbCA9IHRyYW5zbGF0b3IudCgnZm9ybS52YWxpZGF0aW9uLmVtYWlsJyk7XG5tZXNzYWdlcy5taW4gPSB0cmFuc2xhdG9yLnQoJ2Zvcm0udmFsaWRhdGlvbi5taW4nKTtcbm1lc3NhZ2VzLm1heCA9IHRyYW5zbGF0b3IudCgnZm9ybS52YWxpZGF0aW9uLm1heCcpO1xubWVzc2FnZXMuY29uZmlybWVkID0gdHJhbnNsYXRvci50KCdmb3JtLnZhbGlkYXRpb24uY29uZmlybWVkJyk7XG5tZXNzYWdlcy5sZW5ndGggPSB0cmFuc2xhdG9yLnQoJ2Zvcm0udmFsaWRhdGlvbi5sZW5ndGgnKTtcblxuLy8gUmVnaXN0ZXIgYWxsIHJ1bGVzXG5PYmplY3Qua2V5cyhydWxlcykuZm9yRWFjaChydWxlID0+IHtcbiAgdmVlRXh0ZW5kKHJ1bGUsIHtcbiAgICAuLi5ydWxlc1tydWxlXSwgLy8gY29waWVzIHJ1bGUgY29uZmlndXJhdGlvblxuICAgIG1lc3NhZ2U6IG1lc3NhZ2VzW3J1bGVdLCAvLyBhc3NpZ24gbWVzc2FnZVxuICB9KTtcbn0pO1xuXG52ZWVFeHRlbmQoJ2hhc051bWJlcicsIHtcbiAgdmFsaWRhdGUgKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbGlkYXRlVG9vbHMuaGFzTnVtYmVyKHZhbHVlKTtcbiAgfSxcbiAgbWVzc2FnZTogdHJhbnNsYXRvci50KCdmb3JtLnZhbGlkYXRpb24uaGFzTnVtYmVyJyksXG59KTtcblxudmVlRXh0ZW5kKCdoYXNDYXBpdGFsaXplJywge1xuICB2YWxpZGF0ZSAodmFsdWUpIHtcbiAgICByZXR1cm4gL1tBLVpdLy50ZXN0KHZhbHVlKTtcbiAgfSxcbiAgbWVzc2FnZTogdHJhbnNsYXRvci50KCdmb3JtLnZhbGlkYXRpb24uaGFzQ2FwaXRhbGl6ZScpLFxufSk7XG4iLCJjb25zdCBhbGxDaGFyYWN0ZXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcbmNvbnN0IHJlZ2V4Rm9yVW5yZWFkYWJsZUNoYXJzID0gL1tPMElsXS9nO1xuY29uc3QgcmVhZGFibGVDaGFyYWN0ZXJzID0gYWxsQ2hhcmFjdGVycy5yZXBsYWNlKHJlZ2V4Rm9yVW5yZWFkYWJsZUNoYXJzLCAnJyk7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIEdlbmVyYXRlIHJhbmRvbSBzdHJpbmcgYmFzZWQgb24gZ2l2ZW4gbGVuZ3RoIGFuZCBvd25cbiAqIHNldCBvZiBjaGFyYWN0ZXJzIGlmIHlvdSB3YW50XG4gKiBAcGFyYW0gbGVuZ3RoIHtudW1iZXJ9XG4gKiBAcGFyYW0gb3duQ2hhcmFjdGVycyB7c3RyaW5nfVxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVJhbmRvbVN0cmluZyAobGVuZ3RoLCBvd25DaGFyYWN0ZXJzID0gdW5kZWZpbmVkKSB7XG4gIGxldCByZXN1bHQgPSAnJztcbiAgY29uc3QgY2hhcmFjdGVycyA9IG93bkNoYXJhY3RlcnMgfHwgYWxsQ2hhcmFjdGVycztcbiAgY29uc3QgY2hhcmFjdGVyc0xlbmd0aCA9IGNoYXJhY3RlcnMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0ICs9IGNoYXJhY3RlcnMuY2hhckF0KE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnNMZW5ndGgpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBAZGVzY3JpcHRpb24gR2VuZXJhdGUgcmFuZG9tIGVhc3kgdG8gcmVhZCBzdHJpbmcgYmFzZWQgb24gZ2l2ZW4gbGVuZ3RoXG4gKiBAcGFyYW0gbGVuZ3RoIHtudW1iZXJ9XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlUmFuZG9tU3RyaW5nV2l0aG91dFNpbWlsYXJDaGFycyAobGVuZ3RoKSB7XG4gIHJldHVybiBnZW5lcmF0ZVJhbmRvbVN0cmluZyhsZW5ndGgsIHJlYWRhYmxlQ2hhcmFjdGVycyk7XG59XG4vKipcbiAqIEBkZXNjcmlwdGlvbiBDaGVjayBpZiBzdHJpbmcgaXMgZWFzeSB0byByZWFkXG4gKiBAcGFyYW0gdGV4dCB7c3RyaW5nfVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gY2hlY2tJZlN0cmluZ0lzUmVhZGFibGUgKHRleHQpIHtcbiAgcmV0dXJuIHRleHQubWF0Y2gocmVnZXhGb3JVbnJlYWRhYmxlQ2hhcnMpID09PSBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2VuZXJhdGVSYW5kb21TdHJpbmcsXG4gIGdlbmVyYXRlUmFuZG9tU3RyaW5nV2l0aG91dFNpbWlsYXJDaGFycyxcbiAgY2hlY2tJZlN0cmluZ0lzUmVhZGFibGUsXG59O1xuIiwiY29uc3QgcmFuZG9tID0gcmVxdWlyZSgnLi4vdmVuZG9ycy9yYW5kb20nKTtcblxuY2xhc3MgVmFsaWRhdGVUb29scyB7XG4gIGhhc051bWJlciAoZGF0YSkge1xuICAgIHJldHVybiAvXFxkLy50ZXN0KGRhdGEpO1xuICB9XG5cbiAgaGFzTm90TnVtYmVyIChkYXRhKSB7XG4gICAgcmV0dXJuICF0aGlzLmhhc051bWJlcihkYXRhKTtcbiAgfVxuXG4gIGlzRW1haWwgKGVtYWlsKSB7XG4gICAgY29uc3QgcmUgPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xuICAgIHJldHVybiByZS50ZXN0KFN0cmluZyhlbWFpbCkudG9Mb3dlckNhc2UoKSk7XG4gIH1cblxuICBpc05vdEVtYWlsIChlbWFpbCkge1xuICAgIHJldHVybiAhdGhpcy5pc0VtYWlsKGVtYWlsKTtcbiAgfVxuXG4gIGlzTG9uZ2VyIChkYXRhLCBsZW5ndGgpIHtcbiAgICByZXR1cm4gZGF0YS5sZW5ndGggPiBsZW5ndGg7XG4gIH1cblxuICBpc1Nob3J0ZXIgKGRhdGEsIGxlbmd0aCkge1xuICAgIHJldHVybiAoZGF0YSAmJiBkYXRhLmxlbmd0aCkgPyBkYXRhLmxlbmd0aCA8IGxlbmd0aCA6IHRydWU7XG4gIH1cblxuICBpc051bGxPckVtcHR5IChkYXRhKSB7XG4gICAgcmV0dXJuIFsnJywgdW5kZWZpbmVkLCBudWxsXS5pbmNsdWRlcyhkYXRhKTtcbiAgfVxuXG4gIGlzRWFzeVRvUmVhZCAoZGF0YSkge1xuICAgIHJldHVybiByYW5kb20uY2hlY2tJZlN0cmluZ0lzUmVhZGFibGUoZGF0YSk7XG4gIH1cblxuICBpc1VuZGVmaW5lZCAoZGF0YSkge1xuICAgIHJldHVybiBkYXRhID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBpblJhbmdlICh2YWx1ZSwgc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiB2YWx1ZSA+PSBzdGFydCAmJiB2YWx1ZSA8PSBlbmQ7XG4gIH1cblxuICBpbk5vdFJhbmdlICh2YWx1ZSwgc3RhcnQsIGVuZCkge1xuICAgIHJldHVybiAhdGhpcy5pblJhbmdlKHZhbHVlLCBzdGFydCwgZW5kKTtcbiAgfVxuXG4gIGNvbnRhaW4gKHZhbHVlLCBhcnJheSkge1xuICAgIHJldHVybiBhcnJheS5pbmNsdWRlcyh2YWx1ZSk7XG4gIH1cblxuICBub3RDb250YWluICh2YWx1ZSwgYXJyYXkpIHtcbiAgICByZXR1cm4gIXRoaXMuY29udGFpbih2YWx1ZSwgYXJyYXkpO1xuICB9XG5cbiAgaXNCb29sZWFuICh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJztcbiAgfVxuXG4gIGlzTm90Qm9vbGVhbiAodmFsdWUpIHtcbiAgICByZXR1cm4gIXRoaXMuaXNCb29sZWFuKHZhbHVlKTtcbiAgfVxufVxuXG4vLyBleHBvcnRcbm1vZHVsZS5leHBvcnRzID0gbmV3IFZhbGlkYXRlVG9vbHMoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=