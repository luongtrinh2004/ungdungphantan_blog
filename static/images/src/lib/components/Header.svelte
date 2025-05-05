<script>
	import { preventDefault } from 'svelte/legacy';

	import MainNav from './MainNav.svelte';
	import HamburgerMenuButton from './HamburgerMenuButton.svelte';
	import { siteTitle } from '$lib/config';

	const focusMain = () => {
		const main = document.querySelector('main');
		main.focus();
	};
</script>

<header class="header">
	<a onclick={preventDefault(focusMain)} class="skip-to-content-link" href="#main">
		Skip to main content
	</a>

	<div class="header-left">
		<a href="/" class="logo-link">
			<img src="/logo.png" alt="Logo Left" class="logo-left" />
		</a>
	</div>

	<div class="header-center">
		<a href="/" class="site-title">{siteTitle}</a>
		<nav class="menu">
			<MainNav />
		</nav>
	</div>

	<div class="header-right">
		<a href="/" class="logo-link">
			<img src="/logo.png" alt="Logo Right" class="logo-right" />
		</a>
	</div>
</header>

<style>
header.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 2rem;
	background: #afe0eb; /* màu nền xanh nhạt */
	position: sticky;
	top: 0;
	z-index: 1000;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* Bên trái */
.header-left {
	display: flex;
	align-items: center;
}

.logo-left {
	width: 300px; /* kích thước logo trái */
	height: auto;
	object-fit: contain;
}

/* Bên giữa */
.header-center {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
}

.site-title {
	font-family: var(--accentFont);
	font-size: 1.8rem;
	font-weight: bold;
	color: var(--darker);
	text-decoration: none;
}

.menu {
	display: flex;
	gap: 2rem;
	font-size: 1rem;
}

.menu a {
	text-decoration: none;
	color: var(--darker);
	font-weight: 500;
	position: relative;
}

.menu a::after {
	content: "";
	position: absolute;
	width: 100%;
	height: 2px;
	background: var(--darker);
	bottom: -4px;
	left: 0;
	transform: scaleX(0);
	transform-origin: right;
	transition: transform 0.3s ease-in-out;
}

.menu a:hover::after {
	transform: scaleX(1);
	transform-origin: left;
}

/* Bên phải */
.header-right {
	display: flex;
	align-items: center;
}

.logo-right {
	width: 300px; /* kích thước logo phải */
	height: auto;
	object-fit: contain;
}

/* Skip link cho accessibility */
.skip-to-content-link {
	position: absolute;
	left: -999px;
	top: auto;
	width: 1px;
	height: 1px;
	overflow: hidden;
}

.skip-to-content-link:focus {
	position: static;
	width: auto;
	height: auto;
	margin: 1rem;
	background: #000;
	color: #fff;
	padding: 0.5rem 1rem;
	z-index: 1001;
}
</style>
