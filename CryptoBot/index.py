import telebot
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton
import os

# Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
TOKEN = "7261084403:AAE1_7Wi-35dD2AX9sjy0lrEJyHMUxAeGWA"

bot = telebot.TeleBot(TOKEN)

# Dictionary to store channel links
channels = {
    '🇷🇺Russian': 'https://t.me/+PNfma7G6yZozY2Ji',
    '🇺🇦Ukrainian': 'https://t.me/+dxuUIDBNB9FlYWMy',
    '🇬🇧English': 'https://t.me/+Ckm_3-vI6eAxOWIy',
    '🇪🇸Español': 'https://t.me/+I47gaPJ5qFk4YTg6',
    '🇮🇹Italian': 'https://t.me/+z4f3mo1xKFQ4NmUy'
}

# Updated dictionary of welcome messages in different languages
welcome_messages = {
    '🇷🇺Russian': """🌐 CryptoArk 🌐

Добро пожаловать на CryptoArk - ваш лучший источник последних криптовалютных новостей и анализа рынка! Присоединяйтесь к нам для:

📈 Актуальные криптовалютные новости
📊 Всесторонний анализ рынка
🔔 Важнейшие обновления и события

Найдите ссылку на канал на предпочтительном для вас языке ниже:""",
    '🇺🇦Ukrainian': """🌐 CryptoArk 🌐

Ласкаво просимо до CryptoArk - найкращого джерела останніх криптовалютних новин та аналізу ринку! Приєднуйтесь до нас для:

📈 Актуальні новини криптовалют
📊 Всебічний аналіз ринку
🔔 Важливі оновлення та події

Нижче ви знайдете посилання на канал вашою вибраною мовою:""",
    '🇬🇧English': """🌐 CryptoArk 🌐

Welcome to CryptoArk – your ultimate source for the latest cryptocurrency news and market analysis! Join us for:

📈 Up-to-date cryptocurrency news
📊 Comprehensive market analysis
🔔 Crucial updates and events

Find the link to the channel in your preferred language below:""",
    '🇪🇸Español': """🌐 CryptoArk 🌐

¡Bienvenido a CryptoArk - su fuente definitiva para las últimas noticias cryptocurrency y análisis de mercado! Únete a nosotros para:

📈 Noticias actualizadas sobre criptodivisas
📊 Análisis exhaustivo del mercado
🔔 Actualizaciones y eventos cruciales

Encuentra el enlace al canal en tu idioma preferido a continuación:""",
    '🇮🇹Italian': """🌐 CryptoArk 🌐

Benvenuti su CryptoArk - la vostra fonte definitiva per le ultime notizie sulle criptovalute e le analisi di mercato! Unitevi a noi per:

📈 Notizie aggiornate sulle criptovalute
📊 Analisi di mercato esaustive
🔔 Aggiornamenti ed eventi cruciali

Trovate il link al canale nella vostra lingua preferita qui sotto:"""
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

@bot.message_handler(commands=['start'])
def send_welcome(message):
    bot.reply_to(message, 
                 "Welcome to CryptoArk bot! 🌐 Click 'Start!' to begin.",
                 reply_markup=start_markup())

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
        welcome_message = welcome_messages.get(language, welcome_messages['🇬🇧English'])
        channel_link = channels.get(language, channels['🇬🇧English'])
        response = f"{welcome_message}\n\n{channel_link}"
        bot.send_message(call.message.chat.id, response)

if __name__ == '__main__':
    print("Bot is running...")
    bot.polling()