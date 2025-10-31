import os
from dotenv import load_dotenv
from openai import OpenAI

# Model and turn limit
MODEL_NAME = "gpt-5-nano"
TURN_LIMIT = 5

load_dotenv()

# def dialogue(title, introText, context):

#     client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

#     conversation_length = 0
#     history = []


#     initial_context = (
#         "---START-CONTEXT---"
#         "You are a useful assistant designed to help graduates learn about grad life "
#         "in a corporate context. The user is currently in a learning section nearly "
#         "exclusively concerning the following information " + context +
#         " If the conversation does not regard the context given, then ignore the "
#         " message and just say you are here to help with the given topic. Keep answers "
#         " short and concise. "
#         "---END-CONTEXT---"
#     )

#     #^^more info can be added to help it

#     history.append({"role": "system", "content": initial_context})

#     print(f"{title}:", introText)
#     history.append({"role": "assistant", "content": introText})

#     while conversation_length < TURN_LIMIT:
#         try:
#             user_input = input("You: ").strip()
#             user_input = "---START-INPUT---" + user_input + "---END-INPUT---"
#         except (EOFError, KeyboardInterrupt):
#             print(f"\n{title}: Goodbye!")
#             return

#         if not user_input:
#             print(f"{title}: (Please type something or press Ctrl+C to exit.)")
#             continue

#         # Add user message to history
#         history.append({ "role": "user", "content": user_input })

#         # Call OpenAI API
#         try:
#             response = client.responses.create(
#                 model=MODEL_NAME,
#                 input=history,
#             )
#             assistant_reply = response.output_text
#         except Exception as e:
#             print(e)
#             assistant_reply = "Sorry, something went wrong. Please try again."

#         # re-validate by passing it here

#         # print("assistant reply: " + assistant_reply)
        
#         validation_prompt = [
#             {"role": "system", "content": "You are a strict validator. Your job is to check if the assistant's reply is relevant to the given topic context. Respond only with 'Y' or 'N'."},
#             {"role": "user", "content": f"""Topic Context:
#             {context}

#             User Input:
#             {user_input}

#             Assistant Reply:
#             {assistant_reply}

#             Is the assistant's reply relevant to the topic context?
            
#             Strictly reply either Y or N"""}
#         ]


#         try:
#             response = client.responses.create(
#                 model=MODEL_NAME,
#                 input=validation_prompt,
#             )
#             validation_result = response.output_text
#         except Exception:
#             validation_result = "N"


#         # print("vr:" + validation_result)
#         if validation_result.upper() == "Y":
#             print(f"{title}: ", assistant_reply)
#             history.append({ "role": "assistant", "content": assistant_reply })
#         else:
#             print(f"{title}: Sorry - I don't have a reply. Please ask another question")

#         conversation_length += 1

#     print("Assistant: That’s 5 messages! Start a new chat if you want to continue.")

def dialogue(user_input, context):

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
    else:
        result = "Sorry - I don't have a reply. Please ask another question"

    return result

if __name__ == "__main__":
    userInput = input("Enter your input: ")
    context = input("Enter context: ")
    print(dialogue(userInput, context))