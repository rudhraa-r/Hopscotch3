const sequences = [['ArrowUp', 'Enter'],
    ['ArrowUp', 'ArrowUp', 'Enter'],
    ['ArrowUp', 'ArrowUp', 'ArrowUp', 'Enter'],
    ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowLeft', 'Enter'],
    ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowRight', 'Enter'],
    ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'Enter'],
    ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowLeft', 'Enter'],
    ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowRight', 'Enter']
    ];

    let recordedSequence = [];
    let lastPressedKey = null;
    let currentPosition = 0;
    let currentSequence = null;
    let chosenSequenceIndex = null;

    function handleKeyDown(event) {
      const keyPressed = event.key;
      lastPressedKey = keyPressed;
    }

    function handleKeyUp(event) {
      const keyPressed = event.key;
      recordedSequence.push(keyPressed);
      updateRecordedKeys();
      checkSequence();
    }
    function checkSequence() {
      if (!currentSequence) {
        // Select a random sequence from the array
        chosenSequenceIndex = Math.floor(Math.random() * sequences.length);
        currentSequence = sequences[chosenSequenceIndex];
        updateChosenSequenceIndex();
      }

      if (recordedSequence[currentPosition] === currentSequence[currentPosition]) {
        currentPosition++;
        if (currentPosition === currentSequence.length) {
          showBox(chosenSequenceIndex);
          const message = 'Congratulations! You entered the correct sequence!';
          showMessage(message);          
          recordedSequence = [];
          lastPressedKey = null;
          currentPosition = 0;
          currentSequence = null;
          chosenSequenceIndex = null;
        }
      } else {
        const message = 'Oops! The entered sequence is incorrect.';
        showMessage(message);
        recordedSequence = [];
        lastPressedKey = null;
        currentPosition = 0;
        currentSequence = null;
      }
    }
    function updateRecordedKeys() {
      const recordedKeysElement = document.getElementById('recordedKeys');
      recordedKeysElement.textContent = recordedSequence.join(' + ');
    }       
    function updateChosenSequenceIndex() {
      const chosenSequenceIndexElement = document.getElementById('chosenSequenceIndex');
      chosenSequenceIndexElement.textContent = chosenSequenceIndex !== null ? (chosenSequenceIndex + 1).toString() : '';
      }
    function showMessage(message) {
      const messageElement = document.getElementById('message');
      messageElement.textContent = message;
    }
    function showBox(chosenSequenceIndex){
      const elements = document.getElementsByClassName('inner-box');
      const box = elements[chosenSequenceIndex];
      box.style.display = 'block';
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    chosenSequenceIndex = Math.floor(Math.random() * sequences.length);
    currentSequence = sequences[chosenSequenceIndex];
    updateChosenSequenceIndex();