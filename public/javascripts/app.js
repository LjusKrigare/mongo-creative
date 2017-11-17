var app = window.angular.module('app',[])

app.factory('birthdayList', birthdayList)
app.controller('MainCtrl', mainCtrl)

function birthdayList ($http)
{
 var API_ROOT = 'birthday'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
        post: function (formData) {
      return $http
         .post(API_ROOT,formData)
         .then(function (resp) {
           console.log("Post Worked");
         })
    }
  }
}

function mainCtrl ($scope,birthdayList)
{
	$scope.birthday = []
	$scope.clear = function()
	{
		var url = "birthday";
		$.ajax({
		url:url,
		type: "DELETE",
		success: function(data,text)
		{
			var everything="<ul id='bday-list'></ul>";
	                $("bday-list").html(everything);
			window.location.reload(true);

		}
		})
	}
	$scope.addPerson = function() {
		var format={Name:$scope.Name,Birthday:$scope.Birthday,Age:$scope.Age};
		console.log(format);
		birthdayList.post(format);
		$scope.birthday.push(format);
		$scope.Name='';
		$scope.Birthday='';
		$scope.Age='';
	}
	birthdayList.get()
	  .then(function (data) {
		$scope.birthday = data
	})
}
