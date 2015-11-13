angular.module('7minute')
    .factory('workoutHistoryTracker', ['$rootScope', 'localStorageService', 'appEvents', function
        ($rootScope, localStorageService, appEvents) {
        var maxHistoryItems = 20
            , storageKey = "workouthistory"
            , workoutHistory = localStorageService.get(storageKey) || [];
        var maxHistoryItems = 20; //Track for last 20 exercise
        var workoutHistory = [];
        var currentWorkoutLog = null;
        var service = {};
        service.startTracking = function () {
            currentWorkoutLog = { startedOn: new Date().toISOString(), completed: false, exercisesDone: 0 };
            if (workoutHistory.length >= maxHistoryItems) {
                workoutHistory.shift();
            }
            workoutHistory.push(currentWorkoutLog);
            localStorageService.add(storageKey, workoutHistory);
        };
        $rootScope.$on(appEvents.workout.exerciseStarted, function (e, args) {
            localStorageService.add(storageKey, workoutHistory);
            currentWorkoutLog.lastExercise = args.title;
            ++currentWorkoutLog.exercisesDone;
        });

        $rootScope.$on("$routeChangeSuccess", function (e, args) {
            if (currentWorkoutLog) {
                service.endTracking(false);
            }
        });

        service.endTracking = function (completed) {
            currentWorkoutLog.completed = completed;
            currentWorkoutLog.endedOn = new Date().toISOString();
            currentWorkoutLog = null;
            localStorageService.add(storageKey, workoutHistory);
        };

        service.getHistory = function () {
            return workoutHistory;
        };

        return service;
    }]);

angular.module('7minute').value("appEvents", {
    workout: { exerciseStarted: "event:workout:exerciseStarted" }
});