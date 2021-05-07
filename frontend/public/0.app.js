(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/pages/about.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--5!./node_modules/vue-loader/lib??vue-loader-options!./src/components/pages/about.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var templates_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! templates/page */ "./src/components/templates/page.vue");
/* harmony import */ var src_dictionary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/dictionary */ "./src/dictionary/index.js");
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
  name: 'p-about',
  components: {
    TPage: templates_page__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: () => ({
    showMore: false,
    creators: [{
      photo: '/img/dbetka.jpeg',
      fullName: 'Dominik Betka',
      responsibilities: src_dictionary__WEBPACK_IMPORTED_MODULE_1__["translator"].t('page.about.leader') + ', ' + src_dictionary__WEBPACK_IMPORTED_MODULE_1__["translator"].t('page.about.fullstack'),
      links: [{
        label: 'GitHub',
        path: 'https://github.com/dbetka/'
      }, {
        label: 'LinkedIn',
        path: 'https://www.linkedin.com/in/dominikbetka/'
      }]
    }, {
      photo: 'https://i.ibb.co/sj5dcdW/harc.jpg',
      fullName: 'Paweł Bednarczyk',
      responsibilities: src_dictionary__WEBPACK_IMPORTED_MODULE_1__["translator"].t('page.about.frontDev'),
      links: [{
        label: 'GitHub',
        path: 'https://github.com/Bedpaw/'
      }]
    }, {
      photo: 'https://henouser.pl/photo.jpeg',
      fullName: 'Paweł Jurkiewicz',
      responsibilities: src_dictionary__WEBPACK_IMPORTED_MODULE_1__["translator"].t('page.about.backDev'),
      links: [{
        label: 'Site',
        path: 'https://henouser.pl/'
      }, {
        label: 'GitLab',
        path: 'https://gitlab.com/henouser'
      }]
    }, {
      // photo: 'https://media-exp1.licdn.com/dms/image/C4E03AQGHPMB1bAAq7A/profile-displayphoto-shrink_200_200/0?e=1596672000&v=beta&t=YRm71P6-8AsosWqGUtSFam-IO1XgJxwhp-jYiPbP5GE',
      fullName: 'Filip Betka',
      responsibilities: src_dictionary__WEBPACK_IMPORTED_MODULE_1__["translator"].t('page.about.backDev'),
      links: [{
        label: 'LinkedIn',
        path: 'https://www.linkedin.com/in/filip-betka-6b1b10184/'
      }]
    }, {
      photo: '',
      fullName: 'Magdalena Granke',
      responsibilities: src_dictionary__WEBPACK_IMPORTED_MODULE_1__["translator"].t('page.about.uxDesigner'),
      links: [{
        label: 'LinkedIn',
        path: 'https://www.linkedin.com/in/magdalenagranke/'
      }]
    }, {
      photo: '',
      fullName: 'Adam Dominik',
      responsibilities: src_dictionary__WEBPACK_IMPORTED_MODULE_1__["translator"].t('page.about.frontDev'),
      links: []
    }]
  })
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/pages/about.vue?vue&type=template&id=7ee0eaa2&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/pages/about.vue?vue&type=template&id=7ee0eaa2& ***!
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
  return _c(
    "t-page",
    { staticClass: "f-text-center" },
    [
      _c("p", { staticClass: "f-text-left" }, [
        _c("span", [
          _c("strong", [_vm._v("HarcMap")]),
          _vm._v(" " + _vm._s(_vm.$t("page.about.appInfo")) + "\n    ")
        ]),
        _vm._v(" "),
        _vm.showMore === false
          ? _c("span", {
              staticClass: "f-text-bold f-text-underline",
              domProps: { innerHTML: _vm._s(_vm.$t("general.showMore")) },
              on: {
                click: function($event) {
                  _vm.showMore = true
                }
              }
            })
          : _c("span", [
              _vm._v(
                "\n      " + _vm._s(_vm.$t("page.about.more")) + "\n      "
              ),
              _c("strong", [_vm._v(":)")])
            ])
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "f-text-bold" }, [
        _vm._v(_vm._s(_vm.$t("page.about.authors")))
      ]),
      _vm._v(" "),
      _vm._l(_vm.creators, function(person) {
        return _c(
          "div",
          { key: person.fullName, staticClass: "f-flex f-pb-1" },
          [
            person.photo
              ? _c("div", [
                  _c("img", {
                    attrs: {
                      src: person.photo,
                      alt: person.fullName,
                      width: "64",
                      height: "64"
                    }
                  })
                ])
              : _c("a-icon", {
                  attrs: { name: _vm.ICONS.account_circle, size: "64" }
                }),
            _vm._v(" "),
            _c("div", { staticClass: "f-flex-1 f-pt-1 f-pl-1 f-text-left" }, [
              _c("div", { staticClass: "f-text-bold" }, [
                _vm._v(_vm._s(person.fullName))
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "f-text-14" }, [
                _vm._v(_vm._s(person.responsibilities))
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "f-text-14 f-flex" },
                [
                  _vm._l(person.links, function(link, key) {
                    return [
                      key === 1
                        ? _c("span", { key: key, staticClass: "f-pr-1" }, [
                            _vm._v(",")
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          key: link.path,
                          staticClass: "a-link",
                          attrs: { href: link.path, target: "_blank" }
                        },
                        [
                          _vm._v(
                            "\n            " +
                              _vm._s(link.label) +
                              "\n          "
                          )
                        ]
                      )
                    ]
                  })
                ],
                2
              )
            ])
          ],
          1
        )
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/components/pages/about.vue":
/*!****************************************!*\
  !*** ./src/components/pages/about.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _about_vue_vue_type_template_id_7ee0eaa2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./about.vue?vue&type=template&id=7ee0eaa2& */ "./src/components/pages/about.vue?vue&type=template&id=7ee0eaa2&");
/* harmony import */ var _about_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./about.vue?vue&type=script&lang=js& */ "./src/components/pages/about.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _about_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _about_vue_vue_type_template_id_7ee0eaa2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _about_vue_vue_type_template_id_7ee0eaa2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/pages/about.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/pages/about.vue?vue&type=script&lang=js&":
/*!*****************************************************************!*\
  !*** ./src/components/pages/about.vue?vue&type=script&lang=js& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--5!../../../node_modules/vue-loader/lib??vue-loader-options!./about.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./src/components/pages/about.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_5_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/pages/about.vue?vue&type=template&id=7ee0eaa2&":
/*!***********************************************************************!*\
  !*** ./src/components/pages/about.vue?vue&type=template&id=7ee0eaa2& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_template_id_7ee0eaa2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./about.vue?vue&type=template&id=7ee0eaa2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/components/pages/about.vue?vue&type=template&id=7ee0eaa2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_template_id_7ee0eaa2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_about_vue_vue_type_template_id_7ee0eaa2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvcGFnZXMvYWJvdXQudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhZ2VzL2Fib3V0LnZ1ZT83N2MyIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL3BhZ2VzL2Fib3V0LnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wYWdlcy9hYm91dC52dWU/ZDQ4YSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wYWdlcy9hYm91dC52dWU/Y2RhYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdURBO0FBQ0E7QUFFQTtBQUNBLGlCQURBO0FBRUE7QUFDQTtBQURBLEdBRkE7QUFLQTtBQUNBLG1CQURBO0FBRUEsZUFDQTtBQUNBLCtCQURBO0FBRUEsK0JBRkE7QUFHQSxxTUFIQTtBQUlBLGNBQ0E7QUFDQSx1QkFEQTtBQUVBO0FBRkEsT0FEQSxFQUtBO0FBQ0EseUJBREE7QUFFQTtBQUZBLE9BTEE7QUFKQSxLQURBLEVBZ0JBO0FBQ0EsZ0RBREE7QUFFQSxrQ0FGQTtBQUdBLDBHQUhBO0FBSUEsY0FDQTtBQUNBLHVCQURBO0FBRUE7QUFGQSxPQURBO0FBSkEsS0FoQkEsRUEyQkE7QUFDQSw2Q0FEQTtBQUVBLGtDQUZBO0FBR0EseUdBSEE7QUFJQSxjQUNBO0FBQ0EscUJBREE7QUFFQTtBQUZBLE9BREEsRUFJQTtBQUNBLHVCQURBO0FBRUE7QUFGQSxPQUpBO0FBSkEsS0EzQkEsRUF5Q0E7QUFDQTtBQUNBLDZCQUZBO0FBR0EseUdBSEE7QUFJQSxjQUNBO0FBQ0EseUJBREE7QUFFQTtBQUZBLE9BREE7QUFKQSxLQXpDQSxFQW9EQTtBQUNBLGVBREE7QUFFQSxrQ0FGQTtBQUdBLDRHQUhBO0FBSUEsY0FDQTtBQUNBLHlCQURBO0FBRUE7QUFGQSxPQURBO0FBSkEsS0FwREEsRUErREE7QUFDQSxlQURBO0FBRUEsOEJBRkE7QUFHQSwwR0FIQTtBQUlBO0FBSkEsS0EvREE7QUFGQTtBQUxBLEc7Ozs7Ozs7Ozs7OztBQzFEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLLCtCQUErQjtBQUNwQztBQUNBLGVBQWUsNkJBQTZCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsZ0RBQWdEO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsNkJBQTZCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcscURBQXFEO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsaUJBQWlCO0FBQ2pCO0FBQ0EsdUJBQXVCLG9EQUFvRDtBQUMzRSx5QkFBeUIsNkJBQTZCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QiwyQkFBMkI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQ0FBa0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msa0NBQWtDO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQyx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMzR0E7QUFBQTtBQUFBO0FBQUE7QUFBb0Y7QUFDM0I7QUFDTDs7O0FBR3BEO0FBQzZGO0FBQzdGLGdCQUFnQiwyR0FBVTtBQUMxQixFQUFFLDJFQUFNO0FBQ1IsRUFBRSxnRkFBTTtBQUNSLEVBQUUseUZBQWU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJQUFJLEtBQVUsRUFBRSxZQWlCZjtBQUNEO0FBQ2UsZ0Y7Ozs7Ozs7Ozs7OztBQ3RDZjtBQUFBO0FBQUEsd0NBQW1MLENBQWdCLCtPQUFHLEVBQUMsQzs7Ozs7Ozs7Ozs7O0FDQXZNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiIwLmFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPHQtcGFnZSBjbGFzcz1cImYtdGV4dC1jZW50ZXJcIj5cbiAgICA8cCBjbGFzcz1cImYtdGV4dC1sZWZ0XCI+XG4gICAgICA8c3Bhbj5cbiAgICAgICAgPHN0cm9uZz5IYXJjTWFwPC9zdHJvbmc+IHt7ICR0KCdwYWdlLmFib3V0LmFwcEluZm8nKSB9fVxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW5cbiAgICAgICAgdi1pZj1cInNob3dNb3JlID09PSBmYWxzZVwiXG4gICAgICAgIGNsYXNzPVwiZi10ZXh0LWJvbGQgZi10ZXh0LXVuZGVybGluZVwiXG4gICAgICAgIEBjbGljaz1cInNob3dNb3JlID0gdHJ1ZVwiXG4gICAgICAgIHYtaHRtbD1cIiR0KCdnZW5lcmFsLnNob3dNb3JlJylcIlxuICAgICAgLz5cbiAgICAgIDxzcGFuIHYtZWxzZT5cbiAgICAgICAge3sgJHQoJ3BhZ2UuYWJvdXQubW9yZScpIH19XG4gICAgICAgIDxzdHJvbmc+Oik8L3N0cm9uZz5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3A+XG4gICAgPHAgY2xhc3M9XCJmLXRleHQtYm9sZFwiPnt7ICR0KCdwYWdlLmFib3V0LmF1dGhvcnMnKSB9fTwvcD5cbiAgICA8ZGl2XG4gICAgICB2LWZvcj1cInBlcnNvbiBvZiBjcmVhdG9yc1wiXG4gICAgICA6a2V5PVwicGVyc29uLmZ1bGxOYW1lXCJcbiAgICAgIGNsYXNzPVwiZi1mbGV4IGYtcGItMVwiXG4gICAgPlxuICAgICAgPGRpdiB2LWlmPVwicGVyc29uLnBob3RvXCI+XG4gICAgICAgIDxpbWcgOnNyYz1cInBlcnNvbi5waG90b1wiIDphbHQ9XCJwZXJzb24uZnVsbE5hbWVcIiB3aWR0aD1cIjY0XCIgaGVpZ2h0PVwiNjRcIj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGEtaWNvblxuICAgICAgICA6bmFtZT1cIklDT05TLmFjY291bnRfY2lyY2xlXCJcbiAgICAgICAgc2l6ZT1cIjY0XCJcbiAgICAgICAgdi1lbHNlXG4gICAgICAvPlxuICAgICAgPGRpdiBjbGFzcz1cImYtZmxleC0xIGYtcHQtMSBmLXBsLTEgZi10ZXh0LWxlZnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImYtdGV4dC1ib2xkXCI+e3sgcGVyc29uLmZ1bGxOYW1lIH19PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJmLXRleHQtMTRcIj57eyBwZXJzb24ucmVzcG9uc2liaWxpdGllcyB9fTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZi10ZXh0LTE0IGYtZmxleFwiPlxuICAgICAgICAgIDx0ZW1wbGF0ZVxuICAgICAgICAgICAgdi1mb3I9XCIobGluaywga2V5KSBvZiBwZXJzb24ubGlua3NcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIHYtaWY9XCJrZXkgPT09IDFcIiA6a2V5PVwia2V5XCIgY2xhc3M9XCJmLXByLTFcIj4sPC9zcGFuPlxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgOmhyZWY9XCJsaW5rLnBhdGhcIlxuICAgICAgICAgICAgICA6a2V5PVwibGluay5wYXRoXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJhLWxpbmtcIlxuICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7eyBsaW5rLmxhYmVsIH19XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC90LXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuaW1wb3J0IFRQYWdlIGZyb20gJ3RlbXBsYXRlcy9wYWdlJztcbmltcG9ydCB7IHRyYW5zbGF0b3IgfSBmcm9tICdzcmMvZGljdGlvbmFyeSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3AtYWJvdXQnLFxuICBjb21wb25lbnRzOiB7XG4gICAgVFBhZ2UsXG4gIH0sXG4gIGRhdGE6ICgpID0+ICh7XG4gICAgc2hvd01vcmU6IGZhbHNlLFxuICAgIGNyZWF0b3JzOiBbXG4gICAgICB7XG4gICAgICAgIHBob3RvOiAnL2ltZy9kYmV0a2EuanBlZycsXG4gICAgICAgIGZ1bGxOYW1lOiAnRG9taW5payBCZXRrYScsXG4gICAgICAgIHJlc3BvbnNpYmlsaXRpZXM6IHRyYW5zbGF0b3IudCgncGFnZS5hYm91dC5sZWFkZXInKSArICcsICcgKyB0cmFuc2xhdG9yLnQoJ3BhZ2UuYWJvdXQuZnVsbHN0YWNrJyksXG4gICAgICAgIGxpbmtzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICdHaXRIdWInLFxuICAgICAgICAgICAgcGF0aDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9kYmV0a2EvJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxhYmVsOiAnTGlua2VkSW4nLFxuICAgICAgICAgICAgcGF0aDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9kb21pbmlrYmV0a2EvJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGhvdG86ICdodHRwczovL2kuaWJiLmNvL3NqNWRjZFcvaGFyYy5qcGcnLFxuICAgICAgICBmdWxsTmFtZTogJ1Bhd2XFgiBCZWRuYXJjenlrJyxcbiAgICAgICAgcmVzcG9uc2liaWxpdGllczogdHJhbnNsYXRvci50KCdwYWdlLmFib3V0LmZyb250RGV2JyksXG4gICAgICAgIGxpbmtzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbGFiZWw6ICdHaXRIdWInLFxuICAgICAgICAgICAgcGF0aDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9CZWRwYXcvJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGhvdG86ICdodHRwczovL2hlbm91c2VyLnBsL3Bob3RvLmpwZWcnLFxuICAgICAgICBmdWxsTmFtZTogJ1Bhd2XFgiBKdXJraWV3aWN6JyxcbiAgICAgICAgcmVzcG9uc2liaWxpdGllczogdHJhbnNsYXRvci50KCdwYWdlLmFib3V0LmJhY2tEZXYnKSxcbiAgICAgICAgbGlua3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJ1NpdGUnLFxuICAgICAgICAgICAgcGF0aDogJ2h0dHBzOi8vaGVub3VzZXIucGwvJyxcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICBsYWJlbDogJ0dpdExhYicsXG4gICAgICAgICAgICBwYXRoOiAnaHR0cHM6Ly9naXRsYWIuY29tL2hlbm91c2VyJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gcGhvdG86ICdodHRwczovL21lZGlhLWV4cDEubGljZG4uY29tL2Rtcy9pbWFnZS9DNEUwM0FRR0hQTUIxYkFBcTdBL3Byb2ZpbGUtZGlzcGxheXBob3RvLXNocmlua18yMDBfMjAwLzA/ZT0xNTk2NjcyMDAwJnY9YmV0YSZ0PVlSbTcxUDYtOEFzb3NXcUdVdFNGYW0tSU8xWGdKeHdocC1qWWlQYlA1R0UnLFxuICAgICAgICBmdWxsTmFtZTogJ0ZpbGlwIEJldGthJyxcbiAgICAgICAgcmVzcG9uc2liaWxpdGllczogdHJhbnNsYXRvci50KCdwYWdlLmFib3V0LmJhY2tEZXYnKSxcbiAgICAgICAgbGlua3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJ0xpbmtlZEluJyxcbiAgICAgICAgICAgIHBhdGg6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vZmlsaXAtYmV0a2EtNmIxYjEwMTg0LycsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBob3RvOiAnJyxcbiAgICAgICAgZnVsbE5hbWU6ICdNYWdkYWxlbmEgR3JhbmtlJyxcbiAgICAgICAgcmVzcG9uc2liaWxpdGllczogdHJhbnNsYXRvci50KCdwYWdlLmFib3V0LnV4RGVzaWduZXInKSxcbiAgICAgICAgbGlua3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJ0xpbmtlZEluJyxcbiAgICAgICAgICAgIHBhdGg6ICdodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vbWFnZGFsZW5hZ3JhbmtlLycsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBob3RvOiAnJyxcbiAgICAgICAgZnVsbE5hbWU6ICdBZGFtIERvbWluaWsnLFxuICAgICAgICByZXNwb25zaWJpbGl0aWVzOiB0cmFuc2xhdG9yLnQoJ3BhZ2UuYWJvdXQuZnJvbnREZXYnKSxcbiAgICAgICAgbGlua3M6IFtdLFxuICAgICAgfSxcbiAgICBdLFxuICB9KSxcbn07XG48L3NjcmlwdD5cbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJ0LXBhZ2VcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcImYtdGV4dC1jZW50ZXJcIiB9LFxuICAgIFtcbiAgICAgIF9jKFwicFwiLCB7IHN0YXRpY0NsYXNzOiBcImYtdGV4dC1sZWZ0XCIgfSwgW1xuICAgICAgICBfYyhcInNwYW5cIiwgW1xuICAgICAgICAgIF9jKFwic3Ryb25nXCIsIFtfdm0uX3YoXCJIYXJjTWFwXCIpXSksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiICsgX3ZtLl9zKF92bS4kdChcInBhZ2UuYWJvdXQuYXBwSW5mb1wiKSkgKyBcIlxcbiAgICBcIilcbiAgICAgICAgXSksXG4gICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgIF92bS5zaG93TW9yZSA9PT0gZmFsc2VcbiAgICAgICAgICA/IF9jKFwic3BhblwiLCB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImYtdGV4dC1ib2xkIGYtdGV4dC11bmRlcmxpbmVcIixcbiAgICAgICAgICAgICAgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLiR0KFwiZ2VuZXJhbC5zaG93TW9yZVwiKSkgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICBfdm0uc2hvd01vcmUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIDogX2MoXCJzcGFuXCIsIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgIFwiXFxuICAgICAgXCIgKyBfdm0uX3MoX3ZtLiR0KFwicGFnZS5hYm91dC5tb3JlXCIpKSArIFwiXFxuICAgICAgXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgX2MoXCJzdHJvbmdcIiwgW192bS5fdihcIjopXCIpXSlcbiAgICAgICAgICAgIF0pXG4gICAgICBdKSxcbiAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICBfYyhcInBcIiwgeyBzdGF0aWNDbGFzczogXCJmLXRleHQtYm9sZFwiIH0sIFtcbiAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uJHQoXCJwYWdlLmFib3V0LmF1dGhvcnNcIikpKVxuICAgICAgXSksXG4gICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgX3ZtLl9sKF92bS5jcmVhdG9ycywgZnVuY3Rpb24ocGVyc29uKSB7XG4gICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICBcImRpdlwiLFxuICAgICAgICAgIHsga2V5OiBwZXJzb24uZnVsbE5hbWUsIHN0YXRpY0NsYXNzOiBcImYtZmxleCBmLXBiLTFcIiB9LFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIHBlcnNvbi5waG90b1xuICAgICAgICAgICAgICA/IF9jKFwiZGl2XCIsIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiaW1nXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICBzcmM6IHBlcnNvbi5waG90byxcbiAgICAgICAgICAgICAgICAgICAgICBhbHQ6IHBlcnNvbi5mdWxsTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogXCI2NFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCI2NFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgOiBfYyhcImEtaWNvblwiLCB7XG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBuYW1lOiBfdm0uSUNPTlMuYWNjb3VudF9jaXJjbGUsIHNpemU6IFwiNjRcIiB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJmLWZsZXgtMSBmLXB0LTEgZi1wbC0xIGYtdGV4dC1sZWZ0XCIgfSwgW1xuICAgICAgICAgICAgICBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImYtdGV4dC1ib2xkXCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MocGVyc29uLmZ1bGxOYW1lKSlcbiAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwiZi10ZXh0LTE0XCIgfSwgW1xuICAgICAgICAgICAgICAgIF92bS5fdihfdm0uX3MocGVyc29uLnJlc3BvbnNpYmlsaXRpZXMpKVxuICAgICAgICAgICAgICBdKSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImYtdGV4dC0xNCBmLWZsZXhcIiB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF92bS5fbChwZXJzb24ubGlua3MsIGZ1bmN0aW9uKGxpbmssIGtleSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgIGtleSA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBfYyhcInNwYW5cIiwgeyBrZXk6IGtleSwgc3RhdGljQ2xhc3M6IFwiZi1wci0xXCIgfSwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIixcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IGxpbmsucGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYS1saW5rXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IGhyZWY6IGxpbmsucGF0aCwgdGFyZ2V0OiBcIl9ibGFua1wiIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fcyhsaW5rLmxhYmVsKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdKVxuICAgICAgICAgIF0sXG4gICAgICAgICAgMVxuICAgICAgICApXG4gICAgICB9KVxuICAgIF0sXG4gICAgMlxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9hYm91dC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2VlMGVhYTImXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vYWJvdXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9hYm91dC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9ob21lL2RvbWluaWsvUHJvamVjdHMvcmVoYXBwL2Zyb250ZW5kL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzdlZTBlYWEyJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzdlZTBlYWEyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzdlZTBlYWEyJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9hYm91dC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9N2VlMGVhYTImXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignN2VlMGVhYTInLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9jb21wb25lbnRzL3BhZ2VzL2Fib3V0LnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tNSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2Fib3V0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS01IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vYWJvdXQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2Fib3V0LnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03ZWUwZWFhMiZcIiJdLCJzb3VyY2VSb290IjoiIn0=