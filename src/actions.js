export const INIT_CALCULATION = 'INIT_CALCULATION';
export const START_CALCULATION = 'START_CALCULATION';
export const END_CALCULATION = 'END_CALCULATION';

export const initCalculation = id => ({
	type: INIT_CALCULATION,
    payload: { id }
});

export const startCalculation = id => ({
	type: START_CALCULATION,
	payload: { id }
});

export const endCalculation = (id, value) => ({
	type: END_CALCULATION,
	payload: { id, value }
});
