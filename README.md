# KIT Lazy
Kit lazy is fast&flex plain javascript plugin that speeds up your web application by loading images as they enter the viewport.

Plugin also works with asynchronously loaded images, has callback on image replace, and keeping track of all replaced, or to be replaced images.    

### Link
Kit Lazy :tada: - https://natteke.github.io/kit/lazy/demos/

### Guide
If you are not familiar with lazy load, see the <a href="https://natteke.github.io/kit/lazy/docs/#Guide">guide</a>, to find out the core idea of lazy loading, and how to prepare your images before upload.

## Installation
#### HTML
```HTML
<script src="/js/kit.lazy.js"></script>
```

#### JS
```javascript
kit.createLazy();
```
or
```javascript
kit.createLazy({
    option: value
});
```

See <a href="https://natteke.github.io/kit/lazy/demos/#Images">demos</a> to figure what is happening with images.

### Options

| Option                 | Type       | Default     | Description                                                        |
| ---------------------- | -----------| ----------- | -------------------------------------------------------------------|
| delay                  | Number     | `0`         | Delay before image toggle, or add class to an element                                            |
| success                | String     | `loaded`    | Success class will be added to the element, when the image will be in viewport      |
| searchClass            | String     | `kit-lazy`  | Search class is used to find elements to work with                 |

### Async loaded images
When you uploading some images, push them with lightweight placeholder.

Then, to update those images, use the `load()` method.

It will search for a new elements with `search class`, and serve them, until they will be updated with a new image.

```javascript
kit.lazy.load()
```

If you want to change some of the options, just call the plugin again with the new options object. It will update its parameters without additional initialisation.




### Licence
The code and the documentation are released under the MIT License.

