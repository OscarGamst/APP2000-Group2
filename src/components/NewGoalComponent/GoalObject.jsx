class Goal {

    constructor() {
        this.user="";
        this.type="weightlifting";
        this.repeating="never";
        this.frequency=null;

        this.distance=null;
        this.time=null;

        this.exerciseName=null;
        this.sets=null;
        this.reps=null;
        this.weight=null;
    }

    setUser(user) {
        this.user=user;
    }

    setType(type) {
        this.type=type;
    }

    setRepeating(repeating) {
        this.repeating=repeating;
    }

    setFrequency(frequency) {
        this.frequency=frequency;
    }

    setDistance(distance) {
        this.distance=distance;
    }

    setTime(time) {
        this.time=time;
    }

    setExerciseName(exerciseName) {
        this.exerciseName=exerciseName;
    }

    setSets(sets) {
        this.sets=sets;
    }

    setReps(reps) {
        this.reps=reps;
    }

    setWeight(weight) {
        this.weight=weight;
    }

    getType() {
        return this.type;
    }

    getRepeating() {
        return this.repeating;
    }

    resetObject() {
        this.user="";
        this.type="weightlifting";
        this.repeating ="never";
        this.frequency=null;

        this.distance=null;
        this.time=null;

        this.exerciseName=null;
        this.sets=null;
        this.reps=null;
        this.weight=null;
    }
}

export default Goal;