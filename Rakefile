require "rake/testtask"

Rake::TestTask.new(:test) do |t|
  t.libs << "test"
  t.test_files = FileList['test/**/*_test.rb']
end

task :default => :test

#
# desc 'Run Tests'
# task :test do
#   sh "ruby test/sunny_test.rb"
# end
