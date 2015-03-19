# jquery.coverscroll

Improves scroll performance by adding a cover layer to prevent hover styles from triggering.   
You can checkout [demo](http://indigounited.github.io/jquery.coverscroll/test/demo.html) to see it in action.


## API

### .coverscroll([options])

Setups the plugin on a scrollable element with the given `options`.   
The element can either be the `window` or an element with `overflow` set to `scroll` or `auto`.


Available options:

`delay`  - The delay in ms used to remove the cover div after the last scroll event occurred


```
$(window).coverscroll();
```


### .coverscroll('destroy')

Destroys the plugin, releasing all events and clearing timers.


## Browser support

The plugin uses `transform`, checkout the support table [here](http://caniuse.com/#feat=transforms2d).


## How to use

Simply include the `jquery.coverscroll.js` file after jQuery is loaded.   
This plugin also integrates with `AMD` (no shim required) and `CommonJS`.


## Tests

No tests yet :(
