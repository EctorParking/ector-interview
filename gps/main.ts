import map, { Cities, City, Connexion } from './map';

const getDistance = (path: Connexion[]) => path.reduce((total, { distance }) => total + distance, 0);

const path = (from: keyof Cities, to: keyof Cities): Array<Connexion> => {
  const recursion = (conn: Connexion, path: Array<Connexion>, visited: Array<City>): Connexion[] | null => {
    if (visited.indexOf(conn.from) === -1) {
      path.push(conn);
      visited.push(conn.from);
      if (conn.to === map.cities[to]) {
        return path;
      }
      return conn.to.neighbours.reduce<Connexion[] | null>((bestPath, conn: Connexion) => {
        const testPath = recursion(conn, [...path], [...visited]);
        return testPath && (!bestPath || getDistance(testPath) < getDistance(bestPath)) ? testPath : bestPath;
      }, null);
    }
    return null;
  };

  return map.cities[from].neighbours.reduce<Connexion[] | null>((bestPath, conn: Connexion) => {
    const testPath = recursion(conn, [], []);
    return testPath && (!bestPath || getDistance(testPath) < getDistance(bestPath)) ? testPath : bestPath;
  }, null) || [];
}

console.log('----- Test 1 -----');
map.showPath(path('Lille', 'Lyon'));
console.log('----- Test 2 -----');
map.showPath(path('Bordeaux', 'Marseille'));
console.log('----- Test 3 -----');
map.showPath(path('Bordeaux', 'Luxembourg'));
console.log('----- Test 4 -----');
map.showPath(path('Bruxelle', 'Marseille'));
