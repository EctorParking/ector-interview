# Exerice quote

L'objectif de ce mini projet est de réaliser un outil de demande de devis pour du stationnement.

Tu disposes d'une base Koa.js avec mysql comme driver pour effectuer les requêtes.

## Ressources

* koa : https://koajs.com/
* mysql2 : https://github.com/sidorares/node-mysql2#readme

Pour démarrer le projet en local, il suffit de faire `yarn start`.
Tu devras au préalable configurer les accès à la base de donnée.

## User stories

### ETQAdmin je souhaite pouvoir configurer des zones

Pour configurer une zone, j'ai besoin des endpoints suivants :

* POST /zones
Créer une zone avec un nom et prix journalier
* GET /zones/:zone_id
Récupère une zone
* GET /zones
Liste les zones
* PUT /zones/:zone_id
Modifier une zone
* DELETE /zones/:zone_id
Supprimer une zone

### ETQAdmin je souhaite pouvoir configurer le prix d'une zone

Pour configurer le prix d'une zone, j'ai besoin des endpoints suivants :

* POST /zones/:zone_id/price
Dans le body, je souhaite donner un taux journalier et un nombre de jours minimum pour bénificier de ce prix
* DELETE /zones/:zone_id/price/:price_id
Supprime la configuration de prix

### ETQClient je souhaite pouvoir obtenir un prix pour une demande de réservation

Ici, nous avons besoin uniquement de l'endpoint GET /quote.

Cet endpoint prend en query string les paramètres suivants :

* zone : Correspond à l'id de la zone
* from : Date et heure de début de réservation
* to : Date et heure de fin de réservation

Pour calculer le prix, on calcule d'abord le nombre de jours entre le début et la fin de la réservation (chaque journée entamée est dûe).

On récupère ensuite le taux journalier correspondant à la durée de la réservation en tenant compte que le nombre de jours du taux journalier doit être le plus faible possible et supérieur ou égal au nombre de jours de la réservation.

Par exemple, si j'ai dans la base 3 jours, 5 jours et 10 jours et que je demande une réservation pour 9 jours, alors je sélectionnerai le taux journalier pour 5 jours.

On multiplie ensuite le taux journalier par le nombre de jours de la réservation.

Si on ne trouve pas la zone demandée, on retourne une 404 Not Found
Si on ne trouve aucun taux journalier correspondant aux critères, on retourne une 400 Bad request

## Exemple

Par exemple, je pourrais configurer la zone de Bordeaux tel que :

1 jour => 20
3 jours => 15
7 jours => 10

Ainsi, si je demande un devis du 14/03 à 17h30 au 19/03 à 12h00, l'algorithme devrait me sortir 6 * 15 = 90 euros
