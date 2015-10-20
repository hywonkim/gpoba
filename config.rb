# require './lib/chapter'
# require 'middleman-thumbnailer'

## Add CSV To Table
require 'lib/csv_helpers.rb'
require 'lib/pullquote_helpers.rb'
activate :csv_helpers
activate :pullquote_helpers

###
# Compass
###

# Change Compass configuration
compass_config do |config|
  require "compass/import-once/activate"
#   config.output_style = :compact
end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :chapter do
#   page "/content/*"
# end

# no layout for content files
page "/content/*", :layout => false

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

# Create a page for each "chapter" using the chapters.html.erb template
data.chapters.each_with_index do |chapter, index|
    proxy "#{data.site.paths.chapter}#{chapter.slug.urlize}.html", "/templates/chapter.html", :locals => {
        :title => chapter.title,
        :subtitle => chapter.subtitle,
        :slug => chapter.slug,
        :color => chapter.color || "blue",
        :image => chapter.image || false,
        :image_align => chapter.image_align || false,
        :type => "chapter",
        :order => index
    }, :ignore => true
end

# Pretty URLs (ie about.html.erb => about/index.html)
activate :directory_indexes
page "README.md", :directory_index => false
page "LICENSE", :directory_index => false
page "404.html", :directory_index => false

set :markdown_engine, :kramdown

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
helpers do

    # def render_formatting(string)
    #     return string.gsub("**.***", "<strong>.*</strong>").gsub("_.*_", "<em>.*</em>").to_s
    # end

    # is this url the current page?
    def current_page?(url)
        if current_resource.path == url
            return true
        end
    end

    # is this url in the current directory (in the sitemap)?
    def current_dir?(url)
        if current_page.url.include? url.gsub(".html", "/").to_s
            return true
        end
    end

    # Pagination helpers

    # http://talks.ruby.org.nz/2013/middleman/
    # https://forum.middlemanapp.com/t/creating-next-and-prev-links-for-pages/1414/2
    # class Chapter
    #     def initialize(resource)
    #         @resource = resource
    #     end

    #     def url
    #         @resource.url
    #     end

    #     def data
    #     def self.all(resources)
    #     resources.select do |chapter|
    #         resource.start_with?(data.site.paths.chapter)
    #     end
    # end

    # def chapter
    #     Chapter.all(sitemap.resources)
    # end

    # get the "order" field from page metadata, to figure out where we are in the order of chapters
    def get_current_index
        return current_page.metadata['order']
    end

    # is this the first chapter?
    def first_page?
        if get_current_index <= 0
            return true
        end
    end

    # is this the last chapter?
    def last_page?
        if get_current_index >= data.chapters.length - 1
            return true
        end
    end

end

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :fonts_dir, 'assets/fonts'

# Add bower's directory to sprockets asset path
# -> use bundler for back-end dependencies, bower for front-end dependencies
# -> http://dejimata.com/2013/11/4/bundler-meet-bower
after_configuration do
  @bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))
  sprockets.append_path File.join root, @bower_config["directory"]

  sprockets.import_asset 'jquery'
  sprockets.import_asset 'modernizr/modernizr.js'
  sprockets.import_asset 'picturefill'
  sprockets.import_asset 'chartist/dist/chartist.min.js'
  sprockets.import_asset 'chartist/dist/chartist.min.js.map'
  sprockets.import_asset 'filament-tablesaw/dist/tablesaw.js'
end

# For Heroku Builds
set :url_root, "https://#{ENV['APP_DOMAIN'] ? ENV['APP_DOMAIN'] : 'localhost:4567'}"

activate :search_engine_sitemap,
         exclude_if: -> (resource) {
           # Exclude all paths from sitemap that are sub-date indexes
           resource.path.match(/[0-9]{4}(\/[0-9]{2})*.html/)
         },
         default_change_frequency: 'weekly'

# Filewatcher ignore list (workaround for search_engine_sitemap on
# Heroku - see https://github.com/Aupajo/middleman-search_engine_sitemap/issues/2)
set :file_watcher_ignore,
    [
        /^bin(\/|$)/,
        /^\.bundle(\/|$)/,
        # /^vendor(\/|$)/,
        /^node_modules(\/|$)/,
        /^\.sass-cache(\/|$)/,
        /^\.cache(\/|$)/,
        /^\.git(\/|$)/,
        /^\.gitignore$/,
        /\.DS_Store/,
        /^\.rbenv-.*$/,
        /^Gemfile$/,
        /^Gemfile\.lock$/,
        /~$/,
        /(^|\/)\.?#/,
        /^tmp\//
    ]

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Minify HTML on build
  # activate :minify_html do |html|
  #   html.remove_http_protocol = false
  # end

  # Enable cache buster
  # activate :asset_hash

  # Gzip
  # activate :gzip

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
