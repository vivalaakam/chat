angular.module('chat').factory('Chat', ['$http', '$q', function($http, $q) {
  var tmp = {},
    active = [];

  var users = {};

  var defer = $q.defer();
  var udefer = $q.defer();

  udefer.promise.then(function(responce) {
    responce.forEach(function(row) {
      users[row.id] = row;
    });
    updateActive();
  });

  defer.promise.then(function(responce) {
    responce.forEach(function(row) {
      tmp[row.id] = row;
    });
  });

  function updateActive() {
    active = [];
    for (var id in users) {
      if (users[id].active == 1) {
        active.push(users[id]);
      }
    }
  }

  return {
    load: function() {
      $http.get('json/data.json').success(function(responce) {
        defer.resolve(responce);
      });
      $http.get('json/users.json').success(function(responce) {
        udefer.resolve(responce);
      });
    },
    chat: function(id, callback) {
      defer.promise.then(function() {
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
      defer.promise.then(function() {
        tmp[id].dialog.push({
          text: message,
          type: "out"
        });
        callback(tmp[id]);
      });
    },
    fetchList: function(callback) {
      udefer.promise.then(callback);
    },
    fetchActive: function(callback) {
      udefer.promise.then(function() {
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
