function createStore(reducer) {
	let state;
	let listeners = [];

	function getState() {
		return state;
	}

	function subscribe(listener) {
		listeners.push(listener);
		return function unsubscribe() {
			if (listeners.indexOf(listener) > -1) {
				listeners.splice(listeners.indexOf(listener), 1);
			} else {
				throw new Error("Subscriber is not found");
			}
		};
	}

	function dispatch(action) {}

	return {
		getState,
		subscribe,
		dispatch
	};
}
