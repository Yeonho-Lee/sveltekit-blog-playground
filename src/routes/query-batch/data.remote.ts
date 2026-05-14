import { query } from '$app/server';
import { picklist, string } from 'valibot';

const PRODUCTS: Record<string, string[]> = {
	desktop: ['desktop-1', 'desktop-2', 'desktop-3'],
	laptop: ['laptop-1', 'laptop-2', '2in1-1'],
	tablet: ['tablet-1', '2in1-1'],
};

export const getProducts = query(picklist(['desktop', 'laptop', 'tablet']), async (category) => {
	return PRODUCTS[category];
});

export const getProduct = query.batch(string(), async () => {
	const calledAt = Date.now();
	return (id) => ({ id, calledAt });
});
