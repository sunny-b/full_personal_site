require 'sinatra'
require 'sinatra/content_for'
require 'tilt/erubis'
require 'rack'

configure(:development) do
  require 'sinatra/reloader'
  require 'pry'
  require 'puma'
end

get '/' do
  erb :index, layout: :layout
end
