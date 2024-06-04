# SVELTE study

## 简介

**什么是 Svelte？**

Svelte 是一个构建 web 应用程序的工具。

Svelte 与诸如 React 和 Vue 等 JavaScript 框架类似，都怀揣着一颗让构建交互式用户界面变得更容易的心。

**添加组件**

首先，向组件添加 `<script>` 标签并声明一个 name 变量：

```svelte
<script>
	let name = 'world';
</script>

<h1>Hello {name.toUpperCase()}!</h1>
```

**可访问性（Accessibility，缩写为 a11y）**

方面的问题并不总是容易纠正的，但是如果编写的标签不具有良好的可访问性，Svelte 会通过警告来帮你改正。

```svelte
<script>
	let src = 'tutorial/image.gif';
	let name = 'Rick Astley';
</script>

<img {src} alt="{name} dances.">
```

**添加一些样式**

```svelte
<style>
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

<p>This is a paragraph.</p>
```

**导入本地组件**

我们可以从其他文件导入组件并包含它们，就好像我们包含 HTML 元素一样

Nested.svelte

```svelte
<p>This is another paragraph.</p>
```

App.svelte

```svelte
<script>
	import Nested from './Nested.svelte';
</script>

<style>
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

<p>This is a paragraph.</p>
<Nested/>
```

**HTML标签**

将 HTML 直接绘制到组件中

```svelte
<script>
	let string = `this string contains some <strong>HTML!!!</strong>`;
</script>

<p>{@html string}</p>
```

**创建一个应用程序**

App.svelte

```svelte
<h1>What now?</h1>
```

project.svelte

```svelte
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		// we'll learn about props later
		answer: 42
	}
});
```

## 反应性能力

**赋值**

Svelete 的内核是一个强大的 （反应性）reactivity 系统，能够让 DOM 与你的应用程序状态保持同步，例如，事件响应。

```svelte
<script>
	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

**声明**

当组件的状态改变时，Svelte 会自动更新 DOM。通常，组件状态的某些部分需要通过 其它 部分的计算而得出

```svelte
<script>
	let count = 0;
	$: doubled = count * 2; // Svelte 会将其解释为 “只要参考值变化了就重新运行此代码”。

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>

<p>{count} doubled is {doubled}</p>
```

**语句**

当 count 的值改变时就输出到日志中

```svelte
<script>
	let count = 0;

	$: if (count >= 10) {
		alert(`count is dangerously high!`);
		count = 9;
	}

	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

**更新数组和对象**

由于 Svelte 的反应性是由赋值语句触发的，因此使用数组的诸如 push 和 splice 之类的方法就不会触发自动更新
解决该问题的一种方法是添加一个多余的赋值语句：

```svelte
<script>
	let numbers = [1, 2, 3, 4];

	function addNumber() {
        // numbers.push(numbers.length + 1);
		numbers = [...numbers, numbers.length + 1];
	}

	$: sum = numbers.reduce((t, n) => t + n, 0);
</script>

<p>{numbers.join(' + ')} = {sum}</p>

<button on:click={addNumber}>
	Add a number
</button>
```

**变量导出**

the values are only accessible within a given component

Nested.svelte

```svelte
<script>
	export let answer;
</script>

<p>The answer is {answer}</p>
```

```svelte
<script>
	import Nested from './Nested.svelte';
</script>

<Nested answer={42}/>
```

**属性传递**

如果你的组件含有有一个对象属性，可以利用...语法将它们spread（传播）到一个组件上，而不用逐一指定

Info.svelte

```svelte
<script>
	export let name;
	export let version;
	export let speed;
	export let website;
</script>

<p>
	The <code>{name}</code> package is {speed} fast.
	Download version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>
	and <a href={website}>learn more here</a>
</p>
```

App.svelte

```svelte
<script>
	import Info from './Info.svelte';

	const pkg = {
		name: 'svelte',
		version: 3,
		speed: 'blazing',
		website: 'https://svelte.dev'
	};
</script>

<!-- <Info name={pkg.name} version={pkg.version} speed={pkg.speed} website={pkg.website}/> -->

<Info {...pkg}/>
```

## 逻辑

**if else**

```svelte
<script>
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}
</script>

{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{/if}

{#if !user.loggedIn}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```

```svelte
<script>
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}
</script>

{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```

```svelte
{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}
```

**Each**

```svelte
<script>
	let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];
</script>

<h1>The Famous Cats of YouTube</h1>

<ul>
	{#each cats as { id, name }, i}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={id}">
			{i + 1}: {name}
		</a></li>
	{/each}
</ul>
```

**为Each块添加key值**

```svelte
<script>
	import Thing from './Thing.svelte';

	let things = [
		{ id: 1, color: '#0d0887' },
		{ id: 2, color: '#6a00a8' },
		{ id: 3, color: '#b12a90' },
		{ id: 4, color: '#e16462' },
		{ id: 5, color: '#fca636' }
	];

	function handleClick() {
		things = things.slice(1);
	}
</script>

<button on:click={handleClick}>
	Remove first thing
</button>

{#each things as thing (thing.id)}
	<Thing current={thing.color}/>
{/each}
```

**await**

使用 `await`处理 `Promise` 数据

```svelte
<script>
	let promise = getRandomNumber();

	async function getRandomNumber() {
		const res = await fetch(`tutorial/random-number`);
		const text = await res.text();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}

	function handleClick() {
		promise = getRandomNumber();
	}
</script>

<button on:click={handleClick}>
	generate random number
</button>

{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```

## 事件

**DOM events**

Listen to any event on an element with the on:

```svelte
<script>
	let m = { x: 0, y: 0 };

	function handleMousemove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
</script>

<style>
	div { width: 100%; height: 100%; }
</style>

<div on:mousemove={handleMousemove}>
	The mouse position is {m.x} x {m.y}
</div>
```

**Inline handlers**

declare event handlers inline

```svelte
<script>
	let m = { x: 0, y: 0 };
</script>

<style>
	div { width: 100%; height: 100%; }
</style>

<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
	The mouse position is {m.x} x {m.y}
</div>
```

**事件修饰符**

DOM 事件处理程序具有额外的 修饰符（modifiers）

所有修饰符列表：

- preventDefault ：调用event.preventDefault() ，在运行处理程序之前调用。比如，对客户端表单处理有用。
- stopPropagation ：调用 event.stopPropagation(), 防止事件影响到下一个元素。
- passive ： 优化了对 touch/wheel 事件的滚动表现(Svelte 会在合适的地方自动添加滚动条)。
- capture — 在 capture 阶段而不是bubbling 阶段触发事件处理程序 ()
- once ：运行一次事件处理程序后将其删除。
- self — 仅当 event.target 是其本身时才执行。

你可以将修饰符组合在一起使用，例如：`on:click|once|capture={...}`

**组件事件**

组件也可以调度事件，为此，组件内必须创建一个相同事件并在外部进行分配。

Inner.svelte

```svelte
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>

<button on:click={sayHello}>
	Click to say hello
</button>
```

App.svelte

```svelte
<script>
	import Inner from './Inner.svelte';

	function handleMessage(event) {
		alert(event.detail.text);
	}
</script>

<Inner on:message={handleMessage}/>
```

**事件转发**

与 DOM 事件不同， 组件事件不会 冒泡（bubble） ，如果你想要在某个深层嵌套的组件上监听事件，则中间组件必须 转发（forward） 该事件。

Outer.svelte

```svelte
<script>
	import Inner from './Inner.svelte';
</script>

<Inner on:message/>
```

## 绑定

**Text Inputs**

```svelte
<script>
	let name = 'world';
</script>

<input bind:value={name}>

<h1>Hello {name}!</h1>
```

**Numeric inputs**

In the DOM, everything is a string

```svelte
<script>
	let a = 1;
	let b = 2;
</script>

<label>
	<input type=number bind:value={a} min=0 max=10>
	<input type=range bind:value={a} min=0 max=10>
</label>

<label>
	<input type=number bind:value={b} min=0 max=10>
	<input type=range bind:value={b} min=0 max=10>
</label>

<p>{a} + {b} = {a + b}</p>
```

**复选框**

将复选状态绑定 `input.checked` 将复选框的状态绑定

```svelte
<script>
	let yes = false;
</script>

<label>
	<input type=checkbox bind:checked={yes}>
	Yes! Send me regular email spam
</label>

{#if yes}
	<p>Thank you. We will bombard your inbox and sell your personal details.</p>
{:else}
	<p>You must opt in to continue. If you're not paying, you're the product.</p>
{/if}

<button disabled={!yes}>
	Subscribe
</button>
```

**输入框组绑定**

在bind:group中，同一组的单选框值时互斥的，同一组的复选框会形成一个数组。

```svelte
<script>
	let scoops = 1;
	let flavours = ['Mint choc chip'];

	let menu = [
		'Cookies and cream',
		'Mint choc chip',
		'Raspberry ripple'
	];

	function join(flavours) {
		if (flavours.length === 1) return flavours[0];
		return `${flavours.slice(0, -1).join(', ')} and ${flavours[flavours.length - 1]}`;
	}
</script>

<h2>Size</h2>

<label>
	<input type=radio bind:group={scoops} value={1}>
	One scoop
</label>

<label>
	<input type=radio bind:group={scoops} value={2}>
	Two scoops
</label>

<label>
	<input type=radio bind:group={scoops} value={3}>
	Three scoops
</label>

<h2>Flavours</h2>

{#each menu as flavour}
	<label>
		<input type=checkbox bind:group={flavours} value={flavour}>
		{flavour}
	</label>
{/each}

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
		of {join(flavours)}
	</p>
{/if}
```

**文本域绑定**

`<textarea>` 标签在 Svelte 也可使用 `bind:value`

App.svelte

```svelte
<script>
	import marked from 'marked';
	let value = `Some words are *italic*, some are **bold**`;
</script>

<style>
	textarea { width: 100%; height: 200px; }
</style>

<textarea bind:value></textarea>

{@html marked(value)}
```

**选择框绑定**

可以利用 `bind:value` 对 `<select>` 标签进行绑定

```svelte
<script>
	let questions = [
		{ id: 1, text: `Where did you go to school?` },
		{ id: 2, text: `What is your mother's name?` },
		{ id: 3, text: `What is another personal fact that an attacker could easily find with Google?` }
	];

	let selected;

	let answer = '';

	function handleSubmit() {
		alert(`answered question ${selected.id} (${selected.text}) with "${answer}"`);
	}
</script>

<style>
	input { display: block; width: 500px; max-width: 100%; }
</style>

<h2>Insecurity questions</h2>

<form on:submit|preventDefault={handleSubmit}>
	<select bind:value={selected} on:change="{() => answer = ''}">
		{#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
	</select>

	<input bind:value={answer}>

	<button disabled={!answer} type=submit>
		Submit
	</button>
</form>

<p>selected question {selected ? selected.id : '[waiting...]'}</p>
```

**选择框的multiple**

选择框含有一个名为 `multiple` 的属性

```svelte
<script>
	let scoops = 1;
	let flavours = ['Mint choc chip'];

	let menu = [
		'Cookies and cream',
		'Mint choc chip',
		'Raspberry ripple'
	];

	function join(flavours) {
		if (flavours.length === 1) return flavours[0];
		return `${flavours.slice(0, -1).join(', ')} and ${flavours[flavours.length - 1]}`;
	}
</script>

<h2>Size</h2>

<label>
	<input type=radio bind:group={scoops} value={1}>
	One scoop
</label>

<label>
	<input type=radio bind:group={scoops} value={2}>
	Two scoops
</label>

<label>
	<input type=radio bind:group={scoops} value={3}>
	Three scoops
</label>

<h2>Flavours</h2>

<select multiple bind:value={flavours}>
	{#each menu as flavour}
		<option value={flavour}>
			{flavour}
		</option>
	{/each}
</select>

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
		of {join(flavours)}
	</p>
{/if}
```

**Contentditable的绑定**

支持 `contenteditable="true"` 属性的标签，可以使用 `textContent` 与 `innerHTML` 属性的绑定：

```svelte
<script>
	let html = '<p>Write some text!</p>';
</script>

<div
	contenteditable="true"
	bind:innerHTML={html}
></div>

<pre>{html}</pre>

<style>
	[contenteditable] {
		padding: 0.5em;
		border: 1px solid #eee;
		border-radius: 4px;
	}
</style>
```

**Each块的绑定**

```svelte
<script>
	let todos = [
		{ done: false, text: 'finish Svelte tutorial' },
		{ done: false, text: 'build an app' },
		{ done: false, text: 'world domination' }
	];

	function add() {
		todos = todos.concat({ done: false, text: '' });
	}

	function clear() {
		todos = todos.filter(t => !t.done);
	}

	$: remaining = todos.filter(t => !t.done).length;
</script>

<style>
	.done {
		opacity: 0.4;
	}
</style>

<h1>Todos</h1>

{#each todos as todo}
	<div class:done={todo.done}>
		<input
			type=checkbox
			bind:checked={todo.done}
		>

		<input
			placeholder="What needs to be done?"
			bind:value={todo.text}
		>
	</div>
{/each}

<p>{remaining} remaining</p>

<button on:click={add}>
	Add new
</button>

<button on:click={clear}>
	Clear completed
</button>
```

**媒体标签的绑定**

`<audio>` 和 `<video>` 同样支持部分的属性绑定

```svelte
<script>
	// These values are bound to properties of the video
	let time = 0;
	let duration;
	let paused = true;

	let showControls = true;
	let showControlsTimeout;

	function handleMousemove(e) {
		// Make the controls visible, but fade out after
		// 2.5 seconds of inactivity
		clearTimeout(showControlsTimeout);
		showControlsTimeout = setTimeout(() => showControls = false, 2500);
		showControls = true;

		if (!(e.buttons & 1)) return; // mouse not down
		if (!duration) return; // video not loaded yet

		const { left, right } = this.getBoundingClientRect();
		time = duration * (e.clientX - left) / (right - left);
	}

	function handleMousedown(e) {
		// we can't rely on the built-in click event, because it fires
		// after a drag — we have to listen for clicks ourselves

		function handleMouseup() {
			if (paused) e.target.play();
			else e.target.pause();
			cancel();
		}

		function cancel() {
			e.target.removeEventListener('mouseup', handleMouseup);
		}

		e.target.addEventListener('mouseup', handleMouseup);

		setTimeout(cancel, 200);
	}

	function format(seconds) {
		if (isNaN(seconds)) return '...';

		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
		if (seconds < 10) seconds = '0' + seconds;

		return `${minutes}:${seconds}`;
	}
</script>

<style>
	div {
		position: relative;
	}

	.controls {
		position: absolute;
		top: 0;
		width: 100%;
		transition: opacity 1s;
	}

	.info {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	span {
		padding: 0.2em 0.5em;
		color: white;
		text-shadow: 0 0 8px black;
		font-size: 1.4em;
		opacity: 0.7;
	}

	.time {
		width: 3em;
	}

	.time:last-child { text-align: right }

	progress {
		display: block;
		width: 100%;
		height: 10px;
		-webkit-appearance: none;
		appearance: none;
	}

	progress::-webkit-progress-bar {
		background-color: rgba(0,0,0,0.2);
	}

	progress::-webkit-progress-value {
		background-color: rgba(255,255,255,0.6);
	}

	video {
		width: 100%;
	}
</style>

<h1>Caminandes: Llamigos</h1>
<p>From <a href="https://cloud.blender.org/open-projects">Blender Open Projects</a>. CC-BY</p>

<div>
	<video
		poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
		src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
		on:mousemove={handleMousemove}
		on:mousedown={handleMousedown}
		bind:currentTime={time}
		bind:duration
		bind:paused
	></video>

	<div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
		<progress value="{(time / duration) || 0}"/>

		<div class="info">
			<span class="time">{format(time)}</span>
			<span>click anywhere to {paused ? 'play' : 'pause'} / drag to seek</span>
			<span class="time">{format(duration)}</span>
		</div>
	</div>
</div>
```

当您单击视频时，它将视情况更新 time、duration 和 paused 属性的值。这意味着我们可以使用它们来创建自定义控件。

```
通常，在网页中， 你会将currentTime用于对 timeupdate 的事件监听并跟踪。但是这些事件很少触发，导致UI不稳定。 
Svelte 使用currentTime 对 requestAnimationFrame进行查验，进而避免了此问题。
```

针对 `<audio>` 和 `<video>` 的 6 个readonly 属性绑定 ：

- duration (readonly) ：视频的总时长，以秒为单位。
- buffered (readonly) ：数组{start, end} 的对象。
- seekable (readonly) ：同上。
- played (readonly) ：同上。
- seeking (readonly) ：布尔值。
- ended (readonly) ：布尔值。

以及 4 个双向 绑定：

- currentTime ：视频中的当前点，以秒为单位。
- playbackRate ：播放视频的倍速， 1 为 '正常'。
- paused ：暂停。
- volume ：音量，0到1之间的值。

`<video>` 还有多出了具有 `readonly` 属性 `videoWidth` 和 `videoHeight` 属性的绑定。


**尺寸的绑定**

每个块级标签都可以对 `clientWidth`、`clientHeight`、`offsetWidth` 以及 `offsetHeight` 属性进行绑定：

```svelte
<script>
	let w;
	let h;
	let size = 42;
	let text = 'edit me';
</script>

<style>
	input { display: block; }
	div { display: inline-block; }
	span { word-break: break-all; }
</style>

<input type=range bind:value={size}>
<input bind:value={text}>

<p>size: {w}px x {h}px</p>

<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px">{text}</span>
</div>
```

**This**

this可以绑定到任何标签 (或组件) 并允许你获取对渲染标签的引用。

```svelte
<script>
	import { onMount } from 'svelte';

	let canvas;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		let frame;

		(function loop() {
			frame = requestAnimationFrame(loop);

			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

			for (let p = 0; p < imageData.data.length; p += 4) {
				const i = p / 4;
				const x = i % canvas.width;
				const y = i / canvas.height >>> 0;

				const t = window.performance.now();

				const r = 64 + (128 * x / canvas.width) + (64 * Math.sin(t / 1000));
				const g = 64 + (128 * y / canvas.height) + (64 * Math.cos(t / 1000));
				const b = 128;

				imageData.data[p + 0] = r;
				imageData.data[p + 1] = g;
				imageData.data[p + 2] = b;
				imageData.data[p + 3] = 255;
			}

			ctx.putImageData(imageData, 0, 0);
		}());

		return () => {
			cancelAnimationFrame(frame);
		};
	});
</script>

<style>
	canvas {
		width: 100%;
		height: 100%;
		background-color: #666;
		-webkit-mask: url(svelte-logo-mask.svg) 50% 50% no-repeat;
		mask: url(svelte-logo-mask.svg) 50% 50% no-repeat;
	}
</style>

<canvas
	bind:this={canvas}
	width={32}
	height={32}
></canvas>
```

**组件绑定**

可以绑定到DOM元素的属性一样，你也可以将组件的属性绑定。

```svelte
<script>
	import Keypad from './Keypad.svelte';

	let pin;
	$: view = pin ? pin.replace(/\d(?!$)/g, '•') : 'enter your pin';

	function handleSubmit() {
		alert(`submitted ${pin}`);
	}
</script>

<h1 style="color: {pin ? '#333' : '#ccc'}">{view}</h1>

<Keypad bind:value={pin} on:submit={handleSubmit}/>
```
