const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const improveButton = document.getElementById('improve-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreField = document.getElementById('scoreField')
const adviceField = document.getElementById('adviceField')

let shuffledQuestions, currentQuestionIndex

let score = 0

let bad = '\nYou should not invest any capital in Crytocurrencies. At this point in time your knowledge is too limited to make well informed investment decisions.'
let average = '\nYou have some basic knowledge about cryptocurrencies. You should strive to gather more knowledge and a deeper understanding of cryptocurrencies and the underlying technologies before making investment decisions.'
let good = '\nWell done. Seems like you have done your homework. You have a seemingly broad knowledge and deep understanding of cyptocurrencies and the underlying technologies. You should consider allocating a part of your funds to Cryptocurrencies in order to be diversified.'

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
	currentQuestionIndex++
	setNextQuestion()
})
improveButton.addEventListener('click', improveResource)

function startQuiz() {
	console.log('Started')
	startButton.classList.add('hide')
	shuffledQuestions = questions.sort(() => Math.random()-.5)
	currentQuestionIndex = 0
	questionContainerElement.classList.remove('hide')
	scoreField.classList.add('hide')
	adviceField.classList.add('hide')
	improveButton.classList.add('hide')
	score = 0
	setNextQuestion()
}

function setNextQuestion() {
	resetState()
	showQuestion(shuffledQuestions[currentQuestionIndex])
}

function improveResource() {
	window.open('https://github.com/bitcoinbook', '_blank');
}

function showQuestion(question) {
	questionElement.innerText = question.question
	question.answer.forEach(answer => {
		const button = document.createElement('button')
		button.innerText = answer.text
		button.classList.add('btn')
		if (answer.correct) {
			button.dataset.correct = answer.correct
		}
		button.addEventListener('click', selectAnswer)
		answerButtonsElement.appendChild(button)
	})
}

function resetState() {
	clearStatusClass(document.body)
	nextButton.classList.add('hide')
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild)
	}
}

function selectAnswer(e) {
	const selectedButton = e.target
	const correct = selectedButton.dataset.correct
	if (correct) {
		score++
	}
	setStatusClass(document.body, correct)
	Array.from(answerButtonsElement.children).forEach(button => {
		setStatusClass(button, button.dataset.correct)
	})
	if(shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide')
	}
	else {
		scoreField.innerText = 'Your score: ' + String(score) + ' out of 10'
		scoreField.classList.remove('hide')
		if (score < 6) {
			adviceField.innerText = bad
			adviceField.classList.remove('hide')
		}
		else if (score < 9) {
			adviceField.innerText = average
			adviceField.classList.remove('hide')
		}
		else {
			adviceField.innerText = good
			adviceField.classList.remove('hide')
		}
		startButton.innerText = 'Restart'
		startButton.classList.remove('hide')
		improveButton.classList.remove('hide')
	}
}

function setStatusClass(element, correct) {
	clearStatusClass(element)
	if (correct) {
		element.classList.add('correct')
	}
	else {
		element.classList.add('wrong')
	}
}

function clearStatusClass(element) {
	element.classList.remove('correct')
	element.classList.remove('wrong')
}

const questions = [
	{
		question: 'What consensus mechanism does Bitcoin use?',
		answer: [
			{text: 'Proof of Work (PoW)', correct: true},
			{text: 'Proof of Stake (PoS)', correct: false},
			{text: 'Proof of Burn (PoB)', correct: false},
			{text: 'Proof of Elapsed Time (PoET)', correct: false},
		]
	},
	{
		question: 'What is the current bitcoin mining reward for mining one block?',
		answer: [
			{text: '3.125', correct: false},
			{text: '6.25', correct: true},
			{text: '12.5', correct: false},
			{text: '25', correct: false},
		]
	},
	{
		question: 'What consensus mechanism does Ethereum use?',
		answer: [
			{text: 'Proof of Work (PoW)', correct: true},
			{text: 'Proof of Capacity (PoC)', correct: false},
			{text: 'Proof of Stake (PoS)', correct: false},
			{text: 'Proof of Burn (PoB)', correct: false},
		]
	},
	{
		question: 'What consensus mechanism does Cardano use?',
		answer: [
			{text: 'Proof of Work (PoW)', correct: false},
			{text: 'Proof of Stake (PoS)', correct: true},
			{text: 'Proof of Authority (PoA)', correct: false},
			{text: 'Proof of Elapsed Time (PoET)', correct: false},
		]
	},
	{
		question: 'What percentage of its value did Bitcoin lose during it\'s crash in 2017/18?',
		answer: [
			{text: '≈35%', correct: false},
			{text: '≈50%', correct: false},
			{text: '≈85%', correct: true},
			{text: '≈95%', correct: false},
		]
	},
	{
		question: 'Which hash algorithm is used to secure transactions and calculate proof of work in Bitcoins network?',
		answer: [
			{text: 'MD5', correct: false},
			{text: 'RIPEMD-160', correct: false},
			{text: 'SHA-256', correct: true},
			{text: 'HAVAL', correct: false},
		]
	},
	{
		question: 'Which problem is Ethereum currently facing?',
		answer: [
			{text: 'double spending', correct: false},
			{text: '51% attack', correct: false},
			{text: 'scalability issues', correct: true},
			{text: 'small market share', correct: false},
		]
	},
	{
		question: 'Which of the following Cryptocurrencies did not emerge as a fork of a previously existing one?',
		answer: [
			{text: 'Litecoin', correct: false},
			{text: 'Bitcoin Cash', correct: false},
			{text: 'Dogecoin', correct: false},
			{text: 'Cardano', correct: true},
		]
	},
	{
		question: 'Which of the following Cryptocurrencies can not be considered a \'stable coin\'?',
		answer: [
			{text: 'BUSD', correct: false},
			{text: 'MKR', correct: true},
			{text: 'USDT', correct: false},
			{text: 'DAI', correct: false},
		]
	},
	{
		question: 'Which of the following attributes does not describe Bitcoin?',
		answer: [
			{text: 'deflationary', correct: false},
			{text: 'decentralized', correct: false},
			{text: 'energy saving', correct: true},
			{text: 'peer-to-peer', correct: false},
		]
	}
]