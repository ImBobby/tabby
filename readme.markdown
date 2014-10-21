# Tabby

> Tabby is a minimal jQuery tab plugin.

## Getting Started

Install via Bower

```
bower install tabby.js --save
```

or download the latest [zip file](https://github.com/ImBobby/tabby/releases). Require [jQuery minimum version 1.8.3](https://github.com/ImBobby/tabby/blob/master/bower.json).

## Usage

1. Include Tabby's CSS and JS file and jQuery.

```HTML
<link rel="stylesheet" href="path/to/tabby.css">
...
<script src="path/to/jquery.js"></script>
<script src="path/to/tabby.js"></script>
```

2. Set up the markup

```HTML
<div class="tabby">
    <div class="tabby-triggers">
        <a href="#tab1" class="tabby-trigger active">Tab 1 trigger</a>
        <a href="#tab2" class="tabby-trigger">Tab 2 trigger</a>
    </div>
    <div class="tabby-tabs">
        <div class="tabby-tab" id="tab1">Tab 1 content</div>
        <div class="tabby-tab" id="tab2">Tab 2 content</div>
    </div>
</div>
```

3. Init Tabby by running

```Javascript
$('.tabby').tabby();
```

## Browser support

Minimum browser support is IE8+ along with other evergreen browsers.