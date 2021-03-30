/**
 * @param {string} s
 * @return {string}
 */
 var originalDigits = function(s) {
  // Map of letter to occurrence frequency
  const letterFrequency = {};
  
  for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (!letterFrequency[c]) letterFrequency[c] = 0;
      letterFrequency[c]++;
  }
  
  const words = {
      'zero': 0,
      'one': 1,
      'two': 2,
      'three': 3,
      'four': 4,
      'five': 5,
      'six': 6,
      'seven': 7,
      'eight': 8,
      'nine': 9,
  };
  
  function validSolution(freq) {
      // check is solution is valid
      for (const c in freq) {
          if (freq[c]) return false;
      }
      return true;
  }
  
  function recursiveAttempts(freq, digits) {
      if (validSolution(freq)) return digits;
      
      for (const word in words) {
          let wordValid = true;
          let letters = word.split('');
          for (let i = 0; i < letters.length; i++) {
              if (!(freq[letters[i]] >= 1)) {
                  wordValid = false;
                  break;
              }
          }
          if (wordValid) {
              const newFreq = Object.assign({}, freq);
              
              for (let i = 0; i < letters.length; i++) {
                  newFreq[letters[i]]--;
              }
              //console.log(newFreq);
              
              const newDigits = [...digits, words[word]];
              
              const doIt = recursiveAttempts(newFreq, newDigits);
              if (doIt) {
                  return doIt;
              }
          }
      }
      
      return false;
  }
  
  const value = recursiveAttempts(letterFrequency, []);
  //console.log(value);
  value.sort();
  return value.join('');
}