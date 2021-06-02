# rehapp
- [Installation](#installation)
   - [Requirements](#requirements)
   - [How to prepare Intellij IDE](#how-to-prepare-intellij-ide-webstorm--pycharm-for-front-end-development)
- [Development](#development)
   - [Devel environment](#devel-environment)
   - [Production environment](#production-environment)
- [Version release](#version-release)



## Installation

### Requirements
- node v14.0.0 or higher
- npm v6.14.0 or higher

### How to prepare Intellij IDE (Webstorm / Pycharm) for front-end development
1. You have to get into `Settings/Editor/Code Style/HTML`, find `Do not indent children of` option 
   in tab `Other` and add `script` tag there.
2. Go to `Settings/Plugins` tab `Marketplace` and install `Multirun`.
3. Restart IDE
4. Find top tab called `Run` and find there `Edit Configurations`. Click on `+` and 
   select `Multirun`. Set name on `Run project` and add scripts (run serve and run 
   sass-watcher) below into `Choose configurations to run`. Remember to set `Allow 
   parallel run` and `Start configurations one by one` options on checked.


## Development

### Devel environment 
1. Go to directory: `cd client`
2. Install packages: `npm i`
3. Run the front-end builder: `npm run serve`
4. App is ready on https://localhost:8080/

[comment]: <> (8. If you get into https://localhost:8080/sign-in, the application log you in automatically on )
[comment]: <> (   the demo account &#40;to edit demo user's data go to `???file with default db???`&#41;.)

### Production environment:
1. Install packages: `npm i`
2. Build front-end package: `npm run build`
3. App is ready!
   
[comment]: <> (2. Run server: ``)


## Version release
To do list:
- Update `CHANGELOG.md`
- Update version in `frontend/package.json`
- Merge to master
- Create version tag
- Release on server
