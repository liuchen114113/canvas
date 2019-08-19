---
theme: 'League'
transition: 'zoom'
highlightTheme: 'darkula'
slideNumber: true
---

### canvas 基础操作及使用场景探讨

<small>分享人 [刘晨](http://hakim.se) </small>

---

<div class="fragment">· 基础用法</div> 
<div class="fragment">· 绘制形状</div> 
<div class="fragment">· 使用图片</div>
<div class="fragment">· 像素操作</div>
<div class="fragment">· 鼠标交互</div>
<div class="fragment">· 性能优化</div>
<div class="fragment">· 使用场景</div>

---

#### canvas 元素

```html
<canvas width="1600" height="800"> </canvas>
```

    <canvas> 看起来和 <img> 元素很相像，唯一的不同就是它并没有src
    和alt属性。实际上，<canvas> 标签只有两个属性 —— width和height。
    这些都是可选的，并且同样利用 DOM properties 来设置。当没有设置宽
    度和高度的时候，canvas会初始化宽度为300像素和高度为150像素。该元素
    可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果
    CSS的尺寸与初始画布的比例不一致，它会出现扭曲。

<small style="float:left">[示例](http://localhost:8000/) </small>

--

#### 渲染上下文

     <canvas> 元素创造了一个固定大小的画布，它具有多个渲染上下文：
     用于绘制2D图形的 CanvasRenderingContext2D；WebGL 使用
     了基于OpenGL ES的3D上下文 ("experimental-webgl") 。
     canvas 起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它
     的上面绘制。<canvas> 元素有一个叫做 getContext() 的方法，这个方
     法是用来获得渲染上下文和它的绘画功能。getContext()只有一个参数，对
     于绘制2D图像而言，我们使用 CanvasRenderingContext2D。

--

#### 获取上下文

```js
let canvas = document.getElementById('tutorial')
let ctx = canvas.getContext('2d')
```

---

#### 画布栅格

<div style="display:flex">
  <span style="font-size:16px;margin-right: 50px;text-align:left">
  在我们开始画图之前，我们需要了解一下画布栅格（canvas grid）以及坐标空间。如右图所示，canvas元素默认被网格所覆盖。网格中的一个单元相当于canvas元素中的一像素。栅格的起点为左上角（坐标为（0,0））。所有元素的位置都相对于原点定位。所以图中蓝色方形左上角的坐标为距离左边（X轴）x像素，距离上边（Y轴）y像素（坐标为（x,y））。</span>
  <img src="./src/assets/images/canvas_default_grid.png">
</div>

--

#### 绘制图形

         HTML 中的元素 canvas 只支持一种原生的图形绘制：矩形。所有其他
         的图形的绘制都至少需要生成一条路径。不过，我们拥有众多路径生成的
         方法让复杂图形的绘制成为了可能。

--

#### 绘制矩形

```js
// 绘制一个填充的矩形
ctx.fillRect(x, y, width, height)

// 绘制一个矩形的边框
ctx.strokeRect(x, y, width, height)

// 清除指定矩形区域，让清除部分完全透明。
ctx.clearRect(x, y, width, height)
```

--

#### 绘制路径

```js
function draw(ctx: CanvasRenderingContext2D): void {
  ctx.lineWidth = 3
  ctx.beginPath()

  ctx.arc(75, 75, 50, 0, Math.PI * 2, true) // 绘制

  ctx.moveTo(110, 75)
  ctx.arc(75, 75, 35, 0, Math.PI, false) // 口(顺时针)

  ctx.moveTo(65, 65)
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true) // 左眼

  ctx.moveTo(95, 65)
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true) // 右眼

  ctx.stroke()
}
```

---

#### 使用图片

       canvas更有意思的一项特性就是图像操作能力。可以用于动态的图像合成或
       者作为图形的背景，以及游戏界面（Sprites）等等。浏览器支持的任意格
       式的外部图片都可以使用，比如PNG、GIF或者JPEG。 甚至可以将同一个
       页面中其他canvas元素生成的图片作为图片源引入图像到 canvas 里需要
       以下两步基本操作：

       1、获得一个指向HTMLImageElement的对象或者另一个canvas元素的引
       用作为源，也可以通过提供一个 URL 的方式来使用图片。
       2、使用 drawImage()函数将图片绘制到画布上。

--

#### 图片使用示例

```js
function draw(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x:number
  y:number
  width: number,
  height: number
): void {
  ctx.drawImage(image, x, y, width, height)
}
```

---

## Touch Optimized

Presentations look great on touch devices, like mobile phones and tablets. Simply swipe through your slides.

---

## Markdown support

Write content using inline or external Markdown.
Instructions and more info available in the [readme](https://github.com/hakimel/reveal.js#markdown).

--

```

## Markdown support

Write content using inline or external Markdown.
Instructions and more info available in the
[readme](https://github.com/hakimel/reveal.js#markdown).

```

---

## Fragments

Hit the next arrow...

... to step through ...
<span class="fragment">... a</span> <span class="fragment">fragmented</span> <span class="fragment">slide.</span>

Note:
This slide has fragments which are also stepped through in the notes window.

--

## Fragment Styles

There's different types of fragments, like:

grow <!-- .element: class="fragment grow" -->

shrink <!-- .element: class="fragment shrink" -->

fade-out <!-- .element: class="fragment fade-out " -->

fade-up (also down, left and right!) <!-- .element: class="fragment fade-up" -->

current-visible <!-- .element: class="fragment current-visible" -->

Highlight <span class="fragment highlight-red">red</span> <span class="fragment highlight-blue">blue</span> <span class="fragment highlight-green">green</span>

---

## Transition Styles

You can select from different transitions, like:
[None](?transition=none#/transitions) - [Fade](?transition=fade#/transitions) - [Slide](?transition=slide#/transitions) - [Convex](?transition=convex#/transitions) - [Concave](?transition=concave#/transitions) - [Zoom](?transition=zoom#/transitions)

---

## Themes

reveal.js comes with a few themes built in:
<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/black.css'); return false;">Black (default)</a> -
<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/white.css'); return false;">White</a> -
<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/league.css'); return false;">League</a> -
<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/sky.css'); return false;">Sky</a> -
<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/beige.css'); return false;">Beige</a> -
<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/simple.css'); return false;">Simple</a> <br>
<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/serif.css'); return false;">Serif</a> -
<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/blood.css'); return false;">Blood</a> -
<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/night.css'); return false;">Night</a> -
<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/moon.css'); return false;">Moon</a> -
<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/solarized.css'); return false;">Solarized</a>

---

<!-- .slide: data-background="#dddddd" -->

## Slide Backgrounds

Set `data-background="#dddddd"` on a slide to change the background color. All CSS color formats are supported.
<a href="#" class="navigate-down">
<img width="178" height="238" data-src="https://s3.amazonaws.com/hakim-static/reveal-js/arrow.png" alt="Down arrow">
</a>

--

<!-- .slide: data-background="https://s3.amazonaws.com/hakim-static/reveal-js/image-placeholder.png" -->

## Image Backgrounds

```markdown
<!-- .slide: data-background="https://s3.amazonaws.com/hakim-static/reveal-js/image-placeholder.png" -->
```

--

<!-- .slide: data-background="https://s3.amazonaws.com/hakim-static/reveal-js/image-placeholder.png" data-background-repeat="repeat" data-background-size="100px" -->

## TILED BACKGROUNDS

```markdown
<!-- .slide: data-background="https://s3.amazonaws.com/hakim-static/reveal-js/image-placeholder.png" data-background-repeat="repeat" data-background-size="100px" -->
```

--

<!-- .slide: data-background-video="https://s3.amazonaws.com/static.slid.es/site/homepage/v1/homepage-video-editor.mp4,https://s3.amazonaws.com/static.slid.es/site/homepage/v1/homepage-video-editor.webm" data-background-color="#000000" -->

## Video Backgrounds

```markdown
<!-- .slide: data-background-video="https://s3.amazonaws.com/static.slid.es/site/homepage/v1/homepage-video-editor.mp4,https://s3.amazonaws.com/static.slid.es/site/homepage/v1/homepage-video-editor.webm" data-background-color="#000000" -->
```

--

<!-- .slide: data-background="http://i.giphy.com/90F8aUepslB84.gif" -->

## ... and GIFs!

```markdown
<!-- .slide: data-background="http://i.giphy.com/90F8aUepslB84.gif" -->
```

---

<!-- .slide: data-transition="slide" data-background="#4d7e65" data-background-transition="zoom" -->

## Background Transitions

Different background transitions are available via the backgroundTransition option. This one's called "zoom".

---

<!-- .slide: data-transition="slide" data-background="#b5533c" data-background-transition="zoom" -->

## Background Transitions

You can override background transitions per-slide.

---

## Pretty Code

```js
function linkify( selector ) {
  if( supports3DTransforms ) {

    var nodes = document.querySelectorAll( selector );

    for( var i = 0, len = nodes.length; i &lt; len; i++ ) {
      var node = nodes[i];

      if( !node.className ) {
        node.className += ' roll';
      }
    }
  }
}
```

Code syntax highlighting courtesy of [highlight.js](http://softwaremaniacs.org/soft/highlight/en/description/).

---

## Marvelous List

- No order here
- Or here
- Or here
- Or here

---

## Fantastic Ordered List

1.  One is smaller than...
2.  Two is smaller than...
3.  Three!

---

## Tabular Tables

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

---

## Clever Quotes

These guys come in two forms, inline: <q cite="http://searchservervirtualization.techtarget.com/definition/Our-Favorite-Technology-Quotations">"The nice thing about standards is that there are so many to choose from"</q> and block:

> "For years there has been a theory that millions of monkeys typing at random on millions of typewriters would reproduce the entire works of Shakespeare. The Internet has proven this theory to be untrue."

---

## Intergalactic Interconnections

You can link between slides internally, [like this](#/2/3).

---

## Speaker View

There's a [speaker view](https://github.com/hakimel/reveal.js#speaker-notes). It includes a timer, preview of the upcoming slide as well as your speaker notes.

Press the _S_ key to try it out.

<aside class="notes">Oh hey, these are some notes. They'll be hidden in your presentation, but you can see them if you open the speaker notes window (hit 's' on your keyboard).</aside>

---

## Export to PDF

Presentations can be [exported to PDF](https://github.com/hakimel/reveal.js#pdf-export), here's an example:

<iframe data-src="https://www.slideshare.net/slideshow/embed_code/42840540" width="445" height="355" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:3px solid #666; margin-bottom:5px; max-width: 100%;" allowfullscreen=""></iframe>

---

## Global State

Set `data-state="something"` on a slide and `"something"` will be added as a class to the document element when the slide is open. This lets you apply broader style changes, like switching the page background.

---

<!-- .slide: data-state="customevent" -->

## State Events

Additionally custom events can be triggered on a per slide basis by binding to the `data-state` name.

```js
Reveal.addEventListener('customevent', function() {
  console.log('"customevent" has fired')
})
```

---

## Take a Moment

Press B or . on your keyboard to pause the presentation. This is helpful when you're on stage and want to take distracting slides off the screen.

---

## Much more

- Right-to-left support
- [Extensive JavaScript API](https://github.com/hakimel/reveal.js#api)
- [Auto-progression](https://github.com/hakimel/reveal.js#auto-sliding)
- [Parallax backgrounds](https://github.com/hakimel/reveal.js#parallax-background)
- [Custom keyboard bindings](https://github.com/hakimel/reveal.js#keyboard-bindings)

---

## Plugins

--

## search

Handles finding a text string anywhere in the slides and showing the next occurrence to the user by navigatating to that slide and highlighting it.

**Shortcut : `CTRL + SHIFT + F`**

--

## Zoom

Zoom anywhere on your presentation

**Shortcut : `alt + click`: Zoom in. Repeat to zoom back out.**

--

## Notes

Add note to speaker view.

Default markdown syntaxe is

```text
note: a custom note here
```

--

## Chalkboard

Have you ever missed the traditional classroom experience where you can quickly sketch something on a chalkboard?

Just press 'b' or click on the pencil button to open and close your chalkboard.

--

## Chalkboard

- Click the `left mouse button` to write on the chalkboard
- Click the `right mouse button` to wipe the chalkboard
- Click the `DEL` key to clear the chalkboard

--

## MAKE NOTES ON SLIDES

Did you notice the <i class="fa fa-pencil"></i> button?

By pressing 'c' or clicking the button you can start and stop the notes taking mode allowing you to write comments and notes directly on the slide.

--

## Chart

Add chart from simple string

--

### Line chart from JSON string

<canvas class="stretch" data-chart="line">
<!--
{
 "data": {
  "labels": ["January"," February"," March"," April"," May"," June"," July"],
  "datasets":[
   {
    "data":[65,59,80,81,56,55,40],
    "label":"My first dataset","backgroundColor":"rgba(20,220,220,.8)"
   },
   {
    "data":[28,48,40,19,86,27,90],
    "label":"My second dataset","backgroundColor":"rgba(220,120,120,.8)"
   }
  ]
 }, 
 "options": { "responsive": "true" }
}
-->
</canvas>

--

### Line chart with CSV data and JSON configuration

<canvas class="stretch" data-chart="line">
My first dataset,  65, 59, 80, 81, 56, 55, 40
<!-- This is a comment -->
My second dataset, 28, 48, 40, 19, 86, 27, 90
<!-- 
{ 
"data" : {
	"labels" : ["Enero", "Febrero", "Marzo", "Avril", "Mayo", "Junio", "Julio"],
	"datasets" : [{ "borderColor": "#0f0", "borderDash": ["5","10"] }, { "borderColor": "#0ff" } ]
	}
}
-->
</canvas>

--

### Bar chart with CSV data

<canvas class="stretch" data-chart="bar">
,January, February, March, April, May, June, July
My first dataset, 65, 59, 80, 81, 56, 55, 40
My second dataset, 28, 48, 40, 19, 86, 27, 90
</canvas>

--

### Stacked bar chart from CSV file with JSON configuration

<canvas class="stretch" data-chart="bar" data-chart-src="chart/data.csv">
<!-- 
{
"data" : {
"datasets" : [{ "backgroundColor": "#0f0" }, { "backgroundColor": "#0ff" } ]
},
"options": { "responsive": true, "scales": { "xAxes": [{ "stacked": true }], "yAxes": [{ "stacked": true }] } }
}
-->
</canvas>

--

### Pie chart

<canvas class="stretch" data-chart="pie">
,Black, Red, Green, Yellow
My first dataset, 40, 40, 20, 6
My second dataset, 45, 40, 25, 4
</canvas>

--

## EMBEDDING A TWEET

To embed a tweet, simply determine its URL and include the following code in your slides:

```html
<div class="tweet" data-src="TWEET_URL"></div>
```

--

<div class="tweet" data-src="https://twitter.com/Evilznet/status/1086984843056107525"></div>

--

## menu

A SLIDEOUT MENU FOR NAVIGATING REVEAL.JS PRESENTATIONS

--

See the <i class="fa fa-bars"></i> in the corner?

Click it and the menu will open from the side.

Click anywhere on the slide to return to the presentation,
or use the close button in the menu.

--

If you don't like the menu button,
you can use the slide number instead.

Go on, give it a go.

The menu button can be hidden using the options,
but you need to enable the slide number link.

--

Or you can open the menu by pressing the m key.

You can navigate the menu with the keyboard as well.
Just use the arrow keys and <space> or <enter> to change slides.

You can disable the keyboard for the
menu in the options if you wish.

--

## LEFT OR RIGHT

You can configure the menu to slide in from the left or right

--

### MARKERS

The slide markers in the menu can be useful to show
you the progress through the presentation.

You can hide them if you want.

You can also show/hide slide numbers.

--

### SLIDE TITLES

The menu uses the first heading to label each slide
but you can specify another label if you want.

Use a data-menu-title attribute in the section element to give the slide a custom label, or add a menu-title class to any element in the slide you wish.

You can change the titleSelector option and use
any elements you like as the default for labelling each slide.

--

## MathSVG

An extension of the math.js plugin allowing to render LaTeX in SVG.

--

### The Lorenz Equations

\[\begin{aligned}
\dot{x} &amp; = \sigma(y-x) \\
\dot{y} &amp; = \rho x - y - xz \\
\dot{z} &amp; = -\beta z + xy
\end{aligned} \]

--

### The Cauchy-Schwarz Inequality

<script type="math/tex; mode=display">
  \left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
</script>

--

### coucou footer

Includes a footer in all the slides of a Reveal.js presentation (with optional exclusion of some slides) that will show the title of the presentation.

--

## code-focus

A plugin that allows focusing on specific lines of code blocks.

--

### Code Focus Demo

```js
// Useless comment.
alert('hi')
```

<span class="code-presenting-annotation fragment current-only" data-code-focus="1">Present code found within any repository source file.</span>
<span class="code-presenting-annotation fragment current-only" data-code-focus="1-2">Without ever leaving your slideshow.</span>

---

<!-- .slide: style="text-align: left;" -->

# THE END

- [Try the online editor](http://slides.com)
- [Source code & documentation](https://github.com/hakimel/reveal.js)
