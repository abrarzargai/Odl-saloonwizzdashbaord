
const initState = {
        Utilities: [], UtilitiesFilling: []
}

const UTILITIESReducer =  (state = initState, action) => {
    switch (action.type) {
        case 'GET_Utilities':     
                return { stat: action.payload,UtilitiesFilling:["null","null"] }
        // case 'ADD':     
        //         return { Utilities: [action.payload, ...state.Utilities] }         
        // case 'EMPTY_CART':
        //     return { Cart: [] }
        // case 'UPDATE':
        //     console.log(action)

        //     const a = state.Cart.findIndex(element => element.id == action.id)
        //     console.log(a)
        //     state.Cart[a].Quantity = action.Quantity
        //     state.Cart[a].total = state.Cart[a].price * action.Quantity
        //     console.log("a==", state.Cart[a].Quantity)
        //     return { Cart: state.Cart }
        // case 'DELETE':
        //     const newCart = state.Cart.filter(user => user.id !== action.id)
        //     return { Cart: newCart }
         default:
            return state;
    }
}
export default UTILITIESReducer;

