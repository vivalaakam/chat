angular.module('chat').controller('ChatController', ['$scope', '$routeParams', 'Chat', function($scope, $routeParams, Chat) {

    Chat.fetchActive(function(responce) {
        $scope.tabs = responce;
        if (!$routeParams.id) {
            $scope.active = $scope.tabs[0].id;
        } else {
            $scope.active = $routeParams.id;
        }
    });

    $scope.$watch('active', function() {
        if ($scope.active) {
            Chat.chat($scope.active, function(dialog) {
                $scope.dialog = dialog;
                Chat.fetchActive(function(responce) {
                    $scope.tabs = responce;
                });
            });
        }
    });

    $scope.save = function() {
        if ($scope.dialog.message !== '') {
            Chat.send($scope.active, $scope.dialog.message, function(responce) {
                $scope.dialog = responce;
                $scope.dialog.message = '';
            });
        }
    };

    $scope.close = function(id) {
        Chat.close(id, function(responce) {
            $scope.tabs = responce;
        });
    };
}]);

angular.module('chat').controller('ChatListController', ['$scope', 'Chat', function($scope, Chat) {


    Chat.fetchList(function(responce) {
        $scope.list = responce;
    });
    Chat.fetchActive(function(responce) {
        $scope.tabs = responce;
    });
}]);
