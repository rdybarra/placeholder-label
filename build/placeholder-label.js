/*
 * This script takes fields with labels and turn the labels into placeholders.
 * It then shows the label if there is field value. If there is no field value,
 * then the placeholder is shown.
 *
 * It exports itself by using moduel.exports if available (for common.js),
 * otherwise is creates a namespace on the global object.
 */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  var PlaceholderLabel = (function () {
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
        var parents = Array.prototype.slice.call(document.querySelectorAll(this.selector));

        parents.forEach(function (form) {
          _this.labels = _this.labels.concat(Array.prototype.slice.call(form.querySelectorAll('label')));
        });
      }
    }, {
      key: '_hideLabels',
      value: function _hideLabels() {
        var _this2 = this;

        this.labels.forEach(function (label) {
          if (!_this2._shouldLabelBeVisible(_this2._getCorrespondingField(label))) {
            _this2._hideLabel(_this2._getFunctionalLabel(label));
          }
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
        Array.prototype.slice.call(label.childNodes).forEach(function (childNode) {
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
        return label.querySelector('input, textarea, select');
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
        if (field.localName === 'select') {
          var newOption = document.createElement('option');
          newOption.setAttribute('value', '');

          if (!this._fieldHasSelectedOption(field)) {
            newOption.setAttribute('selected', 'selected');
          }

          newOption.appendChild(document.createTextNode(desiredText));
          field.insertBefore(newOption, field.firstChild);
        } else {
          field.setAttribute('placeholder', desiredText);
        }
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
        if (this._shouldLabelBeVisible(field)) {
          this._showLabel(this._getFunctionalLabel(label));
        } else {
          this._hideLabel(this._getFunctionalLabel(label));
        }
      }
    }, {
      key: '_shouldLabelBeVisible',
      value: function _shouldLabelBeVisible(field) {
        if (field.value) {
          return true;
        }

        if (field.localName === 'select' && field.selectedIndex !== 0) {
          return true;
        }

        return false;
      }
    }, {
      key: '_fieldHasSelectedOption',
      value: function _fieldHasSelectedOption(field) {
        var hasSelectedOption = false;

        Array.prototype.slice.call(field.childNodes).forEach(function (childNode) {
          if (childNode.defaultSelected) {
            hasSelectedOption = true;
          }
        });

        return hasSelectedOption;
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
  })();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PlaceholderLabel;
  } else if (window) {
    window.placeholderLabel = function (selector) {
      return new PlaceholderLabel(selector);
    };
  }
})();
