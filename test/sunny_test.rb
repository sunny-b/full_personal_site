
ENV["RACK_ENV"] = "test"

require 'minitest/autorun'
require "minitest/reporters"
require 'rack/test'
Minitest::Reporters.use!

require_relative '../sunny'

class MintTest < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def session
    last_request.env["rack.session"]
  end

  def test_index
    get '/'
    assert_equal 200, last_response.status
    assert_includes last_response.body, 'Sun-Li "Sunny" Beatteay'
    assert_includes last_response.body, 'Front End Development'
    assert_includes last_response.body, 'Back End Development'
    assert_includes last_response.body, 'Launch School'
  end
end
