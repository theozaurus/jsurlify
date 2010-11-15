require 'jasmine'
require 'saucelabs_adapter'
require 'selenium'

module Jasmine
  def self.wait_for_listener(port, name = "required process", seconds_to_wait = 120)
    time_out_at = Time.now + seconds_to_wait
    until server_is_listening_on "localhost", port
      sleep 10
      puts "Waiting for #{name} on #{port}..."
      raise "#{name} didn't show up on port #{port} after #{seconds_to_wait} seconds." if Time.now > time_out_at
    end
  end
end

class Jasmine::Config
  
  def start  
    start_servers
            
    config_file = File.join(File.dirname(File.dirname(File.dirname(File.dirname(__FILE__)))),'config', 'selenium.yml')
    
    @selenium_config = ::SaucelabsAdapter::SeleniumConfig.new browser, config_file
    @selenium_config[:tunnel_to_localhost_port] = @jasmine_server_port
    @selenium_config[:application_port]         = @jasmine_server_port
    @selenium_config[:saucelabs_username]       = ENV['SAUCELABS_USERNAME']   if ENV['SAUCELABS_USERNAME']
    @selenium_config[:saucelabs_access_key]     = ENV['SAUCELABS_ACCESS_KEY'] if ENV['SAUCELABS_ACCESS_KEY']
    
    @sauce_tunnel = SaucelabsAdapter::Tunnel.factory( @selenium_config  )
    @sauce_tunnel.start_tunnel
    
    @client = @selenium_config.create_driver( )
    @client.start
    @client.open '/'
  end
  
  def stop
    @client.stop
    @sauce_tunnel.shutdown
  end
  
  def eval_js(script)
    escaped_script = "'" + script.gsub(/(['\\])/) { '\\' + $1 } + "'"
    
    result = @client.get_eval("try { eval(#{escaped_script}, window); } catch(err) { window.eval(#{escaped_script}); }")
    JSON.parse("{\"result\":#{result}}")["result"]
  end

end
