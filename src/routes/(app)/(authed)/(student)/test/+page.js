// @ts-nocheck

export const load = async (loadEvent) => {

	const { parent } = loadEvent;
	const parentData = await parent();
	return parentData;
};
