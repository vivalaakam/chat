app.controller('ChatController', ['$scope', '$routeParams', 'Chat', function($scope, $routeParams, Chat) {

        $scope.active = $routeParams.id;
        /*
         Chat.fetchActive(function(responce) {
         $scope.tabs = responce;
         
         if (!$scope.active) {
         $scope.active = $scope.tabs[0].id;
         }
         }); */

        Chat.fetchActive(function(responce) {
            $scope.tabs = responce;
        });

        $scope.$watch('active', function() {
            if ($scope.active !== '') {
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

app.controller('ChatListController', ['$scope', 'Chat', function($scope, Chat) {


        Chat.fetchList(function(responce) {
            $scope.list = responce;
        });
        Chat.fetchActive(function(responce) {
            $scope.tabs = responce;
        });
    }]);