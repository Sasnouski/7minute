
angular.module('7minute')
    .controller('AudioController', ['$scope', '$timeout',
        function ($scope, $timeout) {
            $scope.exercisesAudio = [];
            var workoutPlanwatch = $scope.$watch('workoutPlan', function
                (newValue, oldValue) {
                if (newValue) { // newValue==workoutPlan
                    angular.forEach( $scope.workoutPlan.exercises,
                        function (exercise) {
                            $scope.exercisesAudio.push({
                                src: exercise.details.nameSound,
                                type: "audio/wav"
                            });
                        });
                    workoutPlanwatch(); //unbind the watch.
                }
            });
            $scope.$watch('currentExercise', function (newValue, oldValue) {
                if (newValue && newValue != oldValue) {
                    if ($scope.currentExercise.details.name == 'rest') {
                        $timeout(function () {
                            $scope.nextUpAudio.play();
                        }, 2000);
                        $timeout(function () {
                            $scope.nextUpExerciseAudio.play($scope.currentExerciseIndex + 1, true);
                        }, 3000);
                    }
                }
            });
            $scope.$watch('currentExerciseDuration', function (newValue, oldValue) {
                if (newValue) {
                    if (newValue == Math.floor($scope.currentExercise.duration / 2) && $scope.currentExercise.details.name !== 'rest') {
                        $scope.halfWayAudio.play();
                    }
                    else if (newValue == $scope.currentExercise.duration - 3) {
                        $scope.aboutToCompleteAudio.play();
                    }
                }
            });
            $scope.$watch('workoutPaused', function (newValue, oldValue) {
                if (newValue) {
                    $scope.ticksAudio.pause();
                    $scope.nextUpAudio.pause();
                    $scope.nextUpExerciseAudio.pause();
                    $scope.halfWayAudio.pause();
                    $scope.aboutToCompleteAudio.pause();
                } else {
                    $scope.ticksAudio.play();
                    if ($scope.halfWayAudio.currentTime > 0 &&
                        $scope.halfWayAudio.currentTime <
                        $scope.halfWayAudio.duration)
                        $scope.halfWayAudio.play();
                    if ($scope.aboutToCompleteAudio.currentTime > 0 &&
                        $scope.aboutToCompleteAudio.currentTime <
                        $scope.aboutToCompleteAudio.duration)
                        $scope.aboutToCompleteAudio.play();
                }
            });
            var init = function () {

            };
            init();
        }]);
