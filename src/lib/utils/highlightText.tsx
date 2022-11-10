export const highlightText = (
  text: string,
  inputValue: string
): JSX.Element => {
  const regex = new RegExp(`(${inputValue})`, "gi");
  return (
    <>
      {text.split(regex).map((word, idx) => {
        return word === inputValue ? (
          <span className="highlight" key={idx}>
            {word}
          </span>
        ) : (
          word
        );
      })}
    </>
  );
};
