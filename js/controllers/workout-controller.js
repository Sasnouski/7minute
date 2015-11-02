'use strict';

angular.module('7minute').controller('WorkoutController', ['$scope','$interval', '$location', function($scope, $interval, $location) {
    var restExercise;
    function WorkoutPlan(args) {
        this.exercises = [];
        this.name = args.name;
        this.title = args.title;
        this.restBetweenExercise = args.restBetweenExercise;
        this.totalWorkoutDuration = function () {
            if (this.exercises.length == 0) return 0;
            var total = 0;
            angular.forEach(this.exercises, function (exercise) {
                total = total + exercise.duration;
            });
            return this.restBetweenExercise * (this.exercises.length - 1) + total;
        }
    };
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
        $scope.workoutPlan = createWorkout();
        $scope.workoutTimeRemaining = $scope.workoutPlan.totalWorkoutDuration();
        restExercise = {
            details: new Exercise({
                name: "rest",
                title: "Relax!",
                description: "Relax a bit!",
                image: "img/rest.png",
            }),
            duration: $scope.workoutPlan.restBetweenExercise
        };
        $interval(function () {
            $scope.workoutTimeRemaining = $scope.workoutTimeRemaining - 1;
        }, 1000, $scope.workoutTimeRemaining);

        $scope.currentExerciseIndex = -1;
        startExercise($scope.workoutPlan.exercises[0]);
    };

    var startExercise = function (exercisePlan) {
        $scope.currentExercise = exercisePlan;
        $scope.currentExerciseDuration = 0;

        if (exercisePlan.details.name != 'rest') {
            $scope.currentExerciseIndex++;
        }

        $interval(function () {
            ++$scope.currentExerciseDuration;
        }, 1000, $scope.currentExercise.duration)
            .then(function () {
                var next = getNextExercise(exercisePlan);
                if (next) {
                    startExercise(next);
                }
                else {
                    $location.path('/finish');
                }
            });
    };
    var getNextExercise = function (currentExercisePlan) {
        var nextExercise = null;
        if (currentExercisePlan === restExercise) {
            nextExercise = $scope.workoutPlan.exercises[$scope.currentExerciseIndex + 1];
        }
        else {
            if ($scope.currentExerciseIndex < $scope.workoutPlan.exercises.length - 1) {
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
            restBetweenExercise: 5
        });
    workout.exercises.push({
        details: new Exercise({
            name: "jumpingJacks",
            title: "Jumping Jacks",
            description: "A jumping jack or star jump, also called side-straddle hop is a physical jumping exercise.",
            image: "img/JumpingJacks.png",
            nameSound: "content/jumpingjacks.wav",
            videos: ["//www.youtube.com/embed/dmYwZH_BNd0", "//www.youtube.com/embed/BABOdJ-2Z6o", "//www.youtube.com/embed/c4DAnQ6DtF8"],
            procedure: "Assume an erect position, with feet together and arms at your side.\
                        <br/>Slightly bend your knees, and propel yourself a few inches into the air.\
                        <br/>While in air, bring your legs out to the side about shoulder width or slightly wider.\
                        <br/>As you are moving your legs outward, you should raise your arms up over your head; arms should be slightly bent throughout the entire in-air movement.\
                        <br/>Your feet should land shoulder width or wider as your hands meet above your head with arms slightly bent"
        }),
        duration: 30
    });
    workout.exercises.push({
        details: new Exercise({
            name: "wallSit",
            title: "Wall Sit",
            description: "A wall sit, also known as a Roman Chair, is an exercise done to strengthen the quadriceps muscles.",
            image: "img/wallsit.png",
            nameSound: "content/wallsit.wav",
            videos: ["//www.youtube.com/embed/y-wV4Venusw", "//www.youtube.com/embed/MMV3v4ap4ro"],
            procedure: "Place your back against a wall with your feet shoulder width apart and a little ways out from the wall.\
                        <br/>Then, keeping your back against the wall, lower your hips until your knees form right angles. "
        }),
        duration: 30
    });
    workout.exercises.push({
        details: new Exercise({
            name: "pushUp",
            title: "Push Up",
            description: "A push-up is a common exercise performed in a prone position by raising and lowering the body using the arms",
            image: "img/Pushup.png",
            nameSound: "content/pushups.wav",
            videos: ["//www.youtube.com/embed/Eh00_rniF8E", "//www.youtube.com/embed/ZWdBqFLNljc", "//www.youtube.com/embed/UwRLWMcOdwI", "//www.youtube.com/embed/ynPwl6qyUNM", "//www.youtube.com/embed/OicNTT2xzMI"],
            procedure: "Lie prone on the ground with hands placed as wide or slightly wider than shoulder width. \
                        <br/>Keeping the body straight, lower body to the ground by bending arms at the elbows. \
                        <br/>Raise body up off the ground by extending the arms."
        }),
        duration: 30
    });
    return workout;
    };

    var init = function () {
        startWorkout();
    };
    init();
}]);
