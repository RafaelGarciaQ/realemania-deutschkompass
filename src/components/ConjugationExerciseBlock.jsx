import { useState } from "react";

function normalizeAnswer(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[.?!]/g, "");
}

export default function ConjugationExerciseBlock({ exercises }) {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});

  const answeredCount = Object.values(answers).filter(
    (answer) => answer.trim() !== ""
  ).length;

  function updateAnswer(id, value) {
    setAnswers({
      ...answers,
      [id]: value,
    });
  }

  function checkAllAnswers() {
    const newResults = {};

    exercises.forEach((exercise) => {
      const rawAnswer = answers[exercise.id] || "";

      // No corregimos ejercicios vacíos
      if (rawAnswer.trim() === "") {
        return;
      }

      const userAnswer = normalizeAnswer(rawAnswer);
      const correctAnswer = normalizeAnswer(exercise.answer);

      newResults[exercise.id] = userAnswer === correctAnswer;
    });

    setResults(newResults);
  }

  function renderSentenceWithInput(exercise) {
    const parts = exercise.sentence.split("____");

    return (
      <>
        {parts[0]}
        <input
          className="inline-answer"
          type="text"
          value={answers[exercise.id] || ""}
          onChange={(event) => updateAnswer(exercise.id, event.target.value)}
          aria-label={`Antwort für ${exercise.id}`}
        />
        {parts[1]}
      </>
    );
  }

  return (
    <section className="exercise-section">
      <div className="exercise-list">
        {exercises.map((exercise, index) => (
          <div className="exercise-row" key={exercise.id}>
            <span className="exercise-number">{index + 1}.</span>

            <span className="exercise-sentence">
              {renderSentenceWithInput(exercise)}
            </span>

            <span className="exercise-verb">
              {exercise.verb} — {exercise.translation}
            </span>

            <span className="exercise-result">
              {results[exercise.id] === true && "✅"}
              {results[exercise.id] === false && (
                <>
                  ❌ <strong>{exercise.answer}</strong>
                </>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="exercise-actions">
  <span className="exercise-progress">
    {answeredCount} / {exercises.length} beantwortet
  </span>

  <button className="check-all-button" onClick={checkAllAnswers}>
    Antworten prüfen
  </button>
</div>
    </section>
  );
}