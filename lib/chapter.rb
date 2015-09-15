# A decorator class for the chapter content type
class Chapter < SimpleDelegator
    def initialize(resource)
        super(resource)

    end

    def title
        data.title
    end

    def order


    def self.all(resources, path="/chapters/*")
        filtered_resources = resources.select do |resource|
            resource.start_with?(path)
        end

        filtered_resources.map do |resource|
            Chapter.new(resource)
        end
    end
end
