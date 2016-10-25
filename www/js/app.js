// Ionic todo-app App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'todo-app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'todo-app.services' is found in services.js
// 'todo-app.controllers' is found in controllers.js
angular.module('todo-app', ['ionic', 't-app.controllers', 't-app.services', 't-app.directive'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



/*
.config(function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('todo-app');
});
*/
.config(function($stateProvider, $urlRouterProvider) {

  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  .state('main', {
    url: "/main",
    templateUrl: "templates/homepage.html",
    controller: 'HomepCtrl'
  })
  
  .state('page2', {
    url: "/page2",
    templateUrl: "templates/page2.html",
  })
  
  .state('tabdash', {
    url: "/tabdash",
    templateUrl: "templates/tabdash.html",
  })
  .state('geolocation', {
    url: "/geolocation",
    templateUrl: "templates/geolocation.html",
  })
  .state('foddmenu', {
    url: "/foddmenu",
    templateUrl: "templates/foddmenu.html",
  })
  .state('contactus', {
    url: "/contactus",
    templateUrl: "templates/contactus.html",
  })
  .state('review', {
    url: "/review",
    templateUrl: "templates/reviews.html",
    //controller: 'StarCtrl',
  })
   .state('sociallink', {
    url: "/sociallink",
    templateUrl: "templates/sociallink.html",
    //controller: 'StarCtrl',
  })
  .state('/fooditem1/', {
    url: "/fooditem1/:foodid",
    templateUrl: "templates/fooditem1.html",
    controller: 'getfoodidctrl',
  })  

  
  $urlRouterProvider.otherwise('/main');

});



