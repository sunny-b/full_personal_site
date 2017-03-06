require 'sinatra'
require 'sinatra/content_for'
require 'tilt/erubis'
require 'rack'
require 'puma'

configure(:development) do
  require 'sinatra/reloader'
  require 'pry'
  also_reload 'public/css/style.css'
end

get '/' do
  erb :index, layout: :layout
end
