class Exercise {
    constructor(name,sets,kilos,reps) {
        this.name=name;
        this.sets=sets;
        this.kilos=kilos;
        this.reps=reps;
    }
    getName() {
        return this.name;
    }
}

export default Exercise;