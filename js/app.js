angular.module('app', ['ui.router'])

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
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('register', {
                url: '/register',
                templateUrl: 'template/sign-up-user-account.html',
                controller: 'postregisterCtrl'
            }).state('login', {
                url: '/login',
                templateUrl: 'template/login.html',
                controller: 'postserviceCtrl'
            })

    })
    .factory('ConfigService', function() {

        var base_url = "http://localhost:80/Lumen-5.2-Swagger-2.0/Trunk/public/v1";
        var App_key = "123";
        var exe = ['html', 'tpl','js','css'];

        return {
            getHttpUrl: function(config) {

                if (exe.indexOf(config.url.split('.').pop().toLowerCase()) == -1) {
                    config.url = base_url + config.url;
                }

            },
            setApiKey: function(config) {
                config.headers['Api_key'] = App_key;
                // config.headers['session_token'] = '$2y$10$o1vpsDFOpBKICjExPXN3Fu3dY2LBm5ci5gImLYuJcR62hOi7RjxjW';
                // config.headers['Access-Control-Allow-Origin'] = '*';
                // config.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT';
                // config.headers['Access'] = '*';
                // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
            }
        };
    })
    //Login
    .controller('forgotController', function($scope, $http) {
        $scope.email = null;
        $scope.forgot = function(email) {


            //Call the services
            var data = { email: email };
            $scope.sucess = $scope.error = null;
            // $http.post('/forgot', JSON.stringify(data)).success(function(data, status) {
            //     if (data.success == true) {
            //         $scope.sucess = "Action Successfully Completed :)";
            //     } else {
            //         $scope.error = "Action Failed!";
            //     }
            // }).error(function(data, status) {
            //     $scope.error = "Service Error, Try again later!";
            // });

            if (email == "" || email == null) {
                $scope.error = "Action Failed!";
                return false;
            } else {
                $scope.sucess = "Action Successfully Completed :)";
                return false;
            }

        };
    })
    .controller('postserviceCtrl', function($scope, $http) {
        $scope.email = null;
        $scope.password = null;
        $scope.postdata = function(email, password) {
            var data = {
                email: email,
                password: password,
                login_type: 1
            };
            console.log(data);
            //Call the services
            $http.post('/login', JSON.stringify(data)).success(function(data, status) {
                $scope.msg = "Post Data Submitted Successfully!";
                console.log(data);
            }).error(function(data, status) {
                $scope.msg = "Invalid Login!";
            });
        };

    })
    //Registration
    .controller('postregisterCtrl', function($scope, $http) {
        console.log('sushma');
        $scope.first_name = null;
        $scope.last_name = null;
        $scope.email = null;
        $scope.password = null;
        $scope.gender = null;
        $scope.dob = null;

        $scope.postdata = function(first_name, last_name, email, password, gender, dob) {
            var data = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password,
                gender: gender,
                dob: dob,
                device_id: 1,
                reg_type: 1
            };
            console.log(data);
            //Call the services
            $http.post('/userRegistration', JSON.stringify(data)).success(function(data, status) {
                $scope.msg = "Post Data Submitted Successfully!";
                console.log(data);
            }).error(function(data, status) {
                $scope.msg = "Invalid Register!";
            });
        };

    });
