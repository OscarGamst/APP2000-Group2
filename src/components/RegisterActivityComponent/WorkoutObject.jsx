import ExerciseObject from './ExerciseObject.jsx';

class Workout {

    constructor() {
        this.exercises=[];
        this.description = "";
        this.duration=0;
        this.type=""; //This is just to make searches easier in the backend
        this.title="";
        this.user="";
        this.access="private";
        this.distance=0;
    }

    setDescription(description) {
        this.description=description;
    }
    setDuration(duration) {
        this.duration=duration;
    }

    setTitle(title) {
        this.title=title;
    }

    setUser(user) {
        this.user=user;
    }

    setAccess(access) {
        this.access=access;
    }

    setType(type) {
        this.type=type;
    }

    setDistance(distance) {
        this.distance=distance;
    }

    createNewExercise(name,sets,kilos,reps) {
        this.exercises.push(new ExerciseObject(name,sets,kilos,reps));
    }
    getExercise() {
        return this.exercises[0].getName();
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getDuration() {
        return this.duration;
    }

    getUser() {
        return this.user;
    }

    getAccess() {
        return this.access;
    }

    getDistance() {
        return this.distance;
    }

    resetObject() {
        this.exercises=[];
        this.description="";
        this.duration=0;
    }
}

export default Workout;