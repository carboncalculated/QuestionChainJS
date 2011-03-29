require 'sinatra'
require 'json'

get '/' do
  redirect '/index.html'
end

post "/answers/fire_populate_drop_down/:id" do |id|
  JSON.generate({:options => [{:name => "beans", :value => "egg"}, {:name => "fries", :value => "fries"}]})
end