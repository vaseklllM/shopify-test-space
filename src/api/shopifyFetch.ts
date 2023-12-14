interface Args {
	query: string
	variables?: any
}

export async function shopifyFetch({ query, variables }: Args) {
	const endpoint = process.env.SHOPIFY_STORE_DOMAIN as string;
	const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN as string;

	try {
		const result = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token': key
			},
			body: { query, variables } && JSON.stringify({ query, variables })
		});

		// console.log(result)

		return {
			status: result.status,
			body: await result.json()
		};
	} catch (error) {
		console.error('Error:', error);
		return {
			status: 500,
			error: 'Error receiving data'
		};
	}
}
