# videojs-spatial-navigation

Spatial Navigation in Video.js

## Installation

```sh
npm i videojs-spatial-navigation
```

## Usage

To include videojs-spatial-navigation on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-spatial-navigation/index.js"></script>
<script>
  var player = videojs('my-video');

  player.spatialNavigation();
</script>
```

## License

MIT. Copyright (c) Kyaw Swar Thwin &lt;myanmarunicorn@gmail.com&gt;

[videojs]: http://videojs.com/
