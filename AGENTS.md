# Règles pour les IA qui modifient ce site (Codex, Claude, autres)

- Ne pas changer le design : couleurs, typographies, mises en page et animations restent identiques, sauf demande explicite d'Arthur.
- Aucun tiret long ou moyen dans les textes du site. Utiliser « · », « : » ou « / ».
- Site statique : pas de framework, pas d'étape de build. Tout changement de `main` part en ligne en 1 à 2 minutes.
- Tester chaque changement en largeur 360, 390 et 414 px (rien ne doit dépasser l'écran) et en 1440 px.
- Chiffres affichés : « 20+ projets freelance livrés » (projets en freelance indépendant avant ComeUp + ventes ComeUp, déclarés par Arthur) ; « avis positifs » = avis du profil ComeUp https://comeup.com/fr/@arthurbey. Ne jamais modifier un chiffre sans validation d'Arthur.
- Garder à jour : `sitemap.xml` (lastmod) si une page change, balises `og:*` et JSON-LD dans `index.html` si l'offre ou le prix change.
- Ne pas supprimer le fichier `CNAME` (il rattache le domaine cadence-reporting.fr).
