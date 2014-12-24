var s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

var searchWord = 'Cat';
var instance = '';
var population = [];

var Entity = function() {
    this.value = undefined;
    this.rating = undefined;
    this.normalizedRating = undefined;
}

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
}

GeneticEvolver.prototype.evolve = function() {
    this.StartTime = new Date().getTime();
    var i = 0;

    // Evolve generations
    var g = 0;
    while (g < this.Generations && g != -1) {
        
        // Create population
        for (i = 0; i < this.PopulationMembers; i++) {

            // create population's entities
            var entity = new Entity();
            entity.value = this.randomString();

            entity.rating = this.calculateFitness(entity);
            this.TotalRating += entity.rating;
            this.CurrentPopulation[i] = entity;
        }
        
        for (i = 0; i < this.PopulationMembers; i++) {
            this.calculateNormalizedRating(this.CurrentPopulation[i]);
        }

        console.log(this.CurrentPopulation);
        console.log("Total rating: " + this.TotalRating);
        
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
    entity.normalizedRating = entity.rating / this.TotalRating;
}

// Generates a random string with length equal to
// SearchWord
GeneticEvolver.prototype.randomString = function() {
    var randomStr = '';

    for (var i = 0; i < this.SearchWord.length; i++) {
        randomStr += this.Seed.charAt(getRandomArbitrary(0, this.Seed.length));
    }

    return randomStr;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// min (inclusive) - max (exclusive)
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

var g = new GeneticEvolver({
    seed: s,
    searchWord: 'Cat',
    generations: 2,
    populationMembers: 10
});
g.evolve();

