var app = angular.module('chat', ['ngRoute' , 'templates-dist'])
        .config(['$routeProvider', '$locationProvider', '$httpProvider',
            function($routeProvider, $locationProvider, $httpProvider) {
                $routeProvider
                        .when('/', {
                            controller: 'ChatController',
                            templateUrl: 'views/chat.html'
                        })
                        .when('/chat/list', {
                            controller: 'ChatListController',
                            templateUrl: 'views/list.html'
                        })
                        .when('/chat/:id', {
                            controller: 'ChatController',
                            templateUrl: 'views/chat.html'
                        })
                        .otherwise({redirectTo: '/'});

            }])
        .run(['$rootScope', 'Chat', function($rootScope, Chat) {
            }]);
