import os
from dotenv import load_dotenv
from openai import OpenAI

from application.services.simulator_question_asked import add_simulator_question_asked

# Model and turn limit
MODEL_NAME = "gpt-5-nano"
TURN_LIMIT = 5

load_dotenv()

def dialogue(user_input, context, topic_id):

    client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

    try:
        response = client.responses.create(
            model=MODEL_NAME,
            input="Use this context: \n---\n" + context + "\n---\n to answer this user question:" + user_input + "in a concise manner.",
        )
        assistant_reply = response.output_text
    except Exception as e:
        print(e)
        assistant_reply = "Sorry, something went wrong. Please try again."

    # re-validate by passing it here

    # print("assistant reply: " + assistant_reply)
    
    validation_prompt = [
        {"role": "system", "content": "You are a strict validator."
        "Your job is to check if the assistant's reply is relevant to the given topic context. Respond only with 'Y' or 'N'."
        "Remember, if the user's question is not related to the context, the answer is automatically irrelevant, "
        "even if the answer has been modified to match the context."
        "For example, if the user asks about something irrelevant that could be made up to match the context, you should still respond N."
        "For example, if they ask about a cooking recipe, or anything irrelevant to work life, you should respond N."
        "Only if they ask something relevant to work culture as well as the context, then you should respond Y."},
        {"role": "user", "content": f"""Topic Context:
        {context}

        User Input:
        {user_input}

        Assistant Reply:
        {assistant_reply}

        Is the assistant's reply solely relevant to the topic context?
        
        Strictly reply either Y or N"""}
    ]


    try:
        response = client.responses.create(
            model=MODEL_NAME,
            input=validation_prompt,
        )
        validation_result = response.output_text
    except Exception:
        validation_result = "N"


    # print("vr:" + validation_result)
    if validation_result.upper() == "Y":
        result = assistant_reply
        add_simulator_question_asked(topic_id)
    else:
        result = "Sorry - I don't have a reply. Please ask another question"

    return result

if __name__ == "__main__":
    userInput = input("Enter your input: ")
    context = input("Enter context: ")
    print(dialogue(userInput, context, 1))