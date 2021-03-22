export function constrain(value: number, low: number, high: number): number {
	if (value > high) {
		value = high;
	} else if (value < low) {
		value = low;
	}

	return value;
}
