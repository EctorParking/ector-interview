import map, { Cities, Connexion } from './map';

const lengthPath = (path: Array<Connexion>): number => path.reduce((acc, cur) => acc + cur.distance, 0)

const recursivePath = (from: keyof Cities, to: keyof Cities, path: Array<Connexion>): Array<Connexion> => {
  const neighbours = map.cities[from].neighbours;
  const routes = neighbours
    .filter((n) => !path.find(p => p.from.name == n.to.name || p.to.name == n.to.name))
    .map((n) => {
      if (n.to.name == to) {
        return [...path, n]
      }
      return recursivePath(n.to.name, to, [...path, n])
    })
    .filter((r) => lengthPath(r) > 0)
  if (routes.length === 0) return [];
  return routes.reduce((acc, cur) => lengthPath(acc) < lengthPath(cur) ? acc : cur, routes[0])
}

const path = (from: keyof Cities, to: keyof Cities): Array<Connexion> => {
  return recursivePath(from, to, []);
}

console.log('----- Test 0 -----');
map.showPath(path('Lille', 'Bruxelle'));

console.log('----- Test 1 -----');
map.showPath(path('Lille', 'Lyon'));
console.log('----- Test 2 -----');
map.showPath(path('Bordeaux', 'Marseille'));
console.log('----- Test 3 -----');
map.showPath(path('Bordeaux', 'Luxembourg'));
console.log('----- Test 4 -----');
map.showPath(path('Bruxelle', 'Marseille'));
