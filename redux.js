function createStore(reducer) {
	let state;

	function getState() {
		return state;
	}

	function subscribe(listener) {}

	function dispatch(action) {}

	return {
		getState,
		subscribe,
		dispatch
	};
}
