angular.module('t-app.controllers', ['ionic'])

.controller('HomepCtrl', function($scope, $state, $ionicModal, getFoodmenu) {
	var assets = [];

	$scope.groups = [];
	$scope.items = [];
	var dataJson = {};

	$scope.title="Homemade food";

	$ionicModal.fromTemplateUrl('templates/modal_call.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.modal = modal;
	});
	$scope.gethomepage = function()
	{
		console.log("Funciton cal");
		$state.go('main');
	}
	$scope.loadmodal = function()
	{
		console.log("Funciton cal modal");
		//$scope.modal.show();
		window.open('tel:4088936593', '_system');
	}
	$scope.getfoodmenu = function()
	{
		console.log("food menu click");
		$state.go('foddmenu');
	}
	getFoodmenu.getAssets().then(function(response){
    	angular.copy(response.items, $scope.items);
  	});

	
})
.controller('getreviewsdata', function($scope, getfeedbackdata) {
	var i=0;
	/*
	$scope.food_review = {};
	getfeedbackdata.get_f_data().then(function(data){
		$scope.food_review = data;
		//console.log(i++);
		console.log($scope.food_review.reviews.fname+":"+$scope.food_review.reviews.lname);
	})
	*/
})
.controller('getfoodidctrl', function($scope, $state, $ionicModal, getjsondata, $stateParams) {

	$scope.foddcategory = {}; // Create the workFlow object
  	$scope.foddcategory.foodname = []; // Create an empty array to hold the steps

	getjsondata.getFlow().then(
    function(data) {
      $scope.foddcategory.foodname = data
      console.log($scope.foddcategory.items);

    }); // Use the factory below

    $scope.fddata = getjsondata.getmoreinfo($stateParams.foodid);
    console.log($scope.fddata);
})

.controller('mongodatactrl', function($scope, $state, $ionicModal, getmongodata, $stateParams) {

	$scope.mongodata = {}; // Create the workFlow object
  	//$scope.foddcategory.foodname = []; // Create an empty array to hold the steps

	getmongodata.getmongo_data().then(
    function(data) {
      $scope.mongodata  = data
      console.log($scope.mongodata );

    }); // Use the factory below

 
})

.controller('StarCtrl', ['$scope','getfeedbackdata', function ($scope, getfeedbackdata) {
	var i=0;
	$scope.ratings = [];
	$scope.food_review_star = {};
	getfeedbackdata.get_f_data().then(function(data){
		$scope.ratings = data.reviews;
		console.log($scope.ratings);
	})
	
    $scope.getSelectedRating = function (rating) {
        console.log(rating);
    }
    $scope.isReadOnly = function () {
        return true;
    }

}])

.controller('modelreviewctrl', function($scope, $ionicModal) {

	$ionicModal.fromTemplateUrl('templates/directive_template/review_model.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	}).then(function(modal) {
	    $scope.modal = modal;
	});
	$scope.launch_model = function() {
	    $scope.modal.show();
	};
	$scope.closemodal = function() {
	    $scope.modal.hide();
	};

	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
	    $scope.modal.remove();
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
		// Execute action
	});
	// Execute action on remove modal
	$scope.$on('modal.removed', function() {
	  	// Execute action
	});


})
.controller('MapCtrl', function($scope, $ionicLoading, $compile) {

	var str;
	var org,dest,dist;
	$scope.class = "delivery_area_info_hide";

	$scope.default_geoLat = 37.5459366;
	$scope.default_geoLan = -122.0125491;

	$scope.dest_geoLat = "";
	$scope.dest_geoLan = "";

	/*======== To show the route between two points ===============*/
	var delivery_area;
	var origin_start = "4861 central ave fremont ca";
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;

	/*==== Default location fremont central ave ===========*/
	$scope.geoLat = 37.5459366;
	$scope.geoLan = -122.0125491;

	/*====== For autocomplete input box ===============*/
	var autocomplete = new google.maps.places.Autocomplete($("#search_area")[0]);
			autocomplete.setTypes(['geocode']);
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                $scope.dest_geoLat = place.geometry.location.lat();
                $scope.dest_geoLan = place.geometry.location.lng();
                console.log($scope.dest_geoLat +":"+$scope.dest_geoLan);
                $scope.$apply();
            });

    // Initially loading map        
	$scope.init_map = function(){
		console.log("on map cotroller load");
		$scope.load_g_map($scope.geoLat,$scope.geoLan);
		createMarker($scope.geoLat,$scope.geoLan);
		$scope.draw_circle($scope.geoLat,$scope.geoLan);
	}

	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: origin_start,
          destination: delivery_area,
          travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    }
	$scope.get_geo_address = function(){

		$scope.class = "delivery_area_info_show";

		delivery_area = document.getElementById('search_area').value;
		//delivery_area = "San francisco ca"
		$scope.delivery_area = delivery_area;
		calculateAndDisplayRoute(directionsService, directionsDisplay);

		/*=========== This is for Direction service ================*/
		
	    var direct_mapOptions = {
		    zoom: 14,
		    //center: height
		  }
		var map_distance = new google.maps.Map(document.getElementById("map"), direct_mapOptions);
	  	directionsDisplay.setMap(map_distance);


	  	/*=========== Get distance using Matrix servie API ==============*/
		var service = new google.maps.DistanceMatrixService();

		service.getDistanceMatrix(
		    {
		        origins: [origin_start],
		        destinations: [delivery_area],
		        travelMode: google.maps.TravelMode.DRIVING,
		        avoidHighways: false,
		        avoidTolls: false
		    }, 
		    callback
		);

		function callback(response, status) {
			var dist_convert;
		    if(status=="OK") {
		        orig = response.destinationAddresses[0];
		        dest = response.originAddresses[0];
		        dist = response.rows[0].elements[0].distance.value;
		        dist_convert = response.rows[0].elements[0].distance.text;
		    } else {
		        alert("Error: " + status);
		    }
		   		str = dist_convert;
				str = str.replace("km", "");
				str = str * 0.621371;
				str = Math.round(str * 100) / 100;
				display_delivery_charges();
				console.log(str);
			$('#delivery_distance').html(str);
		}
		
		function display_delivery_charges(){
			if(str > 0 && str <= 5)
			{
				$('#deliver_charges').html("Free Delivery");
				console.log("free delivery");
			}
			else if(str > 5 && str <=10)
			{
				$('#deliver_charges').html("Delivery Charges 5$");
				console.log("Delivery Charges 5$");
			}
			else if(str > 10 && str <= 20)
			{
				$('#deliver_charges').html("Delivery charges 7$");
				console.log("Delivery charges 7$");
			}
			else if(str > 20)
			{
				$('#deliver_charges').html("Call us for delivery");
				console.log("Contact us.");
			}
		}
		

	  	/*=================== =======================================*/
	  	/*======== This is for calculate distance (Optional Method)=====================*/
	  	/*
	  	var p1 = new google.maps.LatLng($scope.default_geoLat, $scope.default_geoLan);
		var p2 = new google.maps.LatLng($scope.dest_geoLat, $scope.dest_geoLan);
		console.log(p1+"---"+p2);

		console.log(calcDistance(p1, p2));
		console.log(getDistance(p1, p2));

		//calculates distance between two points in km's

		function calcDistance(p1, p2) {
		  return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
		}

		function rad(x) {
		  return x * Math.PI / 180;
		};

		function getDistance(p1, p2) {
		  var R = 6378137; // Earth’s mean radius in meter
		  var dLat = rad(p2.lat() - p1.lat());
		  var dLong = rad(p2.lng() - p1.lng());
		  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
		    Math.sin(dLong / 2) * Math.sin(dLong / 2);
		  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		  var d = R * c;
		  return d; // returns the distance in meter
		};
		*/
	  	/*==================== code to plave the marker at desire place =========================*/
		/*
		console.log(input);
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode( { "address": delivery_area }, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
		        $scope.getlocation = results[0].geometry.location,
		            lat      = $scope.getlocation.lat(),
		            lng      = $scope.getlocation.lng();
		            $scope.load_g_map(lat,lng);
		            createMarker(lat,lng);
		    }
		});
		*/
	}
	$scope.load_g_map = function(geoLat,geoLan){
		var mapOptions = {
	        zoom: 11,
	        center: new google.maps.LatLng(geoLat,geoLan),
	        mapTypeId: google.maps.MapTypeId.TERRAIN
	    }

	    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
	}
	
	$scope.draw_circle = function(geoLat,geoLan){
		var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: $scope.map,
            center: {lat: geoLat, lng: geoLan},
            radius: 80.934 * 100
          });
	}
    
    var createMarker = function (info_lat,info_long){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info_lat, info_long),
            //title: info.city
        });
    }  
      
});


