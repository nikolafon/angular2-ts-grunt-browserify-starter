# angular2-ts-grunt-browserify-starter
Angular 2 starter kit featuring typescript, grunt and browserify. With this starter you get incremental typescript compilation, grunt watch tasks for less, images, fonts, html templates, and tasks for minification and zip distribution.
Starter uses live-server to serve static files with reload and mock-server to mock JSON calls.

# Prerequisites
  1. You need to have git and node.js installed

# Quick start
  1. git clone --depth 1 https://github.com/nikolafon/angular2-ts-grunt-browserify-starter.git
  3. Run npm install -g grunt-cli
  4. Run npm install -g live-server
  2. Run npm install
  5. Run npm run dev
  6. Open another terminal window and run npm start

# Grunt tasks
  * grunt clean - cleans build and dist folder
  * grunt build - builds the project to build folder
  * grunt dist  - creates distributable in dist folder
  * grunt dev   - builds project and watches files for changes and incremental update of typescript, less, font and image files.

# Start servers
npm start - It will run live-reload server which will serve static files and watch for changes in the build folder for reload. I will
also run mock-server which will mock JSON calls.
