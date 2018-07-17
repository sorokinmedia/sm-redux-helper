import {buildUrlSearch} from "sm-string-helper";
export const
	URL = 'URL',
	FAIL = '_FAIL',
	SUCCESS = '_SUCCESS',
	START = '_START';

export const bypassReducer = (baseType, savePrevData = true, initialState = {}, clearType) => {
	return (data = initialState, action) => {
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
			case clearType:
				return initialState
		}

		return data;
	};
};

export const filterReducer = (baseType, initialState) => {
	return (data = initialState, action) => {
		const { type, payload } = action;

		switch(type) {
			case baseType:
				return { ...data, ...payload.filter };
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