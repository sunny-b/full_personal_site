require 'sinatra'
require 'sinatra/content_for'
require 'tilt/erubis'
require 'rack'
require 'puma'

configure(:development) do
  require 'sinatra/reloader'
  require 'pry'
end

get '/' do
  erb :index, layout: :layout
end
