export function statusColor(data: string) {
	if (data === "Alive") {
		return "green";
	} else if (data === "Dead") {
		return "red";
	} else {
		return "yellow";
	}
}
