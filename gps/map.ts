export type Cities = {
  Bruxelle: City;
  Lille: City;
  Luxembourg: City;
  Paris: City;
  Strasbourg: City;
  Lyon: City;
  Bordeaux: City;
  Toulouse: City;
  Montpellier: City;
  Marseille: City;
};

export type Connexion = {
  distance: number;
  from: City;
  to: City;
};

export type City = {
  name: keyof Cities;
  neighbours: Array<Connexion>;
};

class Map {
  cities: Cities;

  constructor() {
    this.cities = {} as Cities;

    this.addCity('Bruxelle');
    this.addCity('Lille');
    this.addCity('Luxembourg');
    this.addCity('Paris');
    this.addCity('Strasbourg');
    this.addCity('Lyon');
    this.addCity('Bordeaux');
    this.addCity('Toulouse');
    this.addCity('Montpellier');
    this.addCity('Marseille');

    this.connectCities('Bruxelle', 'Lille', 150);
    this.connectCities('Bruxelle', 'Luxembourg', 400);
    this.connectCities('Lille', 'Luxembourg', 300);
    this.connectCities('Lille', 'Paris', 200);
    this.connectCities('Luxembourg', 'Strasbourg', 250);
    this.connectCities('Paris', 'Strasbourg', 500);
    this.connectCities('Paris', 'Lyon', 500);
    this.connectCities('Paris', 'Bordeaux', 600);
    this.connectCities('Strasbourg', 'Lyon', 500);
    this.connectCities('Lyon', 'Bordeaux', 550);
    this.connectCities('Lyon', 'Toulouse', 550);
    this.connectCities('Lyon', 'Marseille', 300);
    this.connectCities('Bordeaux', 'Toulouse', 250);
    this.connectCities('Toulouse', 'Montpellier', 250);
    this.connectCities('Montpellier', 'Marseille', 150);
  }

  private addCity(name: keyof Cities) {
    this.cities[name] = {
      name,
      neighbours: []
    };
  }

  private connectCities(from: keyof Cities, to: keyof Cities, distance: number) {
    this.cities[from].neighbours.push({from: this.cities[from], to: this.cities[to], distance});
    this.cities[to].neighbours.push({from: this.cities[to], to: this.cities[from], distance});
  }

  public showPath(path: Array<Connexion>) {
    if (path.length === 0) {
      console.log('No itinerary found');
    } else {
      console.log(`starting from: ${path[0].from.name}`);
      path.forEach(({ from }, idx) => idx > 0 ? console.log(`passing through: ${from.name}`) : null);
      console.log(`ending at: ${path[path.length - 1].to.name}`);
      console.log(`total distance: ${path.reduce((total, { distance }) => total + distance, 0)}`);
    }
  }
}

export default new Map();
