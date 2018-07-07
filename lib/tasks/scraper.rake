namespace :scraper do

  desc 'Download and Process the CPV 2008 data'
  task :download_and_process_cpv2008 => :environment do
    Rake.application.invoke_task('scraper:download_cpv2008')
    Rake.application.invoke_task('scraper:process_cpv2008')
  end

  desc 'Download the CPV 2008 data into a CSV file'
  task :download_cpv2008 => :environment do
    require_relative '../scraper'

    Scraper.run()

  end

  desc 'Process the CPV 2008 CSV file and save to database'
  task :process_cpv2008 => :environment do
    require_relative '../process'

    Process.run()
  end

end

