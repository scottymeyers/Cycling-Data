Currently converts GPX to GeoJSON by:

- Exporting all Strava Data from Settings
- Opening .zip and dumping all `gpx` found in `activities` directory into this `gpx` directory
- Run `yarn convert` to convert `gpx` into `GeoJSON`
- Manually copy the created `activities.json` file into the `web` project