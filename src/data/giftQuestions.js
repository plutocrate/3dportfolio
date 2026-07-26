// ─────────────────────────────────────────────────────────────────────────────
// GIFT SHOP DATA — Cabinet → Gift Shop. Not an essay, not an overlay — just a
// list of questions curated by me, gifted to whoever's looking. Tapping the
// Gift Shop card in the Cabinet pops one at random into the center of the
// screen; "Another one" rerolls without repeating the one just shown.
//
// HOW TO ADD A QUESTION: just add another string to the array below.
// ─────────────────────────────────────────────────────────────────────────────

export const GIFT_QUESTIONS = [
  "Which of your beliefs survived because they were true, and which survived because nobody challenged them?",
  "What if every opinion you call \"your own\" can be traced to a room you once lived in?",
  "If language disappeared, which of your thoughts would still exist?",
  "Which part of your identity requires an audience?",
  "What is the oldest idea living inside you that has never been questioned?",
  "How much of your morality depends on being observed?",
  "If memory is edited continuously, what exactly is continuity?",
  "At what point does changing your mind become becoming someone else?",
  "Which emotion have you mistaken for evidence?",
  "What if intelligence is simply the ability to defend a mistake elegantly?",
  "Which certainty would collapse first if you lived somewhere else?",
  "How many generations does an injustice remain alive after nobody remembers its beginning?",
  "If everyone around you believed something absurd, how would you discover it was absurd?",
  "What would freedom feel like if nobody had invented the word?",
  "Which fear in your life has never actually happened?",
  "Are you more influenced by what happened to you, or by the story you've built around it?",
  "Which belief would you die defending despite having no proof?",
  "If consciousness is only narration, who is listening?",
  "What if regret is just memory refusing to obey time?",
  "Which of your desires existed before someone showed them to you?",
  "Can an idea own a person?",
  "If every memory carries the present into the past, have you ever remembered anything objectively?",
  "What if your personality is simply your most repeated habit?",
  "Is loneliness the absence of people, or the absence of being understood?",
  "What if meaning is created only because death exists?",
  "Which social rule feels natural only because you were born inside it?",
  "If history were rewritten perfectly, how would you know?",
  "Can two people ever mean the same thing by the word \"love\"?",
  "If every human disappeared tomorrow, which of your values would remain meaningful?",
  "Which of your convictions would survive complete anonymity?",
  "What if happiness is a side effect mistaken for a goal?",
  "What have you accepted as inevitable simply because it arrived before you were born?",
  "Is guilt possible without imagination?",
  "What if every generation mistakes adaptation for progress?",
  "Can you think a thought that your language cannot describe?",
  "Which truth have you rejected because of the person who said it?",
  "If your memories belonged to someone else, would you still call them beautiful?",
  "What if boredom is perception stripped of narrative?",
  "What would still matter if comparison disappeared?",
  "Which institutions continue existing only because everyone assumes everyone else believes in them?",
  "Is there a difference between discovering yourself and inventing yourself?",
  "What if your greatest strength exists only because of one wound?",
  "Which part of civilization would collapse first if everyone became perfectly honest?",
  "Can forgiveness exist without forgetting?",
  "What if justice is simply revenge stretched across enough time?",
  "Which of your ambitions survive if nobody ever hears about them?",
  "If all suffering teaches, why do people learn different lessons from the same pain?",
  "What if you're remembered exactly as someone misunderstood you?",
  "Which part of reality do you trust only because everyone else does?",
  "If consciousness emerged gradually, on which day did humanity first become \"awake\"?",
]

// Picks a random index, avoiding immediate repeats where possible.
export function randomGiftIndex(excludeIndex = -1) {
  if (GIFT_QUESTIONS.length <= 1) return 0
  let index = excludeIndex
  while (index === excludeIndex) {
    index = Math.floor(Math.random() * GIFT_QUESTIONS.length)
  }
  return index
}
