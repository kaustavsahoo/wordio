import { useState } from "react";

import { toast } from 'react-toastify';
import Confetti from 'react-confetti';

function Game({ word }) {
    const [guesses, setGuesses] = useState([]);
    const [hasWon, setHasWon] = useState(false);

    const addGuess = (guess) => {
        if (guess === word) {
            toast.success("You win!");
            setHasWon(true);
            return;
        }

        getSimilarity(guess)
            .then((similarity) => {
                const obj = {
                    guess: guess,
                    similarity: similarity
                }
                const sorted = [...guesses, obj].sort((a, b) => b.similarity - a.similarity);
                setGuesses(sorted);
            })
            .catch((err) => {
                toast.error("Invalid word!");
            })
    }

    const getColor = (similarity) => {
        if (similarity >= 0.6) {
            return "bg-green-400";
        }
        if (similarity >= 0.4) {
            return "bg-green-300";
        }
        if (similarity >= 0.3) {
            return "bg-green-200";
        }
        if (similarity >= 0.2) {
            return "bg-yellow-200";
        }
        if (similarity >= 0.1) {
            return "bg-yellow-300";
        }
        return "bg-red-300";
    }

    const getSimilarity = (guess) => {
        return fetch(`https://2021ucp1882.pythonanywhere.com/similarity?word1=${word}&word2=${guess}`)
            .then((response) => {
                if (response.status === 404) {
                    throw new Error("invalid_word");
                }
                return response.json();
            })
            .then(data => parseFloat(data.similarity));
    }

    const handleInput = (event) => {
        event.preventDefault();
        const guess = event.target.elements.guess.value.toLowerCase();

        if (!guess.match(/^[a-z]+$/i)) {
            toast.error("Word must only contain alphabetic characters!");
            return;
        }

        if (guesses.find(obj => obj.guess === guess)) {
            toast.warning("Word has already been guessed!");
            return;
        }
        addGuess(guess);
        event.target.reset();
    }

    console.log(word);
    return (
        <div>
            {hasWon && <Confetti />}
            <form onSubmit={handleInput}>
                <label htmlFor="guess" className="sr-only">Your guess</label>
                <div className="flex items-center py-3 px-3 bg-white rounded-lg">
                    <input disabled={hasWon ? "disabled" : ""} type="text" id="guess" className="mr-2 block p-2 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Guess word..." />
                    <button type="submit" className="inline-flex justify-center p-2 text-blue-600 cursor-pointer hover:bg-blue-100">
                        <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
                    </button>
                </div>
            </form>
            {guesses.length > 0 &&
                <div className="mt-2 flex flex-col items-center py-1.5 px-3 bg-white rounded-lg">
                    {guesses.map(({ guess, similarity }) =>
                        <p key={guess} className={
                            "block my-1.5 p-2 w-full text-sm text-gray-900rounded-lg border border-gray-300 "
                            + getColor(similarity)
                        }>{guess} {Math.round(similarity * 10000) / 100}%</p>
                    )}
                </div>
            }
        </div>
    )
}

export default Game;