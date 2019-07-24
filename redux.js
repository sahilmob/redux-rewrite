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

	function dispatch(action) {
		state = reducer(state, action);
		listeners.forEach(function(listener) {
			listener(state);
		});
		return action;
	}

	return {
		getState,
		subscribe,
		dispatch
	};
}

function combineReducers(reducers) {
	let keys = Object.keys(reducers);
	return function(state, action) {
		let currentState = state || {};
		let next = {};

		keys.forEach(function(key) {
			next[key] = reducers[key](currentState[key], action);
		});
		return next;
	};
}

function bindActionCreators(actionCreators, dispatch) {
	let bounded = {};
	const keys = Object.keys(actionCreators);
	keys.forEach(function(key) {
		let actionCreator = actionCreators[key];
		bounded[key] = function() {
			dispatch(actionCreator.apply(null, ...arguments));
		};
	});
	return bounded;
}
