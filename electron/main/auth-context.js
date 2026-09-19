let currentUserId = null;

function setCurrentUser(userId) {
    currentUserId = userId;
}

function getCurrentUserId() {
    return currentUserId;
}

function clearCurrentUser() {
    currentUserId = null;
}

module.exports = {
    setCurrentUser,
    getCurrentUserId,
    clearCurrentUser
};
