/**
 * Komponen Kuis Interaktif - KitaInvest
 * Agent 3: Learning, Quiz & Gamification
 * Domain: /src/components/quiz/
 *
 * Mematuhi RULES.md:
 * - Kuis pilihan ganda di akhir tiap topik dengan penjelasan alasan jawaban benar/salah.
 * - Kuis boleh diulang (jawaban salah tidak mengunci materi).
 * - Topik tercatat selesai setelah seluruh soal dijawab dan tombol selesai ditekan.
 */

import React, { useState } from 'react';

export function QuizComponent({
  topicId,
  topicTitle,
  questions = [],
  onCompleteTopic,
  isAlreadyCompleted = false,
  previousScore = null,
}) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const allAnswered = totalQuestions > 0 && answeredCount === totalQuestions;

  const handleSelectOption = (questionIndex, optionIndex) => {
    if (isSubmitted) return; // Kunci pilihan setelah disubmit hingga ditekan tombol ulang
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const calculateScore = () => {
    if (totalQuestions === 0) return 0;
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    return Math.round((correctCount / totalQuestions) * 100);
  };

  const handleSubmitQuiz = () => {
    if (!allAnswered) return;
    setIsSubmitted(true);
    const score = calculateScore();
    if (onCompleteTopic) {
      onCompleteTopic(topicId, score);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const currentScore = isSubmitted ? calculateScore() : previousScore;

  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <div className="quiz-header-badge">
          <span>📝 Kuis Pemahaman Materi</span>
        </div>
        <h3 className="quiz-title">Uji Pemahaman: {topicTitle}</h3>
        <p className="quiz-instructions">
          Jawab seluruh pertanyaan pilihan ganda berikut untuk memastikan pemahaman konsep Anda. Topik akan otomatis tercatat selesai setelah Anda menyelesaikan kuis. Kuis dapat diulang kapan saja tanpa konsekuensi penalti.
        </p>

        {isAlreadyCompleted && (
          <div className="quiz-completed-banner">
            ✅ <strong>Topik ini telah selesai dipelajari!</strong>
            {previousScore !== null && (
              <span> Skor terakhir Anda: <strong>{previousScore}%</strong></span>
            )}
          </div>
        )}
      </div>

      <div className="quiz-questions-list">
        {questions.map((q, qIndex) => {
          const selectedOption = selectedAnswers[qIndex];
          const hasAnswered = selectedOption !== undefined;
          const isCorrect = isSubmitted && selectedOption === q.correctIndex;
          const isWrong = isSubmitted && selectedOption !== q.correctIndex;

          return (
            <div
              key={q.id || qIndex}
              className={`question-item-card ${isSubmitted ? (isCorrect ? 'correct-border' : 'wrong-border') : ''}`}
            >
              <div className="question-text-row">
                <span className="question-number">Soal {qIndex + 1} dari {totalQuestions}</span>
                <p className="question-text">{q.question}</p>
              </div>

              <div className="options-group">
                {q.options.map((opt, optIndex) => {
                  const isChecked = selectedOption === optIndex;
                  let optionClass = 'option-choice';
                  if (isChecked) optionClass += ' selected';
                  if (isSubmitted) {
                    if (optIndex === q.correctIndex) {
                      optionClass += ' correct-answer';
                    } else if (isChecked && optIndex !== q.correctIndex) {
                      optionClass += ' wrong-answer';
                    }
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      className={optionClass}
                      onClick={() => handleSelectOption(qIndex, optIndex)}
                      disabled={isSubmitted}
                    >
                      <span className="option-indicator">
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span className="option-label">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Pembahasan / Penjelasan Jawaban (Muncul setelah submit) */}
              {isSubmitted && (
                <div className={`explanation-box ${isCorrect ? 'explanation-correct' : 'explanation-wrong'}`}>
                  <strong>
                    {isCorrect ? '✨ Jawaban Anda Tepat!' : '💡 Kurang Tepat — Mari Pelajari:'}
                  </strong>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bagian Aksi & Status Kuis */}
      <div className="quiz-actions-footer">
        {!isSubmitted ? (
          <div className="quiz-submit-box">
            <span className="answered-status-text">
              Status: {answeredCount} dari {totalQuestions} soal telah dijawab
            </span>
            <button
              type="button"
              className="btn btn-primary btn-large"
              disabled={!allAnswered}
              onClick={handleSubmitQuiz}
            >
              {allAnswered ? 'Kirim Jawaban & Selesaikan Topik' : 'Jawab Seluruh Soal Terlebih Dahulu'}
            </button>
          </div>
        ) : (
          <div className="quiz-result-box">
            <div className="score-summary">
              <span className="score-label">Hasil Kuis Anda:</span>
              <span className="score-value font-bold">{currentScore}%</span>
              <span className="score-feedback">
                {currentScore === 100
                  ? 'Luar biasa! Pemahaman Anda terhadap materi ini sangat sempurna.'
                  : 'Bagus! Anda telah menyelesaikan materi dan memahami konsep dasarnya.'}
              </span>
            </div>
            <div className="result-buttons">
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleRetry}
              >
                🔄 Ulangi Kuis Topik Ini
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizComponent;
