import { extractSections, LatexSections } from "./latexParser";

export function modifyLatex(originalLatex: string, aiSuggestions: string): string {
  const sections = extractSections(originalLatex);
  const aiSections = extractSections(aiSuggestions);

  const updatedSections: LatexSections = { ...sections, ...aiSections };

  let modifiedLatex = "";
  for (const [section, content] of Object.entries(updatedSections)) {
    modifiedLatex += `\\section{${section}}\n${content}\n`;
  }

  return modifiedLatex;
}
