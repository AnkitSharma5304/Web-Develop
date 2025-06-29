function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => {
        const isCorrect = index === question.correctOption;
        const isSelected = index === answer;

        let className = "btn btn-option";
        if (hasAnswered) {
          if (isSelected && isCorrect) className += " correct";
          else if (isSelected && !isCorrect) className += " wrong";
          else if (isCorrect) className += " correct";
        }

        return (
          <button
            className={className}
            key={option}
            disabled={hasAnswered}
            onClick={() =>
              dispatch({ type: "newAnswer", payload: index })
            }
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
