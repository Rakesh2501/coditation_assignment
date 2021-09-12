export const setSearchUsers = (data) => {
    return{ 
        type:'SET_SEARCH_USERS',
        payload: data
    }
}

export const setUserData = (data) => {
    return{ 
        type:'SET_USER',
        payload: data
    }
}
export const setRepos = (data) => {
    return{
        type:'SET_REPOS',
        payload: data
    }
}

export const setCommits = (data) => {
    return{
        type:'SET_COMMITS',
        payload: data
    }
}

export const setDrawerOpen = (data) => {
    return{
        type:'SET_DRAWER',
        payload:data
    }
}