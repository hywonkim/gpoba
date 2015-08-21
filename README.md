# GPOBA 2015 Annual Report

A web-based version of the 2015 Annual Report. Built primarily with [Middleman](http://middlemanapp.com).

##### To edit content (here on Github):

1. Click on the file you'd like to edit. Most of the content can be found in `/source/sections/`.
2. Click the "edit" icon, top right (a little pencil).
3. Once you've made the edits, click the green "Commit changes" button at the bottom. Optionally, add a "commit message" in the text field just above it (e.g. "fixed a typo" or "added a subsection").

##### To run the site locally:

1. Clone this repository
2. If you don't already have them, install [Bundler](http://bundler.io) and [Bower](http://bower.io).
2. Run `$ bundle install` and then `$ bower install` to install the frameworks &amp; dependencies.
3. Run `$ bundle exec middleman`. This will start a local server at `localhost:4567` and will live-reload your browser.

To run a (deploy-able) build, `$ bundle exec middleman build`


****

Additionally, we manage icons with [Gulp](http://gulpjs.com), using the [gulp-svgstore](https://github.com/w0rm/gulp-svgstore) module, among others. To run Gulp, you'll need [NPM](http://npmjs.com). Once NPM is up and running, run `$ [sudo] npm install` in the project root to install the Gulp modules.

To update the SVG spritemap, run `$ gulp icons` or just `$ gulp`.
