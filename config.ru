require 'rack'
require "middleman/rack"
require 'rack/contrib/try_static'

# Build the static site when the app boots
`bundle exec middleman build`

# Enable proper HEAD responses
use Rack::Head

# Basic Auth:
use Rack::Auth::Basic, "Restricted Area" do |username, password|
  [username, password] == ['gpoba', 'gpoba']
end

# Serve files from the build directory
use Rack::TryStatic,
  root: 'build',
  urls: %w[/],
  try: ['.html', 'index.html', '/index.html']

run lambda{ |env|
  four_oh_four_page = File.expand_path("../build/404/index.html", __FILE__)
  [ 404, { 'Content-Type'  => 'text/html'}, [ File.read(four_oh_four_page) ]]
}