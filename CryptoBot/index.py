import telebot
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton
import os

# Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
TOKEN = "7261084403:AAE1_7Wi-35dD2AX9sjy0lrEJyHMUxAeGWA"

bot = telebot.TeleBot(TOKEN)

# Dictionary to store channel links (replace with your actual links)
channels = {
    'Russian': 'https://t.me/+PNfma7G6yZozY2Ji',
    'Ukrainian': 'https://t.me/+dxuUIDBNB9FlYWMy',
    'English': 'https://t.me/+Ckm_3-vI6eAxOWIy',
    'Español': 'https://t.me/+I47gaPJ5qFk4YTg6',
    'Italian': 'https://t.me/+z4f3mo1xKFQ4NmUy'
}

def start_markup():
    markup = InlineKeyboardMarkup()
    markup.row_width = 1
    markup.add(InlineKeyboardButton("Start!", callback_data="start"))
    return markup

def language_markup():
    markup = InlineKeyboardMarkup()
    markup.row_width = 2
    for lang in channels.keys():
        markup.add(InlineKeyboardButton(lang, callback_data=f"lang_{lang}"))
    return markup

# Welcoming message will be stored here
@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, 
                 "Welcome! This bot will help you choose a channel based on your preferred language. "
                 "Click the 'Start!' button to begin.",
                 reply_markup=start_markup())

# Prefered language a congats here
@bot.callback_query_handler(func=lambda call: True)
def callback_query(call):
    if call.data == "start":
        bot.answer_callback_query(call.id)
        bot.send_message(call.message.chat.id, 
                         "Great! Now, please choose your preferred language:",
                         reply_markup=language_markup())
    elif call.data.startswith("lang_"):
        language = call.data.split("_")[1]
        bot.answer_callback_query(call.id)
        bot.send_message(call.message.chat.id, 
                         f"Congratulations! Here's the link to the {language} channel: {channels[language]}")

if __name__ == '__main__':
    print("Bot is running...")
    bot.polling()