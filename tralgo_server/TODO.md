* [X] Add node server
* [X] Add Sequelize migrations
* [X] Fix Sequelize onDelete CASCADE bug (only happens for Point)
* [X] Fix Sequelize seeding before sync is done
* [X] Abstract away hardcoded place information from Tralgo functionality (from DB)
* Move from boilerplate app:
    * [X] Sequelize connection
    * [X] Sequelize models
    * Middleware
* Merge sequelize and sequelize-cli config into one file used by both
* Add functionality for querying places
* Authentication
* Optimize Tralgo algorithm
* Optimize nodemap definitions and initializations
* Omit certain properties being returned from Sequelize (created, updated, etc..)

High Priority
* Phase out POSTGIS from DB. It is unnecessarily complicated.
* Store point references in edge coordinates in DB to use for map editing (or inherently know first and last points are start and end point coords?)