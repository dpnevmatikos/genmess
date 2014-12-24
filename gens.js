var _ = require('underscore');

if (typeof _ === 'undefined') {
    throw 'Underscore was not found';
}

var s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

var Entity = function() {
    this.value = undefined;
    this.rating = undefined;
    this.normalizedRating = undefined;
};

var GeneticEvolver = function(options) {
    this.Seed = options.seed; 
    this.SearchWord = options.searchWord || 'Cat';
    this.Generations = options.generations || 10;
    this.PopulationMembers = options.populationMembers || 1000;
    this.PopulationCount = 0;
    this.CurrentPopulation = [];
    this.EvolvedPopulation = [];
    this.TotalRating = 0;
    this.StartTime = undefined;
    this.EndTime = undefined;
};

GeneticEvolver.prototype.evolve = function() {
    this.StartTime = new Date().getTime();
    var i = 0;

    // Evolve generations
    var g = 0;
    while (g < this.Generations) {
        
        // Create population
        for (i = 0; i < this.PopulationMembers; i++) {

            // create population's entities
            var entity = new Entity();
            entity.value = this.randomString();

            entity.rating = this.calculateFitness(entity);
            this.TotalRating += entity.rating;
            this.CurrentPopulation[i] = entity;
        }
        
        var totalNormalizedRating = 0;
        for (i = 0; i < this.PopulationMembers; i++) {
            this.calculateNormalizedRating(this.CurrentPopulation[i]);
            totalNormalizedRating += this.CurrentPopulation[i].normalizedRating;
        }

        console.log(this.CurrentPopulation);
        console.log("Total rating: " + this.TotalRating);
        console.log('Total normalized rating: ' + totalNormalizedRating);
        
        // Reset rating
        this.TotalRating = 0;
        g++;
    }// while
};

GeneticEvolver.prototype.calculateFitness = function(entity) {
    var rating = 0;
    var val = entity.value;
    
    for (var i = 0; i <this.SearchWord.length; i++) {
        if (val.charAt(i) == this.SearchWord.charAt(i)) {
            rating++;
        }
    }
    
    return rating;
};

GeneticEvolver.prototype.calculateNormalizedRating = function(entity) {
    if (this.TotalRating === 0) {
        entity.normalizedRating = 0;
        return;
    }
    
    entity.normalizedRating = (entity.rating / this.TotalRating).toFixed(2) * 100;
};

// Generates a random string with length equal to
// SearchWord
GeneticEvolver.prototype.randomString = function() {
    var randomStr = '';

    for (var i = 0; i < this.SearchWord.length; i++) {
        randomStr += this.Seed.charAt(_.random(0, this.Seed.length - 1));
    }

    return randomStr;
};

var g = new GeneticEvolver({
    seed: s,
    searchWord: 'Cat',
    generations: 2,
    populationMembers: 10
});
g.evolve();

