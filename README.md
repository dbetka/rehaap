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
- node v10.15.3 or higher
- npm v6.13.7 or higher
- python v3.7 or higher
- pip for python (compare pip and python versions)

### How to prepare Intellij IDE (Webstorm / Pycharm) for front-end development
1. You have to get into `Settings/Languages & Frameworks/JavaScript/Webpack` and set `frontend/webpack.common.js` as a config file.
2. Open `Project Files` click by right button on `frontend/.eslintrc` file and click `Apply ESLint Code Style Rules` option.
3. You have to get into `Settings/Editor/Code Style/HTML`, find `Do not indent children of` option and add `script` tag there.
4. Restart IDE

## Development for frontend

### Devel environment
1. Go to directory: `cd frontend`
2. Install packages: `npm i`
3. Run the front-end builder: `npm run build:dev`
4. App is ready on https://localhost:3030/
5. If you get into https://localhost:3030/sign-in, the application log you in automatically on 
   the demo account (to edit demo user's data go to `???file with default db???`).

### Production environment:
1. Install packages: `npm i`
2. Build front-end package: `npm run build:prod`
2. Run server: `npm run run:prod`
3. App is ready!

## Development for backend

### Devel environment 
1. Go to directory: `cd backend`
2. Install requirements: `pip3 install -r requirements.txt`
3. Run configuration script: `bash prepare.sh`
4. Run server: `python3 manage.py runserver`
5. App is ready on http://127.0.0.1:8000/


## Version release
To do list:
- Update `CHANGELOG.md`
- Update version in `frontend/package.json`
- Merge to master
- Create version tag
- Release on server
