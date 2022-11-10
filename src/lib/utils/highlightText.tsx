export const highlightText = (text: string, keyword: string) => {
  const regex = new RegExp(keyword, "i");
  const matchResult = text.match(regex);
  if (matchResult) {
    const index = matchResult.index;
    if (index !== undefined)
      return (
        <>
          {text.substring(0, index)}
          <span className="highlight">{keyword}</span>
          {text.substring(index + keyword.length, text.length)}
        </>
      );
    return text;
  }
  return text;
};
