export const load = async ({ url, fetch }) => {
	try {
		const res = await fetch(`${url.origin}/api/posts.json`);
		if (!res.ok) {
			console.error('Không thể fetch /api/posts.json');
			return { uniqueCategories: [] };
		}

		let posts = await res.json();
		if (!posts || !Array.isArray(posts)) {
			console.error('posts không hợp lệ');
			return { uniqueCategories: [] };
		}

		let uniqueCategories = {};

		posts.forEach((post) => {
			if (post.categories && Array.isArray(post.categories)) {
				post.categories.forEach((category) => {
					if (uniqueCategories.hasOwnProperty(category)) {
						uniqueCategories[category].count += 1;
					} else {
						uniqueCategories[category] = {
							title: category,
							count: 1
						};
					}
				});
			}
		});

		const sortedUniqueCategories = Object.values(uniqueCategories).sort((a, b) =>
			a.title.localeCompare(b.title)
		); // chuẩn hóa so sánh tiếng Việt

		return {
			uniqueCategories: sortedUniqueCategories
		};
	} catch (error) {
		console.error('Lỗi khi load category:', error);
		return { uniqueCategories: [] };
	}
};
