module Jekyll
    module RemoveParagraphsFilter
      def remove_paragraphs(input)
        input.gsub(/<\/?p[^>]*>/, '')
      end
    end
  end
  
  Liquid::Template.register_filter(Jekyll::RemoveParagraphsFilter)
  