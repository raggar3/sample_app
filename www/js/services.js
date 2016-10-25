angular.module('t-app.services', ['ionic'])

.factory('getFoodmenu', function($http) {
   var assets = {};
  var friends = [
    { id: 0, foodname: 'item1' },
    { id: 1, foodname: 'item2' },
    { id: 2, foodname: 'item3' },
    { id: 3, foodname: 'item4' }
  ];
  var foodgroups;
  return {
    getAssets: function(){
          if(!foodgroups){
            foodgroups = $http.get('datajson/testdata.json').then(function(response)
            {
                return response.data;
            });
          }
          return foodgroups;
        }
    }
})

.factory('getjsondata', function($http, $q, $timeout){
  var jsonData = [];
  
  return {
    getFlow: function() {
      var deferred = $q.defer();
      $http.get('datajson/testdata.json').success(function(data) {
        jsonData = data;
        deferred.resolve(data);
      }).error(function() {
        deferred.reject();
      });
      return deferred.promise;
    },

    getmoreinfo: function(foodid) {
      var selected_food = [];

      angular.forEach(jsonData.items, function(item)
      {
        angular.forEach(item.groups, function(fitem)
        {
          if(foodid === fitem.id)
          {
            selected_food = fitem;
          }       
        })        
      })
      return selected_food;
    }
    
  }
})

.factory('getfeedbackdata', function($http, $q, $timeout){
  var feedbackdata = [];
  return{
    get_f_data: function(){
      var deferred = $q.defer();
      $http.get('datajson/reviews.json').success(function(data){
        feedbackdata = data;
        deferred.resolve(data);
      }).error(function(){
        deferred.reject();
      });
      return deferred.promise;
    }
  }
})

.factory('getmongodata', function($http, $q, $timeout){
  var mongodata = [];
  return{
    getmongo_data: function(){
      var deferred = $q.defer();
      $http.get('http://localhost:3000/reviews').success(function(data){
        mongodata = data;
        console.log(mongodata);
        deferred.resolve(data);
      }).error(function(){
        deferred.reject();
      });
      return deferred.promise;
    }
  }
})
/*
.factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})
*/
/*
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
*/