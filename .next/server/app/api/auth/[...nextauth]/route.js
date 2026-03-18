"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "./action-async-storage.external?8dda":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external?3d59":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external?16bc":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Fmatt%2Fgoodnews%2Fprojects%2Fwebapp%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fmatt%2Fgoodnews%2Fprojects%2Fwebapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Fmatt%2Fgoodnews%2Fprojects%2Fwebapp%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fmatt%2Fgoodnews%2Fprojects%2Fwebapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_matt_goodnews_projects_webapp_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/home/matt/goodnews/projects/webapp/src/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _home_matt_goodnews_projects_webapp_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGbWF0dCUyRmdvb2RuZXdzJTJGcHJvamVjdHMlMkZ3ZWJhcHAlMkZzcmMlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRmhvbWUlMkZtYXR0JTJGZ29vZG5ld3MlMkZwcm9qZWN0cyUyRndlYmFwcCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDMkI7QUFDeEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJhcHAvP2UwNDEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL2hvbWUvbWF0dC9nb29kbmV3cy9wcm9qZWN0cy93ZWJhcHAvc3JjL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9ob21lL21hdHQvZ29vZG5ld3MvcHJvamVjdHMvd2ViYXBwL3NyYy9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Fmatt%2Fgoodnews%2Fprojects%2Fwebapp%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fmatt%2Fgoodnews%2Fprojects%2Fwebapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBaUM7QUFDUTtBQUV6QyxNQUFNRSxVQUFVRixnREFBUUEsQ0FBQ0Msa0RBQVdBO0FBRU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJhcHAvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/MDA5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCc7XG5cbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XG5cbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfTtcbiJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   getSession: () => (/* binding */ getSession)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _lib_users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/users */ \"(rsc)/./src/lib/users.ts\");\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const user = _lib_users__WEBPACK_IMPORTED_MODULE_2__.users.get(credentials.email);\n                if (!user) {\n                    return null;\n                }\n                const isValid = await (0,_lib_users__WEBPACK_IMPORTED_MODULE_2__.verifyPassword)(credentials.password, user.passwordHash);\n                if (!isValid) {\n                    return null;\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    isSubscribed: user.isSubscribed\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.isSubscribed = user.isSubscribed;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.isSubscribed = token.isSubscribed;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 30 * 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET || \"development-secret-change-in-production\"\n};\nasync function getSession() {\n    return (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(authOptions);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTBEO0FBQ1E7QUFDZDtBQTBCN0MsTUFBTUksY0FBMkI7SUFDdENDLFdBQVc7UUFDVEosMkVBQW1CQSxDQUFDO1lBQ2xCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pELE9BQU87Z0JBQ1Q7Z0JBRUEsTUFBTUUsT0FBT1gsNkNBQUtBLENBQUNZLEdBQUcsQ0FBQ1AsWUFBWUMsS0FBSztnQkFDeEMsSUFBSSxDQUFDSyxNQUFNO29CQUNULE9BQU87Z0JBQ1Q7Z0JBRUEsTUFBTUUsVUFBVSxNQUFNWiwwREFBY0EsQ0FBQ0ksWUFBWUksUUFBUSxFQUFFRSxLQUFLRyxZQUFZO2dCQUM1RSxJQUFJLENBQUNELFNBQVM7b0JBQ1osT0FBTztnQkFDVDtnQkFFQSxPQUFPO29CQUNMRSxJQUFJSixLQUFLSSxFQUFFO29CQUNYVCxPQUFPSyxLQUFLTCxLQUFLO29CQUNqQkYsTUFBTU8sS0FBS1AsSUFBSTtvQkFDZlksY0FBY0wsS0FBS0ssWUFBWTtnQkFDakM7WUFDRjtRQUNGO0tBQ0Q7SUFDREMsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFUixJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUlEsTUFBTUosRUFBRSxHQUFHSixLQUFLSSxFQUFFO2dCQUNsQkksTUFBTUgsWUFBWSxHQUFHTCxLQUFLSyxZQUFZO1lBQ3hDO1lBQ0EsT0FBT0c7UUFDVDtRQUNBLE1BQU1DLFNBQVEsRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDOUIsSUFBSUMsUUFBUVQsSUFBSSxFQUFFO2dCQUNoQlMsUUFBUVQsSUFBSSxDQUFDSSxFQUFFLEdBQUdJLE1BQU1KLEVBQUU7Z0JBQzFCSyxRQUFRVCxJQUFJLENBQUNLLFlBQVksR0FBR0csTUFBTUgsWUFBWTtZQUNoRDtZQUNBLE9BQU9JO1FBQ1Q7SUFDRjtJQUNBQyxPQUFPO1FBQ0xDLFFBQVE7UUFDUkMsT0FBTztJQUNUO0lBQ0FILFNBQVM7UUFDUEksVUFBVTtRQUNWQyxRQUFRLEtBQUssS0FBSyxLQUFLO0lBQ3pCO0lBQ0FDLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZSxJQUFJO0FBQ3pDLEVBQUU7QUFFSyxlQUFlQztJQUNwQixPQUFPaEMsMkRBQWdCQSxDQUFDSTtBQUMxQiIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYmFwcC8uL3NyYy9saWIvYXV0aC50cz82NjkyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEF1dGhPcHRpb25zLCBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHMnO1xuaW1wb3J0IHsgdXNlcnMsIHZlcmlmeVBhc3N3b3JkIH0gZnJvbSAnQC9saWIvdXNlcnMnO1xuXG5kZWNsYXJlIG1vZHVsZSAnbmV4dC1hdXRoJyB7XG4gIGludGVyZmFjZSBTZXNzaW9uIHtcbiAgICB1c2VyOiB7XG4gICAgICBpZDogc3RyaW5nO1xuICAgICAgZW1haWw6IHN0cmluZztcbiAgICAgIG5hbWU/OiBzdHJpbmcgfCBudWxsO1xuICAgICAgaXNTdWJzY3JpYmVkOiBib29sZWFuO1xuICAgIH07XG4gIH1cbiAgaW50ZXJmYWNlIFVzZXIge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nIHwgbnVsbDtcbiAgICBpc1N1YnNjcmliZWQ6IGJvb2xlYW47XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ25leHQtYXV0aC9qd3QnIHtcbiAgaW50ZXJmYWNlIEpXVCB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBpc1N1YnNjcmliZWQ6IGJvb2xlYW47XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiAnY3JlZGVudGlhbHMnLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6ICdFbWFpbCcsIHR5cGU6ICdlbWFpbCcgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6ICdQYXNzd29yZCcsIHR5cGU6ICdwYXNzd29yZCcgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXNlciA9IHVzZXJzLmdldChjcmVkZW50aWFscy5lbWFpbCk7XG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IHZlcmlmeVBhc3N3b3JkKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkSGFzaCk7XG4gICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgaXNTdWJzY3JpYmVkOiB1c2VyLmlzU3Vic2NyaWJlZCxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcbiAgICAgICAgdG9rZW4uaXNTdWJzY3JpYmVkID0gdXNlci5pc1N1YnNjcmliZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZDtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlzU3Vic2NyaWJlZCA9IHRva2VuLmlzU3Vic2NyaWJlZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH0sXG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnL2xvZ2luJyxcbiAgICBlcnJvcjogJy9sb2dpbicsXG4gIH0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogJ2p3dCcsXG4gICAgbWF4QWdlOiAzMCAqIDI0ICogNjAgKiA2MCxcbiAgfSxcbiAgc2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUQVVUSF9TRUNSRVQgfHwgJ2RldmVsb3BtZW50LXNlY3JldC1jaGFuZ2UtaW4tcHJvZHVjdGlvbicsXG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2Vzc2lvbigpIHtcbiAgcmV0dXJuIGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xufVxuIl0sIm5hbWVzIjpbImdldFNlcnZlclNlc3Npb24iLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwidXNlcnMiLCJ2ZXJpZnlQYXNzd29yZCIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInVzZXIiLCJnZXQiLCJpc1ZhbGlkIiwicGFzc3dvcmRIYXNoIiwiaWQiLCJpc1N1YnNjcmliZWQiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInNlc3Npb24iLCJwYWdlcyIsInNpZ25JbiIsImVycm9yIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJzZWNyZXQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVEFVVEhfU0VDUkVUIiwiZ2V0U2Vzc2lvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/users.ts":
/*!**************************!*\
  !*** ./src/lib/users.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createUser: () => (/* binding */ createUser),\n/* harmony export */   getUserByEmail: () => (/* binding */ getUserByEmail),\n/* harmony export */   getUserById: () => (/* binding */ getUserById),\n/* harmony export */   hashPassword: () => (/* binding */ hashPassword),\n/* harmony export */   updateUserSubscription: () => (/* binding */ updateUserSubscription),\n/* harmony export */   users: () => (/* binding */ users),\n/* harmony export */   verifyPassword: () => (/* binding */ verifyPassword)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n\nconst users = new Map();\nfunction hashPassword(password) {\n    const salt = (0,crypto__WEBPACK_IMPORTED_MODULE_0__.randomBytes)(16).toString(\"hex\");\n    const hash = (0,crypto__WEBPACK_IMPORTED_MODULE_0__.createHash)(\"sha256\").update(password + salt).digest(\"hex\");\n    return `${salt}:${hash}`;\n}\nfunction verifyPassword(password, storedHash) {\n    const [salt, hash] = storedHash.split(\":\");\n    const hashVerify = (0,crypto__WEBPACK_IMPORTED_MODULE_0__.createHash)(\"sha256\").update(password + salt).digest(\"hex\");\n    return Promise.resolve((0,crypto__WEBPACK_IMPORTED_MODULE_0__.timingSafeEqual)(Buffer.from(hash), Buffer.from(hashVerify)));\n}\nfunction createUser(email, password, name) {\n    const existingUser = users.get(email);\n    if (existingUser) {\n        throw new Error(\"User already exists\");\n    }\n    const user = {\n        id: (0,crypto__WEBPACK_IMPORTED_MODULE_0__.randomBytes)(16).toString(\"hex\"),\n        email,\n        name: name || null,\n        passwordHash: hashPassword(password),\n        isSubscribed: false,\n        createdAt: new Date()\n    };\n    users.set(email, user);\n    return {\n        id: user.id,\n        email: user.email,\n        name: user.name,\n        isSubscribed: user.isSubscribed,\n        createdAt: user.createdAt\n    };\n}\nfunction getUserByEmail(email) {\n    const user = users.get(email);\n    if (!user) return null;\n    return {\n        id: user.id,\n        email: user.email,\n        name: user.name,\n        isSubscribed: user.isSubscribed,\n        createdAt: user.createdAt\n    };\n}\nfunction getUserById(id) {\n    for (const user of users.values()){\n        if (user.id === id) {\n            return {\n                id: user.id,\n                email: user.email,\n                name: user.name,\n                isSubscribed: user.isSubscribed,\n                createdAt: user.createdAt\n            };\n        }\n    }\n    return null;\n}\nfunction updateUserSubscription(userId, isSubscribed) {\n    for (const user of users.values()){\n        if (user.id === userId) {\n            user.isSubscribed = isSubscribed;\n            return true;\n        }\n    }\n    return false;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3VzZXJzLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFrRTtBQUdsRSxNQUFNRyxRQUFzRCxJQUFJQztBQUV6RCxTQUFTQyxhQUFhQyxRQUFnQjtJQUMzQyxNQUFNQyxPQUFPTixtREFBV0EsQ0FBQyxJQUFJTyxRQUFRLENBQUM7SUFDdEMsTUFBTUMsT0FBT1Qsa0RBQVVBLENBQUMsVUFBVVUsTUFBTSxDQUFDSixXQUFXQyxNQUFNSSxNQUFNLENBQUM7SUFDakUsT0FBTyxDQUFDLEVBQUVKLEtBQUssQ0FBQyxFQUFFRSxLQUFLLENBQUM7QUFDMUI7QUFFTyxTQUFTRyxlQUFlTixRQUFnQixFQUFFTyxVQUFrQjtJQUNqRSxNQUFNLENBQUNOLE1BQU1FLEtBQUssR0FBR0ksV0FBV0MsS0FBSyxDQUFDO0lBQ3RDLE1BQU1DLGFBQWFmLGtEQUFVQSxDQUFDLFVBQVVVLE1BQU0sQ0FBQ0osV0FBV0MsTUFBTUksTUFBTSxDQUFDO0lBQ3ZFLE9BQU9LLFFBQVFDLE9BQU8sQ0FBQ2YsdURBQWVBLENBQUNnQixPQUFPQyxJQUFJLENBQUNWLE9BQU9TLE9BQU9DLElBQUksQ0FBQ0o7QUFDeEU7QUFFTyxTQUFTSyxXQUFXQyxLQUFhLEVBQUVmLFFBQWdCLEVBQUVnQixJQUFhO0lBQ3ZFLE1BQU1DLGVBQWVwQixNQUFNcUIsR0FBRyxDQUFDSDtJQUMvQixJQUFJRSxjQUFjO1FBQ2hCLE1BQU0sSUFBSUUsTUFBTTtJQUNsQjtJQUVBLE1BQU1DLE9BQXdDO1FBQzVDQyxJQUFJMUIsbURBQVdBLENBQUMsSUFBSU8sUUFBUSxDQUFDO1FBQzdCYTtRQUNBQyxNQUFNQSxRQUFRO1FBQ2RNLGNBQWN2QixhQUFhQztRQUMzQnVCLGNBQWM7UUFDZEMsV0FBVyxJQUFJQztJQUNqQjtJQUVBNUIsTUFBTTZCLEdBQUcsQ0FBQ1gsT0FBT0s7SUFDakIsT0FBTztRQUNMQyxJQUFJRCxLQUFLQyxFQUFFO1FBQ1hOLE9BQU9LLEtBQUtMLEtBQUs7UUFDakJDLE1BQU1JLEtBQUtKLElBQUk7UUFDZk8sY0FBY0gsS0FBS0csWUFBWTtRQUMvQkMsV0FBV0osS0FBS0ksU0FBUztJQUMzQjtBQUNGO0FBRU8sU0FBU0csZUFBZVosS0FBYTtJQUMxQyxNQUFNSyxPQUFPdkIsTUFBTXFCLEdBQUcsQ0FBQ0g7SUFDdkIsSUFBSSxDQUFDSyxNQUFNLE9BQU87SUFDbEIsT0FBTztRQUNMQyxJQUFJRCxLQUFLQyxFQUFFO1FBQ1hOLE9BQU9LLEtBQUtMLEtBQUs7UUFDakJDLE1BQU1JLEtBQUtKLElBQUk7UUFDZk8sY0FBY0gsS0FBS0csWUFBWTtRQUMvQkMsV0FBV0osS0FBS0ksU0FBUztJQUMzQjtBQUNGO0FBRU8sU0FBU0ksWUFBWVAsRUFBVTtJQUNwQyxLQUFLLE1BQU1ELFFBQVF2QixNQUFNZ0MsTUFBTSxHQUFJO1FBQ2pDLElBQUlULEtBQUtDLEVBQUUsS0FBS0EsSUFBSTtZQUNsQixPQUFPO2dCQUNMQSxJQUFJRCxLQUFLQyxFQUFFO2dCQUNYTixPQUFPSyxLQUFLTCxLQUFLO2dCQUNqQkMsTUFBTUksS0FBS0osSUFBSTtnQkFDZk8sY0FBY0gsS0FBS0csWUFBWTtnQkFDL0JDLFdBQVdKLEtBQUtJLFNBQVM7WUFDM0I7UUFDRjtJQUNGO0lBQ0EsT0FBTztBQUNUO0FBRU8sU0FBU00sdUJBQXVCQyxNQUFjLEVBQUVSLFlBQXFCO0lBQzFFLEtBQUssTUFBTUgsUUFBUXZCLE1BQU1nQyxNQUFNLEdBQUk7UUFDakMsSUFBSVQsS0FBS0MsRUFBRSxLQUFLVSxRQUFRO1lBQ3RCWCxLQUFLRyxZQUFZLEdBQUdBO1lBQ3BCLE9BQU87UUFDVDtJQUNGO0lBQ0EsT0FBTztBQUNUO0FBRWlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2ViYXBwLy4vc3JjL2xpYi91c2Vycy50cz84ZjI2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUhhc2gsIHJhbmRvbUJ5dGVzLCB0aW1pbmdTYWZlRXF1YWwgfSBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJ0AvdHlwZXMvdXNlcic7XG5cbmNvbnN0IHVzZXJzOiBNYXA8c3RyaW5nLCBVc2VyICYgeyBwYXNzd29yZEhhc2g6IHN0cmluZyB9PiA9IG5ldyBNYXAoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGhhc2hQYXNzd29yZChwYXNzd29yZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3Qgc2FsdCA9IHJhbmRvbUJ5dGVzKDE2KS50b1N0cmluZygnaGV4Jyk7XG4gIGNvbnN0IGhhc2ggPSBjcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUocGFzc3dvcmQgKyBzYWx0KS5kaWdlc3QoJ2hleCcpO1xuICByZXR1cm4gYCR7c2FsdH06JHtoYXNofWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2ZXJpZnlQYXNzd29yZChwYXNzd29yZDogc3RyaW5nLCBzdG9yZWRIYXNoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgY29uc3QgW3NhbHQsIGhhc2hdID0gc3RvcmVkSGFzaC5zcGxpdCgnOicpO1xuICBjb25zdCBoYXNoVmVyaWZ5ID0gY3JlYXRlSGFzaCgnc2hhMjU2JykudXBkYXRlKHBhc3N3b3JkICsgc2FsdCkuZGlnZXN0KCdoZXgnKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aW1pbmdTYWZlRXF1YWwoQnVmZmVyLmZyb20oaGFzaCksIEJ1ZmZlci5mcm9tKGhhc2hWZXJpZnkpKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVVc2VyKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIG5hbWU/OiBzdHJpbmcpOiBVc2VyIHtcbiAgY29uc3QgZXhpc3RpbmdVc2VyID0gdXNlcnMuZ2V0KGVtYWlsKTtcbiAgaWYgKGV4aXN0aW5nVXNlcikge1xuICAgIHRocm93IG5ldyBFcnJvcignVXNlciBhbHJlYWR5IGV4aXN0cycpO1xuICB9XG5cbiAgY29uc3QgdXNlcjogVXNlciAmIHsgcGFzc3dvcmRIYXNoOiBzdHJpbmcgfSA9IHtcbiAgICBpZDogcmFuZG9tQnl0ZXMoMTYpLnRvU3RyaW5nKCdoZXgnKSxcbiAgICBlbWFpbCxcbiAgICBuYW1lOiBuYW1lIHx8IG51bGwsXG4gICAgcGFzc3dvcmRIYXNoOiBoYXNoUGFzc3dvcmQocGFzc3dvcmQpLFxuICAgIGlzU3Vic2NyaWJlZDogZmFsc2UsXG4gICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICB9O1xuXG4gIHVzZXJzLnNldChlbWFpbCwgdXNlcik7XG4gIHJldHVybiB7XG4gICAgaWQ6IHVzZXIuaWQsXG4gICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgbmFtZTogdXNlci5uYW1lLFxuICAgIGlzU3Vic2NyaWJlZDogdXNlci5pc1N1YnNjcmliZWQsXG4gICAgY3JlYXRlZEF0OiB1c2VyLmNyZWF0ZWRBdCxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpOiBVc2VyIHwgbnVsbCB7XG4gIGNvbnN0IHVzZXIgPSB1c2Vycy5nZXQoZW1haWwpO1xuICBpZiAoIXVzZXIpIHJldHVybiBudWxsO1xuICByZXR1cm4ge1xuICAgIGlkOiB1c2VyLmlkLFxuICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICBpc1N1YnNjcmliZWQ6IHVzZXIuaXNTdWJzY3JpYmVkLFxuICAgIGNyZWF0ZWRBdDogdXNlci5jcmVhdGVkQXQsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyQnlJZChpZDogc3RyaW5nKTogVXNlciB8IG51bGwge1xuICBmb3IgKGNvbnN0IHVzZXIgb2YgdXNlcnMudmFsdWVzKCkpIHtcbiAgICBpZiAodXNlci5pZCA9PT0gaWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICBpc1N1YnNjcmliZWQ6IHVzZXIuaXNTdWJzY3JpYmVkLFxuICAgICAgICBjcmVhdGVkQXQ6IHVzZXIuY3JlYXRlZEF0LFxuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVVc2VyU3Vic2NyaXB0aW9uKHVzZXJJZDogc3RyaW5nLCBpc1N1YnNjcmliZWQ6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgZm9yIChjb25zdCB1c2VyIG9mIHVzZXJzLnZhbHVlcygpKSB7XG4gICAgaWYgKHVzZXIuaWQgPT09IHVzZXJJZCkge1xuICAgICAgdXNlci5pc1N1YnNjcmliZWQgPSBpc1N1YnNjcmliZWQ7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgeyB1c2VycyB9O1xuIl0sIm5hbWVzIjpbImNyZWF0ZUhhc2giLCJyYW5kb21CeXRlcyIsInRpbWluZ1NhZmVFcXVhbCIsInVzZXJzIiwiTWFwIiwiaGFzaFBhc3N3b3JkIiwicGFzc3dvcmQiLCJzYWx0IiwidG9TdHJpbmciLCJoYXNoIiwidXBkYXRlIiwiZGlnZXN0IiwidmVyaWZ5UGFzc3dvcmQiLCJzdG9yZWRIYXNoIiwic3BsaXQiLCJoYXNoVmVyaWZ5IiwiUHJvbWlzZSIsInJlc29sdmUiLCJCdWZmZXIiLCJmcm9tIiwiY3JlYXRlVXNlciIsImVtYWlsIiwibmFtZSIsImV4aXN0aW5nVXNlciIsImdldCIsIkVycm9yIiwidXNlciIsImlkIiwicGFzc3dvcmRIYXNoIiwiaXNTdWJzY3JpYmVkIiwiY3JlYXRlZEF0IiwiRGF0ZSIsInNldCIsImdldFVzZXJCeUVtYWlsIiwiZ2V0VXNlckJ5SWQiLCJ2YWx1ZXMiLCJ1cGRhdGVVc2VyU3Vic2NyaXB0aW9uIiwidXNlcklkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/users.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/uuid","vendor-chunks/oauth","vendor-chunks/@panva","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/preact","vendor-chunks/oidc-token-hash","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Fmatt%2Fgoodnews%2Fprojects%2Fwebapp%2Fsrc%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fmatt%2Fgoodnews%2Fprojects%2Fwebapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();