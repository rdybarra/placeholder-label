/*
 * This script takes fields with labels and turn the labels into placeholders.
 * It then shows the label if there is field value. If there is no field value,
 * then the placeholder is shown.
 *
 * It exports itself by using moduel.exports if available (for common.js),
 * otherwise is creates a namespace on the global object.
 */

(function() {

  class PlaceholderLabel {

    constructor(selector) {
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

    _setLabels() {
      this.labels = [];
      let parents = Array.prototype.slice.call(document.querySelectorAll(this.selector));

      parents.forEach(form => {
        this.labels = this.labels.concat(Array.prototype.slice.call(form.querySelectorAll('label')));
      });
    }

    _hideLabels() {
      this.labels.forEach(label => {
        if (!this._shouldLabelBeVisible(this._getCorrespondingField(label))) {
          this._hideLabel(this._getFunctionalLabel(label));
        }
      });
    }

    _wrapLabelTextNodes() {
      this.labels.forEach(label => {

        if (label.childNodes.length > 1) {
          this._wrapLabelTextNode(label);
        }
      });
    }

    _wrapLabelTextNode(label) {
      Array.prototype.slice.call(label.childNodes).forEach(childNode => {
        if (childNode.nodeType === 3) {
           if (childNode.nextSibling) {
             let newWrapper = document.createElement('span');
             let nextSibling = childNode.nextSibling;

             newWrapper.appendChild(childNode);
             label.insertBefore(newWrapper, nextSibling);
           }
        }
      });
    }

    _addPlaceholders() {
      this.labels.forEach(label => {
        this._setPlaceHolderText(this._getCorrespondingField(label), this._getLabelText(label));
      });
    }

    _getCorrespondingField(label) {
      return this._getNestedField(label) || this._getFieldByForProperty(label);
    }

    _getNestedField(label) {
      return label.querySelector('input, textarea, select');
    }

    _getFieldByForProperty(label) {
      return document.querySelector('#' + label.htmlFor, 'name=[' + label.htmlFor + ']');
    }

    _getLabelText(label) {
      return label.textContent.trim();
    }

    _setPlaceHolderText(field, desiredText) {
      if (field.localName === 'select') {
        let newOption = document.createElement('option');
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

    _setupPlaceholderLabelSwapEvents() {
      this.labels.forEach(label => {
        let field = this._getCorrespondingField(label);
        let eventsToWatch = ['keyup', 'change', 'cut', 'paste', 'mousup'];

        eventsToWatch.forEach(eventType => {
          field.addEventListener(eventType, this._placeholderLabelSwapCallback.bind(this, field, label));
        });
      });
    }

    _placeholderLabelSwapCallback(field, label, e) {
      if (e.type === 'cut' || e.type === 'paste') {
        window.setTimeout(() => { this._placeholderLabelSwap(field, label)}, 100);
      } else {
        this._placeholderLabelSwap(field, label);
      }
    }

    _placeholderLabelSwap(field, label) {
      if (this._shouldLabelBeVisible(field)) {
        this._showLabel(this._getFunctionalLabel(label));
      }
      else {
        this._hideLabel(this._getFunctionalLabel(label));
      }
    }

    _shouldLabelBeVisible(field) {
      if (field.value) {
        return true;
      }

      if (field.localName === 'select' && field.selectedIndex !== 0) {
        return true;
      }

      return false;
    }

    _fieldHasSelectedOption(field) {
      let hasSelectedOption = false;

      Array.prototype.slice.call(field.childNodes).forEach(childNode => {
        if (childNode.defaultSelected) {
          hasSelectedOption = true;
        }
      });

      return hasSelectedOption;
    }

    _showLabel(label) {
      this._removeClass(label, 'label-is-hidden');
      label.style.opacity = '1';
      label.style.transition = 'opacity .4s ease-in';
    }

    _hideLabel(label) {
      this._addClass(label, 'label-is-hidden');
      label.style.opacity = '0';
    }

    _getFunctionalLabel(label) {
      if (label.childNodes.length > 1) {
        return label.querySelector('span');
      }

      return label;
    }

    _removeClass(element, className) {
      element.className = element.className.replace(className, '');
      element.className = element.className.trim();
    }

    _addClass(element, className) {
      element.className = element.className + className;
      element.className = element.className.trim();
    }

  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PlaceholderLabel;
  } else if (window) {
    window.placeholderLabel = function(selector) {
      return new PlaceholderLabel(selector);
    };
  }

})();
