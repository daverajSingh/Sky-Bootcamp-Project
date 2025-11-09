import os
from dotenv import load_dotenv
from openai import OpenAI

# Use the same rapid model as simulator
MODEL_NAME = "gpt-4.1-nano"

load_dotenv()

def generate_quiz_feedback(results):
    """
    Generate personalized, constructive feedback based on quiz results.
    
    Args:
        results: List of quiz result objects with:
            - questionText: The question text
            - topicID: Topic identifier
            - isCorrect: Boolean indicating if answer was correct
            - correctIndices: List of correct answer indices
            - selectedIndices: List of user's selected answer indices
    
    Returns:
        str: Personalized feedback message
    """
    client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
    
    # Calculate performance metrics
    total = len(results)
    correct = sum(1 for r in results if r.get('isCorrect', False))
    score_percentage = (correct / total * 100) if total > 0 else 0
    
    # Group incorrect answers by topic
    incorrect_by_topic = {}
    for r in results:
        if not r.get('isCorrect', False):
            topic = r.get('topicID', 'Unknown')
            if topic not in incorrect_by_topic:
                incorrect_by_topic[topic] = []
            incorrect_by_topic[topic].append(r.get('questionText', ''))
    
    # Build context for the AI
    context_parts = [
        f"The user scored {correct} out of {total} questions ({score_percentage:.0f}%)."
    ]
    
    if incorrect_by_topic:
        context_parts.append("Topics where they got questions wrong:")
        for topic, questions in incorrect_by_topic.items():
            # Format topic name (replace underscores, title case)
            topic_name = topic.replace('_', ' ').title()
            context_parts.append(f"- {topic_name} ({len(questions)} question(s))")
    
    context = "\n".join(context_parts)
    
    # Craft the prompt for positive, constructive feedback
    prompt = f"""You are a supportive career coach providing feedback on a Sky workplace quiz.

{context}

Provide a brief, personalized message (2-3 sentences maximum) that is:
- Positive and encouraging
- Constructive (mention specific topic areas to improve if applicable)
- Concise and motivating

Guidelines:
- If they scored 100%: Congratulate them warmly and acknowledge their excellent understanding
- If they scored 80-99%: Praise their strong performance and gently suggest reviewing the topic(s) they missed
- If they scored 50-79%: Be encouraging, highlight what they got right, and suggest focusing on specific areas
- If they scored below 50%: Stay positive, suggest they review the material, and encourage them to try again

Use a friendly, professional tone. Focus on growth and learning. Do NOT use bullet points or lists.
Keep it to 2-3 sentences maximum."""

    try:
        response = client.responses.create(
            model=MODEL_NAME,
            input=prompt,
        )
        feedback = response.output_text.strip()
        return feedback
    except Exception as e:
        print(f"Error generating quiz feedback: {e}")
        # Fallback message
        if score_percentage == 100:
            return "Excellent work! You've demonstrated a solid understanding of all the topics."
        elif score_percentage >= 80:
            return "Great job! You're nearly there. A quick review of the topics you missed will have you fully prepared."
        elif score_percentage >= 50:
            return "Good effort! You're on the right track. Spend some time reviewing the areas where you missed questions, and you'll be ready in no time."
        else:
            return "Thanks for taking the quiz! We recommend going through the simulator and then trying again. You've got this!"
