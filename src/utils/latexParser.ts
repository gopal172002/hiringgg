export interface LatexSections {
  [key: string]: string;
}

export function extractSections(latexContent: string): LatexSections {
  const sections: LatexSections = {};
  const regex = /\\section\{(.*?)\}([\s\S]*?)(?=\\section|$)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(latexContent)) !== null) {
    const [, section, content] = match;
    sections[section.trim()] = content.trim();
  }

  return sections;
}
