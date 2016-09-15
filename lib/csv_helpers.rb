# Table creation extension based on CSV data by Adolfo Villafiorita
# http://www.ict4g.net/adolfo/notes/2015/05/30/csv_data_in_middleman.html

class CSV_Helpers < Middleman::Extension
  def initialize(app, options_hash={}, &block)
    super
  end
  helpers do

    def is_number? string
      true if Float(string) rescue false
    end

    def table(file, html_class = '', highlight_rows= nil, table_title = nil, column_label = nil, column_icon = nil)

      # Create the Table object from CSV File
        csv_data = File.read(File.join(data_dir, '/tables/'+ file)) # TODO potentially make it dynamically find the location. For now all tables must be added to the data/tables folder.
        csv = CSV.new(csv_data, :headers => true)
        tbl_obj = csv.read

      # Build HTML Table
        table_title_class = 'titled_table' if table_title
        html_table = "<table class=\"tablesaw #{html_class} #{table_title_class}\" data-tablesaw-mode=\"swipe\" >"

        # Adds table title
        html_table.prepend("<h5 class=\"table_title\">#{table_title}</h5>") if table_title

        # Build Headers
        html_table += "<thead><tr>"

        indexed_headers = Array.new
        tbl_obj.headers.each_with_index do |header, index|
          header_string = header
          indexed_headers[index] = header_string
          persist = 'data-tablesaw-priority="persist"' if index == 0
          html_table += "<th #{persist}> #{ header_string } </th>"
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

            # Adds a class for all row elements in a column
            if column_label && index == (column_label - 1)
              column_class = 'column_label'
            end

            # Check for Numericalness
            if value && is_number?( value.gsub('$','').gsub(',','') )
              number_class = 'number_class'
            end

            # Adds value for rows in data element
            if column_icon && index == (column_icon - 1)
              if value == 'Solid Waste Management'
                icon_value = 'SWM'
              elsif value == 'Information and Communication Technology'
                icon_value = 'ICT'
              else
                icon_value = value
              end
              column_icon_value = " data-icon-value=\"#{icon_value}\" "
            end

            html_table += "<td class=\"#{number_class} #{column_class}\" #{column_icon_value} data-label=\"#{header_label}\"> #{value} </td>"
          end
          html_table += "</tr>"
        end

        html_table += "</table>"

      return html_table
    end
  end
end
::Middleman::Extensions.register(:csv_helpers, CSV_Helpers)
