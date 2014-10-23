# Tabby

> Tabby is a minimal jQuery tab plugin with hashChange built in and optional default theme.

## Getting Started

Install via Bower

```
bower install tabby.js --save
```

or download the latest [zip file](https://github.com/ImBobby/tabby/releases). Require [jQuery minimum version 1.8.3](https://github.com/ImBobby/tabby/blob/master/bower.json).

## Usage

Include Tabby's CSS and JS file and jQuery.

```HTML
<link rel="stylesheet" href="path/to/tabby.css">
...
<script src="path/to/jquery.js"></script>
<script src="path/to/tabby.js"></script>
```

Set up the markup

```HTML
<div class="tabby">
    <div class="tabby-triggers">
        <a class="tabby-trigger active" href="#[TAB_ID_1]">...</a>
        <a class="tabby-trigger" href="#[TAB_ID_2]">...</a>
    </div>
    <div class="tabby-tabs">
        <div class="tabby-tab active" id="[TAB_ID_1]">...</div>
        <div class="tabby-tab" id="[TAB_ID_2]">...</div>
    </div>
</div>
```

Init Tabby by running

```Javascript
$('.tabby').tabby();
```

### Example

```HTML
<div class="tabby" id="myTab">
    <div class="tabby-triggers">
        <a class="tabby-trigger active" href="#tab1">Trigger 1</a>
        <a class="tabby-trigger" href="#tab2">Trigger 2</a>
    </div>
    <div class="tabby-tabs">
        <div class="tabby-tab active" id="tab1">Content 1</div>
        <div class="tabby-tab" id="tab2">Content 2</div>
    </div>
</div>
```

```Javascript
var elem = $('#myTab');

elem.tabby();
```

### Options

| Option  | Type  | Default  | Description  |
|---|---|---|---|
| speed  | integer  | 500  | in millisecond (ms)  |
| hashChange  | boolean  | false  | If set to true, will add hash to URL  |
| complete  | function  | null  | Callback function which run after animation finish  |

## Browser support

Minimum browser support is IE8+ along with other evergreen browsers.