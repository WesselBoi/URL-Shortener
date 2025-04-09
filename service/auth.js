const sessionIdToUserMap = new Map();
 
function setUser(id, user) {
    sessionIdToUserMap.set(id, user);
}

function getUser(id){
    return sessionIdToUserMap.get(id);   
}

module.exports = {
    setUser,
    getUser
};
// This module provides a simple in-memory store for user sessions by using a Map 
// It allows setting and getting users by their session ID.