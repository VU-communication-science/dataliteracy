-- Numbers only the top-level headings (##) within each chapter, offset by
-- the module's own number as it appears at the start of the chapter's
-- title (e.g. title: "4.2 Data Visualization" -> "## The grammar of
-- graphics" becomes "4.2.1 The grammar of graphics"). This runs instead
-- of Quarto/Pandoc's built-in number-sections (left off in _quarto.yml),
-- so every chapter numbers itself independently at the correct curriculum
-- offset without needing a book-style shared chapter counter.
--
-- Chapters use ## as their top level (there's no # heading - the chapter
-- title itself comes from frontmatter), so only ## is numbered; ### and
-- deeper stay unnumbered.
--
-- A ## heading is skipped if marked unnumbered (`{.unnumbered}` or `{-}`),
-- which is used for standardized boilerplate sections such as
-- "## Further resources".

-- Done as a single Pandoc(doc) function (rather than a separate Header
-- function) so metadata is read before headings are walked; Pandoc does
-- not guarantee Meta runs before Header otherwise.
function Pandoc(doc)
  local module_number = nil
  if doc.meta.title then
    local title_text = pandoc.utils.stringify(doc.meta.title)
    module_number = title_text:match("^(%d+%.%d+)%s")
  end
  if not module_number then return doc end

  local counter = 0
  doc.blocks = doc.blocks:walk {
    Header = function(el)
      if el.level ~= 2 then return el end
      if el.classes:includes("unnumbered") then return el end

      counter = counter + 1
      local number_str = module_number .. "." .. tostring(counter)

      local new_content = {pandoc.Str(number_str), pandoc.Space()}
      for _, item in ipairs(el.content) do
        table.insert(new_content, item)
      end
      el.content = new_content
      return el
    end
  }
  return doc
end
