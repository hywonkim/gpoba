# Table creation extension based on CSV data by Adolfo Villafiorita
# http://www.ict4g.net/adolfo/notes/2015/05/30/csv_data_in_middleman.html

class CSV_Helpers < Middleman::Extension
  def initialize(app, options_hash={}, &block)
    super
  end
  helpers do
    def table(file, html_class = '', highlight_rows= nil)
      # Create the Table object from CSV File
        csv_data = File.read(File.join(data_dir, '/tables/'+ file)) # TODO potentially make it dynamically find the location. For now all tables must be added to the data/tables folder.
        csv = CSV.new(csv_data, :headers => true, :header_converters => :symbol)
        tbl_obj = csv.read

      # Build HTML Table      
        html_table = "<table class=\"#{html_class}\" >"

        tbl_obj.headers.each do |header| 
          html_table += "<th> #{ header.to_s.titlecase } </th>"
        end

        tbl_obj.each_with_index do |row, index|        
          if highlight_rows
            html_table += "<tr class=\"row-#{index}\">"
          else 
            html_table += "<tr>"
          end
          
          row.to_hash.values.each do |value|          
            html_table += "<td> #{value} </td>"
          end
          html_table += "</tr>"
        end

        html_table += "</table>"

      return html_table
    end
  end
end
::Middleman::Extensions.register(:csv_helpers, CSV_Helpers)
