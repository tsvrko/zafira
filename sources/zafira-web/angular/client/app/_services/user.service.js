(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('UserService', ['$http', '$cookies', '$rootScope', 'UtilService', 'API_URL', UserService])

    function UserService($http, $cookies, $rootScope, UtilService, API_URL) {
        var service = {};

        service.getUserProfile = getUserProfile;
        service.getExtendedUserProfile = getExtendedUserProfile;
        service.searchUsers = searchUsers;
        service.searchUsersWithQuery = searchUsersWithQuery;
        service.updateUserProfile = updateUserProfile;
        service.deleteUserProfilePhoto = deleteUserProfilePhoto;
        service.updateUserPassword = updateUserPassword;
        service.createOrUpdateUser = createOrUpdateUser;
        service.deleteUser = deleteUser;
        service.addUserToGroup = addUserToGroup;
        service.deleteUserFromGroup = deleteUserFromGroup;
        service.getDefaultPreferences = getDefaultPreferences;
        service.updateUserPreferences = updateUserPreferences;
        service.resetUserPreferencesToDefault = resetUserPreferencesToDefault;
        service.deleteUserPreferences = deleteUserPreferences;

        return service;

        function getUserProfile() {
        	return $http.get(API_URL + '/api/users/profile').then(UtilService.handleSuccess, UtilService.handleError('Unable to get user profile'));
        }

        function getExtendedUserProfile() {
            return $http.get(API_URL + '/api/users/profile/extended').then(UtilService.handleSuccess, UtilService.handleError('Unable to get extended user profile'));
        }

        function searchUsers(criteria) {
        	return $http.post(API_URL + '/api/users/search', criteria).then(UtilService.handleSuccess, UtilService.handleError('Unable to search users'));
        }

        function searchUsersWithQuery(searchCriteria, criteria) {
            return $http.post(API_URL + '/api/users/search', searchCriteria, {params: {q: criteria}}).then(UtilService.handleSuccess, UtilService.handleError('Unable to search users'));
        }

        function updateUserProfile(profile) {
        	return $http.put(API_URL + '/api/users/profile', profile).then(UtilService.handleSuccess, UtilService.handleError('Unable to update user profile'));
        }

        function deleteUserProfilePhoto() {
            return $http.delete(API_URL + '/api/users/profile/photo').then(UtilService.handleSuccess, UtilService.handleError('Unable to delete profile photo'));
        }

        function updateUserPassword(password) {
        	return $http.put(API_URL + '/api/users/password', password).then(UtilService.handleSuccess, UtilService.handleError('Unable to update user password'));
        }

        function createOrUpdateUser(user){
            return $http.put(API_URL + '/api/users', user).then(UtilService.handleSuccess, UtilService.handleError('Failed to update user'));
        }

        function deleteUser(id){
            return $http.delete(API_URL + '/api/users/' + id).then(UtilService.handleSuccess, UtilService.handleError('Failed to delete user'));
        }

        function addUserToGroup(user, id){
            return $http.put(API_URL + '/api/users/group/' + id, user).then(UtilService.handleSuccess, UtilService.handleError('Failed to add user to group'));
        }

        function deleteUserFromGroup(idUser, idGroup){
            return $http.delete(API_URL + '/api/users/' + idUser + '/group/' + idGroup).then(UtilService.handleSuccess, UtilService.handleError('Failed to delete user from group'));
        }

        function getDefaultPreferences() {
            return $http.get(API_URL + '/api/users/preferences').then(UtilService.handleSuccess, UtilService.handleError('Unable to get default preferences'));
        }

        function updateUserPreferences(userId, preferences) {
            return $http.put(API_URL + '/api/users/' + userId + '/preferences', preferences).then(UtilService.handleSuccess, UtilService.handleError('Unable to update user preferences'));
        }

        function resetUserPreferencesToDefault() {
            return $http.put(API_URL + '/api/users/preferences/default').then(UtilService.handleSuccess, UtilService.handleError('Unable to reset user preferences to default'));
        }

        function deleteUserPreferences(userId) {
            return $http.delete(API_URL + '/api/users/' + userId + '/preferences').then(UtilService.handleSuccess, UtilService.handleError('Unable to delete user preferences'));
        }
    }
})();
