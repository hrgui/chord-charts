/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./docs/demo.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./docs/demo.ts":
/*!**********************!*\
  !*** ./docs/demo.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/index */ \"./src/index.ts\");\n\nfunction createKeySelect() {\n    var keys = _src_index__WEBPACK_IMPORTED_MODULE_0__[\"ChordChart\"].getAllKeys();\n    var selectEl = document.createElement('select');\n    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {\n        var key = keys_1[_i];\n        var option = document.createElement('option');\n        option.value = key.name;\n        option.text = key.name;\n        selectEl.appendChild(option);\n    }\n    return selectEl;\n}\nfunction onTextChanged(el) {\n    return function (event) {\n        el.$chordChart.setText(event.target.innerText);\n    };\n}\nfunction onKeyChanged(chordChartEl) {\n    return function (event) {\n        var newKey = event.target.value;\n        chordChartEl.$chordChart.transpose(newKey);\n        chordChartEl.innerText = chordChartEl.$chordChart.asText();\n    };\n}\nfunction initDom() {\n    var chordChartEls = Array.from(document.querySelectorAll('.chord-chart'));\n    for (var _i = 0, chordChartEls_1 = chordChartEls; _i < chordChartEls_1.length; _i++) {\n        var chordChartEl = chordChartEls_1[_i];\n        var key = chordChartEl.dataset.key;\n        chordChartEl.$chordChart = new _src_index__WEBPACK_IMPORTED_MODULE_0__[\"ChordChart\"](chordChartEl.innerText, key);\n        chordChartEl.innerText = chordChartEl.$chordChart.asText();\n        var parentElement = chordChartEl.parentElement;\n        parentElement.removeChild(chordChartEl);\n        var containerDiv = document.createElement('div');\n        var input = createKeySelect();\n        input.value = key;\n        input.onchange = onKeyChanged(chordChartEl);\n        chordChartEl.addEventListener('input', onTextChanged(chordChartEl));\n        containerDiv.appendChild(input);\n        containerDiv.appendChild(chordChartEl);\n        parentElement.appendChild(containerDiv);\n    }\n}\nfunction init() {\n    initDom();\n}\ninit();\n\n\n//# sourceURL=webpack:///./docs/demo.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: keys, ChordChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ChordChart\", function() { return ChordChart; });\n/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys */ \"./src/keys.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"keys\", function() { return _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"]; });\n\n/* harmony import */ var _regexes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./regexes */ \"./src/regexes.ts\");\n\n\n\nfunction findAllPipes(str) {\n    var regex = /(\\|)/g;\n    var results;\n    var output = [];\n    while ((results = regex.exec(str)) !== null) {\n        //@ts-ignore\n        output.push(results.index);\n    }\n    return output;\n}\nfunction pipeIt(str, pipeIndexes) {\n    if (!pipeIndexes) {\n        return str;\n    }\n    pipeIndexes.map(function (pI) {\n        str = str.substr(0, pI) + '|' + str.substr(pI + 1);\n    });\n    return str;\n}\nvar ChordChart = /** @class */ (function () {\n    function ChordChart(data, key) {\n        this.rawForm = [];\n        this.setText(data);\n        this.currentKey = ChordChart.getKeyByName(key);\n    }\n    ChordChart.getAllKeys = function () {\n        return _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"];\n    };\n    ChordChart._toChordLine = function (line) {\n        var obj = {\n            'chordLine': true,\n            'values': line.split(_regexes__WEBPACK_IMPORTED_MODULE_1__[\"chordRegexes\"].chordReplaceRegex)\n        };\n        obj.values = obj.values.map(function (v) {\n            var hasPipes = false;\n            var pipes;\n            if (v.indexOf('|') !== -1) {\n                hasPipes = true;\n                pipes = findAllPipes(v);\n                v = v.replace('|', ' ');\n            }\n            var rtn = {\n                value: v,\n                pipes: pipes,\n                skip: false\n            };\n            switch (v.trim()) {\n                case '(':\n                case ')':\n                case '|':\n                case '':\n                    rtn.skip = true;\n                    break;\n            }\n            return rtn;\n        });\n        return obj;\n    };\n    ChordChart.getDelta = function (oldIndex, newIndex) {\n        if (oldIndex > newIndex) {\n            return 0 - (oldIndex - newIndex);\n        }\n        else if (oldIndex < newIndex) {\n            return newIndex - oldIndex;\n        }\n        else {\n            return 0;\n        }\n    };\n    ChordChart.getChordRoot = function (input) {\n        if (input.length > 1 && (input.charAt(1) == \"b\" || input.charAt(1) == \"#\")) {\n            return input.substr(0, 2);\n        }\n        return input.substr(0, 1);\n    };\n    ChordChart.transposeChord = function (oldChord, delta, targetKey) {\n        var oldChordRoot = ChordChart.getChordRoot(oldChord), newChordRoot = ChordChart.getNewKey(oldChordRoot, delta, targetKey);\n        return newChordRoot.name + oldChord.substr(oldChordRoot.length);\n    };\n    /**\n     * @static\n     * @param {any} name\n     * @returns\n     * @deprecated\n     */\n    ChordChart.getKeyByValue = function (name) {\n        var i;\n        for (i = 0; i < _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"].length; i++) {\n            if (name == _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"][i].value) {\n                return _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"][i];\n            }\n        }\n    };\n    ChordChart.isTokenGhostChord = function (token) {\n        return token.match(_regexes__WEBPACK_IMPORTED_MODULE_1__[\"chordRegexes\"].ghostChordDetectionRegex);\n    };\n    ChordChart.isPipe = function (token) {\n        return token === '|';\n    };\n    ChordChart.isChordLine = function (input) {\n        if (input.chordLine) {\n            return true;\n        }\n        var tokens = input.replace(/\\s+/, \" \").split(' '), evalToken;\n        for (var i = 0; i < tokens.length; i++) {\n            if (tokens[i] === \"\") {\n                continue;\n            }\n            evalToken = tokens[i].trim();\n            if (ChordChart.isTokenGhostChord(evalToken)) {\n                continue;\n            }\n            if (ChordChart.isPipe(evalToken)) {\n                continue;\n            }\n            if (!ChordChart._isChordLineTokenAChord({ value: evalToken, skip: false })) {\n                return false;\n            }\n        }\n        return true;\n    };\n    // todo: can we remove the delta somehow? \n    ChordChart.getNewKey = function (oldKey, delta, targetKey) {\n        var keyValue = ChordChart.getKeyByName(oldKey).value + delta;\n        if (keyValue > 11) {\n            keyValue -= 12;\n        }\n        else if (keyValue < 0) {\n            keyValue += 12;\n        }\n        var i = 0;\n        if (keyValue == 0 || keyValue == 2 || keyValue == 5 || keyValue == 7 || keyValue == 10) {\n            // Return the Flat or Sharp Key\n            switch (targetKey.name) {\n                case \"A\":\n                case \"A#\":\n                case \"B\":\n                case \"C\":\n                case \"C#\":\n                case \"D\":\n                case \"D#\":\n                case \"E\":\n                case \"F#\":\n                case \"G\":\n                case \"G#\":\n                    for (; i < _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"].length; i++) {\n                        if (_keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"][i].value == keyValue && _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"][i].type == \"S\") {\n                            return _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"][i];\n                        }\n                    }\n                default:\n                    for (; i < _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"].length; i++) {\n                        if (_keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"][i].value == keyValue && _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"][i].type == \"F\") {\n                            return _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"][i];\n                        }\n                    }\n            }\n        }\n        else {\n            // Return the Natural Key\n            for (; i < _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"].length; i++) {\n                if (_keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"][i].value == keyValue) {\n                    return _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"][i];\n                }\n            }\n        }\n    };\n    ChordChart.getDeltaByKeyNames = function (oldKey, newKey) {\n        var oldKeyObj = ChordChart.getKeyByName(oldKey), newKeyObj = ChordChart.getKeyByName(newKey);\n        var delta = ChordChart.getDelta(oldKeyObj.value, newKeyObj.value);\n        if (delta > 0) {\n            return '+' + delta;\n        }\n        return delta + '';\n    };\n    ChordChart.getKeyByName = function (name) {\n        var i;\n        if (name.charAt(name.length - 1) == \"m\") {\n            name = name.substring(0, name.length - 1);\n        }\n        for (i = 0; i < _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"].length; i++) {\n            if (name == _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"][i].name) {\n                return _keys__WEBPACK_IMPORTED_MODULE_0__[\"keys\"][i];\n            }\n        }\n    };\n    ChordChart.prototype.setText = function (data) {\n        this.rawForm = data.split(/\\r?\\n/).map(function (line) {\n            return ChordChart.isChordLine(line) ? ChordChart._toChordLine(line) : line;\n        });\n    };\n    ChordChart._isChordLineTokenAChord = function (_a) {\n        var value = _a.value, skip = _a.skip;\n        value = value.trim();\n        if (value.length === 0) {\n            return false;\n        }\n        if (skip) {\n            return false;\n        }\n        // pipe stuck together\n        if (value.indexOf('|') !== -1) {\n            return value.split('|')\n                .filter(function (s) { return s; }) // case |Em|Em\n                .map(function (sv) { return !!sv.match(_regexes__WEBPACK_IMPORTED_MODULE_1__[\"chordRegexes\"].chordRegex); })\n                .every(function (x) { return x; });\n        }\n        return !!value.match(_regexes__WEBPACK_IMPORTED_MODULE_1__[\"chordRegexes\"].chordRegex);\n    };\n    ChordChart.prototype.transposeLine = function (values, delta, targetKey) {\n        return values.map(function (c) {\n            return !ChordChart._isChordLineTokenAChord(c) ? c : {\n                value: ChordChart.transposeChord(c.value, delta, targetKey),\n                pipes: c.pipes,\n                skip: false\n            };\n        });\n    };\n    ChordChart.prototype.transpose = function (key) {\n        var _this = this;\n        var newKey = ChordChart.getKeyByName(key);\n        var delta = ChordChart.getDelta(this.currentKey.value, newKey.value);\n        this.rawForm = this.rawForm.map(function (l) {\n            return ChordChart.isChordLine(l) ? { chordLine: true, values: _this.transposeLine(l.values, delta, newKey) } : l;\n        });\n        this.currentKey = newKey;\n    };\n    ChordChart.prototype.asText = function () {\n        return this.rawForm.map(function (l) {\n            if (ChordChart.isChordLine(l)) {\n                l = l.values.map(function (lToken) { return pipeIt(lToken.value, lToken.pipes); }).join('');\n            }\n            return l;\n        }).join('\\n');\n    };\n    ChordChart.prototype.asHtml = function (opts) {\n        if (opts === void 0) { opts = {}; }\n        return this.rawForm.map(function (l, i) {\n            if (ChordChart.isChordLine(l)) {\n                var chords = l.values.map(function (chordLineToken, index, array) {\n                    var value = chordLineToken.value;\n                    if (chordLineToken.skip) {\n                        return \"\" + value;\n                    }\n                    if (index === array.length - 1) {\n                        value = value.trim();\n                    }\n                    return \"<span class=\\\"chord\\\">\" + pipeIt(value, chordLineToken.pipes) + \"</span>\";\n                }).join('');\n                if (opts.chordsDisabled) {\n                    return null;\n                }\n                return \"<span class=\\\"chord-line\\\">\" + chords + \"</span>\";\n            }\n            if (opts.lyricsDisabled) {\n                return null;\n            }\n            return \"<span className=\\\"lyric-line\\\">\" + l + \"</span>\";\n        }).join('\\n');\n    };\n    return ChordChart;\n}());\n\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/keys.ts":
/*!*********************!*\
  !*** ./src/keys.ts ***!
  \*********************/
/*! exports provided: keys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"keys\", function() { return keys; });\nvar keys = [{\n        name: 'Ab',\n        value: 0,\n        type: 'F'\n    }, {\n        name: 'A',\n        value: 1,\n        type: 'N'\n    }, {\n        name: 'A#',\n        value: 2,\n        type: 'S'\n    }, {\n        name: 'Bb',\n        value: 2,\n        type: 'F'\n    }, {\n        name: 'B',\n        value: 3,\n        type: 'N'\n    }, {\n        name: 'C',\n        value: 4,\n        type: 'N'\n    }, {\n        name: 'C#',\n        value: 5,\n        type: 'S'\n    }, {\n        name: 'Db',\n        value: 5,\n        type: 'F'\n    }, {\n        name: 'D',\n        value: 6,\n        type: 'N'\n    }, {\n        name: 'D#',\n        value: 7,\n        type: 'S'\n    }, {\n        name: 'Eb',\n        value: 7,\n        type: 'F'\n    }, {\n        name: 'E',\n        value: 8,\n        type: 'N'\n    }, {\n        name: 'F',\n        value: 9,\n        type: 'N'\n    }, {\n        name: 'F#',\n        value: 10,\n        type: 'S'\n    }, {\n        name: 'Gb',\n        value: 10,\n        type: 'F'\n    }, {\n        name: 'G',\n        value: 11,\n        type: 'N'\n    }, {\n        name: 'G#',\n        value: 0,\n        type: 'S'\n    }];\n\n\n//# sourceURL=webpack:///./src/keys.ts?");

/***/ }),

/***/ "./src/regexes.ts":
/*!************************!*\
  !*** ./src/regexes.ts ***!
  \************************/
/*! exports provided: chordRegexes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"chordRegexes\", function() { return chordRegexes; });\nvar chordRegexes = {\n    chordRegex: /^[A-G][b#]?(2|5|6|7|9|11|13|6\\/9|7\\-5|7\\-9|7#5|7#9|7\\+5|7\\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|M7|m\\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|Maj7|maj9|Maj9|Maj11|maj11|Maj13|maj13|mb5|m|sus|sus2|sus4)*(\\/[A-G][b#]*)*$/,\n    chordReplaceRegex: /([A-G][b\\#]?[2|5|6|7|9|11|13|7\\-5|7\\-9|7#5|7#9|7\\+5|7\\+9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|M7|maj7|m6|m7|m7b5|m9|m11|m13|maj7|Maj7|maj9|Maj9|Maj11|maj11|Maj13|maj13|mb5|m|sus|sus2|sus4]*)/g,\n    ghostChordDetectionRegex: /\\(.*\\)/g\n};\n\n\n//# sourceURL=webpack:///./src/regexes.ts?");

/***/ })

/******/ });