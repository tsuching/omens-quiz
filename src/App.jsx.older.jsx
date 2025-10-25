import React, { useState, useCallback, useMemo } from 'react';

// --- FULL OMEN DATA SET (Total: 73 Omens extracted from source text) ---
const OMEN_DATA = {
  // --- Distant Omens (Total 29) ---
  'Distant': [
    // Messenger Omens
    'Messenger approaches in a state of fright or grasping for breath',
    'Messenger carrying a stone or a stick',
    'Messenger calls from a distance',
    'Messenger indulges in non-virtuous actions',
    'Messenger has put on inauspicious ornaments',
    'Messenger utters inauspicious words',
    'Doctor is in a state of mental disturbance when messenger arrives',
    'Doctor is uttering inauspicious words when messenger arrives',
    'Doctor is cutting or dismantling any object when messenger arrives',
    'Doctor is offering torma/performing rituals for the dead when messenger arrives',
    'Doctor sets out on the 4th, 6th, or 9th lunar day',
    'Doctor sets out on unfavorable days or planetary influences',
    'Doctor sets out during the night',
    'Doctor hears or sees something being cut into pieces on the way',
    'Doctor hears or sees something being burnt or broken on the way',
    'Doctor hears someone crying or bewailing a murder on the way',
    'Cat, monkey, otter, or snake crosses the doctor\'s path',
    'Doctor witnesses anything unpleasant or inauspicious on the way',
    'Physician encounters curd or auspicious articles being taken away from the house',
    'Physician comes across a vessel being broken while entering the house',
    
    // Dream Omens
    'Patient dreams of riding a cat, monkey, tiger, fox, or a corpse',
    'Patient dreams of riding a buffalo, horse, pig, donkey, or camel without clothing toward the south',
    'Patient dreams of a willow tree with a bird nest growing from the crown of the head',
    'Patient dreams of a palmyra/thorny tree growing from one’s heart',
    'Patient dreams of dislodging a lotus from one’s heart',
    'Patient dreams of sleeping at a cemetery or being drowned',
    'Patient dreams of being naked or being pursued for non-payment of food',
    'Patient dreams of drinking chhang with deceased relative or being dragged by them',
    'Patient dreams of wearing a dress or ornament of red color or dancing with a deceased relative',
  ],
  // --- Uncertain Omens (Total 3) ---
  'Uncertain': [
    'Omen appears with a disorder but disappears once the disorder is pacified',
    'If the omens of impending death disappears once the disorder is pacified',
    'Omens appear in various forms of disorders that disappear once pacified',
  ],
  // --- Certain Omens (Total 34 - Includes 31 Imminent Signs) ---
  'Certain': [
    // General Certainty Signs
    'Cannot find one’s shadow in the morning sun or image in a mirror',
    'Image appears without head or limbs in a reflection',
    'Ritual cake is declined when offered to the crows',
    'Fingers do not make sound when snapped',
    'Water dries quickly around the heart during a bath',
    
    // Imminent Omens (Physical Signs of Collapse)
    'Bleeding from the 9 orifices of the body without poison or weapons',
    'Completely forgetting what was just mentioned',
    'Retraction of the penis with a flaccid scrotum or vice versa',
    'Experiencing an unusual sound while coughing or sneezing',
    'Not smelling the smoke of a blown-out butter lamp',
    'Not being able to feel the hair being stroked',
    'Feeling as if the crown of the head is greasy',
    'The appearance of a new part in the hair and eyebrows',
    'The formation of tsubkyil (whirled hair)',
    'Appearance of a crescent vein like the shape of the new moon on the forehead',
    'Sudden disturbances in the 5 sensory organs resulting in wrong perception',
    'Not being able to see the forearm while placing one’s hand over the forehead',
    'Absence of glowing light while pressing the eyes',
    'Starring with fixed eyes like a frightened rabbit being chased',
    'Retraction of the eyes into their sockets and an instant loss of lustre in the pupils',
    'Ears sticking towards the back',
    'Absence of sound from the covered ears',
    'Not being able to observe the shadow of escaping vapour from the fontanel',
    'Widening of the nostrils',
    'Formation of nasal crust',
    'Darkening of the medial surface of the tongue',
    'Drying and shortening of the tongue with the loss of speech',
    'Lower lip dangling with the upper lip raised',
    'Appearance of wan complexion',
    'Cooling of one’s breath',
    'Formation of black stains on the teeth',
    'Breathlessness on exertion and a total loss of body heat',
    'Feeling of high fever on a very cold body',
    'Avoidance of heat while the body is struck with severe cold',
    'Avoidance of cold while the body is extremely hot',
    'Lack of response to curative measures and a feeling of wellness when inappropriate treatment is given',
  ],
  // --- Extremely Imminent Omens (Total 7 - Dissolution Signs) ---
  'Extremely Imminent': [
    'Element Earth dissolves into Water (loss of sight)',
    'Element Water dissolves into Fire (all body orifices get dry)',
    'Element Fire dissolves into Air (loss of body heat)',
    'Element Air dissolves into Space (breathing stops)',
    'Vision is lost (Sight degenerates and dissolves into Sound)',
    'Hearing is lost (Auditory degenerates and dissolves into Smell)',
    'Smell is lost (Olfactory degenerates and dissolves into Taste)',
    'Taste is lost (Gustatory degenerates and dissolves into Touch)',
    'Body ceases to experience the sense of touch (Tactile faculty degenerates)',
  ],
};

// Shuffle the array utility
function shuffleArray(array) {
  const arr = array.slice();
  let currentIndex = arr.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex], arr[currentIndex]];
  }
  return arr;
}

// Function to randomly select 20 omens, ensuring all categories are represented
const getInitialOmens = () => {
    const selectedOmens = [];

    // --- Selection Strategy (Total 20 omens from 73) ---
    // This ensures balance, providing a good mix of omens from each type.
    
    // 1. Select 8 Distant omens (from 29)
    selectedOmens.push(...shuffleArray(OMEN_DATA['Distant']).slice(0, 8));

    // 2. Select 2 Uncertain omens (from 3)
    selectedOmens.push(...shuffleArray(OMEN_DATA['Uncertain']).slice(0, 2));

    // 3. Select 6 Certain omens (from 34)
    selectedOmens.push(...shuffleArray(OMEN_DATA['Certain']).slice(0, 6));
    
    // 4. Select 4 Extremely Imminent omens (from 9)
    selectedOmens.push(...shuffleArray(OMEN_DATA['Extremely Imminent']).slice(0, 4));

    // Total selected: 8 + 2 + 6 + 4 = 20

    // 5. Flatten, assign unique IDs, and shuffle for presentation
    const itemsWithIds = selectedOmens.map(omenText => {
        // Find the correct category for the selected omen text
        const category = Object.keys(OMEN_DATA).find(cat => 
            OMEN_DATA[cat].includes(omenText)
        );
        return {
            id: omenText.replace(/\s+/g, '-').toLowerCase().slice(0, 30) + '-' + Math.random().toString(36).substring(7),
            text: omenText,
            category: category,
        };
    });

    return shuffleArray(itemsWithIds);
};

const severityOrder = ['Distant', 'Uncertain', 'Certain', 'Extremely Imminent'];

const App = () => {
  // Use the random, sampled list of 20 omens for the initial state
  const initialItems = useMemo(() => getInitialOmens(), []);

  const [items, setItems] = useState(initialItems);
  const [sortedItems, setSortedItems] = useState(
    severityOrder.reduce((acc, cat) => ({ ...acc, [cat]: [] }), { Unsorted: initialItems })
  );
  const [validationResult, setValidationResult] = useState(null);
  const [score, setScore] = useState(0);

  // The total number of omens for the current quiz session is now always 20
  const totalOmens = items.length;

  // --- Drag and Drop Handlers ---

  const handleDragStart = (e, itemId, startCategory) => {
    e.dataTransfer.setData('itemId', itemId);
    e.dataTransfer.setData('startCategory', startCategory);
  };

  const handleDrop = useCallback((e, targetCategory) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    const startCategory = e.dataTransfer.getData('startCategory');

    if (startCategory === targetCategory) return;

    setSortedItems(prev => {
      const itemToMove = prev[startCategory].find(item => item.id === itemId);
      if (!itemToMove) return prev;

      // 1. Remove from starting category
      const newStart = prev[startCategory].filter(item => item.id !== itemId);
      
      // 2. Add to target category
      const newTarget = [...prev[targetCategory], itemToMove];

      return {
        ...prev,
        [startCategory]: newStart,
        [targetCategory]: newTarget,
      };
    });
    setValidationResult(null); // Clear validation on move
    setScore(0);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  // --- Validation Logic ---

  const checkAnswers = () => {
    let correctCount = 0;
    const results = {};

    severityOrder.forEach(category => {
      sortedItems[category].forEach(item => {
        const isCorrect = item.category === category;
        results[item.id] = isCorrect ? 'correct' : 'incorrect';
        if (isCorrect) {
          correctCount++;
        }
      });
    });

    setValidationResult(results);
    setScore(correctCount);
  };
  
  const resetQuiz = () => {
    // 1. Get 20 entirely new, randomly selected omens from the 73-omen pool
    const newOmens = getInitialOmens();
    
    // 2. Reset state with the new pool
    setItems(newOmens);
    setSortedItems(severityOrder.reduce((acc, cat) => ({ ...acc, [cat]: [] }), { Unsorted: newOmens }));
    setValidationResult(null);
    setScore(0);
  };

  // --- Components ---

  const OmenCard = ({ item, startCategory }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, item.id, startCategory)}
      className={`
        p-3 mb-2 rounded-lg cursor-grab text-sm text-gray-800
        shadow-md transition-all duration-200
        ${validationResult ? (validationResult[item.id] === 'correct' ? 'bg-green-100 ring-2 ring-green-500' : 'bg-red-100 ring-2 ring-red-500') : 'bg-white hover:bg-gray-50'}
      `}
    >
      {item.text}
    </div>
  );

  const DropZone = ({ category, title, description, colorClass }) => (
    <div
      onDrop={(e) => handleDrop(e, category)}
      onDragOver={handleDragOver}
      className={`
        p-4 rounded-xl shadow-lg h-full min-h-[300px] flex flex-col
        ${colorClass}
        transition-all duration-300
      `}
    >
      <h3 className="text-xl font-bold mb-2 text-white border-b border-white/50 pb-2">{title}</h3>
      <p className="text-white/80 text-sm mb-4">{description}</p>
      <div className="flex-grow overflow-y-auto space-y-2">
        {sortedItems[category]?.map(item => (
          <OmenCard key={item.id} item={item} startCategory={category} />
        ))}
        {sortedItems[category]?.length === 0 && (
          <p className="text-white/60 text-center py-8 text-sm italic">Drag omens here...</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-2">
          Sowa Rigpa Omens Severity Sorter
        </h1>
        <p className="text-gray-500 text-lg">Categorize 20 randomly selected omens from the full body of knowledge.</p>
      </header>

      <div className="mb-8 p-4 bg-white shadow-xl rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Omens to Sort (Random 20)</h2>
          <div className="text-lg font-medium text-gray-600">
            Score: <span className="text-indigo-600">{score}/{totalOmens}</span>
          </div>
        </div>

        <div 
          onDrop={(e) => handleDrop(e, 'Unsorted')}
          onDragOver={handleDragOver}
          className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 min-h-[150px]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {sortedItems.Unsorted?.map(item => (
              <OmenCard key={item.id} item={item} startCategory="Unsorted" />
            ))}
            {sortedItems.Unsorted?.length === 0 && (
                <p className="col-span-full text-center text-gray-400 py-6 italic">All omens have been sorted!</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DropZone 
          category="Distant" 
          title="1. Distant Omens" 
          description="Longest timeframe. Most Avertable through spiritual practice."
          colorClass="bg-green-600"
        />
        <DropZone 
          category="Uncertain" 
          title="2. Uncertain Omens" 
          description="Conditional. Disappear if the underlying disorder is cured."
          colorClass="bg-yellow-600"
        />
        <DropZone 
          category="Certain" 
          title="3. Certain Omens" 
          description="Inevitable. Avertable only by extreme merit (saving a life, long-life initiation)."
          colorClass="bg-orange-600"
        />
        <DropZone 
          category="Extremely Imminent" 
          title="4. Extremely Imminent" 
          description="Unavoidable. Relates to the final dissolution of the Five Elements."
          colorClass="bg-red-600"
        />
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={checkAnswers}
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-150 transform hover:scale-105"
        >
          Check Answers
        </button>
        <button
          onClick={resetQuiz}
          className="px-8 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-gray-400 transition duration-150 transform hover:scale-105"
        >
          Reset Quiz
        </button>
      </div>

      {validationResult && (
        <div className="mt-8 text-center p-4 bg-indigo-100 rounded-lg shadow-inner">
          <p className="text-xl font-bold text-indigo-800">
            Validation Complete: You correctly sorted {score} out of {totalOmens} omens.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
