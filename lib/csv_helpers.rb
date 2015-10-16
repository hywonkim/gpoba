# Table creation extension based on CSV data by Adolfo Villafiorita
# http://www.ict4g.net/adolfo/notes/2015/05/30/csv_data_in_middleman.html

class CSV_Helpers < Middleman::Extension
  def initialize(app, options_hash={}, &block)
    super
  end
  helpers do
    def table(file, html_class = '', highlight_rows= nil, table_title = nil, column_label = nil, column_icon = nil)
      # Create the Table object from CSV File
        csv_data = File.read(File.join(data_dir, '/tables/'+ file)) # TODO potentially make it dynamically find the location. For now all tables must be added to the data/tables folder.
        csv = CSV.new(csv_data, :headers => true, :header_converters => :symbol)
        tbl_obj = csv.read

      # Build HTML Table              
        
        table_title_class = 'titled_table' if table_title
        html_table = "<table class=\"#{html_class} #{table_title_class}\" >"

        html_table.prepend("<h5 class=\"table_title\">#{table_title}</h5>") if table_title

        # Build Headers
        html_table += "<thead><tr>"

        indexed_headers = Array.new 
        tbl_obj.headers.each_with_index do |header, index|
          header_string = header.to_s.titlecase
          indexed_headers[index] = header_string
          html_table += "<th> #{ header_string } </th>"
        end
                
        html_table += "</tr></thead>"

        # Build Rows
        tbl_obj.each_with_index do |row, index|                  
          if highlight_rows
            html_table += "<tr class=\"row-#{index}\">"
          else 
            html_table += "<tr>"
          end
          
          row.to_hash.values.each_with_index do |value, index|             
            header_label = indexed_headers[index]
            if column_label && index == (column_label - 1)
              column_class = 'column_label'
            end

            if column_icon && index == (column_icon - 1)
              column_icon_value = value
            end

            html_table += "<td class=\"#{column_class}\" data-icon-value=\"#{column_icon_value}\" data-label=\"#{header_label}\"> #{value} </td>"
          end
          html_table += "</tr>"
        end

        html_table += "</table>"

      return html_table
    end
  end
end
::Middleman::Extensions.register(:csv_helpers, CSV_Helpers)