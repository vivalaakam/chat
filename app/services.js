angular.module('chat').factory('Chat', ['$http', '$q', function($http, $q) {
    var tmp = {},
        active = [],
        users = {};

    function updateActive() {
        active = [];
        for (var id in users) {
            if (users[id].active == 1) {
                active.push(users[id]);
            }
        }
    }

    var dload = $http.get('json/data.json');
    var uload = $http.get('json/users.json');
    var all = $q.all({
        data: dload,
        user: uload
    }).then(function(response) {
        response.user.data.forEach(function(row) {
            users[row.id] = row;
        });
        response.data.data.forEach(function(row) {
            tmp[row.id] = row;
        });
        updateActive();
    });


    return {
        chat: function(id, callback) {
            all.then(function() {
                users[id].active = 1;

                if (!tmp[id]) {
                    tmp[id] = {
                        id: id,
                        name: users[id].name,
                        dialog: [],
                        'new': true
                    };

                }
                updateActive();
                callback(tmp[id]);
            });
        },
        send: function(id, message, callback) {
            all.then(function() {
                tmp[id].dialog.push({
                    text: message,
                    type: "out"
                });
                callback(tmp[id]);
            });
        },
        fetchList: function(callback) {
            all.then(function() {
              callback(users);
            });
        },
        fetchActive: function(callback) {
            all.then(function() {
                callback(active);
            });
        },
        close: function(id, callback) {
            users[id].active = 0;
            updateActive();
            callback(active);
        }
    };
}]);
