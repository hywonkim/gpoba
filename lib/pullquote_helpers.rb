# Credits: 
# Based loosely on the Middleman syntax highlighting extension:
# https://github.com/middleman/middleman-syntax/blob/master/lib/middleman-syntax/extension.rb
# and https://github.com/octopress/pullquote-tag/blob/master/lib/octopress-pullquote-tag.rb

class Pullquote_Helpers < Middleman::Extension
  def initialize(app, options_hash={}, &block)
    super
  end

  # Output pullquote. Use like:
  #
  #    <% pullquote('lorem ipsum') do %>
  #     paragaph text to be highlighted for lorem ipsum
  #    <% end %>
  #
  #   OR use [quote] ... [/quote] to select text for highlighting
  #
  #    <% pullquote do %>
  #      paragaph text to be highlighted for [quote] lorem ipsum [/quote]
  #    <% end %>
  #
  #
  # To produce the following structure:
  #
  #   <p> 
  #       <span class='pullquote' data-pullquote = 'lorem ipsum' ></span>
  #        paragaph text to be highlighted for lorem ipsum
  #   </p>
  #
  # @param [String] quote that can be used for pull quote
  # @param [String] list of classess that may be applied to span, defaults to 'pullquote'

  helpers do
    def pullquote(quote=nil, classes='pullquote',  &block)
      raise 'The pullquote helper requires a block to be provided.' unless block_given?

        # Save current buffer for later
        @_out_buf, _buf_was = "", @_out_buf

        # Capture html block content
        begin
          content = capture_html(&block)
        ensure
          # Reset stored buffer
          @_out_buf = _buf_was
        end

        # If quote is not specified in helper, parse for quote highlights
        if !quote
          quote = content.match(/\[quote\](.*?)\[\/quote\]/)[1]

          # Remove quote placeholders
          content.gsub!("\[quote\]",'').gsub!("[\/quote\]",'')
        end

        # Add pullquote into markup
        output = "<span class=\"#{classes}\" data-pullquote=\"#{quote}\"></span>#{content}"        

      concat_content output.html_safe
    end
  end
end
::Middleman::Extensions.register(:pullquote_helpers, Pullquote_Helpers)