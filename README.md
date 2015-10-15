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

##### Special Functions

Note: to use any of these functions below the content files must be set to ".md.erb" to allow for ruby processing.

1) Tables 

Tables can be created by importing a CSV that is UTF-8 enconded into the data/tables folder of the repository. They can then be imported using the following ruby helper:
``` <%= table('table_E1.csv') %> ``` 
Note - all that is required is the table name. 

If you want to add an additional CSS class to the table, you can add it as the first argument: 
```<%= table('table_E1.csv', 'highlight-table') %> ```

The final argument is to turn on row class numbering. If set to true, this will add a "row-X" class to each row of the table for specific row styling.

Currently two specific table styles have been developed - "highlight-table" which will highlight the first 3 rows of the table and "total-table", which will add an highlight to the final row in a table. 

2) Pullquotes
Pullquotes can be created by doing the following:
```
     <% pullquote('lorem ipsum') do %>
      paragaph text to be highlighted for lorem ipsum
     <% end %>
```
 
    OR use [quote] ... [/quote] to select text for highlighting
```
     <% pullquote do %>
       paragaph text to be highlighted for [quote] lorem ipsum [/quote]
     <% end %>
```
 
  To produce the following structure:
```
    <p> 
        <span class='pullquote' data-pullquote = 'lorem ipsum' ></span>
         paragaph text to be highlighted for lorem ipsum
    </p>
```