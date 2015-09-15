# require './lib/chapter'

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

# Set up arrays of chapter slugs and titles, to help with pagination (see helpers below)
$chapter_slugs = []
$chapter_titles = []

# Create a page for each "chapter" using the chapters.html.erb template
data.chapters.each_with_index do |chapter, index|
    proxy "#{data.site.paths.chapter}#{chapter.slug.urlize}.html", "/templates/chapter.html", :locals => {
        :title => chapter.title,
        :slug => chapter.slug,
        :color => chapter.color || "blue",
        :image => chapter.image || false,
        :order => index
    }, :ignore => true

    # add chapter data to title & slug arrays
    $chapter_slugs.push(chapter.slug)
    $chapter_titles.push(chapter.title)
end

# go back through the generated pages and add the locals to metadata
# ready do
#     data.chapters.each_with_index do |chapter, index|
#         resource = sitemap.find_resource_by_path "#{data.site.paths.chapter}#{chapter.slug.urlize}.html"
#         resource.add_metadata page: {
#             title: chapter.title,
#             slug: chapter.slug,
#             type: "chapter",
#             order: index,
#             color: chapter.color || "blue",
#             image: chapter.image || false
#         }
#     end
# end

# Pretty URLs (ie about.html.erb => about/index.html)
activate :directory_indexes
page "README.md", :directory_index => false
page "LICENSE", :directory_index => false
page "404.html", :directory_index => false

# Create a "pageable set" from the chapters local data
# -> used for local navigation on chapter pages, for next/prev links
activate :pagination do
  pageable_set :chapters do |chapter|
    data.chapters
  end
end

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

    def get_current_index(page, slug = true)
        if slug == true
            return $chapter_slugs.index(page)
        else
            return $chapter_titles.index(page)
        end
    end


    # get the url for the next or previous chapter
    def pagination_url(slug, sequence = "prev")
        if sequence == "prev"
            return "#{data.site.paths.chapter}#{$chapter_slugs[get_current_index(slug) - 1].to_s.urlize}/"
        elsif sequence == "next"
            return "#{data.site.paths.chapter}#{$chapter_slugs[get_current_index(slug) + 1].to_s.urlize}/"
        end
    end

    # get the title for the next or previous chapter
    def pagination_title(title, sequence = "prev")
        if sequence == "prev"
            return $chapter_titles[get_current_index(title, false) - 1].titleize
        elsif sequence == "next"
            return $chapter_titles[get_current_index(title, false) + 1].titleize
        end
    end

    def first_page(slug)
        if get_current_index(slug) <= 0
            return true
        end
    end

    def last_page(slug)
        if get_current_index(slug) >= $chapter_slugs.length - 1
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
end

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Minify HTML on build
  activate :minify_html

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
