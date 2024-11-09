import sys
import os

GOOGLE_AI_API_KEY='AIzaSyDEhItkVWrwLiTX8ynZJi98AH6bp6QdwUU'

# Add this at the start of your bot.py
print("Python version:", sys.version)
print("Working directory:", os.getcwd())
print("Environment variables loaded:", bool(os.getenv('GOOGLE_AI_API_KEY')))

import os
import google.generativeai as genai
from typing import List, Dict, Union
import json
from dotenv import load_dotenv
import sys

# Load environment variables
load_dotenv()

class QuestionGeneratorBot:
    def __init__(self, api_key: str):
        """Initialize the bot with API key and configure the model"""
        print("Initializing bot...")  # Debug print
        self.api_key = api_key
        genai.configure(api_key=self.api_key)
        
        # Initialize the model
        self.model = genai.GenerativeModel('gemini-pro')
        
        # Load the system prompt
        self.system_prompt = self.load_system_prompt()
        
        # Initialize conversation history
        self.chat = self.model.start_chat(history=[])
        print("Bot initialized successfully")  # Debug print

    def load_system_prompt(self) -> str:
        """Load the system prompt from a file"""
        try:
            with open('system_prompt.txt', 'r') as file:
                prompt = file.read()
                print("System prompt loaded successfully")  # Debug print
                return prompt
        except FileNotFoundError:
            print("Warning: system_prompt.txt not found, using default prompt")  # Debug print
            return """You are an AI assistant specialized in generating educational questions."""

    def generate_questions(self, teacher_input: str) -> Dict[str, Union[List[Dict], str]]:
        """Generate questions based on teacher input"""
        try:
            print(f"Generating questions for input: {teacher_input}")  # Debug print
            
            # Combine system prompt with teacher input
            full_prompt = f"{self.system_prompt}\n\nTeacher Request: {teacher_input}"
            
            # Generate response
            response = self.chat.send_message(full_prompt)
            print("Response received from AI")  # Debug print
            
            # Parse and format the response
            formatted_response = self.format_response(response.text)
            
            return {
                "status": "success",
                "questions": formatted_response,
                "message": "Questions generated successfully"
            }
            
        except Exception as e:
            print(f"Error in generate_questions: {str(e)}")  # Debug print
            return {
                "status": "error",
                "questions": [],
                "message": f"Error generating questions: {str(e)}"
            }

    def format_response(self, response_text: str) -> List[Dict]:
        """Format the model's response into a structured format"""
        try:
            print("Formatting response...")  # Debug print
            questions = []
            current_question = {}
            
            lines = response_text.split('\n')
            for line in lines:
                if line.startswith('Question:'):
                    if current_question:
                        questions.append(current_question)
                    current_question = {'question': line.replace('Question:', '').strip()}
                elif line.startswith('A)'):
                    current_question['options'] = []
                    current_question['options'].append(line.replace('A)', '').strip())
                elif line.startswith('B)'):
                    current_question['options'].append(line.replace('B)', '').strip())
                elif line.startswith('C)'):
                    current_question['options'].append(line.replace('C)', '').strip())
                elif line.startswith('D)'):
                    current_question['options'].append(line.replace('D)', '').strip())
                elif line.startswith('Correct Answer:'):
                    current_question['correct_answer'] = line.replace('Correct Answer:', '').strip()
            
            if current_question:
                questions.append(current_question)
            
            print(f"Formatted {len(questions)} questions")  # Debug print
            return questions
            
        except Exception as e:
            print(f"Error in format_response: {str(e)}")  # Debug print
            return []

def main():
    try:
        # Get API key from environment variable
        api_key = os.getenv('GOOGLE_AI_API_KEY')
        if not api_key:
            print("Error: API key not found in environment variables")
            return

        # Initialize bot
        bot = QuestionGeneratorBot(api_key)
        print("\nWelcome to the Question Generator Bot!")
        print("Enter 'quit' to exit")
        
        # Main interaction loop
        while True:
            teacher_input = input("\nEnter your question generation request: ")
            
            if teacher_input.lower() == 'quit':
                break
                
            # Generate questions
            result = bot.generate_questions(teacher_input)
            
            if result["status"] == "success":
                print("\nGenerated Questions:")
                for i, q in enumerate(result["questions"], 1):
                    print(f"\nQuestion {i}:")
                    print(f"Question: {q['question']}")
                    if 'options' in q:
                        for j, opt in enumerate(['A', 'B', 'C', 'D']):
                            print(f"{opt}) {q['options'][j]}")
                        print(f"Correct Answer: {q['correct_answer']}")
            else:
                print(f"Error: {result['message']}")

    except Exception as e:
        print(f"Main error: {str(e)}")

if __name__ == "__main__":
    main()