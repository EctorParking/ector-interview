import map, { Cities, Connexion } from './map';

const path = (from: keyof Cities, to: keyof Cities): Array<Connexion> => {
  return [];
}

console.log('----- Test 1 -----');
map.showPath(path('Lille', 'Lyon'));
console.log('----- Test 2 -----');
map.showPath(path('Bordeaux', 'Marseille'));
console.log('----- Test 3 -----');
map.showPath(path('Bordeaux', 'Luxembourg'));
console.log('----- Test 4 -----');
map.showPath(path('Bruxelle', 'Marseille'));
