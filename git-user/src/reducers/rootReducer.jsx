const initialState = {
    userData:"",
    repos:[],
    commits:{},
    drawerOpen: false,
    searchedUsers:[]
}

function rootReducer(state=initialState, action){
    console.log("Reducer -> ",action)
    switch(action.type){
        case 'SET_SEARCH_USERS':
            return{
                ...state,
                searchedUsers: action.payload
            }
            break
        case 'SET_USER':
            console.log("Reducer -> set user : ",state)
            return{
                ...state,
                userData: action.payload
            }
            break
        case 'SET_REPOS':
            console.log("Repos reducer :: ",action)
            return{
                ...state,
                repos: action.payload
            }
            break
        case 'SET_COMMITS':
            console.log("Commits reducer :: ",action)
            return{
                ...state,
                commits: action.payload
            }
            break
        case 'SET_DRAWER':
            console.log(state)
            return{
                ...state,
                drawerOpen:!state.drawerOpen
            }
        default: {
            return {
                ...state
            }
            }
    }

}

export default rootReducer;