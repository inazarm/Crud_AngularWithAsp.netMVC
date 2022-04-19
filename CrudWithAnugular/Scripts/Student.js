var app = angular.module("myApp", []);
app.controller("myCntrl", function ($scope, $http) {
    $scope.GetAllStudent = function () {
        debugger;
        $http({
            method: "get",
            url: "/Student/GetAllStudent"
        }).then(function (response) {
            $scope.Student = response.data;

        }, function () {
            debugger;
            alert("Error Occur!");
        })
    };

    $scope.InsertStudent = function () {
        debugger
        var type = document.getElementById("insertStd").getAttribute("value");
        if (type == "Submit") {
            $scope.student = {};
            $scope.student.Name = $scope.SName;
            $scope.student.Age = $scope.SAge;
            $scope.student.Department = $scope.SDepartment;
            $http({
                method: "post",
                url: "/Student/InsertStudentRecord",
                datatype: "json",
                data: $scope.student
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllStudent();
                $scope.SName = "";
                $scope.SAge = "";
                $scope.SDepartment = "";
            })
        }
        else {
            $scope.student = {};
            $scope.student.ID = sessionStorage.getItem("SID");
            $scope.student.Name = $scope.SName;
            $scope.student.Age = $scope.SAge;
            $scope.student.Department = $scope.SDepartment;
            $http({
                method: "post",
                url: "/Student/UpdateStudentRecord",
                datatype: "json",
                data: JSON.stringify($scope.student)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllStudent();
                $scope.SName = "";
                $scope.SAge = "";
                $scope.SDepartment = "";
                document.getElementById("insertStd").setAttribute("value", "Submit");
            })
        }
    }

    $scope.UpdateStudent = function (Std) {
        sessionStorage.setItem("SID", Std.ID);
        $scope.SName = Std.Name;
        $scope.SAge = Std.Age;
        $scope.SDepartment = Std.Department;
        document.getElementById("insertStd").setAttribute("value", "update");
    };

    $scope.DeleteStudent = function (Std) {
        $http({
            method: "post",
            url: "/Student/DeleteStudent",
            datatype: "json",
            data: JSON.stringify(Std)
        }).then(function (response) {
            alert("Delete Succefully!");
            $scope.GetAllStudent();
        })
    };
});