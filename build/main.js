/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _placeholderLabel = __webpack_require__(1);

	var _placeholderLabel2 = _interopRequireDefault(_placeholderLabel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var placeholderLabel = new _placeholderLabel2.default('.placeholder-label');

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	(function () {
	  var PlaceholderLabel = function () {
	    function PlaceholderLabel(selector) {
	      _classCallCheck(this, PlaceholderLabel);

	      this.selector = selector;
	      this._setLabels();

	      // If labels are wrapping the field, look for a text node and wrap it in a
	      // span tag.
	      this._wrapLabelTextNodes();

	      // Replace the labels with placeholders.
	      this._addPlaceholders();
	      this._hideLabels();

	      // Watch for events that could trigger the placeholder to label swap.
	      this._setupPlaceholderLabelSwapEvents();
	    }

	    _createClass(PlaceholderLabel, [{
	      key: '_setLabels',
	      value: function _setLabels() {
	        var _this = this;

	        this.labels = [];
	        var parents = document.querySelectorAll(this.selector);

	        parents.forEach(function (form) {
	          _this.labels = _this.labels.concat(Array.prototype.slice.call(form.querySelectorAll('label')));
	        });
	      }
	    }, {
	      key: '_hideLabels',
	      value: function _hideLabels() {
	        var _this2 = this;

	        this.labels.forEach(function (label) {
	          _this2._hideLabel(_this2._getFunctionalLabel(label));
	        });
	      }
	    }, {
	      key: '_wrapLabelTextNodes',
	      value: function _wrapLabelTextNodes() {
	        var _this3 = this;

	        this.labels.forEach(function (label) {

	          if (label.childNodes.length > 1) {
	            _this3._wrapLabelTextNode(label);
	          }
	        });
	      }
	    }, {
	      key: '_wrapLabelTextNode',
	      value: function _wrapLabelTextNode(label) {
	        label.childNodes.forEach(function (childNode) {
	          if (childNode.nodeType === 3) {
	            if (childNode.nextSibling) {
	              var newWrapper = document.createElement('span');
	              var nextSibling = childNode.nextSibling;

	              newWrapper.appendChild(childNode);
	              label.insertBefore(newWrapper, nextSibling);
	            }
	          }
	        });
	      }
	    }, {
	      key: '_addPlaceholders',
	      value: function _addPlaceholders() {
	        var _this4 = this;

	        this.labels.forEach(function (label) {
	          _this4._setPlaceHolderText(_this4._getCorrespondingField(label), _this4._getLabelText(label));
	        });
	      }
	    }, {
	      key: '_getCorrespondingField',
	      value: function _getCorrespondingField(label) {
	        return this._getNestedField(label) || this._getFieldByForProperty(label);
	      }
	    }, {
	      key: '_getNestedField',
	      value: function _getNestedField(label) {
	        return label.querySelector('input, textarea');
	      }
	    }, {
	      key: '_getFieldByForProperty',
	      value: function _getFieldByForProperty(label) {
	        return document.querySelector('#' + label.htmlFor, 'name=[' + label.htmlFor + ']');
	      }
	    }, {
	      key: '_getLabelText',
	      value: function _getLabelText(label) {
	        return label.textContent.trim();
	      }
	    }, {
	      key: '_setPlaceHolderText',
	      value: function _setPlaceHolderText(field, desiredText) {
	        field.setAttribute('placeholder', desiredText);
	      }
	    }, {
	      key: '_setupPlaceholderLabelSwapEvents',
	      value: function _setupPlaceholderLabelSwapEvents() {
	        var _this5 = this;

	        this.labels.forEach(function (label) {
	          var field = _this5._getCorrespondingField(label);
	          var eventsToWatch = ['keyup', 'change', 'cut', 'paste', 'mousup'];

	          eventsToWatch.forEach(function (eventType) {
	            field.addEventListener(eventType, _this5._placeholderLabelSwapCallback.bind(_this5, field, label));
	          });
	        });
	      }
	    }, {
	      key: '_placeholderLabelSwapCallback',
	      value: function _placeholderLabelSwapCallback(field, label, e) {
	        var _this6 = this;

	        if (e.type === 'cut' || e.type === 'paste') {
	          window.setTimeout(function () {
	            _this6._placeholderLabelSwap(field, label);
	          }, 100);
	        } else {
	          this._placeholderLabelSwap(field, label);
	        }
	      }
	    }, {
	      key: '_placeholderLabelSwap',
	      value: function _placeholderLabelSwap(field, label) {

	        if (field.value) {
	          this._showLabel(this._getFunctionalLabel(label));
	        } else {
	          this._hideLabel(this._getFunctionalLabel(label));
	        }
	      }
	    }, {
	      key: '_showLabel',
	      value: function _showLabel(label) {
	        this._removeClass(label, 'label-is-hidden');
	        label.style.opacity = '1';
	        label.style.transition = 'opacity .4s ease-in';
	      }
	    }, {
	      key: '_hideLabel',
	      value: function _hideLabel(label) {
	        this._addClass(label, 'label-is-hidden');
	        label.style.opacity = '0';
	      }
	    }, {
	      key: '_getFunctionalLabel',
	      value: function _getFunctionalLabel(label) {
	        if (label.childNodes.length > 1) {
	          return label.querySelector('span');
	        }

	        return label;
	      }
	    }, {
	      key: '_removeClass',
	      value: function _removeClass(element, className) {
	        element.className = element.className.replace(className, '');
	        element.className = element.className.trim();
	      }
	    }, {
	      key: '_addClass',
	      value: function _addClass(element, className) {
	        element.className = element.className + className;
	        element.className = element.className.trim();
	      }
	    }]);

	    return PlaceholderLabel;
	  }();

	  if (typeof module !== 'undefined' && module.exports) {
	    module.exports = PlaceholderLabel;
	  } else if (window) {
	    window.placeholderLabel = function (selector) {
	      return new PlaceholderLabel(selector);
	    };
	  }
	})();

/***/ }
/******/ ]);