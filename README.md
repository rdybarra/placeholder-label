This script takes fields with labels and turns the labels into placeholders. It then shows the label if there is field value. If there is no field value, then the placeholder is shown. Placeholders are automatically created based on the label text.

## Usage
Choose a selector that contains the label/field pairs you want to be affected. In this case we can use `.placeholder-label`. 

You use that selector in the constructor (or function)

### Usage with common.js
```
import PlaceholderLabel from './placeholder-label';

let placeholderLabel = new PlaceholderLabel('.placeholder-label');
```

### Usage inline
```
  <script src="/build/placeholder-label.js"></script>
  <script>
    placeholderLabel('.placeholder-label');
  </script>
```

## Requirements
Either of the following two styles of markup is allowed:
```
<label for="input1">First Name</label>
<input id="input1" type="text">

<label>Last Name
  <input type="text">
</label>
```
In the second version, the markup is adjust to wrap the text node in a `span` tag.

## Options
Currently there are no options. It uses opacity to change the labels, and when appropriate, toggles a class on the label called `label-is-visible`.

## Build
I use Babel to convert to es5:
```
babel src/placeholder-label.js -o build/placeholder-label.js
```

I knew I wanted the code to be used both as an inline script and as a module. I found some guidance here: http://oli.me.uk/2013/07/21/exporting-through-amd-commonjs-and-the-global-object/

Constructive criticism is welcome.