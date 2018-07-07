require 'typhoeus'
require 'nokogiri'
require 'open-uri'
require 'csv'
require 'fileutils'

module Scraper

  # run the scraper to download the CPV data and save to local csv file
  def self.run
    start = Time.now
    url = 'http://cpv.data.ac.uk/scheme-CPV2008.html'
    csv_file = 'data/cpv_2008.csv'

    # get the html page
    puts '- getting html'
    response = Typhoeus.get(url, :headers=>{"User-Agent" => "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:60.0) Gecko/20100101 Firefox/60.0"},
                            followlocation: true, ssl_verifypeer: false, ssl_verifyhost: 0)

    # get the html body
    doc = Nokogiri::HTML(response.response_body)

    # get the table rows
    puts '- getting rows'
    rows = doc.css('table.scheme tr')

    if rows.present?
      data = []
      # pull out content in row
      puts "- processing #{rows.length } rows"
      rows.each do |row|
        # index 1 - code
        # index 2 - description
        data << [
          row.css('td:eq(1)').text.chomp.strip,
          row.css('td:eq(2)').text.chomp.strip
        ]
      end

      # create data folder if not exist
      FileUtils::mkdir_p 'data'

      # create csv
      puts '- creating csv'
      CSV.open(csv_file, 'wb') do |csv|
        # headers
        csv << ['code', 'description']

        data.each do |data_item|
          csv << data_item
        end
      end

    else
      puts "ERROR - did not find any table rows in the html document"
    end

    puts "TIME TO DOWNLOAD = #{Time.now - start} seconds"
  end

end