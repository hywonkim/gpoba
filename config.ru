#\ -s puma
require 'rack'
require 'rack/contrib/try_static'
require 'rack/deflater'
require 'rack/cache'

# Build the static site when the app boots
`bundle exec middleman build`

# Enable proper HEAD responses
use Rack::Head

# Forces SSL on all requests
unless ENV['RACK_ENV'] == 'development'
  require 'rack/ssl'
  use Rack::SSL
end

# Rack Cache
use Rack::Cache,
    :verbose     => true,
    :metastore   => 'file:/var/cache/rack/meta',
    :entitystore => 'file:/var/cache/rack/body'

# Enables compression of http responses, used in conjunction with `activate :gzip` in config.rb
use Rack::Deflater

ONE_WEEK = 604_800

# Basic Auth:
if ENV['RACK_ENV'] == 'production'
  use Rack::Auth::Basic, "Restricted Area" do |username, password|
    [username, password] == [ENV['HTTP_AUTH_USER'], ENV['HTTP_AUTH_PASS']]
  end
end

# Serve files from the build directory
use Rack::TryStatic,
    root: 'build',
    urls: %w[/],
    try: %w(.html index.html /index.html),
    header_rules: [
        [
            %w(css js png jpg woff html),
            { 'Cache-Control' => "public, max-age=#{ONE_WEEK}" }
        ]
    ]

# 404 Support
run lambda { |env|
      four_oh_four_page = File.expand_path('../build/404/index.html', __FILE__)
      [
          404,
          {'Content-Type'  => 'text/html', 'Cache-Control' => "public, max-age=#{ONE_WEEK}"},
          [ File.read(four_oh_four_page) ]
      ]
    }