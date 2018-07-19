import {bypassAction, bypassReducer, FAIL, filterReducer, START, SUCCESS, URL} from "./index";
import {buildUrlSearch} from "sm-string-helper";

let initialState, CLEAR, type, error, action, response;

describe('bypassReducer', () => {

	beforeAll(() => {
		initialState = {};
		CLEAR = 'CLEAR';
		type = 'TYPE';
		error = 'error';
		response = {data: {}};
		action = {
			response,
			error
		};
	});

	it('should return error in state', () => {
		expect(bypassReducer(type)(initialState, {...action, type: type + FAIL})).toEqual({error})
	});

	it('should return loading in state', () => {
		expect(bypassReducer(type)(initialState, {...action, type: type + START})).toEqual({loading: true})
	});

	it('should return response/data in state', () => {
		expect(bypassReducer(type)(initialState, {...action, type: type + SUCCESS})).toEqual(response)
	});

});

describe('filterReducer', () => {
	it('should return updated filter state', () => {
		const type = 'SET',
		initialState = {param1: 'param1', param2: 'param2'},
		filter = {param2: 'newParam'},
		action = {type, payload: {filter}};

		expect(filterReducer(type)(initialState, action)).toEqual({...initialState, ...filter})
	});
});

describe('bypassAction', () => {
	it('should return action', () => {
		const type = 'TYPE', url = 'mysite.com', callType = 'GET', payload = {data: 'data'},
		params = {param1: 'param1', param2: 'param2'};

		expect(bypassAction(type, url, callType, payload, params)()).toEqual({
			type,
			[callType]: URL + url + buildUrlSearch(params),
			need_auth_token: true,
			payload,
			queryData: payload
		});
	})
});