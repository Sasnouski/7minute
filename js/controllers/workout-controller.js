'use strict';

angular.module('7minute').controller('WorkoutController', ['$scope','$interval', function($scope, $interval) {
    var restExercise,
        workoutPlan;
    function WorkoutPlan(args) {
        this.exercises = [];
        this.name = args.name;
        this.title = args.title;
        this.restBetweenExercise = args.restBetweenExercise;
    }
    function Exercise(args) {
        this.name = args.name;
        this.title = args.title;
        this.description = args.description;
        this.image = args.image;
        this.related = {};
        this.related.videos = args.videos;
        this.nameSound = args.nameSound;
        this.procedure = args.procedure;
    }
    var startWorkout = function () {
        workoutPlan = createWorkout();
        restExercise = {
            details: new Exercise({
                name: "rest",
                title: " Relax!",
                description: " Relax a bit!",
                image: "img/rest.png"
            }),
            duration: workoutPlan.restBetweenExercise
        };
        startExercise(workoutPlan.exercises.shift());
    };
    var getNextExercise = function (currentExercisePlan) {
        var nextExercise = null;
        if (currentExercisePlan === restExercise) {
            nextExercise = workoutPlan.exercises.shift();
        } else {
            if (workoutPlan.exercises.length != 0) {
                nextExercise = restExercise;
            }
        }
        return nextExercise;
    };
    var startExercise = function (exercisePlan) {
        $scope.currentExercise = exercisePlan;
        $scope.currentExerciseDuration = 0;
        $interval(function () {
            $scope.currentExerciseDuration = $scope.currentExerciseDuration + 1;
        }, 1000, $scope.currentExercise.duration)
            .then(function(){
                var next = getNextExercise(exercisePlan);
                if (next) {
                    startExercise(next);
                } else {
                    console.log("Workout complete!")
                }
            });
    };
    var createWorkout = function () {
        var workout = new WorkoutPlan({
            name: "7minWorkout",
            title: "7 Minute Workout",
            restBetweenExercise: 10
        });

    //$scope.$watch('currentExerciseDuration', function (nVal) {
    //    if (nVal == $scope.currentExercise.duration) {
    //        var next = getNextExercise($scope.currentExercise);
    //        if (next) {
    //            startExercise(next);
    //        } else {
    //            console.log("Workout complete!")
    //        }
    //    }
    //});
    workout.exercises.push({
        details: new Exercise({
            name: "pushupNRotate",
            title: "Pushup And Rotate",
            description: "A variation of pushup that requires you to rotate.",
            image: "img/pushupNRotate.png",
            videos: ["//www.youtube.com/embed/qHQ_E-f5278"],
            procedure: "Assume the classic pushup position, but as you come up, rotate your body so your right arm lifts up and extends overhead.\
                          Return to the starting position, lower yourself, then push up and rotate till your left hand points toward the ceiling."
        }),
        duration: 5
    });
    workout.exercises.push({
        details: new Exercise({
            name: "jumpingJacks",
            title: "Jumping Jacks",
            description: "A jumping jack or star jump, also called side-straddle hop is a physical jumping exercise.",
            image: "img/JumpingJacks.png",
            videos: ["//www.youtube.com/embed/dmYwZH_BNd0", "//www.youtube.com/embed/BABOdJ-2Z6o", "//www.youtube.com/embed/c4DAnQ6DtF8"],
            procedure: "Assume an erect position, with feet together and arms at your side.\
                        Slightly bend your knees, and propel yourself a few inches into the air.\
                        While in air, bring your legs out to the side about shoulder width or slightly wider.\
                        As you are moving your legs outward, you should raise your arms up over your head; arms should be slightly bent throughout the entire in-air movement.\
                        Your feet should land shoulder width or wider as your hands meet above your head with arms slightly bent"
        }),
        duration: 5
    });
    return workout;
    };

    var init = function () {
        startWorkout();
    };
    init();

}]);
