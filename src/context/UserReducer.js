const reducer = (globalState, action) => {
    switch (action.type) {
        case "READ_IFRAME":
            return {
                ...globalState,
                showIframe: action.payload,
            };
    }
};
export default reducer;