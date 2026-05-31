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

  function updateAnswer(id, value) {
    setAnswers({
      ...answers,
      [id]: value,
    });
  }

  function checkAnswer(exercise) {
    const userAnswer = normalizeAnswer(answers[exercise.id] || "");
    const correctAnswer = normalizeAnswer(exercise.answer);

    setResults({
      ...results,
      [exercise.id]: userAnswer === correctAnswer,
    });
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
      <h2>Übungen: Präsens</h2>

      <p>
        Konjugiere das Verb im Präsens und ergänze die Lücke.
      </p>

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

            <button
              className="exercise-button"
              onClick={() => checkAnswer(exercise)}
            >
              Prüfen
            </button>

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
    </section>
  );
}