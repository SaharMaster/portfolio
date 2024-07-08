import telebot
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton
import os

# Replace 'YOUR_BOT_TOKEN' with the token you received from BotFather
TOKEN = "7261084403:AAE1_7Wi-35dD2AX9sjy0lrEJyHMUxAeGWA"

bot = telebot.TeleBot(TOKEN)

# Dictionary to store channel links
channels = {
    '🇷🇺Русский🇷🇺': 'https://t.me/+PNfma7G6yZozY2Ji',
    '🇺🇦Українська🇺🇦': 'https://t.me/+dxuUIDBNB9FlYWMy',
    '🇬🇧English🇬🇧': 'https://t.me/+Ckm_3-vI6eAxOWIy',
    '🇪🇸Español🇪🇸': 'https://t.me/+I47gaPJ5qFk4YTg6',
    '🇮🇹Italiano🇮🇹': 'https://t.me/+z4f3mo1xKFQ4NmUy'
}

# Updated dictionary of welcome messages in different languages
welcome_messages = {
    '🇷🇺Русский🇷🇺': """🌐 CryptoArk 🌐

Добро пожаловать на CryptoArk - источник самых свежих криптовалютных новостей и анализа рынка! Присоединяйтесь к нам, для:

📈 Актуальных криптовалютных новостей
📊 Технического анализа рынка
🔔 Важных обновлений и событий

Ссылку на канал на выбранном языке вы можете найти ниже:""",
    '🇺🇦Українська🇺🇦': """🌐 CryptoArk 🌐

Ласкаво просимо до CryptoArk - найкращого джерела останніх криптовалютних новин та аналізу ринку! Приєднуйтесь до нас для:

📈 Актуальних новин криптовалют
📊 Технічного аналізу ринку
🔔 Важливих оновлень та подій 

Нижче ви знайдете посилання на канал вибраною вами мовою:""",
    '🇬🇧English🇬🇧': """🌐 CryptoArk 🌐

Welcome to CryptoArk - the ultimate source for the latest cryptocurrency news and market analysis! Join us for:

📈 Up-to-date cryptocurrency news
📊 Technical analysis of the market
🔔 Important updates and events 

You can find the link to the channel in the preferred language below:""",
    '🇪🇸Español🇪🇸': """🌐 CryptoArk 🌐

Bienvenido a CryptoArk - ¡la fuente definitiva de las últimas noticias sobre criptodivisas y análisis de mercado! Únase a nosotros para:

📈 Noticias actualizadas sobre criptodivisas
📊 Análisis técnico del mercado
🔔 Actualizaciones y eventos importantes 

Puede encontrar el enlace al canal en el idioma preferido a continuación:""",
    '🇮🇹Italiano🇮🇹': """🌐 CryptoArk 🌐

Benvenuti su CryptoArk - la fonte definitiva per le ultime notizie sulle criptovalute e le analisi di mercato! Unitevi a noi per:

📈 Notizie aggiornate sulle criptovalute
📊 Analisi tecnica del mercato
🔔 Aggiornamenti ed eventi importanti 

Di seguito trovate il link al canale nella lingua preferita:"""
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
                 "Welcome to CryptoArk bot! Click 'Start' to begin.",
                 reply_markup=start_markup())

@bot.callback_query_handler(func=lambda call: True)
def callback_query(call):
    if call.data == "start":
        bot.answer_callback_query(call.id)
        bot.send_message(call.message.chat.id, 
                         "Great! Now, please choose your preferred language:",
                         reply_markup=language_markup())
    elif call.data.startswith("lang_"):
        language = call.data[5:]  # Remove 'lang_' prefix
        bot.answer_callback_query(call.id)
        welcome_message = welcome_messages.get(language, welcome_messages['🇬🇧English🇬🇧'])
        channel_link = channels.get(language, channels['🇬🇧English🇬🇧'])
        response = f"{welcome_message}\n\n{channel_link}"
        bot.send_message(call.message.chat.id, response)

if __name__ == '__main__':
    print("Bot is running...")
    bot.polling()