// @ts-nocheck

export const load = async (loadEvent) => {

	const { fetch, parent } = loadEvent;
	const parentData = await parent();
	return parentData;
};
