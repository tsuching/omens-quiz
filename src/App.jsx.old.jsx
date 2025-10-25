import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, XCircle, ArrowRight, BookOpen } from 'lucide-react';

// --- QUIZ DATA ---
const quizQuestions = [
  {
    id: 1,
    question: "According to the text, which category of omens is explicitly stated as being 'completely adverted' by accumulating merit and spiritual practices?",
    category: "Distant Omens / Avertability",
    options: [
      { text: "Certain Omens", isCorrect: false, rationale: "While highly severe, Certain Omens can still be averted through extreme life-saving actions or long-life initiations, but not 'completely' by general merit accumulation." },
      { text: "Imminent Omens", isCorrect: false, rationale: "Imminent Omens indicate a very close death and are far more difficult to avert than Distant Omens." },
      { text: "Extremely Imminent Omens", isCorrect: false, rationale: "The text states there is 'no means to avoid death' in the case of Extremely Imminent Omens." },
      { text: "Distant Omens", isCorrect: true, rationale: "Distant Omens are the least definite and their influence can be 'completely adverted' by spiritual practices." },
    ],
  },
  {
    id: 2,
    question: "A messenger approaches the doctor's place carrying a stick and is grasping for breath. This is considered an omen of:",
    category: "Distant Omens / Messenger",
    options: [
      { text: "Patient's recovery, as the messenger shows urgency.", isCorrect: false, rationale: "The text lists 'grasping for breath' and 'carrying a stick' as inauspicious signs indicating non-recovery, not recovery." },
      { text: "Impending death, as the messenger cannot accomplish the task.", isCorrect: true, rationale: "Both grasping for breath and carrying a stick are listed as signs that the messenger will not be able to accomplish the task of helping the patient, indicating non-recovery." },
      { text: "An uncertain omen of death.", isCorrect: false, rationale: "This is a Distant Omen, specifically related to the messenger, not an Uncertain Omen which is tied to the disappearance of a disorder." },
      { text: "A favorable omen indicating the patient's recovery.", isCorrect: false, rationale: "Favorable omens include a monk or someone equally attractive and amiable." },
    ],
  },
  {
    id: 3,
    question: "Which of the following is an auspicious dream indicating longevity, health, and prosperity?",
    category: "Distant Omens / Dream",
    options: [
      { text: "Dreaming of riding a tiger or a monkey.", isCorrect: false, rationale: "Riding a cat, monkey, tiger, fox, or a corpse implies the patient is ensnared by the Lord of death." },
      { text: "Dreaming of being naked and cutting one's beard.", isCorrect: false, rationale: "Cutting hair or shaving one's beard is listed as a sign that the patient has gone under the control of the Lord of death." },
      { text: "Dreaming of one's body being smeared with blood and filth.", isCorrect: true, rationale: "This is listed among the dreams indicating positive results (longevity, health, and prosperity)." },
      { text: "Dreaming of being dragged by a deceased relative.", isCorrect: false, rationale: "Being dragged by a deceased relative is an inauspicious dream signifying control by the Lord of death." },
    ],
  },
  {
    id: 4,
    question: "A patient's omens of impending death disappear once the therapeutic intervention successfully pacifies the underlying disorder. This scenario best describes:",
    category: "Uncertain Omens",
    options: [
      { text: "A Distant Omen.", isCorrect: false, rationale: "Distant Omens are not specifically tied to the resolution of a disorder in this conditional manner." },
      { text: "An Uncertain Omen of impending death.", isCorrect: true, rationale: "An Uncertain Omen is one that disappears when the underlying disorder is pacified." },
      { text: "A Certain Omen of death.", isCorrect: false, rationale: "A Certain Omen remains intact even after the disorder is pacified." },
      { text: "An Extremely Imminent Omen.", isCorrect: false, rationale: "Extremely Imminent Omens are the signs of final dissolution, not a condition of disappearance upon recovery." },
    ],
  },
  {
    id: 5,
    question: "A patient avoids heat while his body is struck with severe cold. This is listed as a sign of:",
    category: "Imminent Omens",
    options: [
      { text: "Extremely Imminent Death, due to loss of body heat.", isCorrect: false, rationale: "Loss of body heat itself is an Extremely Imminent sign, but this behavioral paradox is listed specifically under general Imminent Omens." },
      { text: "A Sudden Behavioural Change, a form of Distant Omen.", isCorrect: false, rationale: "Sudden behavioral changes are dislike of friends or abrupt changes in fame, not paradoxical temperature avoidance." },
      { text: "Imminent Death.", isCorrect: true, rationale: "Avoidance of heat while struck with severe cold (and vice versa) is one of the listed signs of Imminent Death." },
      { text: "An Uncertain Omen.", isCorrect: false, rationale: "Imminent Omens are severe signs of close death, separate from the conditional nature of Uncertain Omens." },
    ],
  },
  {
    id: 6,
    question: "Which visual phenomenon is considered a sign of Certain Death?",
    category: "Certain Omens",
    options: [
      { text: "The pupil of the eye losing luster instantly.", isCorrect: false, rationale: "The loss of luster in the pupil and eye retraction are signs of Imminent Death." },
      { text: "Inability to observe the shadow of escaping vapour from the fontanel.", isCorrect: false, rationale: "This is a specific sign listed under Imminent Omens." },
      { text: "One cannot find one's shadow in the morning sun or image in still water.", isCorrect: true, rationale: "The inability to find one's shadow or image in reflections, or seeing it without head or limbs, is a hallmark sign of Certain Death." },
      { text: "Absence of sound when the ears are covered.", isCorrect: false, rationale: "The absence of sound from covered ears is listed as a sign of Imminent Death." },
    ],
  },
  {
    id: 7,
    question: "What is the result when the element **Water** dissolves into the element **Fire** during the successive dissolution of elements (Extremely Imminent Omens)?",
    category: "Extremely Imminent Omens / Elements",
    options: [
      { text: "Breathing stops.", isCorrect: false, rationale: "Breathing stops when the element Air dissolves into the element Space." },
      { text: "One loses the sense of sight.", isCorrect: false, rationale: "The sense of sight is lost when the element Earth dissolves into the element Water." },
      { text: "All body orifices get dry.", isCorrect: true, rationale: "The drying of all body orifices occurs when the element Water dissolves into the element Fire." },
      { text: "It results in the loss of body heat.", isCorrect: false, rationale: "Loss of body heat occurs when the element Fire dissolves into the element Air." },
    ],
  },
  {
    id: 8,
    question: "The loss of the sense of smell (olfactory faculty degenerates) dissolves into which subsequent sense faculty?",
    category: "Extremely Imminent Omens / Faculties",
    options: [
      { text: "The sense of sight.", isCorrect: false, rationale: "Sight is the first faculty to degenerate and dissolves into the sense of sound." },
      { text: "The sense of sound.", isCorrect: false, rationale: "The auditory faculty dissolves into the sense of smell." },
      { text: "The sense of touch.", isCorrect: false, rationale: "The sense of taste dissolves into the sense of touch." },
      { text: "The sense of taste.", isCorrect: true, rationale: "When the olfactory faculty degenerates, smell is lost and it dissolves into the sense of taste (gustatory faculty)." },
    ],
  },
  {
    id: 9,
    question: "A doctor is on the way to the patient's home and sees a vessel full of curds and horses with their young ones. What is the interpretation?",
    category: "Distant Omens / On the Way",
    options: [
      { text: "An inauspicious omen indicating non-recovery.", isCorrect: false, rationale: "Both curds and animals with their young are listed as good omens." },
      { text: "A good omen indicating the patient's recovery.", isCorrect: true, rationale: "The text lists seeing a vessel full of curds and horses/sheep/cows with their young ones as good omens for recovery." },
      { text: "A certain omen, as these are signs of attachment.", isCorrect: false, rationale: "Certain omens relate to reflection/shadow loss and irreversible physical signs." },
      { text: "A sudden behavioural change in the doctor.", isCorrect: false, rationale: "This is a Messenger Omen (specifically 'on the way') and not a Sudden Behavioural Change." },
    ],
  },
  {
    id: 10,
    question: "Which condition, regardless of therapeutic measure response, is listed as a sign of **Certain Death**?",
    category: "Certain Omens",
    options: [
      { text: "A feeling of high fever on a very cold body.", isCorrect: false, rationale: "This is a sign of Imminent Death." },
      { text: "One continues to lose physical radiance and is depressed all the time.", isCorrect: true, rationale: "This is explicitly listed under the signs indicating that death may be inevitable (Certain Death)." },
      { text: "Bleeding from the 9 orifices without the influence of poison or weapons.", isCorrect: false, rationale: "This is a sign of Imminent Death." },
      { text: "The sudden appearance of a new part in the hair and eyebrows.", isCorrect: false, rationale: "This is a sign of Imminent Death." },
    ],
  },
];

// --- APP COMPONENT ---

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizDuration, setQuizDuration] = useState(0);

  useEffect(() => {
    setQuizStartTime(Date.now());
  }, []);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;

  const handleOptionSelect = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (selectedOption && !isAnswered) {
      setIsAnswered(true);
      if (selectedOption.isCorrect) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const duration = Date.now() - quizStartTime;
      setQuizDuration(duration);
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setQuizStartTime(Date.now());
    setQuizDuration(0);
  };

  const getOptionClasses = (option) => {
    let classes = "p-4 border-2 rounded-xl transition duration-200 cursor-pointer text-left text-sm md:text-base ";

    if (isAnswered) {
      if (option.isCorrect) {
        classes += "bg-green-100 border-green-500 text-green-800 font-semibold shadow-md";
      } else if (option === selectedOption) {
        classes += "bg-red-100 border-red-500 text-red-800 shadow-md";
      } else {
        classes += "bg-white border-gray-200 hover:bg-gray-50";
      }
    } else {
      if (option === selectedOption) {
        classes += "bg-indigo-100 border-indigo-400 shadow-lg scale-[1.01]";
      } else {
        classes += "bg-white border-gray-200 hover:bg-gray-100";
      }
    }
    return classes;
  };

  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  // Main Quiz UI
  const QuizUI = () => (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center text-indigo-700">
        <span className="text-lg font-bold">
          Question {currentQuestionIndex + 1} / {totalQuestions}
        </span>
        <span className="text-sm px-3 py-1 bg-indigo-100 rounded-full font-medium">
          Category: {currentQuestion.category}
        </span>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
        <p className="text-xl font-medium text-gray-800">
          {currentQuestion.question}
        </p>
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <div
            key={index}
            className={getOptionClasses(option)}
            onClick={() => handleOptionSelect(option)}
          >
            {option.text}
          </div>
        ))}
      </div>

      {isAnswered && (
        <div className={`p-4 rounded-xl shadow-inner ${selectedOption?.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex items-center space-x-2 font-semibold mb-2">
            {selectedOption?.isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
            <span className={selectedOption?.isCorrect ? 'text-green-600' : 'text-red-600'}>
              {selectedOption?.isCorrect ? 'Correct!' : 'Incorrect.'}
            </span>
          </div>
          <p className="text-gray-700 text-sm">
            <span className="font-bold">Rationale:</span> {selectedOption.rationale}
          </p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        {!isAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`flex items-center px-6 py-3 font-semibold rounded-full shadow-lg transition duration-200 ${
              selectedOption
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]'
                : 'bg-indigo-300 text-indigo-100 cursor-not-allowed'
            }`}
          >
            Submit Answer <CheckCircle className="w-5 h-5 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition duration-200 active:scale-[0.98]"
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'View Results' : 'Next Question'}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );

  // Results UI
  const ResultsUI = () => (
    <div className="text-center p-8 bg-white rounded-2xl shadow-2xl space-y-6">
      <h2 className="text-4xl font-extrabold text-indigo-700">Quiz Complete!</h2>
      <p className="text-gray-600 text-lg">
        You have successfully completed the Sowa Rigpa Omens knowledge check.
      </p>

      <div className="flex justify-center space-x-6">
        <div className="p-4 bg-indigo-50 rounded-xl shadow-inner">
          <p className="text-5xl font-extrabold text-indigo-600">{score}/{totalQuestions}</p>
          <p className="text-sm text-indigo-500 font-medium mt-1">Total Score</p>
        </div>
        <div className="p-4 bg-indigo-50 rounded-xl shadow-inner">
          <p className="text-5xl font-extrabold text-indigo-600">
            {Math.round((score / totalQuestions) * 100)}%
          </p>
          <p className="text-sm text-indigo-500 font-medium mt-1">Accuracy</p>
        </div>
        <div className="p-4 bg-indigo-50 rounded-xl shadow-inner">
          <p className="text-3xl font-extrabold text-indigo-600 mt-2">
            {formatDuration(quizDuration)}
          </p>
          <p className="text-sm text-indigo-500 font-medium mt-1">Time Taken</p>
        </div>
      </div>

      <button
        onClick={handleRestart}
        className="flex items-center mx-auto px-8 py-4 mt-8 bg-indigo-600 text-white font-bold text-lg rounded-full shadow-xl hover:bg-indigo-700 transition duration-200 transform active:scale-[0.98]"
      >
        <RefreshCw className="w-5 h-5 mr-3" />
        Restart Quiz
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center font-[Inter]">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 flex items-center justify-center">
            <BookOpen className="w-8 h-8 mr-3 text-indigo-500" />
            Sowa Rigpa Omens Quiz
          </h1>
          <p className="text-gray-500 text-lg">Test your knowledge on the severity and specific signs of impending death.</p>
        </header>

        <main className="bg-white p-4 sm:p-8 rounded-3xl shadow-2xl ring-4 ring-indigo-50">
          {showResults ? <ResultsUI /> : <QuizUI />}
        </main>
      </div>
    </div>
  );
};

export default App;
