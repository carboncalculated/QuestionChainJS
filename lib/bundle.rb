require 'fileutils'
require 'yaml'

require 'rubygems'
require 'closure-compiler'
require "yui/compressor"
require 'sprockets'

class Bundle
  DIST_DIR = 'dist'
  SRC_DIR = 'src'

  attr_reader :path

  def initialize
    @path = "#{SRC_DIR}/question_chain.js"
  end

  def bundle!
    FileUtils.mkdir_p(DIST_DIR)

    secretary = Sprockets::Secretary.new(
      :load_path => [SRC_DIR],
      :source_files => [path],
      :expand_paths => false
    )
    concatenation = secretary.concatenation
    concatenation.save_to(bundle_path)
  end

  def bundle_path
    "#{DIST_DIR}/question_chain-#{version}.js"
  end

  def minify!
    file = File.open(bundle_path, 'r')
    compressor = YUI::JavaScriptCompressor.new(:munge => true)
    minified = compressor.compress(file.read)
    File.open(minify_path, 'w') do |f|
      f.write(extract_head(file))
      f.write(minified)
    end
  end

  def minify_path
    "#{DIST_DIR}/question_chain-#{version}.min.js"
  end

  def version
    @version ||= YAML.load_file("#{SRC_DIR}/constants.yml")['VERSION']
  end

  private
    def extract_head(file)
      head = ''
      file.rewind
      while (line = file.gets)
        if line =~ /^[\/\s]/
          head << line
        else
          break
        end
      end
      head
    end
end
