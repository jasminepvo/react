import { useCallback, useEffect, useState } from "react";

const HEAD = (
  <div className="rounded-full border-black border-[5px] w-[50px] h-[50px] absolute top-[50px] right-[-22.5px]"></div>
);
const BODY = (
  <div className="bg-black w-[5px] h-[100px] absolute top-[100px] right-0"></div>
);
const RIGHT_ARM = (
  <div className="bg-black w-[60px] h-[5px] absolute top-[140px] right-[-60px] rotate-[-30deg] origin-bottom-left"></div>
);
const LEFT_ARM = (
  <div className="bg-black w-[60px] h-[5px] absolute top-[140px] right-[5px] rotate-[30deg] origin-bottom-right"></div>
);
const LEFT_LEG = (
  <div className="bg-black w-[60px] h-[5px] absolute top-[190px] right-[0px] rotate-[-60deg] origin-bottom-right"></div>
);
const RIGHT_LEG = (
  <div className="bg-black w-[60px] h-[5px] absolute top-[190px] right-[-55px] rotate-[60deg] origin-bottom-left"></div>
);

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

const KEYS = Array.from("abcdefghijklmnopqrstuvwxyz");

const WORDS = [
  "apple",
  "banana",
  "cherry",
  "grape",
  "orange",
  "peach",
  "plum",
  "mango",
  "lemon",
  "pear",
  "kiwi",
  "melon",
  "papaya",
  "fig",
  "coconut",
  "pineapple",
  "blueberry",
  "strawberry",
  "raspberry",
  "watermelon",
  "apricot",
  "nectarine",
  "blackberry",
  "pomegranate",
  "dragonfruit",
  "lychee",
  "guava",
  "passionfruit",
  "persimmon",
  "tangerine",
];

export const Hangman = () => {
  function getWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  const [wordToGuess, setWordToGuess] = useState(getWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  const loser = incorrectLetters.length >= 6;
  const winner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || winner || loser) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, winner, loser]
  );
  const activeLetters = guessedLetters.filter((letter) =>
    wordToGuess.includes(letter)
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "enter") {
        e.preventDefault();
        setGuessedLetters([]);
        setWordToGuess(getWord());
        return;
      }

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [addGuessedLetter]);

  return (
    <div className="max-w-[800px] flex flex-col gap-4 m-auto items-center">
      {winner && "you rock, hit enter to try again"}
      {loser && "not quite, hit enter to give it another go"}
      {/* hangman drawing */}
      <section className="relative">
        {BODY_PARTS.slice(0, incorrectLetters.length)}
        <div className=" w-[5px] h-[50px] bg-black top-0 right-0 absolute"></div>
        <div className=" w-[150px] h-[5px] bg-black ml-[120px]"></div>
        <div className=" w-[5px] h-[300px] bg-black ml-[120px]"></div>
        <div className=" w-[250px] h-[5px] bg-black"></div>
      </section>
      {/* word */}
      <section className="flex gap-2 uppercase font-mono font-bold text-5xl">
        {wordToGuess.split("").map((letter, index) => (
          <span className="border-b-2" key={index}>
            <span
              className={`${
                guessedLetters.includes(letter) || loser
                  ? "visible"
                  : "invisible"
              } ${
                guessedLetters.includes(letter) && loser ? "" : "text-red-4 00"
              }`}
            >
              {letter}
            </span>
          </span>
        ))}
      </section>
      {/* keyboard */}
      <section className="items-stretch w-full max-w-[500px]">
        <section className="grid grid-cols-[repeat(auto-fit,minmax(3rem,1fr))] gap-1 ">
          {KEYS.map((key, index) => {
            const isActive = activeLetters.includes(key);
            const isInactive = incorrectLetters.includes(key);
            return (
              <button
                key={index}
                disabled={winner || loser}
                onClick={() => addGuessedLetter(key)}
                className={`uppercase border hover:bg-black hover:text-white/50 ${
                  isActive ? "bg-stone-400" : ""
                } ${isInactive ? "opacity-20" : ""} `}
              >
                {key}
              </button>
            );
          })}
        </section>
      </section>
    </div>
  );
};
