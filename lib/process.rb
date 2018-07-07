require 'csv'

module Process
  @@counter = 0

  # open the cpv CSV data and save it to the database
  def self.run
    start = Time.now
    csv_file = 'data/cpv_2008.csv'

    if File.exist?(csv_file)

      # read in the data
      puts '- reading in csv data'
      data = CSV.read(csv_file)

      if data.present?
        # Cpv.transaction do

          # sort the data to make sure the codes are in proper order for processing
          data = data[1..-1].sort_by{|x| x[0]}

          puts "- found #{data.length} rows to enter"

          # first delete everything that exists already
          Cpv.delete_all
          ActiveRecord::Base.connection.execute("TRUNCATE TABLE Cpvs RESTART IDENTITY")

          # process the rows
          process_children(data, 2)

        # end
      else
        puts "ERROR - CSV did not have any records"
      end

    else
      puts "ERROR - did not find CSV file to process"
    end

    puts "TIME TO PROCESS = #{Time.now - start} seconds"
  end

protected

  # code is in format of 12345678-9
  # where:
  # - 12 is the number for the top cateogries
  # - 3 is an item that belongs to 12
  # - 4 is an item that belongs to 3
  # - etc....
  # - numbers 3, 4, 5, ... do not have to exist
  # - 9 is an extra number that is not needed for our work, so
  #   CPV.code is without -9 and
  #   CPV.original_code is the full original code
  def self.process_children(data, number_position, parent_id=nil)
    rows = []

    rows = data.select{|x| ['0', '-'].include?(x[0][number_position])}

    if rows.present?
      rows.each do |row|
        puts "processed #{@@counter} rows so far" if @@counter%100 == 0

        item = Cpv.create(
          code: row[0][0..7],
          original_code: row[0],
          description: row[1],
          parent_id: parent_id
        )

        @@counter+=1

        # see if there are any children of this item if this is not the last position
        if number_position < 8
          children = data.select{|x| x[0].start_with?(row[0][0..number_position-1]) && !(['0', '-'].include?(x[0][number_position]))}

          if children.present?
            process_children(children, number_position+1, item.id)
          end
        end
      end
    end
  end
end