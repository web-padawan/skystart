# Default to development if environment is not set.
saved = environment
if (environment.nil?)
  environment = :development
else
  environment = saved
end

# Location of the theme's resources.
css_dir = "css"
sass_dir = "sass"
images_dir = "images"
generated_images_dir = images_dir + "/generated"
javascripts_dir = "js"
fonts_dir = "fonts"

# Require any additional compass plugins installed on your system.
require 'breakpoint'
require 'susy'
require 'sass-globbing'

# Select output style (:expanded, :nested, :compact, :compressed).
output_style = (environment == :production) ? :compressed : :expanded

# Enable relative paths to assets via compass helper functions.
relative_assets = true

# Disable cache busting on image assets
asset_cache_buster :none

# Disable output line comments in CSS.
line_comments = false

# ===================
# Uncomment this part to make sprite name static, icons-123asda.png -> icons.png
# useful for diffs in screen.css
# ===================
# # Make a copy of sprites with a name that has no uniqueness of the hash.
# on_sprite_saved do |filename|
#   if File.exists?(filename)
#     FileUtils.cp filename, filename.gsub(%r{-s[a-z0-9]{10}\.png$}, '.png')
#   end
# end
# # Replace in stylesheets generated references to sprites
# # by their counterparts without the hash uniqueness.
# on_stylesheet_saved do |filename|
#   if File.exists?(filename)
#     css = File.read filename
#     File.open(filename, 'w+') do |f|
#       f << css.gsub(%r{-s[a-z0-9]{10}\.png}, '.png')
#     end
#   end
# end

# # this one for switching between production and dev versions of the website
# module Sass::Script::Functions
#   def image_path(string)
#     assert_type string, :String
#     Sass::Script::String.new("../img/#{string.value}")
#   end
#   alias_method :"image-path",:image_path
#   declare :"image-path", :args => [:string]
# end
