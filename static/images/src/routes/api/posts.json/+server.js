import { postsPerPage } from '$lib/config';
import fetchPosts from '$lib/assets/js/fetchPosts';
import { json } from '@sveltejs/kit';

// ❌ Bỏ export const prerender = true;
// (hoặc nếu có thì sửa thành false)

// API này không nên prerender
export const prerender = false;

export const GET = async () => {
	const options = { limit: postsPerPage };
	const { posts } = await fetchPosts(options);
	return json(posts);
};
