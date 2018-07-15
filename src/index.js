import {buildUrlSearch} from "sm-string-helper";
export const
	URL = 'URL',
	FAIL = 'FAIL',
	SUCCESS = 'SUCCESS',
	START = 'START';

export const bypassReducer = (baseType, savePrevData = true) => {
	return (data = {}, action) => {
		const { type, response, error } = action;
		const prevData = savePrevData && data;

		switch(type) {
			case baseType + START:
				return { ...prevData, loading: true };
			case baseType + SUCCESS:
				return response;
			case baseType + FAIL:
				return {
					...prevData,
					error
			};
		}

		return data;
	};
};

export const filterReducer = (baseType, initialState) => {
	return (data = initialState, action) => {
		const { type, payload } = action;

		switch(type) {
			case baseType:
				return { ...state, ...payload.filter };
			default:
				return data

		}
	};
}

export const bypassAction = (type, url, callType, payload, params, auth = true) => {
	return () => {
		return {
			type,
			[callType]: URL + url + buildUrlSearch(params),
			need_auth_token: auth,
			payload,
			queryData: payload
		};
	};
};