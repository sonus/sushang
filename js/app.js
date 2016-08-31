angular.module('app', [])

.config(function($httpProvider) {
        $httpProvider.interceptors.push(function($q, $rootScope, ConfigService) {
            return {
                request: function(config) {
                    ConfigService.getHttpUrl(config);
                    ConfigService.setApiKey(config);
                    return config;
                }
            }
        })
    })
    .factory('ConfigService', function() {

        var base_url = "http://page.lc";
        var appkey = "123";

        return {
            getHttpUrl: function(config) {
                config.url = base_url + config.url;

            },
            setApiKey: function(config) {
                config.url = config.url + "?appkey=" + appkey;
                // config.headers['Authorization'] = 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==';
                // config.headers['Accept'] = 'application/json;odata=verbose';
                // config.data['apikey'] = '123';
            }
        };
    })
    .service('DataService', function($q, $http) {

        return {
            getMainCat: function($scope) {
                $http.get('/user')
                    .success(function(data, status) {
                        console.log(data);
                        $scope.data.users = data.data;
                    })
                    .error(function(data, status) {
                        $scope.data.httpResponse = $scope.faildResponse;
                    });
            },
            postLogin: function($scope) {
                $http.post('/register',$scope.data)
                    .success(function(data, status) {
                        console.log(data);
                        $scope.data.users = data.data;
                    })
                    .error(function(data, status) {
                        $scope.data.httpResponse = $scope.faildResponse;
                    });
            }
        }
    })
    .controller('AppCtrl', function($scope,DataService) {
        $scope.data = [];
        DataService.getMainCat($scope);

    });
